import sys
sys.path.append('')
from Repository import UserRepository
class UserService:
    def __init__(self, repository):
        self.repository = repository

    def getUser(self, userId):
        return self.repository.getUser(userId)

    def editUser(self, userId, user):
        self.repository.editUser(userId,user)