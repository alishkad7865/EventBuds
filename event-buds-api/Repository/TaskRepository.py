from Model.EventModel import Task
from Connection import connection
import datetime
from http.client import OK
import sys
sys.path.append('../event-buds-api/')


class TaskRepository:
    def __init__(self):
        self.connection = connection()

    def UpdateTask(self, task_id, task):
        try:
            query = """ INSERT INTO "ADMIN"."EVENT"
                            (click, TotalClick) VALUES (%s,%s)"""
            data = (pageName, number)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e

    def createTask(self, task: Task):
        try:
            query = 'INSERT INTO "ADMIN"."TASK" (EVENTID, TASKNAME, DESCRIPTION, ASSIGNEDTO, STARTTIME ,ENDTIME, NOTES, TASKSTATUS) VALUES(:eventId, :taskName, :description, :assignedTo, :startTime , :endTime, :notes, :taskStatus)'

            with self.connection.cursor() as cursor:
                cursor.execute(query, [task.eventId, task.taskName, task.description,
                               task.assignedTo, task.startTime, task.endTime, str(task.notes), task.taskStatus])
                self.connection.commit()
            return OK
        except NameError as e:
            return e

    def deleteTask(self, task_id):
        try:
            query = """ DELETE FROM "ADMIN"."TASK"
                            WHERE "ADMIN"."TASK"."TASKID" = :task_id """
            data = dict(task_id=int(task_id),)
            self.connection.cursor().execute(query, data)
            self.connection.commit()
            return OK
        except NameError as e:
            return e

    def getTasks(self, event_id):
        try:
            query = """ SELECT * FROM "ADMIN"."TASK" WHERE EVENTID= :event_id """
            with self.connection.cursor() as cursor:
                data = dict(event_id=int(event_id),)
                cursor.execute(query, data)
                rows = cursor.fetchall()
                taskList = []
                for row in rows:
                    tempObj = {}
                    for index, column in enumerate(cursor.description, start=0):
                        tempObj[str(column[0])] = row[index]
                    taskList.append(tempObj)
                    tempObj = {}
                return taskList
        except NameError as e:
            return e
