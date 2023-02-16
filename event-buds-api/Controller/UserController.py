from fastapi import APIRouter, Depends, HTTPException
from Service.UserService import UserService
from Model.EventModel import UserLogin, UserSignUp
from Auth.AuthBearer import JWTBearer
from Auth.AuthHandler import signJWT
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

import sys
sys.path.append('')

userService = UserService()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


class UserController:
    router = APIRouter(
        prefix="/User",
        tags=["User"],
        responses={404: {"description": "Not found"}},
    )

    def __init__(self, service):
        self.service = service

    @staticmethod
    def authenticate_user(email: str, password: str):
        user = UserController.getCurrentUser(
            UserController, email=email)
        if not user:
            return False
        if not verify_password(plain_password=password, hashed_password=user['PASSWORD']):
            return False
        return user

    def getCurrentUser(self, email) -> UserLogin:
        return userService.getLoggedInUser(email)

    @router.get("/getUser", dependencies=[Depends(JWTBearer())])
    def getUser(userId):
        return userService.getUser(userId)

    @router.get("/getAllUsers", dependencies=[Depends(JWTBearer())])
    def getAllUsers(userId):
        return userService.getAllUsers(userId)

    @router.post("/editUser", dependencies=[Depends(JWTBearer())])
    def editUser(userId, user):
        return userService.editUser(userId, user)

    @router.post("/createUser")
    def createUser(user: UserSignUp):
        return userService.createUser(user)
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJhbGlzaCIsImVtYWlsIjoiYUBnbWFpbC5jb20ifQ.NFbMOrSuXtUXStEykdOgy2_qT36L5HH3FSe1vdI8bHo

    @router.post("/login")
    async def userLogin(user: UserLogin):
        if UserController.authenticate_user(user.email, user.password):
            return signJWT(user.userId, user.userName, user.email)
        return {
            "error": "Wrong login details!"
        }
