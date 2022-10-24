from http.client import OK
import sys
sys.path.append('../event-buds-api/')
from Connection import connection 
class DemoRepository:
    def __init__(self):
        self.connection = connection()

    def insertClick(self, pageName, number):
        try:
            query = """ INSERT INTO click
                            (click, TotalClick) VALUES (%s,%s)"""
            data = (pageName, number)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e
    
    def deleteClick(self, pageName):
        try:
            query = """ DELETE FROM click
                            WHERE click = %s """
            data = (pageName,)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e


    def getClick(self, pageName):
        try:
            query = """ SELECT * FROM click WHERE click = %s """
            cursor = self.connection.cursor()
            result = cursor.execute(query,(pageName,))
            # self.connection.commit()
            return cursor.fetchall()
        except NameError as e:
            return e

