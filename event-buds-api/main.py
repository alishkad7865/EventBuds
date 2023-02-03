
from Controller.EventController import EventController
from Controller.UserController import UserController
from Controller.TaskController import TaskController
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI
from fastapi import FastAPI
import sys
import uvicorn
sys.path.append("")


app = FastAPI()
# app = FastAPI(dependencies=[Depends(get_query_token)])


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(UserController.router)
app.include_router(EventController.router)
app.include_router(TaskController.router)
# app.include_router(items.router)
# app.include_router(
#     admin.router,
#     prefix="/admin",
#     tags=["admin"],
#     dependencies=[Depends(get_token_header)],
#     responses={418: {"description": "I'm a teapot"}},
# )


@app.get("/")
async def root():
    return {"message": "Hello Event App Applications!"}


# from Repository.DemoRepository import DemoRepository
# from Service.DemoService import DemoService
# from Controller.DemoController import DemoController

# @app.get("/my-first-api")
# def hello(name = None):

#     if name is None:
#         text = 'Hello!'

#     else:
#         text = 'Hello ' + name + '!'

#     return text

# repository = DemoRepository()
# service = DemoService(repository)
# controller = DemoController(service)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="info")
