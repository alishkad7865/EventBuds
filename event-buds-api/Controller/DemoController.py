import sys
sys.path.append('')
from Repository.DemoRepository import DemoRepository
from Service.DemoService import DemoService
from fastapi import APIRouter, Depends, HTTPException

demoRep = DemoRepository()
demoService = DemoService(demoRep)

class DemoController:
    router = APIRouter(
        prefix="/Demo",
        tags=["Demo"],
        responses={404: {"description": "Not found"}},
    )
    

    def __init__(self, service):
        self.service = service
        
    @router.get("/Result")
    def getResult(pageName):
        return demoService.get(pageName)
    
    @router.post("/addClick")
    def addClick(pageName, TotalClick):
        return demoService.add(pageName,TotalClick)
