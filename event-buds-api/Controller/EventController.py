from fastapi import APIRouter, Depends, HTTPException
from Service.EventService import EventService
from Repository.EventRepository import EventRepository
from Repository.EventRepository import EventRepository
import sys
sys.path.append('')

eventRep = EventRepository()
eventService = EventService(eventRep)


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

    @router.get("/getPublicEvents")
    def getOtherPublicEvents(userId):
        return eventService.getOtherPublicEvents(userId)

    @router.get("/getAllPublicEvents")
    def getAllPublicEvents(self):
        return eventService.getAllPublicEvents()

    @router.post("/createEvent")
    def createEvent(Event):
        return eventService.createEvent(Event)
