import {
  IonContent,
  IonButtons,
  IonIcon,
  IonPage,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getEventGuests, getEventHelpers } from "../../api/eventApi";

import EventText from "../../components/EventText";
import Menu from "../../components/Menu";

export default function Event(props: any) {
  const history = useHistory();
  const [segment, setSegment] = useState("eventInfo");
  const [guestsList, setGuestsList] = useState<any>([]);
  const [helpersList, setHelpersList] = useState<any>([]);
  function handleSegmentChange(value: any) {
    if (value === "eventInfo") {
      return (
        <EventText
          event={props.list}
          helpers={helpersList}
          guests={guestsList}
        />
      );
    } else if (value === "task") {
      return <>This is Task</>;
    }
  }
  async function loadEventInvitations() {
    let helpers = await getEventHelpers(props.list.EVENTID);
    if (helpers) {
      setHelpersList(helpers);
    }
    let guests = await getEventGuests(props.list.EVENTID);
    if (guests) {
      setGuestsList(guests);
    }
  }
  useEffect(() => {
    loadEventInvitations();
  }, [props.list.EVENTID]);

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
          {props.list.EVENTTITLE ?? ""}
        </h1>
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
        {handleSegmentChange(segment)}
      </IonContent>
    </IonPage>
  );
}
