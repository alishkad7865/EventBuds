import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonIcon,
  IonToast,
} from "@ionic/react";
import { arrowForwardCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import Menu from "../Menu";

import "../../pages/Create Event/CreateEvent.css";

export default function EventInfoForm(props: any) {
  function Continue(e: any) {
    e.preventDefault();
    props.nextStep();
  }
  const { values, handleChange } = props;
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (props.toastMessage) {
      setShowToast(true);
    }
  }, [props.toastMessage]);

  return (
    <IonPage>
      <IonToast
        isOpen={showToast}
        position="top"
        onDidDismiss={() => {
          setShowToast(false);
          props.setToastMessage("");
        }}
        message={props.toastMessage}
        duration={3000}
      />

      <Menu page={"create event"} />
      <IonContent className="container">
        <IonItem className="addSpaceAbove">
          <IonLabel position="stacked" className="ionLabel">
            Event title
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="Enter event title"
            onIonChange={handleChange("eventTitle")}
            defaultValue={values.eventTitle}
            value={values.eventTitle}
          ></IonInput>
          <IonNote slot="helper">Enter a valid Title</IonNote>
          <IonNote slot="error">Invalid Title</IonNote>
        </IonItem>
        {/* <IonDatetime presentation="date-time" preferWheel={true}><span slot="title">Select a Starting Date Time</span></IonDatetime> */}

        <IonItem className="addSpaceAbove">
          <IonLabel position="stacked" className="dateLabel">
            Last Registration Date
          </IonLabel>
          <IonDatetimeButton datetime="lastRegDate"></IonDatetimeButton>

          <IonModal keepContentsMounted={true}>
            <IonDatetime
              id="lastRegDate"
              onIonChange={handleChange("lastRegDate")}
              defaultValue={values.lastRegDate}
              value={new Date(values.lastRegDate).toISOString() ?? undefined}
            >
              <span slot="title">Last Registration Date</span>
            </IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem className="addSpaceAbove">
          <IonLabel position="stacked" className="dateLabel">
            Event Start Time
          </IonLabel>
          <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

          <IonModal keepContentsMounted={true}>
            <IonDatetime
              id="datetime"
              onIonChange={handleChange("eventStartTime")}
              defaultValue={values.eventStartTime}
              value={new Date(values.eventStartTime).toISOString() ?? undefined}
            >
              <span slot="title">Event Start Time</span>
            </IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem className="addSpaceAbove">
          <IonLabel position="stacked" className="dateLabel">
            Event End Time
          </IonLabel>
          <IonDatetimeButton datetime="EndTime"></IonDatetimeButton>

          <IonModal keepContentsMounted={true}>
            <IonDatetime
              id="EndTime"
              onIonChange={handleChange("eventEndTime")}
              defaultValue={values.eventEndTime}
              value={new Date(values.eventEndTime).toISOString() ?? undefined}
            >
              <span slot="title">EventEnd Time</span>
            </IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem className="addSpaceAbove">
          <IonLabel position="stacked" className="ionLabel">
            Location
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="Enter full location"
            onIonChange={handleChange("location")}
            defaultValue={values.location}
            value={values.location}
          ></IonInput>
          <IonNote slot="error">Invalid Location</IonNote>
        </IonItem>
        <IonItem className="addSpaceAbove">
          <IonLabel position="stacked" className="ionLabel">
            Event Type
          </IonLabel>
          <IonSelect
            interface="action-sheet"
            placeholder="Event Type"
            onIonChange={handleChange("eventType")}
            defaultValue={values.eventType}
            value={values.eventType}
          >
            <IonSelectOption value="1">Public</IonSelectOption>
            <IonSelectOption value="0">Private</IonSelectOption>
          </IonSelect>
          <IonNote slot="error">Invalid Location</IonNote>
        </IonItem>
        <IonItem counter={true} className="addSpaceAbove">
          <IonLabel position="stacked" className="ionLabel">
            Description
          </IonLabel>
          <IonTextarea
            placeholder="Type something here"
            autoGrow={true}
            // value=""
            maxlength={200}
            onIonChange={handleChange("description")}
            defaultValue={values.description}
            value={values.description}
          ></IonTextarea>
          <IonNote slot="error">Description Cant be null</IonNote>
        </IonItem>
        <IonButton expand="full" onClick={Continue} className="addSpaceAbove">
          Next
          <IonIcon slot="end" icon={arrowForwardCircle}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
