
import uvicorn
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from fastapi import FastAPI
from Controller.EventController import EventController
from Controller.UserController import UserController
from Controller.TaskController import TaskController
from fastapi.middleware.cors import CORSMiddleware
import sys
sys.path.append("")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# app = FastAPI()
app = FastAPI(ssl_keyfile="E:\Ense 400 Capstone\Cloud\cert files\privkey.pem",
              ssl_certfile="E:\Ense 400 Capstone\Cloud\cert files\fullchain.pem")

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

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="info")
