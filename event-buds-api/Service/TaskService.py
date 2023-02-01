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
        parsedEvent = json.loads(rawTask)
        eventId = int(round(time.time() * 1000))
        event: Event = Event(eventId=eventId, eventTitle=parsedEvent["eventTitle"], eventStartDateTime=parsedEvent["eventStartTime"], eventEndDateTime=parsedEvent["eventEndTime"], location=parsedEvent["location"],  isPublic=parsedEvent["eventType"],
                             description=parsedEvent["description"],
                             capacity=parsedEvent["capacity"],
                             price=parsedEvent["price"],
                             helpers=parsedEvent["helpers"],
                             createdBy=parsedEvent["createdBy"],
                             ownerId=parsedEvent["ownerId"],
                             status="Ongoing",
                             eventRegEndDateTime=parsedEvent["eventStartTime"])

        try:
            self.repository.createTask(event)
            return "Success"
        except NameError as e:
            return e

    def UpdateTask(self, task_id, task):
        self.repository.UpdateTask(task_id, task)

    def deleteTask(self, task_id):
        self.repository.deleteTask(task_id)
