import {
  IonPage,
  IonContent,
  IonSearchbar,
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
import Menu from "../../components/Menu";
import "./publicEvent.css";
export default function PublicEvents() {
  const [publicEvents, setPublicEvents] = useState([]);
  async function loadUserEvents() {
    let result = await getPublicEvents(1);
    if (result) {
      setPublicEvents(result);
    }
  }
  useEffect(() => {
    loadUserEvents();
  }, []);
  return (
    <IonPage>
      <Menu page={"public events"} />
      {/* <IonHeader>
        <IonToolbar class="toolbarMargin">
          <IonTitle>Public Events</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>
        <IonToolbar>
          <IonSearchbar class="searchbarBorder toolbarMargin"></IonSearchbar>
        </IonToolbar>
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
            } else return <></>;
          })}
        </div>
      </IonContent>
    </IonPage>
  );
}
