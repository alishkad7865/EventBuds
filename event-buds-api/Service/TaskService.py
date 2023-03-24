from Model.EventModel import Event, Task
from Repository import TaskRepository
import json
import sys
import time
sys.path.append('')


class TaskService:
    def __init__(self):
        self.repository = TaskRepository.TaskRepository()

    async def getTasks(self, event_id):
        tasks = await self.repository.getTasks(event_id)
        return tasks

    async def createTask(self, rawTask):
        parsedTask = json.loads(rawTask)
        task: Task = Task(eventId=parsedTask["eventId"], taskName=parsedTask["taskName"], description=parsedTask["description"], assignedTo=parsedTask["assignedTo"],
                          notes=parsedTask["notes"],
                          endTime=parsedTask["endTime"],
                          startTime=parsedTask["startTime"],
                          taskStatus=parsedTask["taskStatus"])

        try:
            await self.repository.createTask(task)
            return {"message": "Success"}
        except NameError as e:
            return e

    async def updateTask(self, task_id, rawTask):
        parsedTask = json.loads(rawTask)
        task: Task = Task(eventId=parsedTask["eventId"], taskName=parsedTask["taskName"], description=parsedTask["description"], assignedTo=parsedTask["assignedTo"],
                          notes=parsedTask["notes"],
                          endTime=parsedTask["endTime"],
                          startTime=parsedTask["startTime"],
                          taskStatus=parsedTask["taskStatus"])
        try:
            await self.repository.UpdateTask(task_id, task)
            return {"message": "Success"}
        except NameError as e:
            return e

    async def deleteTask(self, task_id):
        try:
            await self.repository.deleteTask(task_id)
            return {"message": "Success"}
        except NameError as e:
            return e
