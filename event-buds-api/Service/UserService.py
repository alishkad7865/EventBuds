import ast
from Auth.AuthHandler import decodeJWT
from fastapi import HTTPException
from Auth.AuthHandler import signJWT
from Model.EventModel import User, Friend
from Repository.UserRepository import UserRepository
import sys
import json
sys.path.append('')


class UserService:
    def __init__(self):
        self.repository = UserRepository()

    async def getUser(self, userId):
        return await self.repository.getUser(userId)

    async def getAllUsers(self):
        return await self.repository.getAllUsers()

    async def editUser(self, userId, user):
        self.repository.editUser(userId, user)

    async def getLoggedInUser(self, email):
        return await self.repository.getLoggedInUser(email)

    async def getFriends(self, token: str):
        payload = decodeJWT(token)
        user_id = payload.get("user_id")
        friends = await self.repository.getFriends(user_id)
        return ast.literal_eval(str(friends))

    async def add_friend(self, friend: Friend, token: str):
        payload = decodeJWT(token)
        user = Friend.convert_payload_friend(payload=payload)
        return await self.repository.add_friend(friend=friend, user=user)

    async def remove_friend(self, friend: Friend, token: str):
        payload = decodeJWT(token)
        user = Friend.convert_payload_friend(payload=payload)
        return await self.repository.remove_friend(friend_id=friend.USERID, user_id=user.USERID)

    async def accept_friend_request(self, friend: Friend, token: str):
        payload = decodeJWT(token)
        user = Friend.convert_payload_friend(payload=payload)
        return await self.repository.accept_friend_request(friend_id=friend.USERID, user_id=user.USERID)

    async def createUser(self, user):
        try:
            accountExists = await self.verifyExistAccount(
                user.userName, user.email)
            if accountExists == False:
                user_login_id = await self.repository.register_user(user=user)
                user_id = await self.repository.add_user(
                    user=user, user_id=int(user_login_id))
                return signJWT(user_id, user.userName, user.email, first_name=user.firstName, last_name=user.lastName)
            else:
                raise HTTPException(status_code=403, detail=accountExists)
        except NameError as e:
            return e

    async def verifyExistAccount(self, user_name, email):
        return await self.repository.verifyExistAccount(user_name=user_name, email=email)
