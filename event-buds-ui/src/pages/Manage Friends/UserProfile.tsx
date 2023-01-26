import { IonHeader, IonItem, IonLabel, IonPage } from "@ionic/react";

export default function UserProfile(props: any) {
  return (
    <IonPage>
      <IonHeader> This is a Profile</IonHeader>
      <IonItem routerLink="/UserProfile">
        <IonLabel>User 1</IonLabel>
      </IonItem>
    </IonPage>
  );
}
