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
  useIonViewWillEnter,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import {
  GetEventGuests,
  GetEventHelpers,
  GetUserEvents,
} from "../../api/eventApi";
import "./Home.css";
import Event from "../Event/Event";
import Menu from "../../components/Menu";
import { format, parseISO } from "date-fns";
import { UserContext } from "../../context/UserContext";

export default function Home() {
  const { user, token } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState<any>({});
  const [guestsList, setGuestsList] = useState<any>([]);
  const [helpersList, setHelpersList] = useState<any>([]);
  const [eventStepper, setEventStepper] = useState(1);
  const [acceptedhelpersList, setAcceptedHelpersList] = useState<any>([]);

  async function loadUserEvents() {
    let result = await GetUserEvents(token); // update this list for actual data
    if (result) {
      setEvents(result);
    }
  }
  useIonViewWillEnter(() => {
    loadUserEvents();
  });

  function viewEvent(list: any) {
    setEvent(list);
    setEventStepper(2);
  }

  useEffect(() => {
    async function loadEventInvitations(eventId: number) {
      let helpers = await GetEventHelpers(eventId, token);
      if (helpers) {
        setHelpersList(helpers.helpersList);
        setAcceptedHelpersList(helpers.acceptedhelpersList);
      }
      let guests = await GetEventGuests(eventId, token);
      if (guests) {
        setGuestsList(guests);
      }
    }
    if (event.EVENTID) {
      loadEventInvitations(event.EVENTID);
    }
    // eslint-disable-next-line
  }, [event]);

  switch (eventStepper) {
    case 1:
      return (
        <>
          <IonPage>
            <Menu page={"home"} />
            <IonContent>
              <h1 className="ion-text-center ion-text-capitalize">
                {`Welcome ${user.FIRSTNAME ?? ""}`}
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
                            Time:{" "}
                            {format(
                              parseISO(list.STARTDATETIME),
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
                          onClick={() => viewEvent(list)}
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
                            Time:{" "}
                            {format(
                              parseISO(list.STARTDATETIME),
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
                          onClick={() => viewEvent(list)}
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
    case 2:
      return (
        <Event
          event={event}
          setEventStepper={setEventStepper}
          isHelperOrOwner={true}
          helpersList={helpersList}
          guestsList={guestsList}
          acceptedhelpersList={acceptedhelpersList}
          setAcceptedhelpersList={setAcceptedHelpersList}
        />
      );
    default:
      return <></>;
  }
}
