
from fastapi import FastAPI
import sys
sys.path.append("")
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from Controller.DemoController import DemoController

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

app.include_router(DemoController.router)
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


