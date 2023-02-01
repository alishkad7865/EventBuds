from Model.EventModel import Event
from Connection import connection
import datetime
from http.client import OK
import sys
sys.path.append('../event-buds-api/')


class EventRepository:
    def __init__(self):
        self.connection = connection()

    def UpdateTask(self, task_id, task):
        try:
            query = """ INSERT INTO "ADMIN"."EVENT"
                            (click, TotalClick) VALUES (%s,%s)"""
            data = (pageName, number)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e

    def createTask(self, event: Event):
        try:
            query = 'INSERT INTO "ADMIN"."EVENT" (EVENTID, EVENTTITLE, DESCRIPTION, CREATEDBY, REGENDDATE,STARTDATETIME, ENDDATETIME, LOCATION, ISPUBLIC, CAPACITY, PRICE, OWNERID, STATUS, HELPERS) VALUES(:eventId, :eventTitle, :description, :createdBy, :regEndDate, :startDateTime, :endDateTime, :location, :isPublic, :capacity, :price, :ownerId, :status, :helpers)'

            with self.connection.cursor() as cursor:
                cursor.execute(query, [event.eventId, event.eventTitle, event.description, event.createdBy, event.eventStartDateTime, event.eventStartDateTime,
                               event.eventEndDateTime, event.location, event.isPublic, event.capacity, event.price, event.ownerId, event.status, str(event.helpers)])
                self.connection.commit()
            return OK
        except NameError as e:
            return e

    def deleteTask(self, task_id):
        try:
            query = """ DELETE FROM click
                            WHERE click = %s """
            data = (task_id,)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e

    def getTasks(self, event_id):
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
