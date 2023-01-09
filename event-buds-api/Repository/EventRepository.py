import datetime
from http.client import OK
import sys
sys.path.append('../event-buds-api/')
from Connection import connection 
from Model.EventModel import Event 

class EventRepository:
    def __init__(self):
        self.connection = connection()

    def insertOrUpdateEvent(self, pageName, number):
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
            # {"eventTitle":"my first event","eventStartTime":"2023-01-08T14:08:00-06:00","eventEndTime":"2023-01-15T16:08:00-06:00","location":"1278 regina","eventType":"1","description":"My description for first event","capacity":"150","price":"100","createdBy":"a@g.ca","ownerId":1,"helpers":[{"userId":2,"firstName":"first","lastName":"test","email":"test@gmail.com"},{"userId":3,"firstName":"secong","lastName":"test","email":"b@gmail.com"}],"guests":[{"USERID":2,"FIRSTNAME":"first","LASTNAME":"test","EMAIL":"test@gmail.com","ADDRESS":"1223 Regina Ave, Regina SK S4S 109","SEX":"Male","BIODATA":"No bio available","FRIENDS":null},{"USERID":5,"FIRSTNAME":"alish_u","LASTNAME":"test","EMAIL":"a1@g.ca","ADDRESS":"123 REgina AVE","SEX":"Male","BIODATA":"No Bio","FRIENDS":null}]} 
            # print(event, event.eventId, event.description," in repo")
            # (EVENTID,EVENTTITLE,DESCRIPTION,CREATEDBY, REGENDDATE,STARTDATETIME, ENDDATETIME, LOCATION, ISPUBLIC, CAPACITY, PRICE, OWNERID )
            # query = """ SELECT * FROM "ADMIN"."EVENT" """
            
            query = 'INSERT INTO "ADMIN"."EVENT" (EVENTID, EVENTTITLE, DESCRIPTION, CREATEDBY, REGENDDATE,STARTDATETIME, ENDDATETIME, LOCATION, ISPUBLIC, CAPACITY, PRICE, OWNERID, STATUS, HELPERS) VALUES(:eventId, :eventTitle, :description, :createdBy, :regEndDate, :startDateTime, :endDateTime, :location, :isPublic, :capacity, :price, :ownerId, :status, :helpers)'
            # print(event.eventTitle, event.description, event.createdBy, event.eventRegEndDateTime, event.eventStartDateTime, event.eventEndDateTime, event.location, event.isPublic, event.capacity, event.price,event.status, event.ownerId, str(event.helpers), "in it")
            # data = (event.eventId, event.createdBy, int(event.ownerId) )
            # data = [event.eventId, event.createdBy, event.ownerId]
            with self.connection.cursor() as cursor:
                # print(cursor.execute(query, (1,)))
                cursor.execute(query, [event.eventId,event.eventTitle,event.description, event.createdBy, event.eventStartDateTime, event.eventStartDateTime, event.eventEndDateTime,event.location, event.isPublic, event.capacity,event.price, event.ownerId,event.status, str(event.helpers)])
                self.connection.commit()
            return OK
        except NameError as e:
            return e
    
    def deleteEvent(self, pageName):
        try:
            query = """ DELETE FROM click
                            WHERE click = %s """
            data = (pageName,)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e


    def getUserEvent(self, userId):
        try:
            query = """ SELECT * FROM "ADMIN"."EVENT" """
            cursor = self.connection.cursor()
            # data = dict(userId = int(userId),)
            cursor.execute(query)
            rows= cursor.fetchall()
            print(rows)
            return rows
        except NameError as e:
            return e

