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
  const {
    user,
    setUser,
    initialUser,
    userLoggedIn,
    setUserLoggedIn,
    setToken,
  } = useContext(UserContext);
  let history = useHistory();
  function handleLogout() {
    setUserLoggedIn(false);
    setUser(initialUser);
    setToken(null);
    history.push("/");
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
            <IonItem
              button={true}
              detail={false}
              onClick={() => history.push("/Download")}
            >
              Download
            </IonItem>
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
