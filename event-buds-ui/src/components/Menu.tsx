import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  calendarOutline,
  checkboxOutline,
  createOutline,
  homeOutline,
  logInOutline,
  notifications,
  peopleOutline,
} from "ionicons/icons";
import { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import Logout from "./Logout";
import NotificationModal from "./NotificationModal";

function Menu(props: any) {
  const { userLoggedIn } = useContext(UserContext);
  const modal = useRef<HTMLIonModalElement>(null);
  function dismiss() {
    modal.current?.dismiss();
  }
  function getHeaderComponent() {
    if (props.page === "home") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={homeOutline} size="large" />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </>
      );
    } else if (props.page === "manage friends") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={peopleOutline} size="large" />
          </IonButtons>
          <IonTitle>Manage Friends</IonTitle>
        </>
      );
    } else if (props.page === "create event") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={createOutline} size="large" />
          </IonButtons>
          <IonTitle>Create Event</IonTitle>
        </>
      );
    } else if (props.page === "public events") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={calendarOutline} size="large" />
          </IonButtons>
          <IonTitle>Public Events</IonTitle>
        </>
      );
    } else if (props.page === "profile") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={peopleOutline} size="large" />
          </IonButtons>
          <IonTitle>My Profile</IonTitle>
        </>
      );
    } else if (props.page === "event") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={calendarOutline} size="large" />
          </IonButtons>
          <IonTitle>Event</IonTitle>
        </>
      );
    }
    if (props.page === "task") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={checkboxOutline} size="large" />
          </IonButtons>
          <IonTitle>Task</IonTitle>
        </>
      );
    }
    if (props.page === "login") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={logInOutline} size="large" />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </>
      );
    }
    if (props.page === "signup") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={logInOutline} size="large" />
          </IonButtons>
          <IonTitle>SignUp</IonTitle>
        </>
      );
    }
  }
  return (
    <IonHeader>
      <IonToolbar>
        {userLoggedIn && (
          <IonButtons slot="end" id={"notification-modal" + props.page}>
            <IonTabButton>
              <IonIcon icon={notifications} />
            </IonTabButton>
          </IonButtons>
        )}

        {getHeaderComponent()}
        <Logout pageName={props.page} />
        <NotificationModal
          pageName={props.page}
          triggerId={"notification-modal" + props.page}
          modal={modal}
          dismiss={dismiss}
        />
      </IonToolbar>
    </IonHeader>
  );
}
export default Menu;
