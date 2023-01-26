from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    userId: int
    firstName: str
    lastName: str
    email: str
    address: Optional[str] = ""
    sex: Optional[str] = ""
    bio: Optional[str] = ""
    isActive: Optional[int] = 1
    friends: Optional[list] = []
    userRowId: Optional[int] = None


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
    inviteId: int
    ownerId: int
    sentDate: datetime
    invitationResponse: Optional[str] = ""
    textResponse: Optional[str] = ""
    RespondDate: Optional[datetime] = None
    Notified:  Optional[int] = 0


class Task(BaseModel):
    eventId: int
    taskId: int
    taskName: Optional[str] = ""
    assignedTo: Optional[User] = None
    startTime: Optional[datetime] = None
    endTime: Optional[datetime] = None
    notes: Optional[str] = ""
    taskStatus: Optional[str] = ""
    description: Optional[str] = ""
    creationDate: datetime
