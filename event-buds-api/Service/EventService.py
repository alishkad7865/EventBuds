import sys
sys.path.append('')
from Repository import DemoRepository
class DemoService:
    def __init__(self, repository):
        self.repository = repository

    def getEvent(self, name):
        return self.repository.getClick(name)

    def addEvent(self, Event):
        self.repository.addEvent(Event)
    
    def insertOrUpdateEvent(self, Event):
        self.repository.insertOrUpdateEvent(Event)

    def deleteEvent(self, eventId):
        self.repository.deleteEvent(eventId)