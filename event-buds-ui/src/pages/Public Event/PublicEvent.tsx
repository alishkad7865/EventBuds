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
import { format, parseJSON } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { GetPublicEvents } from "../../api/eventApi";
import Menu from "../../components/Menu";
import PublicEventInfo from "../../components/PublicEventInfo";
import { UserContext } from "../../context/UserContext";

import "./publicEvent.css";

function PublicEvents() {
  const [publicEvents, setPublicEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [step, setStep] = useState(1);
  const { token } = useContext(UserContext);
  async function loadUserEvents() {
    let result = await GetPublicEvents(token);
    if (result) {
      setPublicEvents(result);
    }
  }

  useEffect(() => {
    loadUserEvents();
  }, []);

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
            <IonToolbar>
              <IonSearchbar class="searchbarBorder toolbarMargin"></IonSearchbar>
            </IonToolbar>
            <div className="eventCards">
              {publicEvents?.map((list: any) => {
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
              })}
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
