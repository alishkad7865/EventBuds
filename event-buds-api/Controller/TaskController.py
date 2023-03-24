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
    async def getTasks(event_id):
        return await taskService.getTasks(event_id)

    @router.patch("/updateTask", dependencies=[Depends(JWTBearer())])
    async def updateTask(task_id, task):
        return await taskService.updateTask(task_id, task)

    @router.delete("/deleteTask", dependencies=[Depends(JWTBearer())])
    async def deleteTask(task_id):
        return await taskService.deleteTask(task_id)

    @router.post("/createTask", dependencies=[Depends(JWTBearer())])
    async def createTask(task):
        return await taskService.createTask(task)
