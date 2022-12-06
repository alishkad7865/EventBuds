import sys
sys.path.append('')
from Repository.UserRepository import UserRepository
from Service.UserService import UserService
from fastapi import APIRouter, Depends, HTTPException

userRep = UserRepository()
userService = UserService(userRep)

class UserController:
    router = APIRouter(
        prefix="/User",
        tags=["User"],
        responses={404: {"description": "Not found"}},
    )
    

    def __init__(self, service):
        self.service = service
        
    @router.get("/getUser")
    def getUser(userId):
        return userService.getUser(userId)
    
    @router.post("/editUser")
    def editUser(userId,user):
        return userService.editUser(userId,user)
