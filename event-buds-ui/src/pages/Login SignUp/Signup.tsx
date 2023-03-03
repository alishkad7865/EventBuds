import {
  IonPage,
  IonToast,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { arrowForwardCircle } from "ionicons/icons";
import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { userSignUp } from "../../api/userApi";
import Menu from "../../components/Menu";
import { UserContext } from "../../context/UserContext";
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from "../../Utils/Validation";
import "./Login.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [bio, setBio] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { setToken } = useContext(UserContext);
  const [isTouched, setIsTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>();
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>();
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
    useState<boolean>();
  const [isUserNameValid, setIsUserNameValid] = useState<boolean>(false);
  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(false);
  const [isLastNameValid, setIsLastNameValid] = useState<boolean>(false);
  let history = useHistory();

  useEffect(() => {
    if (toastMessage) {
      setShowToast(true);
    }
  }, [toastMessage]);

  function ValidateAllFields() {
    return (
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isUserNameValid &&
      isFirstNameValid &&
      isLastNameValid
    );
  }
  const validate = (ev: Event) => {
    const { name, value } = ev.target as HTMLInputElement;
    if (name === "email") {
      setIsEmailValid(undefined);

      if (value === "") return;
      validateEmail(value) !== null
        ? setIsEmailValid(true)
        : setIsEmailValid(false);
    }
    if (name === "password") {
      setIsPasswordValid(undefined);

      validatePassword(value) !== false
        ? setIsPasswordValid(true)
        : setIsPasswordValid(false);
    }
    if (name === "confirmPassword") {
      setIsConfirmPasswordValid(undefined);
      value === password
        ? setIsConfirmPasswordValid(true)
        : setIsConfirmPasswordValid(false);
    }
    if (name === "userName") {
      validateUserName(value) !== false
        ? setIsUserNameValid(true)
        : setIsUserNameValid(false);
    }
    if (name === "firstName") {
      value !== "" ? setIsFirstNameValid(true) : setIsFirstNameValid(false);
    }
    if (name === "lastName") {
      value !== "" ? setIsLastNameValid(true) : setIsLastNameValid(false);
    }
  };
  const markTouched = () => {
    setIsTouched(true);
  };

  async function SignUpRequest() {
    let newUser = JSON.stringify({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      address: address,
      sex: sex,
      bio: bio,
    });

    if (ValidateAllFields() === true) {
      await userSignUp(newUser).then((response: any) => {
        if (response.status >= 200 && response.status < 300) {
          setToken(response.data.access_token);
          history.push("/Home");
        } else if (response.status >= 500) {
          setShowToast(true);
          setToastMessage(
            "Internal Server Issue. Please contact admin or developers!"
          );
        } else {
          setShowToast(true);
          setToastMessage(response.detail);
        }
      });
    } else {
      setShowToast(true);
      setToastMessage("One or more validation failed. Check your fields!");
    }
  }
  return (
    <IonPage>
      <IonToast
        isOpen={showToast}
        position="top"
        onDidDismiss={() => {
          setShowToast(false);
          setToastMessage("");
        }}
        cssClass="error"
        message={toastMessage}
        duration={3000}
      />

      <Menu page={"signup"} />
      <IonContent className="signupContainer">
        <h3 className="ion-text-center">Create Account</h3>
        <IonItem
          fill="solid"
          className={`addSpaceAbove ${isEmailValid && "ion-valid"} ${
            isEmailValid === false && "ion-invalid"
          } ${isTouched && "ion-touched"}`}
        >
          <IonLabel position="stacked" className="ionLabel">
            Email
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="johndoe@gmail.com"
            name="email"
            onIonChange={(e: any) => setEmail(e.target.value)}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            value={email}
          ></IonInput>
          <IonNote slot="helper">Enter a valid Email</IonNote>
          <IonNote slot="error">Invalid Email</IonNote>
        </IonItem>
        <IonItem
          fill="solid"
          className={`addSpaceAbove ${isPasswordValid && "ion-valid"} ${
            isPasswordValid === false && "ion-invalid"
          } ${isTouched && "ion-touched"}`}
        >
          <IonLabel position="stacked" className="ionLabel">
            Password
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="******"
            type="password"
            name="password"
            onIonChange={(e: any) => setPassword(e.target.value)}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            value={password}
          ></IonInput>
          <IonNote slot="helper">Enter password</IonNote>
          <IonNote slot="error">
            Password length should be greater than 5
          </IonNote>
        </IonItem>
        <IonItem
          fill="solid"
          className={`addSpaceAbove ${isConfirmPasswordValid && "ion-valid"} ${
            isConfirmPasswordValid === false && "ion-invalid"
          } ${isTouched && "ion-touched"}`}
        >
          <IonLabel position="stacked" className="ionLabel">
            Confirm Password
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="******"
            type="password"
            name="confirmPassword"
            onIonChange={(e: any) => setConfirmPassword(e.target.value)}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            value={confirmPassword}
          ></IonInput>
          <IonNote slot="helper">Enter password</IonNote>
          <IonNote slot="error">
            Confirm Password doesn't match with Password
          </IonNote>
        </IonItem>
        <IonItem
          fill="solid"
          className={`addSpaceAbove ${isUserNameValid && "ion-valid"} ${
            isUserNameValid === false && "ion-invalid"
          } ${isTouched && "ion-touched"}`}
        >
          <IonLabel position="stacked" className="ionLabel">
            User Name
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="username786!"
            name="userName"
            onIonChange={(e: any) => setUserName(e.target.value)}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            value={userName}
          ></IonInput>
          <IonNote slot="helper">Enter apha numeric User name</IonNote>
          <IonNote slot="error">
            Username must be alpha numeric 4 characters long
          </IonNote>
        </IonItem>
        <IonItem
          fill="solid"
          className={`addSpaceAbove ${isFirstNameValid && "ion-valid"} ${
            isFirstNameValid === false && "ion-invalid"
          } ${isTouched && "ion-touched"}`}
        >
          <IonLabel position="stacked" className="ionLabel">
            First Name
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="John"
            name="firstName"
            onIonChange={(e: any) => setFirstName(e.target.value)}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            value={firstName}
          ></IonInput>
          <IonNote slot="helper">Enter First Name</IonNote>
          <IonNote slot="error">Enter First Name</IonNote>
        </IonItem>
        <IonItem
          fill="solid"
          className={`addSpaceAbove ${isLastNameValid && "ion-valid"} ${
            isLastNameValid === false && "ion-invalid"
          } ${isTouched && "ion-touched"}`}
        >
          <IonLabel position="stacked" className="ionLabel">
            Last Name
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="Doe"
            name="lastName"
            onIonChange={(e: any) => setLastName(e.target.value)}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            value={lastName}
          ></IonInput>
          <IonNote slot="helper">Enter Last Name</IonNote>
          <IonNote slot="error">Enter Last Name</IonNote>
        </IonItem>
        <IonItem fill="solid" className="addSpaceAbove">
          <IonLabel position="stacked" className="ionLabel">
            Address (optional)
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="Enter full address"
            name="address"
            onIonChange={(e: any) => setAddress(e.target.value)}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            value={address}
          ></IonInput>
        </IonItem>
        <IonItem className="addSpaceAbove">
          <IonLabel position="stacked" className="ionLabel">
            Sex (optional)
          </IonLabel>
          <IonSelect
            interface="popover"
            placeholder="Event Type"
            name="sex"
            mode="ios"
            onIonChange={(e: any) => setSex(e.target.value)}
            onIonBlur={() => markTouched()}
            value={sex}
          >
            <IonSelectOption value="Male">Male</IonSelectOption>
            <IonSelectOption value="Female">Female</IonSelectOption>
            <IonSelectOption value="Others">Others</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem counter={true} fill="solid" className="addSpaceAbove">
          <IonLabel position="stacked" className="ionLabel">
            Bio data (optional)
          </IonLabel>
          <IonTextarea
            placeholder="Type something here"
            autoGrow={true}
            maxlength={200}
            name="bio"
            onIonChange={(e: any) => setBio(e.target.value)}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            value={bio}
          ></IonTextarea>
        </IonItem>
        <IonButton
          expand="full"
          onClick={SignUpRequest}
          className="addSpaceAbove"
        >
          Signup
          <IonIcon slot="start" icon={arrowForwardCircle}></IonIcon>
        </IonButton>
        <br />
        <IonLabel className="labelColour">
          Already have an account? <Link to="/Login">Login</Link>
        </IonLabel>
        <br />
        <br />
        <br />
      </IonContent>
    </IonPage>
  );
}
