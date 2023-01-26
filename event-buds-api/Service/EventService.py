from Model.EventModel import Event
from Repository import EventRepository
import json
import sys
import time
import uuid
sys.path.append('')


class EventService:
    def __init__(self, repository):
        self.repository = repository

    def getAllPublicEvents(self):
        return self.repository.getAllPublicEvents()

    def getUserEvents(self, userId):
        events = self.repository.getUserEvent(userId)
        return events

    def getOtherPublicEvents(self, userId):
        events = self.repository.getOtherPublicEvents(userId)
        return events

    def createEvent(self, rawEvent):
        parsedEvent = json.loads(rawEvent)
        eventId = int(round(time.time() * 1000))
        event: Event = Event(eventId=eventId, eventTitle=parsedEvent["eventTitle"], eventStartDateTime=parsedEvent["eventStartTime"], eventEndDateTime=parsedEvent["eventEndTime"], location=parsedEvent["location"],  isPublic=parsedEvent["eventType"],
                             description=parsedEvent["description"],
                             capacity=parsedEvent["capacity"],
                             price=parsedEvent["price"],
                             helpers=parsedEvent["helpers"],
                             createdBy=parsedEvent["createdBy"],
                             ownerId=parsedEvent["ownerId"],
                             status="Ongoing",
                             eventRegEndDateTime=parsedEvent["eventStartTime"])
        try:
            self.repository.createEvent(event)

            return "Success"
        except NameError as e:
            return e

    def insertOrUpdateEvent(self, event):
        self.repository.insertOrUpdateEvent(event)

    def deleteEvent(self, eventId):
        self.repository.deleteEvent(eventId)
