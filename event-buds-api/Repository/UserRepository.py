from Connection import connection
from http.client import OK
from Model.EventModel import UserLogin, User, UserSignUp
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
            user: User = {}
            for row in rows:
                for index, column in enumerate(cursor.description, start=0):
                    user[str(column[0])] = row[index]
            return user
        except NameError as e:
            return e

    def getAllUsers(self, userId=0):
        try:
            cursor = self.connection.cursor()
            query = """ SELECT * FROM "ADMIN"."USER" """
            cursor.execute(query)
            rows = cursor.fetchall()
            user: User = {}
            for row in rows:
                for index, column in enumerate(cursor.description, start=0):
                    user[str(column[0])] = row[index]
            return user
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

    def getLoggedInUser(self, email):
        try:
            query = """ SELECT * FROM "ADMIN"."USERLOGIN" WHERE EMAIL = :email """
            with self.connection.cursor() as cursor:
                data = dict(email=str(email),)
                cursor.execute(query, data)
                rows = cursor.fetchall()
                user: UserLogin = {}
                for row in rows:
                    for index, column in enumerate(cursor.description, start=0):
                        user[str(column[0])] = row[index]
                return user
        except NameError as e:
            return e

    def register_user(self, user: UserSignUp):
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

    def add_user(self, user: User, user_id):
        print(str(user.userName), str(user.email), str(user.firstName), str(user.lastName),
              str(user.address), str(user.sex), str(user.bio), user.isActive, user.friends, user_id)
        try:
            query = 'INSERT INTO "ADMIN"."USER" (USERNAME, EMAIL, FIRSTNAME, LASTNAME, ADDRESS, SEX, BIO, ISACTIVE, FRIENDS, USER_ROWID) VALUES(:userName, :email, :firstName, :lastName, :address, :sex, :bio, :isActive, :friends, :userRowId)'
            with self.connection.cursor() as cursor:
                cursor.execute(query, [str(user.userName), str(user.email), str(user.firstName), str(user.lastName),
                                       str(user.address), str(user.sex), str(user.bio), user.isActive, str(user.friends), user_id])
                self.connection.commit()
                return OK
        except NameError as e:
            return e

    def verifyExistAccount(self, user_name, email):
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
