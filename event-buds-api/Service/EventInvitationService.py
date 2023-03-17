from Auth.AuthHandler import decodeJWT
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

    def getUserInvitations(self, token):
        payload = decodeJWT(token)
        user_id: int = payload.get("user_id")
        return self.repository.getUserInvitation(user_id=user_id)

    def getEventInvitations(self, event_id=0):
        return self.repository.getEventInvitation(event_id)

    def getEventHelpers(self, event_id=0):
        return self.repository.getEventHelpers(event_id)

    def getEventGuests(self, event_id=0):
        return self.repository.getEventGuests(event_id)

    def updateTaskAssignedInvitation(self, invitation_id):
        return self.repository.updateTaskAssignedInvitation(invitation_id)

    def updateInvitationNotified(self, invitation_id):
        return self.repository.updateInvitationNotified(invitation_id)
