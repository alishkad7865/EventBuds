from datetime import datetime
import re
from fastapi import Query
from pydantic import BaseModel, Required, validator
from typing import Optional
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


class UserLogin(BaseModel):
    userId: Optional[int] = None
    userName:  Optional[str] = ""
    email: str
    password: str
    authenticated: Optional[int] = 1


class User(BaseModel):
    userId: int
    userName: str
    firstName: str
    lastName: str
    email: str
    address: Optional[str] = ""
    sex: Optional[str] = ""
    bio: Optional[str] = ""
    isActive: Optional[int] = 1
    friends: Optional[list] = []
    userRowId: Optional[int] = None


class UserSignUp(BaseModel):
    userId: Optional[int] = None
    userName: str = Query(default=Required)
    firstName: str = Query(default=Required, max_length=50)
    lastName: str = Query(default=Required, max_length=50)
    email: str = Query(default=Required, min_length=5,
                       max_length=50)
    password: str = Query(default=Required, min_length=5,
                          max_length=50)
    address: Optional[str] = ""
    sex: Optional[str] = ""
    bio: Optional[str] = ""
    isActive: Optional[int] = 1
    authenticated: Optional[int] = 1
    friends: Optional[list] = []
    userRowId: Optional[int] = None

    @validator("email")
    def email_regex_checker(cls, email):
        if re.match("^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{1,3}$", email):
            return email
        raise ValueError(f"Invalid email pattern")

    @validator("password")
    def password_checker(cls, password):
        if password == "" or len(password) < 5:
            raise ValueError(f"password should be atleast 5 character long")
        return get_password_hash(password)

    @validator("userName")
    def user_name_checker(cls, user_name):
        if user_name == "" or len(user_name) < 4:
            raise ValueError(f"Username should be be atleast 4 character long")
        return user_name


class UserObject(BaseModel):
    userId: int
    firstName: str
    lastName: str
    email: str


class Friend(BaseModel):
    USERID: int
    USERNAME: str
    EMAIL: str
    FIRSTNAME: str
    LASTNAME: str
    STATUS: Optional[str] = ""

    def convert_payload_friend(payload: dict):
        return Friend(USERID=payload.get("user_id"), EMAIL=payload.get("email"), FIRSTNAME=payload.get("first_name"), LASTNAME=payload.get("last_name"), USERNAME=payload.get("user_name"))

    def add_status_friend(friend: dict, message: str):
        return Friend(USERID=friend.get("USERID"), EMAIL=friend.get("EMAIL"), FIRSTNAME=friend.get("FIRSTNAME"), LASTNAME=friend.get("LASTNAME"), USERNAME=friend.get("USERNAME"), STATUS=message)


class Event(BaseModel):
    eventId: Optional[int] = None
    createdBy: str
    ownerId: int
    eventTitle: str
    eventRegEndDateTime: Optional[datetime] = None
    eventStartDateTime: datetime
    eventEndDateTime: datetime
    location: Optional[str] = ""
    isPublic: Optional[int] = 0
    description: Optional[str] = ""
    capacity: Optional[int] = 0
    price: Optional[float] = 0.00
    status: Optional[str] = ""
    helpers: Optional[list] = None


class EventInvitation(BaseModel):
    eventId: int
    inviteId: Optional[int] = None
    userId: int
    ownerId: int
    sentDate: Optional[datetime] = None
    invitationResponse: Optional[str] = ""
    isHelper: Optional[int] = 0
    RespondDate: Optional[datetime] = None
    Notified:  Optional[int] = 0


class Task(BaseModel):
    eventId: int
    taskId: Optional[int] = None
    taskName: Optional[str] = ""
    assignedTo: Optional[str] = ""
    startTime: Optional[datetime] = None
    endTime: Optional[datetime] = None
    notes: Optional[str] = ""
    taskStatus: Optional[str] = ""
    description: Optional[str] = ""
