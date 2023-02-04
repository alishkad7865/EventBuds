import {
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonChip,
} from "@ionic/react";
import { format, parseISO } from "date-fns";

export default function EventText(props: any) {
  return (
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
          {format(parseISO(props.event.REGENDDATE), "MMM d, yyyy, K:m a ")}
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Event Start Date:</b>
        </IonCol>
        <IonCol sizeSm="4">
          {format(parseISO(props.event.STARTDATETIME), "MMM d, yyyy, K:m a ")}
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Event End Date:</b>
        </IonCol>
        <IonCol sizeSm="4">
          {" "}
          {format(parseISO(props.event.ENDDATETIME), "MMM d, yyyy, K:m a ")}
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
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Helpers:</b>
        </IonCol>
        <IonCol sizeSm="4" style={{ overflowY: "scroll" }}>
          <div style={{ maxHeight: "200px" }}>
            <IonList>
              {props.helpers?.length <= 0 && <> No Helpers added!</>}
              {props.helpers?.map((list: any) => {
                return (
                  <IonItem key={list.EMAIL + "_helper"}>
                    <IonAvatar slot="start">
                      <IonImg
                        alt="Silhouette of a person's head"
                        src="https://ionicframework.com/docs/img/demos/avatar.svg"
                      />
                    </IonAvatar>
                    <IonLabel>
                      <h2>{list.FIRSTNAME + " " + list.LASTNAME}</h2>
                      <p>{list.EMAIL}</p>
                    </IonLabel>
                    <IonChip>{list.INVITATIONRESPONSE}</IonChip>
                  </IonItem>
                );
              })}
            </IonList>
          </div>
        </IonCol>
      </IonRow>

      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Guests:</b>
        </IonCol>
        <IonCol sizeSm="4" style={{ overflowY: "scroll" }}>
          <div style={{ maxHeight: "200px" }}>
            <IonList>
              {props.guests?.length <= 0 && <> No Guests added!</>}
              {props.guests?.map((list: any) => {
                return (
                  <IonItem key={list.EMAIL + "_guest"}>
                    <IonAvatar slot="start">
                      <IonImg
                        alt="Silhouette of a person's head"
                        src="https://ionicframework.com/docs/img/demos/avatar.svg"
                      />
                    </IonAvatar>
                    <IonLabel>
                      <h2>{list.FIRSTNAME + " " + list.LASTNAME}</h2>
                      <p>{list.EMAIL}</p>
                    </IonLabel>
                    <IonChip>{list.INVITATIONRESPONSE}</IonChip>
                  </IonItem>
                );
              })}
            </IonList>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
