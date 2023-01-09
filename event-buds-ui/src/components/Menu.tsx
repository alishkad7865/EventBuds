import React from 'react';
import { 
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
  IonToolbar
} from '@ionic/react';
import App from '../App';
import { notifications } from 'ionicons/icons';

function Menu() {
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

            <IonItem href="/Events">
              <IonLabel>Events</IonLabel>
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
            <IonButtons slot="end">
            <IonTabButton >
              <IonIcon icon={notifications}/>
            </IonTabButton>
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