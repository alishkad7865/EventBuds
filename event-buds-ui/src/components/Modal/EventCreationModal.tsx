import {
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonFooter,
  IonHeader,
} from "@ionic/react";

export default function EventCreationModal(props: any) {
  function dismiss() {
    props.setOpen(false);
    props.modal.current?.dismiss();
    setEventCreatedModalData({ eventTitle: "", eventType: "" });
  }
  const { eventType, eventTitle, setEventCreatedModalData } = props;
  return (
    <IonModal
      id="eventCreation-modal"
      ref={props.modal}
      isOpen={props.open}
      trigger={"eventCreation-modal"}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Event Created Successfully</IonTitle>
          <IonButtons slot="end">
            <IonButton color="light" onClick={() => dismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h4 className="ion-padding">
          An{" "}
          <i>
            <b className="ion-text-capitalize">{eventType} </b>
          </i>
          event titled{" "}
          <i>
            <b className="ion-text-capitalize">{eventTitle} </b>
          </i>{" "}
          has been successfully Created. Do you want to check it out?
        </h4>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            slot="start"
            className="saveModalButton"
            expand="block"
            shape="round"
            onClick={() => props.setOpen(false)}
            routerLink="/Home"
          >
            Go to My Events
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
}
