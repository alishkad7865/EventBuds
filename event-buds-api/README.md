## Steps for running API project locally

##### *1. Install python 3.10 and latest pip version if not downloaded*
    
- Need more information about installation refer to [official pip docs](https://pip.pypa.io/en/stable/installation/) or refer to https://youtu.be/c_qNC1lL4qA

##### *2. Download few pip files for the project into your local machine*
```
pip install fastapi
pip install uvicorn
```
---
##### *3. The project is running on port 8000 which is default and no changes were made at the moment*
---
##### *4. To run API project*

 ```
 uvicorn main:app --reload
 ```
 ---
##### *5. View API document page go to http://localhost:8000/docs*
---

##### *6. To run the app on emulator go to http://10.0.2.2:8000/docs or to use your device, use your machine IP for routing to the API http://[your_Machine_IP]:8000/docs.*