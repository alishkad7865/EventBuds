import json
from Connection import connection
from http.client import OK
from Model.EventModel import UserLogin, User, UserSignUp, Friend
import sys
sys.path.append('../event-buds-api/')


class UserRepository:
    def __init__(self):
        self.connection = connection()

    async def getUser(self, userId=0):
        try:
            cursor = self.connection.cursor()
            query = """ SELECT * FROM "ADMIN"."USER" WHERE USERID = :userId """
            data = dict(userId=int(userId),)
            cursor.execute(query, data)
            rows = cursor.fetchall()
            user: User = {}
            for row in rows:
                for index, column in enumerate(cursor.description, start=0):
                    if str(column[0]) == "FRIENDS":
                        user[str(column[0])] = json.loads(row[index])
                    else:
                        user[str(column[0])] = row[index]
            return user
        except NameError as e:
            return e

    async def getAllUsers(self):
        try:
            cursor = self.connection.cursor()
            query = """ SELECT * FROM "ADMIN"."USER" """
            cursor.execute(query)
            rows = cursor.fetchall()
            userList = []
            for row in rows:
                user = {}
                for index, column in enumerate(cursor.description, start=0):
                    if str(column[0]) == "FRIENDS":
                        user[str(column[0])] = json.loads(row[index])
                    else:
                        user[str(column[0])] = row[index]
                userList.append(user)
                user = {}
            return userList
        except NameError as e:
            return e

    async def editUser(self, userId, user):
        try:
            query = """ SELECT FROM "ADMIN"."USER" WHERE USERID = :userId """
            data = (user,)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e

    async def getFriends(self, userId) -> list:
        try:
            query = """ SELECT FRIENDS FROM "ADMIN"."USER" WHERE USERID = :userId """
            with self.connection.cursor() as cursor:
                data = dict(userId=int(userId),)
                cursor.execute(query, data)
                friend_row = cursor.fetchone()[0]
                return json.loads(friend_row)
        except NameError as e:
            return e

    async def add_friend(self, user: Friend, friend: Friend):
        try:
            update_friend_query = 'UPDATE "ADMIN"."USER" SET "ADMIN"."USER"."FRIENDS" =:friend_friends WHERE "ADMIN"."USER"."USERID" = :friendId '
            update_user_query = 'UPDATE "ADMIN"."USER" SET "ADMIN"."USER"."FRIENDS" =:user_friends WHERE "ADMIN"."USER"."USERID" = :userId'

            user_friends: list = await self.getFriends(user.USERID)
            friend_request_exists = any(
                item in user_friends for item in user_friends if item["USERID"] == friend.USERID)
            if friend_request_exists == True:
                return "Request Already Exists!"

            user_friends.append(friend.dict())

            friend_friends: list = await self.getFriends(friend.USERID)
            request_object = Friend.add_status_friend(
                friend=user.dict(), message="requested")
            friend_friends.append(
                request_object.dict())

            with self.connection.cursor() as cursor:
                friends_data = [str(json.dumps(friend_friends)), friend.USERID]
                cursor.execute(update_friend_query, friends_data)
                user_data = [str(json.dumps(user_friends)), user.USERID]
                cursor.execute(update_user_query, user_data)
                self.connection.commit()
                return {"message": "Friend Request Sent!"}
        except NameError as e:
            return e

    async def accept_friend_request(self, user_id: int, friend_id: int):
        try:
            update_friend_query = 'UPDATE "ADMIN"."USER" SET "ADMIN"."USER"."FRIENDS" =:friend_friends WHERE "ADMIN"."USER"."USERID" = :friendId '
            update_user_query = 'UPDATE "ADMIN"."USER" SET "ADMIN"."USER"."FRIENDS" =:user_friends WHERE "ADMIN"."USER"."USERID" = :userId'

            user_friends: list = await self.getFriends(user_id)
            update_users_status = list(
                filter(lambda obj: obj['USERID'] == friend_id, user_friends))[0]

            update_users_status['STATUS'] = "accepted"

            friend_friends: list = await self.getFriends(friend_id)
            update_friends_status = list(
                filter(lambda obj: obj['USERID'] == user_id, friend_friends))[0]
            update_friends_status['STATUS'] = "accepted"
            with self.connection.cursor() as cursor:
                friends_data = [
                    str(json.dumps(friend_friends)), int(friend_id)]
                cursor.execute(update_friend_query, friends_data)
                user_data = [str(json.dumps(user_friends)), int(user_id)]
                cursor.execute(update_user_query, user_data)
                self.connection.commit()
                return {"message": "Friend Request Accepted!"}
        except NameError as e:
            return e

    async def remove_friend(self, user_id: int, friend_id: int):
        try:
            update_friend_query = 'UPDATE "ADMIN"."USER" SET "ADMIN"."USER"."FRIENDS" =:friend_friends WHERE "ADMIN"."USER"."USERID" = :friendId '
            update_user_query = 'UPDATE "ADMIN"."USER" SET "ADMIN"."USER"."FRIENDS" =:user_friends WHERE "ADMIN"."USER"."USERID" = :userId'

            user_friends: list = await self.getFriends(user_id)
            remove_friend = list(
                filter(lambda obj: obj['USERID'] == friend_id, user_friends))[0]
            user_friends.remove(remove_friend)

            friend_friends: list = await self.getFriends(friend_id)
            remove_user = list(
                filter(lambda obj: obj['USERID'] == user_id, friend_friends))[0]
            friend_friends.remove(remove_user)

            with self.connection.cursor() as cursor:
                friends_data = [
                    str(json.dumps(friend_friends)), int(friend_id)]
                cursor.execute(update_friend_query, friends_data)
                user_data = [str(json.dumps(user_friends)), int(user_id)]
                cursor.execute(update_user_query, user_data)
                self.connection.commit()
                return {"message": "Friend Request Declined or Removed!"}
        except NameError as e:
            return e

    async def getLoggedInUser(self, email):
        try:
            query = """ SELECT * FROM "ADMIN"."USERLOGIN", "ADMIN"."USER"  WHERE "ADMIN"."USERLOGIN"."EMAIL" = "ADMIN"."USER"."EMAIL" AND "ADMIN"."USERLOGIN"."EMAIL"= :email """
            with self.connection.cursor() as cursor:
                data = dict(email=str(email),)
                cursor.execute(query, data)
                rows = cursor.fetchall()
                user: UserLogin = {}
                for row in rows:
                    for index, column in enumerate(cursor.description, start=0):
                        if str(column[0]) == "FRIENDS":
                            user[str(column[0])] = json.loads(row[index])
                        else:
                            user[str(column[0])] = row[index]
                return user
        except NameError as e:
            return e

    async def register_user(self, user: UserSignUp):
        try:
            registration_query = 'INSERT INTO "ADMIN"."USERLOGIN" (USERNAME, PASSWORD, EMAIL, AUTHENTICATED) VALUES(:userName, :passWord, :email, :authenticated)'
            get_userid_query = 'SELECT "ADMIN"."USERLOGIN"."ROW_ID" FROM "ADMIN"."USERLOGIN" WHERE "ADMIN"."USERLOGIN"."EMAIL" = :email AND "ADMIN"."USERLOGIN"."USERNAME" = :userName '
            with self.connection.cursor() as cursor:
                cursor.execute(
                    registration_query, [user.userName, user.password, user.email, user.authenticated])
                self.connection.commit()
                cursor.execute(get_userid_query, [user.email, user.userName])
                rows = cursor.fetchall()
                user: UserLogin = {}
                for row in rows:
                    for index, column in enumerate(cursor.description, start=0):
                        user[str(column[0])] = row[index]
                return user["ROW_ID"]
        except NameError as e:
            return e

    async def add_user(self, user: User, user_id):
        try:
            query = 'INSERT INTO "ADMIN"."USER" (USERNAME, EMAIL, FIRSTNAME, LASTNAME, ADDRESS, SEX, BIO, ISACTIVE, FRIENDS, USER_ROWID) VALUES(:userName, :email, :firstName, :lastName, :address, :sex, :bio, :isActive, :friends, :userRowId)'
            get_userid_query = 'SELECT "ADMIN"."USER"."USERID" FROM "ADMIN"."USER" WHERE "ADMIN"."USER"."EMAIL" = :email AND "ADMIN"."USER"."USERNAME" = :userName '

            with self.connection.cursor() as cursor:
                cursor.execute(query, [str(user.userName), str(user.email), str(user.firstName), str(user.lastName),
                                       str(user.address), str(user.sex), str(user.bio), user.isActive, str(user.friends), user_id])
                self.connection.commit()
                cursor.execute(get_userid_query, [user.email, user.userName])
                rows = cursor.fetchall()
                user: User = {}
                for row in rows:
                    for index, column in enumerate(cursor.description, start=0):
                        user[str(column[0])] = row[index]
                return user["USERID"]
        except NameError as e:
            return e

    async def verifyExistAccount(self, user_name, email):
        try:
            query = """ SELECT * FROM "ADMIN"."USER" WHERE EMAIL = :email OR USERNAME = :user_name"""
            with self.connection.cursor() as cursor:
                data = dict(email=str(email), user_name=str(user_name))
                cursor.execute(query, data)
                rows = cursor.fetchall()
                user: User = {}
                for row in rows:
                    for index, column in enumerate(cursor.description, start=0):
                        user[str(column[0])] = row[index]
                if len(rows) > 0 and user["EMAIL"] == email and user["USERNAME"] == user_name:
                    return "Email and User Name Alredy Exists!"
                if len(rows) > 0 and user["EMAIL"] == email:
                    return "Email Alredy Exists!"
                if len(rows) > 0 and user["USERNAME"] == user_name:
                    return "User Name Alredy Exists!"
                return False
        except NameError as e:
            return e
