from Connection import connection
from http.client import OK
import sys
sys.path.append('../event-buds-api/')


class UserRepository:
    def __init__(self):
        self.connection = connection()

    def getUser(self, userId=0):
        try:
            cursor = self.connection.cursor()
            query = """ SELECT * FROM "ADMIN"."USER" WHERE USERID = :userId """
            data = dict(userId=int(userId),)
            cursor.execute(query, data)
            rows = cursor.fetchall()
            return rows
        except NameError as e:
            return e

    def getAllUsers(self, userId=0):
        try:
            cursor = self.connection.cursor()
            query = """ SELECT * FROM "ADMIN"."USER" WHERE :userId NOT IN USERID """
            data = dict(userId=int(userId))
            cursor.execute(query, data)
            rows = cursor.fetchall()
            return rows
        except NameError as e:
            return e

    def editUser(self, userId, user):
        try:
            query = """ SELECT FROM "ADMIN"."USER" WHERE USERID = :userId """
            data = (user,)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e
