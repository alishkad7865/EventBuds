from Model.EventModel import User
from Repository.UserRepository import UserRepository
import sys
import json
sys.path.append('')


class UserService:
    def __init__(self):
        self.repository = UserRepository()

    def getUser(self, userId):
        return self.repository.getUser(userId)[0]

    def getAllUsers(self, userId):
        return self.repository.getAllUsers(userId)

    def editUser(self, userId, user):
        self.repository.editUser(userId, user)

    def getLoggedInUser(self, email):
        return self.repository.getLoggedInUser(email)

    def createUser(self, user):
        try:
            accountExists = self.verifyExistAccount(
                user.userName, user.email)
            if accountExists == False:
                user_id = self.repository.register_user(user=user)
                self.repository.add_user(user=user, user_id=int(user_id))
                return "Account Created"
            else:
                return accountExists
        except NameError as e:
            return e

    def verifyExistAccount(self, user_name, email):
        return self.repository.verifyExistAccount(user_name=user_name, email=email)
