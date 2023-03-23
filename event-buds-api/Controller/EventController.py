from fastapi.security import OAuth2PasswordBearer
from Auth.AuthBearer import JWTBearer, decodeJWT
from fastapi import APIRouter, Depends, HTTPException,  status
from Service.EventService import EventService
from Repository.EventRepository import EventRepository
from Service.EventInvitationService import EventInvitationService
import sys
sys.path.append('')


eventInvitationService = EventInvitationService()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
eventService = EventService()


class EventController:
    router = APIRouter(
        prefix="/Event",
        tags=["Event"],
        responses={404: {"description": "Not found"}},
    )

    def __init__(self, service):
        self.service = service

    @router.get("/getUserEvents", dependencies=[Depends(JWTBearer())])
    async def getUserEvent(token=Depends(oauth2_scheme)):
        return await eventService.getUserEvents(token)

    @router.get("/eventInvitations", dependencies=[Depends(JWTBearer())])
    async def getEventInvitation(event_id):
        return await eventInvitationService.getEventInvitations(event_id)

    @router.get("/userEventInvitations", dependencies=[Depends(JWTBearer())])
    async def getUserEventInvitation(token=Depends(oauth2_scheme)):
        return await eventInvitationService.getUserInvitations(token=token)

    @router.patch("/acceptEventInvitations", dependencies=[Depends(JWTBearer())])
    async def acceptEventInvitation(invitation_id):
        return await eventInvitationService.updateEventInvitation(invitation_id=invitation_id, message="accepted")

    @router.patch("/rejectEventInvitations", dependencies=[Depends(JWTBearer())])
    async def rejectEventInvitation(invitation_id):
        return await eventInvitationService.updateEventInvitation(invitation_id=invitation_id, message="rejected")

    @router.get("/eventHelpers", dependencies=[Depends(JWTBearer())])
    async def getEventHelpers(event_id):
        return await eventInvitationService.getEventHelpers(event_id)

    @router.get("/acceptEventInvitation", dependencies=[Depends(JWTBearer())])
    async def acceptEventInvitation(invitation_id):
        return await eventInvitationService.updateEventInvitation(invitation_id=invitation_id, message="accepted")

    @router.get("/declineEventInvitation", dependencies=[Depends(JWTBearer())])
    async def acceptEventInvitation(invitation_id):
        return await eventInvitationService.updateEventInvitation(invitation_id=invitation_id, message="rejected")

    @router.get("/eventGuests", dependencies=[Depends(JWTBearer())])
    async def getEventGuests(event_id):
        return await eventInvitationService.getEventGuests(event_id)

    @router.get("/getPublicEvents", dependencies=[Depends(JWTBearer())])
    async def getOtherPublicEvents(token=Depends(oauth2_scheme)):
        return await eventService.getOtherPublicEvents(token)

    @router.get("/getAllPublicEvents", dependencies=[Depends(JWTBearer())])
    async def getAllPublicEvents(token=Depends(oauth2_scheme)):
        return await eventService.getAllPublicEvents()

    @router.post("/createEvent", dependencies=[Depends(JWTBearer())], status_code=status.HTTP_200_OK)
    async def createEvent(Event):
        return await eventService.createEvent(Event)

    @router.patch("/updateTaskAssignedNotification", dependencies=[Depends(JWTBearer())])
    async def updateTaskAssignedInvitation(invitation_id):
        return await eventInvitationService.updateTaskAssignedInvitation(invitation_id)

    @router.patch("/updateTaskNotifed", dependencies=[Depends(JWTBearer())])
    async def updateInvitationNotified(invitation_id):
        return await eventInvitationService.updateInvitationNotified(invitation_id)

    @router.patch("/updateEvent", dependencies=[Depends(JWTBearer())])
    async def updateEvent(event_id, status):
        return await eventService.UpdateEvent(event_id=event_id, status=status)

    @router.get("/getEvent", dependencies=[Depends(JWTBearer())])
    async def getEvent(event_id):
        return await eventService.getEvent(event_id=event_id)
