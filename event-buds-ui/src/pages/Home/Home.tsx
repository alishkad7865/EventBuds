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
import { getUserEvent } from "../../api/eventApi";
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
  // {
  //   eventId: Number,
  //   createdBy: String,
  //   ownerId: Number,
  //   eventTitle: String,
  //   eventRegEndDateTime: Date,
  //   eventStartDateTime: Date,
  //   eventEndDateTime: Date,
  //   location: String,
  //   isPublic: Number,
  //   description: String,
  //   capacity: Number,
  //   price: Number,
  //   status: String,
  //   helpers: [],
  // }
  const [events, setEvents] = useState([]);
  async function loadUserData() {
    let result = await getUser(1);
    if (result) {
      setUser(result);
    }
  }
  async function loadUserEvents() {
    let result = await getUserEvent(1);
    if (result) {
      console.log(result);
      setEvents(result);
    }
  }
  useEffect(() => {
    loadUserData();
    loadUserEvents();
    console.log(events, "Events");
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
          {events?.map((list: any) => {
            if (!list.ISPUBLIC) {
              console.log(list.DESCRIPTION, list);
              return (
                <IonCard class="eventCard">
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-capitalize">
                      {list.EVENTTITLE}
                    </IonCardTitle>
                    <IonCardSubtitle>
                      Time: {new Date(list.STARTDATETIME).toString()}
                    </IonCardSubtitle>
                    <IonCardSubtitle>
                      Venue: {list.LOCATION} at{" "}
                    </IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent>{list.DESCRIPTION}</IonCardContent>
                  <IonButton fill="clear">View</IonButton>
                </IonCard>
              );
            }
          })}
        </div>

        {/*  START OF PUBLIC EVENT SECTION */}
        <IonItemDivider>
          <IonLabel>
            <h2>My Public Events</h2>
          </IonLabel>
        </IonItemDivider>

        <div className="eventCardsDiv">
          {events?.map((list: any) => {
            if (list.ISPUBLIC) {
              return (
                <IonCard class="eventCard">
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-capitalize">
                      {list.EVENTTITLE}
                    </IonCardTitle>
                    <IonCardSubtitle>
                      Time: {new Date(list.STARTDATETIME).toString()}
                    </IonCardSubtitle>
                    <IonCardSubtitle>
                      Venue: {list.LOCATION} at{" "}
                    </IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent>{list.DESCRIPTION}</IonCardContent>
                  <IonButton fill="clear">View</IonButton>
                </IonCard>
              );
            }
          })}
        </div>
      </IonContent>
    </IonPage>
  );
}
