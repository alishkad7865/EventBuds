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

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const [otherUsersList, setotherUsersList] = useState([]);

  useEffect(() => {
    async function loadAllUsers() {
      let result = await getAllUsers(1);
      console.log(result);
      if (result) {
        setotherUsersList(result);
      }
      console.log(otherUsersList);
    }

    loadAllUsers();
  }, []);
  function dismiss() {
    props.setOpen(false);
    props.modal.current?.dismiss();
  }

  return (
    <IonModal
      isOpen={props.isOpen}
      ref={modal}
      id="open-modal"
      presentingElement={presentingElement!}
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
