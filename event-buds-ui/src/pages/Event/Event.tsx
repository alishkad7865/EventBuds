import {
  IonContent,
  IonButtons,
  IonIcon,
  IonPage,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  useIonViewDidEnter,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getEventHelpers, getEventGuests } from "../../api/eventApi";
import { getUser } from "../../api/userApi";

import EventText from "../../components/EventText";
import Menu from "../../components/Menu";
import Task from "../../components/Tasks";
import "./Event.css";

export default function Event(props: any) {
  const history = useHistory();
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
          <IonButtons className="" onClick={() => history.goBack()}>
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
