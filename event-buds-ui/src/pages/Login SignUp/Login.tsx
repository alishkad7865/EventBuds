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
import { eye, eyeOff, logInOutline } from "ionicons/icons";
import { useState, useContext, useEffect } from "react";
import Menu from "../../components/Menu";
import "./Login.css";
import { UserContext } from "../../context/UserContext";
import { userLogin } from "../../api/userApi";
import { validateEmail, validatePassword } from "../../Utils/Validation";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";

export default function Login() {
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const { setToken, userLoggedIn } = useContext(UserContext);
  const [isTouched, setIsTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>();
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>();
  const [passwordType, setPasswordType] = useState("");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  let history = createBrowserHistory({ forceRefresh: true });
  useEffect(() => {
    if (userLoggedIn) {
      history.push("/Home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoggedIn]);

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
      } else {
        setShowToast(true);
        setToastMessage(response.detail);
      }
    });
  }
  return !userLoggedIn ? (
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
            type={passwordType === "text" ? "text" : "password"}
            name="password"
            onIonChange={(e: any) => setPassword(e.target.value)}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            value={password}
          ></IonInput>
          <IonButton
            onClick={togglePassword}
            shape="round"
            slot="end"
            size="small"
          >
            <IonIcon icon={passwordType === "text" ? eye : eyeOff} />
          </IonButton>
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
          Don't have an account? <Link to="/Signup">Sign up</Link>
        </IonLabel>
      </IonContent>
    </IonPage>
  ) : (
    <></>
  );
}
