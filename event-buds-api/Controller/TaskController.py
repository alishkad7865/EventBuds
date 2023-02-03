from fastapi import APIRouter, Depends, HTTPException
from Service.TaskService import TaskService
from Repository.EventRepository import EventRepository
from Repository.EventRepository import EventRepository
import sys
sys.path.append('')

taskService = TaskService()


class TaskController:
    router = APIRouter(
        prefix="/Task",
        tags=["Task"],
        responses={404: {"description": "Not found"}},
    )

    def __init__(self):
        self.service = taskService

    @router.get("/getTasks")
    def getTasks(event_id):
        return taskService.getTasks(event_id)

    @router.get("/updateTask")
    def updateTask(task_id, task):
        return taskService.updateTask(task_id, task)

    @router.get("/deleteTask")
    def deleteTask(task_id):
        return taskService.deleteTask(task_id)

    @router.post("/createTask")
    def createTask(task):
        return taskService.createTask(task)
