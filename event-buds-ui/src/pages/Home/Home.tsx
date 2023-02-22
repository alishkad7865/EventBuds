import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
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
  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  const [segment, setSegment] = useState<"segment1" | "segment2" | "segment3">(
    "segment1"
  );
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

  useEffect(() => {
    if (!accordionGroup.current) {
      return;
    }
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

        <IonAccordionGroup ref={accordionGroup} multiple={true}>
          <IonAccordion value="first">
            <IonItem slot="header">
              <IonLabel>Upcoming Events</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <IonSegment
                value={segment}
                onIonChange={(e: any) => {
                  console.log(e.detail.value);
                  setSegment(e.detail.value);
                }}
                mode="ios"
              >
                <IonSegmentButton value="segment1">
                  <IonLabel>Assigned to me</IonLabel>
                </IonSegmentButton>

                <IonSegmentButton value="segment2">
                  <IonLabel>Ongoing</IonLabel>
                </IonSegmentButton>

                <IonSegmentButton value="segment3">
                  <IonLabel>Completed</IonLabel>
                </IonSegmentButton>
              </IonSegment>

              {segment === "segment1" && (
                <IonCardContent class= "seg">
                  XYZ task for ABC event has been assigned to me
                </IonCardContent>
              )}
              {segment === "segment2" && (
                 <IonCardContent class= "seg">
                 XYZ task is ongoing for ABC event
               </IonCardContent>
                
              )}
              {segment === "segment3" && (
                <IonCardContent class= "seg">
                PQR task for KLM event has been completed 
              </IonCardContent>
                
              )}
            </div>
          </IonAccordion>

          <IonAccordion value="second">
            <IonItem slot="header">
              <IonLabel>My Private Events</IonLabel>
            </IonItem>

            <div className="eventCardsDiv" slot="content">
              {events?.map((list: any) => {
                if (!list.ISPUBLIC) {
                  console.log(list.DESCRIPTION, list);
                  return (
                    <IonCard class="PrivateEventCard">
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
          </IonAccordion>

          <IonAccordion value="third">
            <IonItem slot="header">
              <IonLabel>My Public Events</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              Third Content
            </div>
            <div className="eventCardsDiv" slot="content">
              {events?.map((list: any) => {
                if (list.ISPUBLIC) {
                  return (
                    <IonCard class="PublicEventCard">
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
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
}
