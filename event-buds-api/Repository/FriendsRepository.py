from Connection import connection
from http.client import OK
import sys
sys.path.append('../event-buds-api/')


class FriendsRepository:
    def __init__(self):
        self.connection = connection()

    def getFriends(self, friendsId=0):
        try:
            cursor = self.connection.cursor()
            query = """ SELECT * FROM "ADMIN"."FRIENDS" WHERE FRIENDSID = :friendsId """
            data = dict(userId=int(friendsId),)
            cursor.execute(query, data)
            rows = cursor.fetchall()
            return rows
        except NameError as e:
            return e