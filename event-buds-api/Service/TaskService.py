from Model.EventModel import Event, Task
from Repository import TaskRepository
import json
import sys
import time
sys.path.append('')


class TaskService:
    def __init__(self):
        self.repository = TaskRepository.TaskRepository()

    def getTasks(self, event_id):
        tasks = self.repository.getTasks(event_id)
        return tasks

    def createTask(self, rawTask):
        parsedTask = json.loads(rawTask)
        print(rawTask, parsedTask)
        task: Task = Task(eventId=parsedTask["eventId"], taskName=parsedTask["taskName"], description=parsedTask["description"], assignedTo=parsedTask["assignedTo"],
                          notes=parsedTask["notes"],
                          endTime=parsedTask["endTime"],
                          startTime=parsedTask["startTime"],
                          taskStatus=parsedTask["taskStatus"])

        try:
            self.repository.createTask(task)
            return "Success"
        except NameError as e:
            return e

    def UpdateTask(self, task_id, task):
        try:
            self.repository.UpdateTask(task_id, task)
            return "Success"
        except NameError as e:
            return e

    def deleteTask(self, task_id):
        try:
            self.repository.deleteTask(task_id)
            return "Success"
        except NameError as e:
            return e
