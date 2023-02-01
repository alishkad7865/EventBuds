from fastapi import APIRouter, Depends, HTTPException
from Service.EventService import EventService
from Repository.EventRepository import EventRepository
from Service.EventInvitationService import EventInvitationService
import sys
sys.path.append('')

eventRep = EventRepository()
eventService = EventService(eventRep)
eventInvitationService = EventInvitationService()


class EventController:
    router = APIRouter(
        prefix="/Event",
        tags=["Event"],
        responses={404: {"description": "Not found"}},
    )

    def __init__(self, service):
        self.service = service

    @router.get("/getUserEvents")
    def getUserEvent(userId):
        return eventService.getUserEvents(userId)

    @router.get("/eventInvitations")
    def getEventInvitation(event_id):
        return eventInvitationService.getEventInvitations(event_id)

    @router.get("/eventHelpers")
    def getEventHelpers(event_id):
        return eventInvitationService.getEventHelpers(event_id)

    @router.get("/eventGuests")
    def getEventGuests(event_id):
        return eventInvitationService.getEventGuests(event_id)

    @router.get("/getPublicEvents")
    def getOtherPublicEvents(userId):
        return eventService.getOtherPublicEvents(userId)

    @router.get("/getAllPublicEvents")
    def getAllPublicEvents(self):
        return eventService.getAllPublicEvents()

    @router.post("/createEvent")
    def createEvent(Event):
        return eventService.createEvent(Event)
