import sys
sys.path.append('')
from Repository import DemoRepository
class DemoService:
    def __init__(self, repository):
        self.repository = repository

    def get(self, name):
        return self.repository.getClick(name)

    def add(self, person, number):
        self.repository.insertClick(person,number)

    def delete(self, name):
        self.repository.deleteClick(name)

   
# r = DemoRepository.DemoRepository()
# d = DemoService(r)
# res = d.get("Tab 1")
# # res1 = d.add("Tab 1", 2)
# print(res)
