## Steps for running UI project locally

##### *1. Run the project on local machine run the command mentioned below*
```
ionic serve
```
###### *Note: In case of runtime error after pulling files from git-hub, delete node-modulus from UI folder and reinstall using:*  ```npm install```
---
##### *2. The project is running on port 8100 which is default and no changes were made at the moment*
---
##### *3. Download android studio in order to run the project on emulator*
    
- Need more information about installation refer to https://ionicframework.com/docs/developing/android

---
##### *4. To run project on emulator enter following commands*

 ```
 ionic capacitor add android
 
 # We need to add above command once to add andriod tool into capacitor and it might needed
 ```


 ```
 # This will copy the changes made on UI and pass it on Andriod application

 ionic capacitor copy android 
 
 ```


 ``` 
 # This command will run live update on emulator directly instead of loading and running project on andriod studio IDE

ionic capacitor run android -l --external 

 ```