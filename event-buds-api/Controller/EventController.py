from fastapi.security import OAuth2PasswordBearer
from Auth.AuthBearer import JWTBearer, decodeJWT
from fastapi import APIRouter, Depends, HTTPException
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

    @router.get("/eventHelpers", dependencies=[Depends(JWTBearer())])
    def getEventHelpers(event_id):
        return eventInvitationService.getEventHelpers(event_id)

    @router.get("/eventGuests", dependencies=[Depends(JWTBearer())])
    def getEventGuests(event_id):
        return eventInvitationService.getEventGuests(event_id)

    @router.get("/getPublicEvents", dependencies=[Depends(JWTBearer())])
    def getOtherPublicEvents(token=Depends(oauth2_scheme)):
        return eventService.getOtherPublicEvents(token)

    @router.get("/getAllPublicEvents", dependencies=[Depends(JWTBearer())])
    def getAllPublicEvents(token=Depends(oauth2_scheme)):
        return eventService.getAllPublicEvents()

    @router.post("/createEvent", dependencies=[Depends(JWTBearer())])
    def createEvent(Event):
        return eventService.createEvent(Event)
