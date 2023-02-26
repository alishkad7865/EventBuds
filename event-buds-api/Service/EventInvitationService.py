from Repository import EventInvitationRepository
from Model.EventModel import EventInvitation
import sys
sys.path.append('')


class EventInvitationService:
    def __init__(self):
        self.repository = EventInvitationRepository.EventInvitationRepository()

    def sendEventInvitation(self, invitation: EventInvitation):
        try:
            self.repository.sendEventInvitation(invitation)
            return "Success"
        except NameError as e:
            return e

    def updateEventInvitation(self, invitation_id, message):
        return self.repository.updateInvitation(invitation_id=invitation_id, message=message)

    def getEventInvitations(self, event_id=0):
        return self.repository.getEventInvitation(event_id)

    def getEventHelpers(self, event_id=0):
        return self.repository.getEventHelpers(event_id)

    def getEventGuests(self, event_id=0):
        return self.repository.getEventGuests(event_id)

    def insertOrUpdateEvent(self, event):
        self.repository.insertOrUpdateEventInvitation(event)

    def deleteEvent(self, eventId):
        self.repository.deleteEventInvitation(eventId)
