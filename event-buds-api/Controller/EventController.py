import sys
sys.path.append('')
from Repository.EventRepository import EventRepository
from Service.EventService import EventService
from fastapi import APIRouter, Depends, HTTPException

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
        
    @router.get("/getUserEvent")
    def getUserEvent(userId):
        return eventService.getUserEvents(userId)
    
    @router.post("/createEvent")
    def createEvent(Event):
        return eventService.createEvent(Event)
