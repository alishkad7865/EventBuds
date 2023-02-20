import {
  IonContent,
  IonButtons,
  IonIcon,
  IonPage,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  useIonViewWillLeave,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useState } from "react";

import EventText from "../../components/EventText";
import Menu from "../../components/Menu";
import Task from "../../components/Tasks";
import "./Event.css";

export default function Event(props: any) {
  const [segment, setSegment] = useState("eventInfo");

  const { event } = props;
  function handleSegmentChange(value: any) {
    if (value === "eventInfo") {
      return (
        <EventText
          event={event}
          helpers={props.helpersList}
          guests={props.guestsList}
          isHelperOrOwner={props.isHelperOrOwner}
        />
      );
    } else if (value === "task") {
      return <Task event={event} helpers={props.acceptedhelpersList} />;
    }
  }
  useIonViewWillLeave(() => {
    props.setAcceptedHelpersList([]);
  });
  return (
    <IonPage>
      <Menu page={"event"} />
      <IonContent className="container">
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
