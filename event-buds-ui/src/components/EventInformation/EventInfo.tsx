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
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import { format, parseJSON } from "date-fns";
import { pencil } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { updateEvent } from "../../api/eventApi";
import { UserContext } from "../../context/UserContext";

export default function EventInfo(props: any) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { toastMessage, setToastMessage, event } = props;
  const { status, setStatus } = props;
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = useContext(UserContext);

  async function submitStatus() {
    setIsLoading(true);
    await updateEvent(token, event.EVENTID, status).then((response: any) => {
      if (response.message === "Event Updated!") {
        setToastMessage("Event Status Updated!");
        setIsEditMode(false);
      } else {
        setToastMessage("Update Failed, Try Again!");
      }
    });
    setIsLoading(false);
  }
  useEffect(() => {
    if (toastMessage !== "") {
      setShowToast(true);
    }
  }, [toastMessage]);

  return (
    <IonGrid>
      <IonToast
        isOpen={showToast}
        position="top"
        onDidDismiss={() => {
          setShowToast(false);
          setToastMessage("");
        }}
        message={toastMessage}
        duration={3000}
      />
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Event Title:</b>
        </IonCol>
        <IonCol sizeSm="4">{event.EVENTTITLE}</IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Description:</b>
        </IonCol>
        <IonCol sizeSm="4">{event.DESCRIPTION}</IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Registration End Date:</b>
        </IonCol>
        <IonCol sizeSm="4">
          {format(parseJSON(event.REGENDDATE), "MMM d, yyyy, KK:mm a ") ?? ""}
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Event Start Date:</b>
        </IonCol>
        <IonCol sizeSm="4">
          {format(parseJSON(event.STARTDATETIME), "MMM d, yyyy, KK:mm a ") ??
            ""}
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Event End Date:</b>
        </IonCol>
        <IonCol sizeSm="4">
          {format(parseJSON(event.ENDDATETIME), "MMM d, yyyy, KK:mm a ") ?? ""}
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Event Venue:</b>
        </IonCol>
        <IonCol sizeSm="4">{event.LOCATION}</IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Event Type:</b>
        </IonCol>
        <IonCol sizeSm="4">{event.ISPUBLIC ? "Public" : "Private"}</IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Status:</b>
        </IonCol>
        <IonCol sizeSm="4">
          {isEditMode ? (
            <IonItem>
              <IonSelect
                interface="popover"
                placeholder="Select Helper"
                onIonChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <IonSelectOption key={"ongoing"} value="Ongoing">
                  Ongoing
                </IonSelectOption>
                <IonSelectOption key={"completed"} value="Completed">
                  Completed
                </IonSelectOption>
              </IonSelect>
            </IonItem>
          ) : (
            event.STATUS
          )}
          {isLoading && <IonSpinner name="crescent"></IonSpinner>}
          {event.STATUS !== "Completed" &&
            user?.USERID === event.OWNERID &&
            (!isEditMode && !isLoading ? (
              <IonButton
                fill="outline"
                size="small"
                onClick={() => setIsEditMode(true)}
              >
                Edit
                <IonIcon slot="end" icon={pencil}></IonIcon>
              </IonButton>
            ) : (
              <IonButton fill="outline" onClick={submitStatus}>
                Save
              </IonButton>
            ))}
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Capacity:</b>
        </IonCol>
        <IonCol sizeSm="4">{event.CAPACITY}</IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol sizeSm="2">
          <b>Price:</b>
        </IonCol>
        <IonCol sizeSm="4">{event.PRICE}</IonCol>
      </IonRow>
      {props.isHelperOrOwner && (
        <>
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
        </>
      )}
    </IonGrid>
  );
}
