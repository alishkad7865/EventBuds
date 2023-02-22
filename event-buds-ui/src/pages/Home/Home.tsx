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
  const [segment, setSegment] = useState<"segment1" | "segment2" | "segment3">(
    "segment1"
  );
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

  useEffect(() => {
    if (!accordionGroup.current) {
      return;
    }
  }, []);

  // return (
  //   <IonPage>
  //     <IonContent>
  //       <IonHeader collapse="condense">
  //         <IonToolbar>
  //           <IonTitle size="large">Home</IonTitle>
  //         </IonToolbar>
  //       </IonHeader>
  //       <h1 className="ion-text-center ion-text-capitalize">
  //         {"Welcome" + " " + user.FIRSTNAME ?? ""}
  //       </h1>

  //       <IonAccordionGroup ref={accordionGroup} multiple={true}>
  //         <IonAccordion value="first">
  //           <IonItem slot="header">
  //             <IonLabel>Upcoming Events</IonLabel>
  //           </IonItem>
  //           <div className="ion-padding" slot="content">
  //             <IonSegment
  //               value={segment}
  //               onIonChange={(e: any) => {
  //                 console.log(e.detail.value);
  //                 setSegment(e.detail.value);
  //               }}
  //               mode="ios"
  //             >
  //               <IonSegmentButton value="segment1">
  //                 <IonLabel>Assigned to me</IonLabel>
  //               </IonSegmentButton>

  //               <IonSegmentButton value="segment2">
  //                 <IonLabel>Ongoing</IonLabel>
  //               </IonSegmentButton>

  //               <IonSegmentButton value="segment3">
  //                 <IonLabel>Completed</IonLabel>
  //               </IonSegmentButton>
  //             </IonSegment>

  //             {segment === "segment1" && (
  //               <IonCardContent class= "seg">
  //                 XYZ task for ABC event has been assigned to me
  //               </IonCardContent>
  //             )}
  //             {segment === "segment2" && (
  //                <IonCardContent class= "seg">
  //                XYZ task is ongoing for ABC event
  //              </IonCardContent>

  //             )}
  //             {segment === "segment3" && (
  //               <IonCardContent class= "seg">
  //               PQR task for KLM event has been completed
  //             </IonCardContent>

  //             )}
  //           </div>
  //         </IonAccordion>

  //         <IonAccordion value="second">
  //           <IonItem slot="header">
  //             <IonLabel>My Private Events</IonLabel>
  //           </IonItem>

  //           <div className="eventCardsDiv" slot="content">
  //             {events?.map((list: any) => {
  //               if (!list.ISPUBLIC) {
  //                 console.log(list.DESCRIPTION, list);
  //                 return (
  //                   <IonCard class="PrivateEventCard">
  //                     <IonCardHeader>
  //                       <IonCardTitle className="ion-text-capitalize">
  //                         {list.EVENTTITLE}
  //                       </IonCardTitle>
  //                       <IonCardSubtitle>
  //                         Time: {new Date(list.STARTDATETIME).toString()}
  //                       </IonCardSubtitle>
  //                       <IonCardSubtitle>
  //                         Venue: {list.LOCATION} at{" "}
  //                       </IonCardSubtitle>
  //                     </IonCardHeader>

  //                     <IonCardContent>{list.DESCRIPTION}</IonCardContent>
  //                     <IonButton fill="clear">View</IonButton>
  //                   </IonCard>
  //                 );
  //               }
  //             })}
  //           </div>
  //         </IonAccordion>

  //         <IonAccordion value="third">
  //           <IonItem slot="header">
  //             <IonLabel>My Public Events</IonLabel>
  //           </IonItem>
  //           <div className="ion-padding" slot="content">
  //             Third Content
  //           </div>
  //           <div className="eventCardsDiv" slot="content">
  //             {events?.map((list: any) => {
  //               if (list.ISPUBLIC) {
  //                 return (
  //                   <IonCard class="PublicEventCard">
  //                     <IonCardHeader>
  //                       <IonCardTitle className="ion-text-capitalize">
  //                         {list.EVENTTITLE}
  //                       </IonCardTitle>
  //                       <IonCardSubtitle>
  //                         Time: {new Date(list.STARTDATETIME).toString()}
  //                       </IonCardSubtitle>
  //                       <IonCardSubtitle>
  //                         Venue: {list.LOCATION} at{" "}
  //                       </IonCardSubtitle>
  //                     </IonCardHeader>

  //                     <IonCardContent>{list.DESCRIPTION}</IonCardContent>
  //                     <IonButton fill="clear">View</IonButton>
  //                   </IonCard>
  //                 );
  //               }
  //             })}
  //           </div>
  //         </IonAccordion>
  //       </IonAccordionGroup>
  //     </IonContent>
  //   </IonPage>
  // );
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
