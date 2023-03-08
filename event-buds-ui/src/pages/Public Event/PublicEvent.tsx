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
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import { format, parseJSON } from "date-fns";
import { chevronDownCircleOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { GetPublicEvents } from "../../api/eventApi";
import Menu from "../../components/Menu";
import PublicEventInfo from "../../components/PublicEventInfo";
import { UserContext } from "../../context/UserContext";

import "./publicEvent.css";

function PublicEvents() {
  const [publicEvents, setPublicEvents] = useState([]);
  const [results, setResults] = useState([...publicEvents]);
  const [event, setEvent] = useState({});
  const [step, setStep] = useState(1);
  const { token, userLoggedIn } = useContext(UserContext);
  async function loadPublicEvents() {
    let result = await GetPublicEvents(token);
    if (result) {
      setPublicEvents(result);
    }
  }
  const handleChange = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;

    query = target.value!.toLowerCase();

    setResults(
      publicEvents?.filter(
        (event: any) =>
          event.EVENTTITLE?.toLowerCase().indexOf(query) > -1 ||
          event?.DESCRIPTION?.toLowerCase().indexOf(query) > -1 ||
          event.LOCATION?.toLowerCase().indexOf(query) > -1
      )
    );
  };
  useEffect(() => {
    if (userLoggedIn) {
      loadPublicEvents();
    }
  }, [userLoggedIn]);

  useEffect(() => {
    setResults(publicEvents);
  }, [publicEvents]);
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      loadPublicEvents();
      event.detail.complete();
    }, 3000);
  }
  function viewEvent(list: any) {
    setEvent(list);
    setStep(2);
  }

  const prevStep = () => {
    setStep(step - 1);
  };
  switch (step) {
    case 1:
      return (
        <IonPage>
          <Menu page={"public events"} />
          <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
              <IonRefresherContent
                pullingIcon={chevronDownCircleOutline}
                pullingText="Pull to refresh"
                refreshingSpinner="circles"
                refreshingText="Refreshing..."
              ></IonRefresherContent>
            </IonRefresher>
            <IonToolbar>
              <IonSearchbar
                class="searchbarBorder toolbarMargin"
                placeholder="Search by Event Title, Decription or Venue"
                debounce={1000}
                onIonChange={(ev) => handleChange(ev)}
              ></IonSearchbar>
            </IonToolbar>
            <div className="eventCards">
              {results.length > 0 ? (
                results?.map((list: any) => {
                  if (list.ISPUBLIC) {
                    return (
                      <IonCard class="PublicEventCard" key={list.EVENTID}>
                        <IonCardHeader>
                          <IonCardTitle className="ion-text-capitalize">
                            {list.EVENTTITLE}
                          </IonCardTitle>
                          <IonCardSubtitle>
                            Time:{" "}
                            {format(
                              parseJSON(list.STARTDATETIME),
                              "MMM d, yyyy, K:m a "
                            )}
                          </IonCardSubtitle>
                          <IonCardSubtitle>
                            Venue: {list.LOCATION}
                          </IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                          Description: {list.DESCRIPTION}
                        </IonCardContent>
                        <IonButton
                          fill="solid"
                          shape="round"
                          size="small"
                          onClick={(e) => viewEvent(list)}
                        >
                          View
                        </IonButton>
                      </IonCard>
                    );
                  } else return "";
                })
              ) : (
                <p className="ion-text-center">
                  No Events found, Try different query!
                </p>
              )}
            </div>
          </IonContent>
        </IonPage>
      );
    case 2:
      return (
        <PublicEventInfo
          event={event}
          isHelperOrOwner={false}
          helpersList={[]}
          guestsList={[]}
          acceptedhelpersList={[]}
          prevStep={prevStep}
        />
      );
    default:
      return <></>;
  }
}

export default PublicEvents;
