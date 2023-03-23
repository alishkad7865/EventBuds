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
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  RefresherEventDetail,
  useIonViewWillEnter,
} from "@ionic/react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  GetEventGuests,
  GetEventHelpers,
  GetUserEvents,
} from "../../api/eventApi";
import "./Home.css";
import Event from "../Event/Event";
import Menu from "../../components/Menu";
import { format, parseJSON } from "date-fns";
import { UserContext } from "../../context/UserContext";
import { chevronDownCircleOutline } from "ionicons/icons";
import {
  completedArraySortedByDateASC,
  upcomingArraySortedByDateASC,
} from "../../Utils/ArrayUtil";

export default function Home() {
  const { user, token, userLoggedIn } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  const [segment, setSegment] = useState<"Upcoming" | "Completed">("Upcoming");
  const [event, setEvent] = useState<any>({});
  const [guestsList, setGuestsList] = useState<any>([]);
  const [helpersList, setHelpersList] = useState<any>([]);
  const [eventStepper, setEventStepper] = useState(1);
  const [acceptedhelpersList, setAcceptedHelpersList] = useState<any>([]);
  const [isHelperOrOwner, setIsHelperOROwner] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  var upcomingSegmentArray = upcomingArraySortedByDateASC(events);
  var completedSegmentArray = completedArraySortedByDateASC(events);

  async function loadUserEvents() {
    setIsLoading(true);
    GetUserEvents(token).then((response: any) => {
      setEvents(response);
      setIsLoading(false);
    });
  }
  useIonViewWillEnter(() => {
    if (userLoggedIn) {
      loadUserEvents();
    }
  });
  useEffect(() => {
    if (userLoggedIn) {
      loadUserEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userLoggedIn, toastMessage]);
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      loadUserEvents();
      event.detail.complete();
    }, 3000);
  }
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
        if (
          helpers.acceptedhelpersList.find(
            (list: any) => list.USERID === user.USERID
          )
        ) {
          setIsHelperOROwner(true);
        } else setIsHelperOROwner(false);
      }
      let guests = await GetEventGuests(eventId, token);
      if (guests) {
        setGuestsList(guests);
      }
    }
    if (event.EVENTID) {
      loadEventInvitations(event.EVENTID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  switch (eventStepper) {
    case 1:
      return (
        <IonPage>
          <Menu page={"home"} />
          <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
              <IonRefresherContent
                pullingIcon={chevronDownCircleOutline}
                pullingText="Pull to refresh"
                refreshingSpinner="circles"
                refreshingText="Refreshing..."
              ></IonRefresherContent>
            </IonRefresher>
            <h1 className="ion-text-center ion-text-capitalize">
              {`Welcome ${user?.FIRSTNAME ?? ""} ${user?.LASTNAME ?? ""} `}
            </h1>

            {isLoading ? (
              <IonSpinner name="crescent"></IonSpinner>
            ) : (
              <IonAccordionGroup
                ref={accordionGroup}
                multiple={true}
                value="Upcoming"
              >
                {events?.length === 0 ? (
                  <IonGrid>
                    <IonRow class="ion-justify-content-center">
                      <IonImg
                        class="icon-svg"
                        src="assets/svg/folder.svg"
                        alt="folder-empty"
                      />
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                      <h2 className="icon-svg">No Events Added!</h2>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                      <h4 className="icon-svg">click here to add new event</h4>
                      <IonButton
                        className="ion-padding"
                        routerLink="/CreateEvent"
                      >
                        Create
                      </IonButton>
                    </IonRow>
                  </IonGrid>
                ) : (
                  <IonAccordion class="accord" value="Upcoming">
                    <IonItem class="AccordTitle" slot="header">
                      <IonLabel>Upcoming Events</IonLabel>
                    </IonItem>
                    <div className="ion-padding" slot="content">
                      <IonSegment
                        value={segment}
                        onIonChange={(e: any) => {
                          setSegment(e.detail.value);
                        }}
                        mode="ios"
                      >
                        <IonSegmentButton value="Upcoming">
                          <IonLabel>Upcoming</IonLabel>
                        </IonSegmentButton>

                        <IonSegmentButton value="Completed">
                          <IonLabel>Completed</IonLabel>
                        </IonSegmentButton>
                      </IonSegment>

                      {segment === "Upcoming" && (
                        <IonCardContent class="seg eventCardsDiv">
                          {upcomingSegmentArray.length === 0 && (
                            <IonGrid>
                              <IonRow class="ion-justify-content-center">
                                <IonImg
                                  class="icon-svg"
                                  src="assets/svg/folder.svg"
                                  alt="folder-empty"
                                />
                              </IonRow>
                              <IonRow class="ion-justify-content-center">
                                <h2 className="icon-svg">No Upcoming Events</h2>
                              </IonRow>
                              <IonRow class="ion-justify-content-center">
                                <h4 className="icon-svg">
                                  Great! You are caught up with your events.
                                </h4>
                              </IonRow>
                            </IonGrid>
                          )}
                          {upcomingSegmentArray?.map((list: any) => {
                            return (
                              <IonCard
                                class={
                                  list.ISPUBLIC
                                    ? "PublicEventCard"
                                    : "PrivateEventCard"
                                }
                                key={list.EVENTID}
                              >
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
                                  onClick={() => viewEvent(list)}
                                >
                                  View
                                </IonButton>
                              </IonCard>
                            );
                          })}
                        </IonCardContent>
                      )}
                      {segment === "Completed" && (
                        <IonCardContent class="seg eventCardsDiv">
                          {completedSegmentArray.length === 0 && (
                            <IonGrid>
                              <IonRow class="ion-justify-content-center">
                                <IonImg
                                  class="icon-svg"
                                  src="assets/svg/folder.svg"
                                  alt="folder-empty"
                                />
                              </IonRow>
                              <IonRow class="ion-justify-content-center">
                                <h2 className="icon-svg">
                                  No Completed Events found!
                                </h2>
                              </IonRow>
                            </IonGrid>
                          )}
                          {completedSegmentArray?.map((list: any) => {
                            return (
                              <IonCard
                                class={
                                  list.ISPUBLIC
                                    ? "PublicEventCard"
                                    : "PrivateEventCard"
                                }
                                key={list.EVENTID}
                              >
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
                                  onClick={() => viewEvent(list)}
                                >
                                  View
                                </IonButton>
                              </IonCard>
                            );
                          })}
                        </IonCardContent>
                      )}
                    </div>
                  </IonAccordion>
                )}

                <IonAccordion class="accord" value="Private">
                  {events?.filter((list: any) => !list.ISPUBLIC).length > 0 && (
                    <IonItem class="AccordTitle" slot="header">
                      <IonLabel>My Private Events</IonLabel>
                    </IonItem>
                  )}

                  <div className="ion-padding eventCardsDiv" slot="content">
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
                              onClick={() => viewEvent(list)}
                            >
                              View
                            </IonButton>
                          </IonCard>
                        );
                      } else return "";
                    })}
                  </div>
                </IonAccordion>

                {/*  START OF PUBLIC EVENT SECTION */}
                <IonAccordion class="accord" value="Public">
                  {events?.filter((list: any) => list.ISPUBLIC).length > 0 && (
                    <IonItem class="AccordTitle" slot="header">
                      <IonLabel>My Public Events</IonLabel>
                    </IonItem>
                  )}
                  <div className="ion-padding eventCardsDiv" slot="content">
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
                              onClick={() => viewEvent(list)}
                            >
                              View
                            </IonButton>
                          </IonCard>
                        );
                      } else return "";
                    })}
                  </div>
                </IonAccordion>
              </IonAccordionGroup>
            )}
          </IonContent>
        </IonPage>
      );
    case 2:
      return (
        <Event
          event={event}
          setEventStepper={setEventStepper}
          isHelperOrOwner={isHelperOrOwner}
          helpersList={helpersList}
          guestsList={guestsList}
          setHelpersList={setHelpersList}
          setGuestsList={setGuestsList}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
          acceptedhelpersList={acceptedhelpersList}
          setAcceptedhelpersList={setAcceptedHelpersList}
        />
      );
    default:
      return <></>;
  }
}
