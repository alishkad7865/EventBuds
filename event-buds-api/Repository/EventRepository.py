from Model.EventModel import Event
from Connection import connection
import datetime
from http.client import OK
import sys
sys.path.append('../event-buds-api/')


class EventRepository:
    def __init__(self):
        self.connection = connection()

    def UpdateEvent(self, pageName, number):
        try:
            query = """ INSERT INTO "ADMIN"."EVENT"
                            (click, TotalClick) VALUES (%s,%s)"""
            data = (pageName, number)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e

    def createEvent(self, event: Event):
        try:
            query = 'INSERT INTO "ADMIN"."EVENT" (EVENTID, EVENTTITLE, DESCRIPTION, CREATEDBY, REGENDDATE,STARTDATETIME, ENDDATETIME, LOCATION, ISPUBLIC, CAPACITY, PRICE, OWNERID, STATUS, HELPERS) VALUES(:eventId, :eventTitle, :description, :createdBy, :regEndDate, :startDateTime, :endDateTime, :location, :isPublic, :capacity, :price, :ownerId, :status, :helpers)'

            with self.connection.cursor() as cursor:
                cursor.execute(query, [event.eventId, event.eventTitle, event.description, event.createdBy, event.eventRegEndDateTime, event.eventStartDateTime,
                               event.eventEndDateTime, event.location, event.isPublic, event.capacity, event.price, event.ownerId, event.status, str(event.helpers)])
                self.connection.commit()
            return OK
        except NameError as e:
            return e

    def deleteEvent(self, eventId):
        try:
            query = """ DELETE FROM click
                            WHERE click = %s """
            data = (eventId,)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e

    def getUserEvent(self, userId):
        try:
            query = """ SELECT * FROM "ADMIN"."EVENT" WHERE "ADMIN"."EVENT"."EVENTID"= (select DISTINCT admin.eventinvitation.eventid from admin.eventinvitation where admin.eventinvitation.userid=:userId and admin.eventinvitation.invitationresponse ='accepted') or admin.event.ownerid=:userId"""
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

    def getOtherPublicEvents(self, userId):
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

    def getAllPublicEvents(self):
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
