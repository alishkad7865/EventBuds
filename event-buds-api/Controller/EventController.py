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
    def getUserEvent(token=Depends(oauth2_scheme)):
        return eventService.getUserEvents(token)

    @router.get("/eventInvitations", dependencies=[Depends(JWTBearer())])
    def getEventInvitation(event_id):
        return eventInvitationService.getEventInvitations(event_id)

    @router.get("/userEventInvitations", dependencies=[Depends(JWTBearer())])
    def getUserEventInvitation(token=Depends(oauth2_scheme)):
        return eventInvitationService.getUserInvitations(token=token)

    @router.patch("/acceptEventInvitations", dependencies=[Depends(JWTBearer())])
    def acceptEventInvitation(invitation_id):
        return eventInvitationService.updateEventInvitation(invitation_id=invitation_id, message="accepted")

    @router.patch("/rejectEventInvitations", dependencies=[Depends(JWTBearer())])
    def rejectEventInvitation(invitation_id):
        return eventInvitationService.updateEventInvitation(invitation_id=invitation_id, message="rejected")

    @router.get("/eventHelpers", dependencies=[Depends(JWTBearer())])
    def getEventHelpers(event_id):
        return eventInvitationService.getEventHelpers(event_id)

    @router.get("/acceptEventInvitation", dependencies=[Depends(JWTBearer())])
    def acceptEventInvitation(invitation_id):
        return eventInvitationService.updateEventInvitation(invitation_id=invitation_id, message="accepted")

    @router.get("/declineEventInvitation", dependencies=[Depends(JWTBearer())])
    def acceptEventInvitation(invitation_id):
        return eventInvitationService.updateEventInvitation(invitation_id=invitation_id, message="rejected")

    @router.get("/eventGuests", dependencies=[Depends(JWTBearer())])
    def getEventGuests(event_id):
        return eventInvitationService.getEventGuests(event_id)

    @router.get("/getPublicEvents", dependencies=[Depends(JWTBearer())])
    def getOtherPublicEvents(token=Depends(oauth2_scheme)):
        return eventService.getOtherPublicEvents(token)

    @router.get("/getAllPublicEvents", dependencies=[Depends(JWTBearer())])
    def getAllPublicEvents(token=Depends(oauth2_scheme)):
        return eventService.getAllPublicEvents()

    @router.post("/createEvent", dependencies=[Depends(JWTBearer())], status_code=status.HTTP_200_OK)
    def createEvent(Event):
        return eventService.createEvent(Event)

    @router.patch("/updateTaskAssignedNotification", dependencies=[Depends(JWTBearer())])
    def updateTaskAssignedInvitation(invitation_id):
        return eventInvitationService.updateTaskAssignedInvitation(invitation_id)

    @router.patch("/updateTaskNotifed", dependencies=[Depends(JWTBearer())])
    def updateInvitationNotified(invitation_id):
        return eventInvitationService.updateInvitationNotified(invitation_id)

    @router.patch("/updateEvent", dependencies=[Depends(JWTBearer())])
    def updateEvent(event_id, status):
        return eventService.UpdateEvent(event_id=event_id, status=status)

    @router.get("/getEvent", dependencies=[Depends(JWTBearer())])
    def getEvent(event_id):
        return eventService.getEvent(event_id=event_id)
