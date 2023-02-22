import React, { useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTabButton,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import App from "../App";
import { list, notifications } from "ionicons/icons";
import NotificationModal from "./NotificationModal";

function Menu() {
  const [presentAlert] = useIonAlert();

  const [friendsList, setfriendsList] = useState([]);
  const [modalFriendData, setModalNotificationData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  function setTriggerId(id: any) {
    throw new Error("Function not implemented.");
  }

  function setOpen(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

  function setTitle(arg0: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem href="/Home">
            <IonLabel>Home</IonLabel>
          </IonItem>

          <IonItem href="/ManageFriends">
            <IonLabel>Friends</IonLabel>
          </IonItem>

          <IonItem href="/CreateEvent">
            {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-circle-plus" /> */}
            <IonLabel>Create</IonLabel>
          </IonItem>

          <IonItem href="/PublicEvents">
            <IonLabel>Public Events</IonLabel>
          </IonItem>

          <IonItem href="/Profile">
            <IonLabel>My Profile</IonLabel>
          </IonItem>
          {/* <IonItem button tab="home">
                <IonLabel>Home</IonLabel>
            </IonItem> */}
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons
              onClick={() => {
                setIsOpen(true);
                setModalNotificationData(list);
              }}
              slot="end"
              id="open-modal"
            >
              <IonTabButton>
                <IonIcon icon={notifications} id="open-modal" />
              </IonTabButton>

              <NotificationModal
                expand="block"
                modal={modal}
                isOpen={isOpen}
                list={modalFriendData}
                setIsOpen={setIsOpen}
                trigger="open-modal"
              />
            </IonButtons>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>

            <IonTitle>EventBuds</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <App />
        </IonContent>
      </IonPage>
    </>
  );
}
export default Menu;
