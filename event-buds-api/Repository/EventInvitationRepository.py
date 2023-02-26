from Model.EventModel import EventInvitation
from Connection import connection
import datetime
from http.client import OK
import sys
sys.path.append('../event-buds-api/')


class EventInvitationRepository:
    def __init__(self):
        self.connection = connection()

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

    def getUserInvitation(self, user_id):
        try:
            query = """ SELECT * FROM "ADMIN"."EVENTINVITATION" WHERE USERID = :user_id """
            with self.connection.cursor() as cursor:
                data = dict(event_id=int(user_id),)
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

    def updateInvitation(self, invitation_id, message):
        try:
            update_invitation_row = 'UPDATE "ADMIN"."EVENTINVITATION" SET "ADMIN"."EVENTINVITATION"."INVITATIONRESPONSE" =:message WHERE "ADMIN"."EVENTINVITATION"."INVITATIONID" = :invitation_id'
            with self.connection.cursor() as cursor:
                invitation_data = dict(message=str(
                    message), invitation_id=int(invitation_id))
                cursor.execute(update_invitation_row, invitation_data)
                self.connection.commit()
                return "Invitation " + message+"!"
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
                acceptedhelpersList = []
                for row in rows:
                    tempObj = {}
                    for index, column in enumerate(cursor.description, start=0):
                        tempObj[str(column[0])] = row[index]
                    helperList.append(tempObj)
                    if tempObj['INVITATIONRESPONSE'] == 'accepted':
                        acceptedhelpersList.append(tempObj)
                    tempObj = {}

                owner = self.getEventOwner(int(event_id))
                if owner:
                    acceptedhelpersList.append(owner)

                return {"helpersList": helperList, "acceptedhelpersList": acceptedhelpersList}
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

    def getEventOwner(self, event_id):
        try:
            query = """SELECT * FROM "ADMIN"."EVENT" left join "ADMIN"."USER" on "ADMIN"."EVENT"."OWNERID" = "ADMIN"."USER"."USERID" WHERE "ADMIN"."EVENT"."EVENTID" = :event_id """
            with self.connection.cursor() as cursor:
                data = dict(event_id=int(event_id),)
                cursor.execute(query, data)
                rows = cursor.fetchall()
                ownerObj = {}
                for row in rows:
                    for index, column in enumerate(cursor.description, start=0):
                        ownerObj[str(column[0])] = row[index]

                return ownerObj
        except NameError as e:
            return e
