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
  notifications,
  peopleOutline,
} from "ionicons/icons";

function Menu(props: any) {
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
  }
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="end">
          <IonTabButton>
            <IonIcon icon={notifications} />
          </IonTabButton>
        </IonButtons>
        {getHeaderComponent()}
      </IonToolbar>
    </IonHeader>
  );
}
export default Menu;
