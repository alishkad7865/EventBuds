from Auth.AuthBearer import JWTBearer
from fastapi import APIRouter, Depends
from Service.TaskService import TaskService
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

    @router.get("/getTasks", dependencies=[Depends(JWTBearer())])
    def getTasks(event_id):
        return taskService.getTasks(event_id)

    @router.patch("/updateTask", dependencies=[Depends(JWTBearer())])
    def updateTask(task_id, task):
        return taskService.updateTask(task_id, task)

    @router.delete("/deleteTask", dependencies=[Depends(JWTBearer())])
    def deleteTask(task_id):
        return taskService.deleteTask(task_id)

    @router.post("/createTask", dependencies=[Depends(JWTBearer())])
    def createTask(task):
        return taskService.createTask(task)
