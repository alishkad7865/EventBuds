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
  IonItemDivider,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
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
import { format, parseISO } from "date-fns";
import { UserContext } from "../../context/UserContext";

export default function Home() {
  const { user, token } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  const [segment, setSegment] = useState<
    "AssignedToMe" | "Ongoing" | "Completed"
  >("AssignedToMe");
  const [event, setEvent] = useState<any>({});
  const [guestsList, setGuestsList] = useState<any>([]);
  const [helpersList, setHelpersList] = useState<any>([]);
  const [eventStepper, setEventStepper] = useState(1);
  const [acceptedhelpersList, setAcceptedHelpersList] = useState<any>([]);
  const [isHelperOrOwner, setIsHelperOROwner] = useState<boolean>(false);

  async function loadUserEvents() {
    let result = await GetUserEvents(token);
    if (result) {
      setEvents(result);
    }
  }
  useIonViewWillEnter(() => {
    loadUserEvents();
  });

  useEffect(() => {
    if (!accordionGroup.current) {
      return;
    }
  }, []);

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

              <IonAccordionGroup
                ref={accordionGroup}
                multiple={true}
                value="Upcoming"
              >
                <IonAccordion class="accord" value="Upcoming">
                  <IonItem class="AccordTitle" slot="header">
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
                      <IonSegmentButton value="AssignedToMe">
                        <IonLabel>Assigned to me</IonLabel>
                      </IonSegmentButton>

                      <IonSegmentButton value="Ongoing">
                        <IonLabel>Ongoing</IonLabel>
                      </IonSegmentButton>

                      <IonSegmentButton value="Completed">
                        <IonLabel>Completed</IonLabel>
                      </IonSegmentButton>
                    </IonSegment>

                    {segment === "AssignedToMe" && (
                      <IonCardContent class="seg">
                        XYZ task for ABC event has been assigned to me
                      </IonCardContent>
                    )}
                    {segment === "Ongoing" && (
                      <IonCardContent class="seg">
                        XYZ task is ongoing for ABC event
                      </IonCardContent>
                    )}
                    {segment === "Completed" && (
                      <IonCardContent class="seg">
                        PQR task for KLM event has been completed
                      </IonCardContent>
                    )}
                  </div>
                </IonAccordion>

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
                </IonAccordion>
              </IonAccordionGroup>
            </IonContent>
          </IonPage>
        </>
      );
    case 2:
      return (
        <Event
          event={event}
          setEventStepper={setEventStepper}
          isHelperOrOwner={isHelperOrOwner}
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
