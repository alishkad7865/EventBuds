import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
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

import "./CreateEvent.css";

export default function EventInfo(props: any) {
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
    console.log("in event info start");
  }, []);
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
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Create Event</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      {/* <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/AddMembers" component={AddMembers} />
        </IonRouterOutlet>
      </IonReactRouter> */}
      <IonContent className="container">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create Event</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h2>CREATE EVENT</h2>
        <IonItem className="addSpaceAbove">
          <IonLabel position="stacked" className="ionLabel">
            Event title
          </IonLabel>
          <IonInput
            clearInput={true}
            placeholder="Enter event title"
            onIonChange={handleChange("eventTitle")}
            defaultValue={values.eventTitle}
          ></IonInput>
          <IonNote slot="helper">Enter a valid Title</IonNote>
          <IonNote slot="error">Invalid Title</IonNote>
        </IonItem>
        {/* <IonDatetime presentation="date-time" preferWheel={true}><span slot="title">Select a Starting Date Time</span></IonDatetime> */}
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
