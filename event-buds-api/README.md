## Steps for running API project locally

##### _1. Install python 3.10 and latest pip version if not downloaded_

- Need more information about installation refer to [official pip docs](https://pip.pypa.io/en/stable/installation/) or refer to https://youtu.be/c_qNC1lL4qA

##### _2. Download few pip files for the project into your local machine_

```
pip install fastapi
pip install uvicorn
pip install cx_Oracle
pip install mysql-connector-python
```

---

##### _3. The project is running on port 8000 which is default and no changes were made at the moment_

---

##### _4. To run API project_

```
uvicorn main:app --reload
```

---

##### _5. View API document page go to http://localhost:8000/docs_

---

##### _6. To run the app on emulator go to http://10.0.2.2:8000/docs or to use your device, use your machine IP for routing to the API http://[your_Machine_IP]:8000/docs._
