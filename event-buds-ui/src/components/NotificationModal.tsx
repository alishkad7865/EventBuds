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
import { checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";
import { useRef, useState } from "react";

setupIonicReact();

export default function NotificationModal(props: any) {
  return (
    <IonModal
      ref={props.modal}
      trigger={"notification-modal" + props.pageName}
      id={"notification-modal" + props.pageName}
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
              <IonToolbar>
                <IonButtons>
                  <IonButton class="NotiModalButtons" fill="outline">
                    No
                    <IonIcon icon={closeCircleOutline}></IonIcon>
                  </IonButton>

                  <IonLabel>
                    Daniel Smith has requested to be friends with you
                  </IonLabel>

                  <IonButton class="NotiModalButtons" fill="outline" slot="end">
                    Yes
                    <IonIcon icon={checkmarkCircleOutline}></IonIcon>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <IonLabel>
                Daniel Smith has requested to be friends with you
              </IonLabel>
              <IonButton fill="outline">
                No
                <IonIcon icon={closeCircleOutline}></IonIcon>
              </IonButton>
              <IonButton fill="outline" slot="end">
                Yes
                <IonIcon icon={checkmarkCircleOutline}></IonIcon>
              </IonButton>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}
