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

    def getUser(self, userId):
        return self.repository.getUser(userId)

    def getAllUsers(self):
        return self.repository.getAllUsers()

    def editUser(self, userId, user):
        self.repository.editUser(userId, user)

    def getLoggedInUser(self, email):
        return self.repository.getLoggedInUser(email)

    def getFriends(self, token: str):
        payload = decodeJWT(token)
        user_id = payload.get("user_id")
        friends = self.repository.getFriends(user_id)
        return ast.literal_eval(str(friends))

    def add_friend(self, friend: Friend, token: str):
        payload = decodeJWT(token)
        user = Friend.convert_payload_friend(payload=payload)
        return self.repository.add_friend(friend=friend, user=user)

    def remove_friend(self, friend: Friend, token: str):
        payload = decodeJWT(token)
        user = Friend.convert_payload_friend(payload=payload)
        return self.repository.remove_friend(friend_id=friend.USERID, user_id=user.USERID)

    def accept_friend_request(self, friend: Friend, token: str):
        payload = decodeJWT(token)
        user = Friend.convert_payload_friend(payload=payload)
        return self.repository.accept_friend_request(friend_id=friend.USERID, user_id=user.USERID)

    def createUser(self, user):
        try:
            accountExists = self.verifyExistAccount(
                user.userName, user.email)
            if accountExists == False:
                user_login_id = self.repository.register_user(user=user)
                user_id = self.repository.add_user(
                    user=user, user_id=int(user_login_id))
                return signJWT(user_id, user.userName, user.email)
            else:
                raise HTTPException(status_code=403, detail=accountExists)
        except NameError as e:
            return e

    def verifyExistAccount(self, user_name, email):
        return self.repository.verifyExistAccount(user_name=user_name, email=email)
