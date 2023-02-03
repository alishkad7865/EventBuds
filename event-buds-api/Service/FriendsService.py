import sys
sys.path.append('')
from Repository.FriendsRepository import FriendsRepository
class FriendsService:

    def __init__(self, repository):
        self.repository = repository

    def getFriends(self, FriendsId):
        friend = self.repository.getFriends(friendsId)[0]
        return {"USERID":friend[0],"FIRSTNAME":friend[1],"LASTNAME":friend[2], "EMAIL": friend[3], "ADDRESS":friend[4],"SEX":friend[5],"BIODATA":friend[6],"FRIENDS":friend[8]}
   
   