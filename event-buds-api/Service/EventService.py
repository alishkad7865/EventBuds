import json
import sys
import time
import uuid
sys.path.append('')
from Repository import EventRepository
from Model.EventModel import Event

class EventService:
    def __init__(self, repository):
        self.repository = repository

    def getAllPublicEvents(self):
        return self.repository.getAllPublicEvents()

    def getUserEvents(self, userId):
        self.repository.getUserEvent(userId)

    def createEvent(self, rawEvent):
        parsedEvent = json.loads(rawEvent)
        eventId =  int(round(time.time() * 1000))
        print(eventId, "evert it")
        event: Event = Event(eventId= eventId, eventTitle= parsedEvent["eventTitle"], eventStartDateTime= parsedEvent["eventStartTime"], eventEndDateTime= parsedEvent["eventEndTime"], location= parsedEvent["location"],  isPublic= parsedEvent["eventType"],
            description= parsedEvent["description"],
            capacity= parsedEvent["capacity"],
            price= parsedEvent["price"],
            helpers= parsedEvent["helpers"],
            createdBy=parsedEvent["createdBy"],
            ownerId=parsedEvent["ownerId"],
            status="Ongoing",
            eventRegEndDateTime=parsedEvent["eventStartTime"])
        self.repository.createEvent(event)
    
    def insertOrUpdateEvent(self, event):
        self.repository.insertOrUpdateEvent(event)

    def deleteEvent(self, eventId):
        self.repository.deleteEvent(eventId)