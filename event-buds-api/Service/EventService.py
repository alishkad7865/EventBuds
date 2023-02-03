from Service import EventInvitationService
from Model.EventModel import Event, EventInvitation
from Repository import EventRepository
import json
import sys
import time
sys.path.append('')


class EventService:
    def __init__(self, repository):
        self.repository = repository
        self.invitation_service = EventInvitationService.EventInvitationService()

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
            for guest in parsedEvent["guests"]:
                invitation: EventInvitation = EventInvitation(
                    eventId=eventId, inviteId=int(round(time.time() * 1000)), invitationResponse="sent", isHelper=0, Notified=0, ownerId=int(parsedEvent["ownerId"]), RespondDate=None, userId=guest['USERID'])
                self.invitation_service.sendEventInvitation(
                    invitation)

            for helper in parsedEvent["helpers"]:
                invitation: EventInvitation = EventInvitation(
                    eventId=eventId, inviteId=int(round(time.time() * 1000)), invitationResponse="sent", isHelper=1, Notified=0, ownerId=int(parsedEvent["ownerId"]), RespondDate=None, userId=helper['USERID'])

                self.invitation_service.sendEventInvitation(
                    invitation)

            return "Success"
        except NameError as e:
            return e

    def UpdateEvent(self, event):
        self.repository.UpdateEvent(event)

    def deleteEvent(self, eventId):
        self.repository.deleteEvent(eventId)
