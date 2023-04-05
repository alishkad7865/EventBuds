import {
  IonContent,
  IonButtons,
  IonIcon,
  IonPage,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import { arrowBack, chevronDownCircleOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { GetEvent, GetEventGuests, GetEventHelpers } from "../../api/eventApi";
import { getTasks } from "../../api/taskApi";

import EventInfo from "../../components/EventInformation/EventInfo";
import Menu from "../../components/Menu";
import Task from "../../components/Task/Tasks";
import { UserContext } from "../../context/UserContext";
import "./Event.css";

export default function Event(props: any) {
  const [segment, setSegment] = useState("eventInfo");
  const [taskList, setTaskList] = useState([]);
  const {
    toastMessage,
    setToastMessage,
    setHelpersList,
    setAcceptedHelpersList,
    setGuestsList,
    setIsHelperOrOwner,
  } = props;
  const [status, setStatus] = useState(props.event.STATUS);
  const { token, user } = useContext(UserContext);
  const [event, setEvent] = useState(props.event);
  async function loadEvent() {
    GetEvent(token, props.event.EVENTID).then((response: any) => {
      setEvent(response);
    });
  }
  async function loadTasks() {
    let result = await getTasks(props.event?.EVENTID, token);
    if (result) {
      setTaskList(result);
    }
  }
  useEffect(() => {
    loadEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastMessage]);

  function handleSegmentChange(value: any) {
    if (value === "eventInfo") {
      return (
        <EventInfo
          event={event}
          helpers={props.helpersList}
          status={status}
          setStatus={setStatus}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
          guests={props.guestsList}
          isHelperOrOwner={props.isHelperOrOwner}
        />
      );
    } else if (value === "task") {
      return (
        <Task
          taskList={taskList}
          setTaskList={setTaskList}
          event={event}
          helpers={props.acceptedhelpersList}
        />
      );
    }
  }
  function handleRefresh(e: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      loadEvent();
      loadTasks();
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
            setIsHelperOrOwner(true);
          } else setIsHelperOrOwner(false);
        }
        let guests = await GetEventGuests(eventId, token);
        if (guests) {
          setGuestsList(guests);
        }
      }
      loadEventInvitations(event?.EVENTID);
      e.detail.complete();
    }, 3000);
  }

  return (
    <IonPage>
      <Menu page={"event"} />
      <IonContent className="container">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>
        <div className="addSpaceAbove">
          <IonButtons className="" onClick={() => props.setEventStepper(1)}>
            <IonIcon slot="end" icon={arrowBack} size="large"></IonIcon>
          </IonButtons>
        </div>

        <h1 className="ion-text-center ion-text-capitalize">
          {event.EVENTTITLE ?? ""}
        </h1>
        {props.isHelperOrOwner && (
          <IonSegment
            value={segment}
            onIonChange={(e: any) => {
              setSegment(e.detail.value);
            }}
          >
            <IonSegmentButton value="eventInfo">
              <IonLabel>Info</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="task">
              <IonLabel>Task</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        )}
        {handleSegmentChange(segment)}
      </IonContent>
    </IonPage>
  );
}
