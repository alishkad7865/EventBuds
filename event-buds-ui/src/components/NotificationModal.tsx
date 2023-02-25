import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  create,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { getAllUsers } from "../api/userApi";

setupIonicReact();

export default function NotificationModal(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const page = useRef(null);

  const [otherUsersList, setotherUsersList] = useState([]);

  //to fix changes

  // useEffect(() => {
  //   async function loadAllUsers() {
  //     let result = await getAllUsers(1);
  //     console.log(result);
  //     if (result) {
  //       setotherUsersList(result);
  //     }
  //     console.log(otherUsersList);
  //   }

  //   loadAllUsers();
  // }, []);

  return (
    <IonModal
      // isOpen={props.isOpen}
      ref={props.modal}
      trigger={"notification-modal" + props.pageName}
      id={"notification-modal" + props.pageName}
      // presentingElement={presentingElement!}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notfications</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => props.dismiss()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>
              <IonAvatar slot="start">
                <IonImg src="https://i.pravatar.cc/300?u=b" />
              </IonAvatar>
              <IonLabel>
                Connor Smith has requested to be friends with you
              </IonLabel>
              <IonButton fill="outline">
                Yes
                <IonIcon icon={checkmarkCircleOutline}></IonIcon>
              </IonButton>
              <IonButton fill="outline">
                No
                <IonIcon icon={closeCircleOutline}></IonIcon>
              </IonButton>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonAvatar slot="start">
                <IonImg src="https://i.pravatar.cc/300?u=b" />
              </IonAvatar>
              <IonLabel>
                Daniel Smith has requested to be friends with you
              </IonLabel>
              <IonButton fill="outline">
                Yes
                <IonIcon icon={checkmarkCircleOutline}></IonIcon>
              </IonButton>
              <IonButton fill="outline">
                No
                <IonIcon icon={closeCircleOutline}></IonIcon>
              </IonButton>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}
