from Repository.UserRepository import UserRepository
import sys
sys.path.append('')


class UserService:
    def __init__(self):
        self.repository = UserRepository()

    def getUser(self, userId):
        user = self.repository.getUser(userId)[0]
        return {"USERID": user[0], "FIRSTNAME": user[1], "LASTNAME": user[2], "EMAIL": user[3], "ADDRESS": user[4], "SEX": user[5], "BIODATA": user[6], "FRIENDS": user[8]}

    def getAllUsers(self, userId):
        users = self.repository.getAllUsers(userId)
        return [{"USERID": user[0], "FIRSTNAME":user[1], "LASTNAME":user[2], "EMAIL": user[3], "ADDRESS":user[4], "SEX":user[5], "BIODATA":user[6], "FRIENDS":user[8]} for user in users]

    def editUser(self, userId, user):
        self.repository.editUser(userId, user)
