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
import { useEffect, useRef, useState } from "react";
import Menu from "../Menu";
import "../../pages/Create Event/CreateEvent.css";
import { LocaleDateTimeISOFormat } from "../../Utils/ArrayUtil";
import EventCreationModal from "../Modal/EventCreationModal";

export default function EventInfoForm(props: any) {
  const [allFieldValid, setAllFieldValid] = useState(true);
  const modal = useRef<HTMLIonModalElement>(null);
  function Continue(e: any) {
    e.preventDefault();
    props.nextStep();
  }
  const {
    values,
    handleChange,
    ValidateAllFields,
    isTouched,
    markTouched,
    validator,
  } = props;
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (props.toastMessage) {
      setShowToast(true);
    }
  }, [props.toastMessage]);
  useEffect(() => {
    if (ValidateAllFields() === false) {
      setAllFieldValid(false);
    } else setAllFieldValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validator]);
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
        <EventCreationModal
          triggerId="eventCreation-modal"
          modal={modal}
          open={props.eventCreatedModal}
          setOpen={props.setEventCreatedModal}
          eventType={
            parseInt(props.eventCreatedModalData.eventType) === 1
              ? "Public"
              : "Private"
          }
          eventTitle={props.eventCreatedModalData.eventTitle}
          setEventCreatedModalData={props.setEventCreatedModalData}
        />
        <IonItem
          fill="solid"
          counter={true}
          className={`addSpaceAbove ${validator.isTitleValid && "ion-valid"} ${
            validator.isTitleValid === false && "ion-invalid"
          } ${isTouched && "ion-touched"}`}
        >
          <IonLabel position="stacked" className="ionLabel">
            Event title
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="Enter event title"
            maxlength={50}
            onIonChange={handleChange("eventTitle")}
            onIonBlur={() => markTouched()}
            defaultValue={values.eventTitle}
            name="eventTitle"
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

          <IonModal keepContentsMounted={true} id={"date"}>
            <IonDatetime
              id="lastRegDate"
              name="lastRegDate"
              locale="en-GB"
              hourCycle="h12"
              min={LocaleDateTimeISOFormat(new Date().toISOString())}
              onIonChange={handleChange("lastRegDate")}
              value={values.lastRegDate}
              showDefaultButtons={true}
            >
              <span slot="title">Last Registration Date</span>
            </IonDatetime>
          </IonModal>
          <IonNote slot="helper">
            Enter Last Day and time for Registration
          </IonNote>
        </IonItem>
        <IonItem
          fill="solid"
          className={`addSpaceAbove ${
            validator.isStartDateValid && "ion-valid"
          } ${validator.isStartDateValid === false && "ion-invalid"} ${
            isTouched && "ion-touched"
          }`}
        >
          <IonLabel position="stacked" className="dateLabel">
            Event Start Time
          </IonLabel>
          <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

          <IonModal keepContentsMounted={true} id={"date"}>
            <IonDatetime
              id="datetime"
              name="eventStartTime"
              locale="en-GB"
              hourCycle="h12"
              min={
                LocaleDateTimeISOFormat(values.lastRegDate) ||
                LocaleDateTimeISOFormat(new Date().toISOString())
              }
              onIonBlur={() => markTouched()}
              onIonChange={handleChange("eventStartTime")}
              value={values.eventStartTime}
              showDefaultButtons={true}
            >
              <span slot="title">Event Start Time</span>
            </IonDatetime>
          </IonModal>
          <IonNote slot="helper">Enter Event Start Date and Time</IonNote>
          <IonNote slot="error">
            Event Start Time should be greater than Registration Time and less
            than Event End Time
          </IonNote>
        </IonItem>
        <IonItem
          fill="solid"
          className={`addSpaceAbove ${
            validator.isEndDateValid && "ion-valid"
          } ${validator.isEndDateValid === false && "ion-invalid"} ${
            isTouched && "ion-touched"
          }`}
        >
          <IonLabel position="stacked" className="dateLabel">
            Event End Time
          </IonLabel>
          <IonDatetimeButton datetime="EndTime"></IonDatetimeButton>

          <IonModal keepContentsMounted={true} id={"date"}>
            <IonDatetime
              id="EndTime"
              name="eventEndTime"
              locale="en-GB"
              hourCycle="h12"
              min={
                LocaleDateTimeISOFormat(values.eventStartTime) ||
                LocaleDateTimeISOFormat(new Date().toISOString())
              }
              onIonChange={handleChange("eventEndTime")}
              onIonBlur={() => markTouched()}
              value={values.eventEndTime}
              showDefaultButtons={true}
            >
              <span slot="title">Event End Time</span>
            </IonDatetime>
          </IonModal>
          <IonNote slot="helper">Enter Event End Date and Time</IonNote>
          <IonNote slot="error">
            Event End Time should be greater than Registration Time and Event
            Start Time
          </IonNote>
        </IonItem>
        <IonItem
          fill="solid"
          className={`addSpaceAbove ${
            validator.isLocationValid && "ion-valid"
          } ${validator.isLocationValid === false && "ion-invalid"} ${
            isTouched && "ion-touched"
          }`}
        >
          <IonLabel position="stacked" className="ionLabel">
            Location
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="Enter full location"
            name="location"
            onIonChange={handleChange("location")}
            onIonBlur={() => markTouched()}
            defaultValue={values.location}
            value={values.location}
          ></IonInput>
          <IonNote slot="error">Please Enter Event Location</IonNote>
          <IonNote slot="helper">Enter Valid Location</IonNote>
        </IonItem>
        <IonItem
          fill="solid"
          className={`addSpaceAbove ${
            validator.isEventTypeValid && "ion-valid"
          } ${validator.isEventTypeValid === false && "ion-invalid"} ${
            isTouched && "ion-touched"
          }`}
        >
          <IonLabel position="stacked" className="ionLabel">
            Event Type
          </IonLabel>
          <IonSelect
            interface="action-sheet"
            placeholder="Event Type"
            name="eventType"
            onIonChange={handleChange("eventType")}
            onIonBlur={() => markTouched()}
            defaultValue={values.eventType}
            value={values.eventType}
          >
            <IonSelectOption value="1">Public</IonSelectOption>
            <IonSelectOption value="0">Private</IonSelectOption>
          </IonSelect>
          <IonNote slot="error">Event Type cannot be undefined</IonNote>
          <IonNote slot="helper">Select Event Type</IonNote>
        </IonItem>
        <IonItem
          counter={true}
          fill="solid"
          className={`addSpaceAbove ${
            validator.isDescriptionValid && "ion-valid"
          } ${validator.isDescriptionValid === false && "ion-invalid"} ${
            isTouched && "ion-touched"
          }`}
        >
          <IonLabel position="stacked" className="ionLabel">
            Description
          </IonLabel>
          <IonTextarea
            placeholder="Type something here"
            autoGrow={true}
            name="description"
            maxlength={200}
            onIonChange={handleChange("description")}
            onIonBlur={() => markTouched()}
            defaultValue={values.description}
            value={values.description}
          ></IonTextarea>
          <IonNote slot="error">Description Cant be null</IonNote>
          <IonNote slot="helper">
            Please Enter short description about Event
          </IonNote>
        </IonItem>

        {!allFieldValid && (
          <IonItem className="addSpaceAbove" color="danger">
            <IonLabel>One or more Item is Invalid</IonLabel>
          </IonItem>
        )}
        <IonButton
          expand="full"
          onClick={Continue}
          className="addSpaceAbove"
          disabled={!allFieldValid}
        >
          Next
          <IonIcon slot="end" icon={arrowForwardCircle}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
