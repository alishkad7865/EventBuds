from Model.EventModel import EventInvitation
from Connection import connection
import datetime
from http.client import OK
import sys
sys.path.append('../event-buds-api/')


class EventInvitationRepository:
    def __init__(self):
        self.connection = connection()

    def UpdateEventInvitation(self, pageName, number):
        try:
            query = """ INSERT INTO "ADMIN"."EVENT"
                            (click, TotalClick) VALUES (%s,%s)"""
            data = (pageName, number)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e

    def sendEventInvitation(self, invitation: EventInvitation):
        try:
            query = 'INSERT INTO "ADMIN"."EVENTINVITATION" (EVENTID, USERID, OWNERID, INVITATIONRESPONSE, NOTIFIED, ISHELPER) VALUES(:eventId, :userId, :ownerId, :invitationResponse, :Notified, :isHelper)'

            with self.connection.cursor() as cursor:
                cursor.execute(query, [invitation.eventId, invitation.userId,
                               invitation.ownerId, invitation.invitationResponse, invitation.Notified, invitation.isHelper])
                self.connection.commit()
            return OK
        except NameError as e:
            return e

    def getEventInvitation(self, event_id):
        try:
            query = """ SELECT * FROM "ADMIN"."EVENTINVITATION" WHERE EVENTID = :event_id """
            with self.connection.cursor() as cursor:
                data = dict(event_id=int(event_id),)
                cursor.execute(query, data)
                rows = cursor.fetchall()
                eventInvitationList = []
                for row in rows:
                    tempObj = {}
                    for index, column in enumerate(cursor.description, start=0):
                        tempObj[str(column[0])] = row[index]
                    eventInvitationList.append(tempObj)
                    tempObj = {}
                return eventInvitationList
        except NameError as e:
            return e

    def getEventHelpers(self, event_id):
        try:
            query = """SELECT * FROM "ADMIN"."EVENTINVITATION" left join "ADMIN"."USER" on "ADMIN"."EVENTINVITATION"."USERID" = "ADMIN"."USER"."USERID" WHERE "ADMIN"."EVENTINVITATION"."ISHELPER" = 1 AND "ADMIN"."EVENTINVITATION"."EVENTID" = :event_id """
            with self.connection.cursor() as cursor:
                data = dict(event_id=int(event_id),)
                cursor.execute(query, data)
                rows = cursor.fetchall()
                helperList = []
                for row in rows:
                    tempObj = {}
                    for index, column in enumerate(cursor.description, start=0):
                        tempObj[str(column[0])] = row[index]
                    helperList.append(tempObj)
                    tempObj = {}
                return helperList
        except NameError as e:
            return e

    def getEventGuests(self, event_id):
        try:
            query = """SELECT * FROM "ADMIN"."EVENTINVITATION" left join "ADMIN"."USER" on "ADMIN"."EVENTINVITATION"."USERID" = "ADMIN"."USER"."USERID" WHERE "ADMIN"."EVENTINVITATION"."ISHELPER" = 0 AND "ADMIN"."EVENTINVITATION"."EVENTID" = :event_id"""
            with self.connection.cursor() as cursor:
                data = dict(event_id=int(event_id),)
                cursor.execute(query, data)
                rows = cursor.fetchall()
                guestsList = []
                for row in rows:
                    tempObj = {}
                    for index, column in enumerate(cursor.description, start=0):
                        tempObj[str(column[0])] = row[index]
                    guestsList.append(tempObj)
                    tempObj = {}
                return guestsList
        except NameError as e:
            return e
