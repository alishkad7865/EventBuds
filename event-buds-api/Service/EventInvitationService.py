from Auth.AuthHandler import decodeJWT
from Repository import EventInvitationRepository
from Model.EventModel import EventInvitation
import sys
sys.path.append('')


class EventInvitationService:
    def __init__(self):
        self.repository = EventInvitationRepository.EventInvitationRepository()

    async def sendEventInvitation(self, invitation: EventInvitation):
        try:
            await self.repository.sendEventInvitation(invitation)
            return "Success"
        except NameError as e:
            return e

    async def updateEventInvitation(self, invitation_id, message):
        return await self.repository.updateInvitation(invitation_id=invitation_id, message=message)

    async def getUserInvitations(self, token):
        payload = decodeJWT(token)
        user_id: int = payload.get("user_id")
        return await self.repository.getUserInvitation(user_id=user_id)

    async def getEventInvitations(self, event_id=0):
        return self.repository.getEventInvitation(event_id)

    async def getEventHelpers(self, event_id=0):
        return await self.repository.getEventHelpers(event_id)

    async def getEventGuests(self, event_id=0):
        return await self.repository.getEventGuests(event_id)

    async def updateTaskAssignedInvitation(self, invitation_id):
        return await self.repository.updateTaskAssignedInvitation(invitation_id)

    async def updateInvitationNotified(self, invitation_id):
        return await self.repository.updateInvitationNotified(invitation_id)
