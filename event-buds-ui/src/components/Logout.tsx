import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonPopover,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/UserContext";

export default function Logout(props: any) {
  const { user, userLoggedIn, setUserLoggedIn, setToken } =
    useContext(UserContext);
  let history = useHistory();
  function handleLogout() {
    setUserLoggedIn(false);
    setToken(null);
    history.push("/Login");
  }
  return userLoggedIn ? (
    <>
      <IonButton id={"Logout-button" + props.pageName} shape="round" slot="end">
        <IonIcon slot="icon-only" icon={personCircleOutline}></IonIcon>
      </IonButton>
      <IonPopover
        trigger={"Logout-button" + props.pageName}
        dismissOnSelect={true}
      >
        <IonContent>
          <IonList>
            <IonItem detail={false}>
              {`${user.FIRSTNAME} ${user.LASTNAME}`}
            </IonItem>
            <IonItem button={true} detail={false} onClick={handleLogout}>
              Logout
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  ) : (
    <></>
  );
}
