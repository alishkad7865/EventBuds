import {
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
  IonButton,
} from "@ionic/react";
import { format, parseJSON } from "date-fns";
import { arrowBack } from "ionicons/icons";
import Menu from "../Menu";

export default function PublicEventInfo(props: any) {
  return (
    <IonPage>
      <Menu page={"event"} />
      <IonContent className="container">
        <div className="addSpaceAbove">
          <IonButtons className="" onClick={() => props.prevStep()}>
            <IonIcon slot="end" icon={arrowBack} size="large"></IonIcon>
          </IonButtons>
        </div>

        <h1 className="ion-text-center ion-text-capitalize">
          {props.event.EVENTTITLE ?? ""}
        </h1>
        <IonRow className="addSpaceAbove ion-align-items-end ion-justify-content-end ion-hide">
          <IonCol></IonCol>
          <IonCol>
            <IonButton
              className="interestedButton"
              disabled
              onClick={() => {
                // add event and api endpoints to update guest invitation here
              }}
            >
              Interested
            </IonButton>
          </IonCol>
        </IonRow>
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol sizeSm="2">
              <b>Event Title:</b>
            </IonCol>
            <IonCol sizeSm="4">{props.event.EVENTTITLE}</IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol sizeSm="2">
              <b>Description:</b>
            </IonCol>
            <IonCol sizeSm="4">{props.event.DESCRIPTION}</IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol sizeSm="2">
              <b>Registration End Date:</b>
            </IonCol>
            <IonCol sizeSm="4">
              {format(parseJSON(props.event.REGENDDATE), "MMM d, yyyy, K:m a ")}
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol sizeSm="2">
              <b>Event Start Date:</b>
            </IonCol>
            <IonCol sizeSm="4">
              {format(
                parseJSON(props.event.STARTDATETIME),
                "MMM d, yyyy, K:m a "
              )}
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol sizeSm="2">
              <b>Event End Date:</b>
            </IonCol>
            <IonCol sizeSm="4">
              {" "}
              {format(
                parseJSON(props.event.ENDDATETIME),
                "MMM d, yyyy, K:m a "
              )}
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol sizeSm="2">
              <b>Event Venue:</b>
            </IonCol>
            <IonCol sizeSm="4">{props.event.LOCATION}</IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol sizeSm="2">
              <b>Event Type:</b>
            </IonCol>
            <IonCol sizeSm="4">
              {props.event.ISPUBLIC ? "Public" : "Private"}
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol sizeSm="2">
              <b>Capacity:</b>
            </IonCol>
            <IonCol sizeSm="4">{props.event.CAPACITY}</IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol sizeSm="2">
              <b>Price:</b>
            </IonCol>
            <IonCol sizeSm="4">{props.event.PRICE}</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
