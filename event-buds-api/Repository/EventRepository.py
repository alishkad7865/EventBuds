from Model.EventModel import Event
from Connection import connection
import datetime
from http.client import OK
import sys
sys.path.append('../event-buds-api/')


class EventRepository:
    def __init__(self):
        self.connection = connection()

    async def UpdateEvent(self, event_id, status):
        try:
            update_event = 'UPDATE "ADMIN"."EVENT" SET "ADMIN"."EVENT"."STATUS" = :status WHERE "ADMIN"."EVENT"."EVENTID" = :event_id'
            with self.connection.cursor() as cursor:
                event_data = dict(event_id=int(event_id), status=str(status))
                cursor.execute(update_event,  event_data)
                self.connection.commit()
                return {"message": "Event Updated!"}
        except NameError as e:
            return e

    async def createEvent(self, event: Event):
        try:
            query = 'INSERT INTO "ADMIN"."EVENT" (EVENTID, EVENTTITLE, DESCRIPTION, CREATEDBY, REGENDDATE,STARTDATETIME, ENDDATETIME, LOCATION, ISPUBLIC, CAPACITY, PRICE, OWNERID, STATUS, HELPERS) VALUES(:eventId, :eventTitle, :description, :createdBy, :regEndDate, :startDateTime, :endDateTime, :location, :isPublic, :capacity, :price, :ownerId, :status, :helpers)'

            with self.connection.cursor() as cursor:
                cursor.execute(query, [event.eventId, event.eventTitle, event.description, event.createdBy, event.eventRegEndDateTime, event.eventStartDateTime,
                               event.eventEndDateTime, event.location, event.isPublic, event.capacity, event.price, event.ownerId, event.status, str(event.helpers)])
                self.connection.commit()
            return OK
        except NameError as e:
            return e

    async def deleteEvent(self, eventId):
        try:
            query = """ DELETE FROM click
                            WHERE click = %s """
            data = (eventId,)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e

    async def Get_Event(self, event_id):
        try:
            query = """ SELECT * FROM "ADMIN"."EVENT" WHERE "ADMIN"."EVENT"."EVENTID" = :event_id """
            with self.connection.cursor() as cursor:
                data = dict(event_id=int(event_id),)
                cursor.execute(query, data)
                rows = cursor.fetchall()

                event = []
                for row in rows:
                    tempObj = {}
                    for index, column in enumerate(cursor.description, start=0):
                        tempObj[str(column[0])] = row[index]
                    event.append(tempObj)
                    tempObj = {}
                return event
        except NameError as e:
            return e

    async def getUserEvent(self, userId):
        try:
            query = """ SELECT Distinct "ADMIN"."EVENTINVITATION"."TASKASSIGNED", "ADMIN"."EVENT"."EVENTID", "ADMIN"."EVENT"."DESCRIPTION", "ADMIN"."EVENT"."CREATIONDATE", "ADMIN"."EVENT"."CREATEDBY", "ADMIN"."EVENT"."REGENDDATE", "ADMIN"."EVENT"."STARTDATETIME", "ADMIN"."EVENT"."ENDDATETIME", "ADMIN"."EVENT"."LOCATION", "ADMIN"."EVENT"."ISPUBLIC", "ADMIN"."EVENT"."CAPACITY", "ADMIN"."EVENT"."PRICE", "ADMIN"."EVENT"."STATUS", "ADMIN"."EVENT"."OWNERID", "ADMIN"."EVENT"."HELPERS", "ADMIN"."EVENT"."EVENTTITLE" ,"ADMIN"."EVENTINVITATION"."TASKASSIGNED" FROM "ADMIN"."EVENT", "ADMIN"."EVENTINVITATION" WHERE "ADMIN"."EVENT"."OWNERID" =:userId  OR ("ADMIN"."EVENT"."EVENTID"= "ADMIN"."EVENTINVITATION"."EVENTID" AND ("ADMIN"."EVENTINVITATION"."USERID" =:userId AND "ADMIN"."EVENTINVITATION"."INVITATIONRESPONSE" ='accepted'))"""
            # query = """ SELECT * FROM "ADMIN"."EVENT" WHERE "ADMIN"."EVENT"."EVENTID"= (select DISTINCT admin.eventinvitation.eventid from admin.eventinvitation where admin.eventinvitation.userid=:userId and admin.eventinvitation.ishelper=1 and admin.eventinvitation.invitationresponse ='accepted') or admin.event.ownerid=:userId"""
            with self.connection.cursor() as cursor:
                data = dict(userId=int(userId),)
                cursor.execute(query, data)
                rows = cursor.fetchall()
                eventList = []
                for row in rows:
                    tempObj = {}
                    for index, column in enumerate(cursor.description, start=0):
                        tempObj[str(column[0])] = row[index]
                    eventList.append(tempObj)
                    tempObj = {}
                return eventList
        except NameError as e:
            return e

    async def getOtherPublicEvents(self, userId):
        try:
            query = """ SELECT * FROM "ADMIN"."EVENT" WHERE :userId NOT IN OWNERID AND ISPUBLIC=1 """
            with self.connection.cursor() as cursor:
                data = dict(userId=int(userId),)
                cursor.execute(query, data)
                rows = cursor.fetchall()
                eventList = []
                for row in rows:
                    tempObj = {}
                    for index, column in enumerate(cursor.description, start=0):
                        tempObj[str(column[0])] = row[index]
                    eventList.append(tempObj)
                    tempObj = {}
                return eventList
        except NameError as e:
            return e

    async def getAllPublicEvents(self):
        try:
            query = """ SELECT * FROM "ADMIN"."EVENT" WHERE ISPUBLIC=1 """
            with self.connection.cursor() as cursor:
                cursor.execute(query)
                rows = cursor.fetchall()
                eventList = []
                for row in rows:
                    tempObj = {}
                    for index, column in enumerate(cursor.description, start=0):
                        tempObj[str(column[0])] = row[index]
                    eventList.append(tempObj)
                    tempObj = {}
                return eventList
        except NameError as e:
            return e
