import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonRouterOutlet,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getUserEvent } from "../../api/eventApi";
import { getUser } from "../../api/userApi";
import "./Home.css";
import Event from "../Event/Event";
import { Route } from "react-router";
import Menu from "../../components/Menu";

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
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
  async function loadUserData() {
    let result = await getUser(1);
    if (result) {
      setUser(result);
    }
  }
  async function loadUserEvents() {
    let result = await getUserEvent(1);
    if (result) {
      setEvents(result);
    }
  }
  useEffect(() => {
    loadUserData();
    loadUserEvents();
  }, []);

  function viewEvent(list: any) {
    setEvent(list);
  }
  return (
    <>
      <IonRouterOutlet>
        <Route path="/event/:id" render={() => <Event list={event} />} />
      </IonRouterOutlet>
      <IonPage>
        <Menu page={"home"} />
        <IonContent>
          <h1 className="ion-text-center ion-text-capitalize">
            {`Welcome ${user.FIRSTNAME}`}
          </h1>
          {events?.filter((list: any) => !list.ISPUBLIC).length > 0 && (
            <IonItemDivider>
              <IonLabel>
                <h2>My Private Events</h2>
              </IonLabel>
            </IonItemDivider>
          )}
          <div className="eventCardsDiv">
            {events?.map((list: any) => {
              if (!list.ISPUBLIC) {
                return (
                  <IonCard class="PrivateEventCard" key={list.EVENTID}>
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
                    <IonButton
                      fill="solid"
                      shape="round"
                      size="small"
                      onClick={(e) => viewEvent(list)}
                      routerLink={"/event/" + list.EVENTID}
                    >
                      View
                    </IonButton>
                  </IonCard>
                );
              } else return "";
            })}
          </div>

          {/*  START OF PUBLIC EVENT SECTION */}
          {events?.filter((list: any) => list.ISPUBLIC).length > 0 && (
            <IonItemDivider>
              <IonLabel>
                <h2>My Public Events</h2>
              </IonLabel>
            </IonItemDivider>
          )}
          <div className="eventCardsDiv">
            {events?.map((list: any) => {
              if (list.ISPUBLIC) {
                return (
                  <IonCard class="PublicEventCard" key={list.EVENTID}>
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
                    <IonButton
                      fill="solid"
                      shape="round"
                      size="small"
                      onClick={(e) => viewEvent(list)}
                      routerLink={"/event/" + list.EVENTID}
                    >
                      View
                    </IonButton>
                  </IonCard>
                );
              } else return "";
            })}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
