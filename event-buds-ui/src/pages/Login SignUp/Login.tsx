import {
  IonPage,
  IonToast,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { logInOutline } from "ionicons/icons";
import { useState, useContext } from "react";
import Menu from "../../components/Menu";
import "./Login.css";
import { UserContext } from "../../context/UserContext";
import { userLogin } from "../../api/userApi";
import { validateEmail, validatePassword } from "../../Utils/Validation";
import { useHistory } from "react-router";

export default function Login() {
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const { setToken } = useContext(UserContext);
  const [isTouched, setIsTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>();
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>();
  let history = useHistory();
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
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  async function LoginRequest() {
    await userLogin(email, password).then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        setToken(response.data.access_token);
        history.push("/Home");
      } else {
        setShowToast(true);
        setToastMessage(response.detail);
      }
    });
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
        message={toastMessage}
        cssClass="error"
        duration={5000}
      />

      <Menu page={"login"} />
      <IonContent className="loginContainer">
        <h3 className="ion-text-center">Login to EventBuds</h3>
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
            name="email"
            placeholder="johndoe@gmail.com"
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
        <IonButton
          expand="full"
          onClick={LoginRequest}
          className="addSpaceAbove"
        >
          Login
          <IonIcon slot="start" icon={logInOutline}></IonIcon>
        </IonButton>
        <br />
        <IonLabel className="labelColour">
          Don't have an account? <a href="/Signup">Sign up</a>
        </IonLabel>
      </IonContent>
    </IonPage>
  );
}
