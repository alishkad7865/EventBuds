## Steps for running UI project locally

##### _1. Run the project on local machine run the command mentioned below_

```
ionic serve
ionic serve -host 0.0.0.0 -l --external
```

###### _Note: In case of runtime error after pulling files from git-hub, delete node-modulus from UI folder and reinstall using:_ `npm install`

---

##### _2. The project is running on port 8100 which is default and no changes were made at the moment_

---

##### _3. Download android studio in order to run the project on emulator_

- Need more information about installation refer to https://ionicframework.com/docs/developing/android

---

##### _4. To run project on emulator enter following commands_

```
ionic capacitor add android

# We need to add above command once to add andriod tool into capacitor and it might needed
```

```
# This will build the changes

ionic build

```

```
# This will copy the changes made on UI and pass it on Andriod application

ionic capacitor copy android

```

```
# This command will run live update on emulator directly instead of loading and running project on andriod studio IDE

ionic capacitor run android -l --external

```
