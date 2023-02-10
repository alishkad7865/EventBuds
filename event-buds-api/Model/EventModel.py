from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class UserLogin(BaseModel):
    userId: int
    userName: str
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


class UserObject(BaseModel):
    userId: int
    firstName: str
    lastName: str
    email: str


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
