import {
  IonPage,
  IonContent,
  IonHeader,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getPublicEvents } from "../../api/eventApi";
import "./publicEvent.css";
export default function PublicEvents() {
  const [publicEvents, setPublicEvents] = useState([]);
  async function loadUserEvents() {
    let result = await getPublicEvents(1);
    if (result) {
      console.log(result);
      setPublicEvents(result);
    }
  }
  useEffect(() => {
    loadUserEvents();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="toolbarMargin">
          <IonTitle>Public Events</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar class="searchbarBorder"></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="eventCards">
          {publicEvents?.map((list: any) => {
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
      </IonContent>
    </IonPage>
  );
}
