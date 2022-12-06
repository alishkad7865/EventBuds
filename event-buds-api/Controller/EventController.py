import sys
sys.path.append('')
from Repository.DemoRepository import DemoRepository
from Service.DemoService import DemoService
from fastapi import APIRouter, Depends, HTTPException

demoRep = DemoRepository()
demoService = DemoService(demoRep)

class DemoController:
    router = APIRouter(
        prefix="/Event",
        tags=["Event"],
        responses={404: {"description": "Not found"}},
    )
    

    def __init__(self, service):
        self.service = service
        
    @router.get("/getEvent")
    def getEvent(EventId):
        return eventService.getEvent(EventId)
    
    @router.post("/insertEvent")
    def addEvent(Event):
        return eventService.addEvent(Event)
