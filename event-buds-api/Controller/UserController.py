from fastapi import APIRouter, Depends, HTTPException
from Service.UserService import UserService
from Repository.UserRepository import UserRepository
import sys
sys.path.append('')

userService = UserService()


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

    @router.get("/getAllUsers")
    def getAllUsers(userId):
        return userService.getAllUsers(userId)

    @router.post("/editUser")
    def editUser(userId, user):
        return userService.editUser(userId, user)
