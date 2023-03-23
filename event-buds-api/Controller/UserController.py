import json
from fastapi import APIRouter, Depends, HTTPException, status
from jose import JWTError
from Service.UserService import UserService
from Model.EventModel import UserLogin, UserSignUp, User, Friend
from Auth.AuthBearer import JWTBearer
from Auth.AuthHandler import signJWT, decodeJWT
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

import sys
sys.path.append('')

userService = UserService()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
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
    async def getAllUsers():
        return await userService.getAllUsers()

    @router.get("/getFriends", dependencies=[Depends(JWTBearer())])
    async def getFriends(token=Depends(oauth2_scheme)):
        return await userService.getFriends(token)

    @router.patch("/addFriend", dependencies=[Depends(JWTBearer())])
    async def add_friend(friend: Friend, token=Depends(oauth2_scheme)):
        return await userService.add_friend(friend=friend, token=token)

    @router.patch("/acceptFriendRequest", dependencies=[Depends(JWTBearer())])
    async def accept_friend_request(friend: Friend, token=Depends(oauth2_scheme)):
        return await userService.accept_friend_request(friend=friend, token=token)

    @router.patch("/removeFriend", dependencies=[Depends(JWTBearer())])
    async def remove_friend(friend: Friend, token=Depends(oauth2_scheme)):
        return await userService.remove_friend(friend=friend, token=token)

    @router.post("/editUser", dependencies=[Depends(JWTBearer())])
    async def editUser(userId, user):
        return await userService.editUser(userId, user)

    @router.post("/createUser")
    def createUser(user: UserSignUp):
        return userService.createUser(user)

    def get_current_user(token: str = Depends(oauth2_scheme)):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = decodeJWT(token)
            user_id: str = payload.get("user_id")
            if user_id is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
        user = UserController.getUser(userId=user_id)
        if user is None:
            raise credentials_exception
        return user

    @router.get("/me")
    def read_users_me(current_user: User = Depends(get_current_user)):
        return current_user

    @router.post("/login")
    def userLogin(user: UserLogin):
        logged_user = UserController.authenticate_user(
            user.email, user.password)
        if logged_user:
            return signJWT(logged_user["USERID"], logged_user["USERNAME"], logged_user["EMAIL"], logged_user["FIRSTNAME"], logged_user["LASTNAME"])
        raise HTTPException(status_code=403, detail="Wrong login details!")
