import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getUser } from "../../api/userApi";
import "./Home.css";
export default function Home() {
  const [user, setUser] = useState({
    ADDRESS: String,
    BIODATA: String,
    EMAIL: String,
    FIRSTNAME: String,
    FRIENDS: String,
    LASTNAME: String,
    SEX: String,
    USERID: Number,
  });

  async function loadUserData() {
    let result = await getUser(1);
    if (result) {
      setUser(result);
    }
  }
  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1 className="ion-text-center ion-text-capitalize">
          {"Welcome" + " " + user.FIRSTNAME ?? ""}
        </h1>
        <IonItemDivider>
          <IonLabel>
            <h2>My Private Events</h2>
          </IonLabel>
        </IonItemDivider>
        <div className="eventCardsDiv">
          <IonCard class="PrivateEventCard">
            <IonCardHeader>
              <IonCardTitle>Private Event Placeholder</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              Here's a small text description for the card content. Nothing
              more, nothing less.
            </IonCardContent>
            <IonButton fill="clear">View</IonButton>
          </IonCard>
          <IonCard class="PrivateEventCard">
            <IonCardHeader>
              <IonCardTitle>Private Event Placeholder</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              Here's a small text description for the card content. Nothing
              more, nothing less.
            </IonCardContent>
            <IonButton fill="clear">View</IonButton>
          </IonCard>
        </div>

        {/*  START OF PUBLIC EVENT SECTION */}
        <IonItemDivider>
          <IonLabel>
            <h2>My Public Events</h2>
          </IonLabel>
        </IonItemDivider>

        <div className="eventCardsDiv">
          <IonCard class="PublicEventCard">
            <IonCardHeader>
              <IonCardTitle>Public Event Placeholder</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              Here's a small text description for the card content. Nothing
              more, nothing less.
            </IonCardContent>
            <IonButton fill="clear">View</IonButton>
          </IonCard>
          <IonCard class="PublicEventCard">
            <IonCardHeader>
              <IonCardTitle>Public Event Placeholder</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              Here's a small text description for the card content. Nothing
              more, nothing less.
            </IonCardContent>
            <IonButton fill="clear">View</IonButton>
          </IonCard>
          <IonCard class="PublicEventCard">
            <IonCardHeader>
              <IonCardTitle>Public Event Placeholder</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              Here's a small text description for the card content. Nothing
              more, nothing less.
            </IonCardContent>
            <IonButton fill="clear" shape="round">
              View
            </IonButton>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}
