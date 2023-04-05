import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";

setupIonicReact();

export default function FriendsModal(props: any) {
  return (
    <IonModal
      isOpen={props.isOpen}
      ref={props.modal}
      onIonModalWillDismiss={() => props.setIsOpen(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => props.setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow class="ion-justify-content-center">
          <IonCol className=" ion-justify-content-center GiantAvatar">
            <img
              style={{
                height: "200px",
                borderRadius: "50%",
              }}
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonCol>
        </IonRow>
        <h1 className="ion-text-center ion-text-capitalize">
          {" "}
          <p className="ion-text-center ion-text-capitalize">
            {props.list.FIRSTNAME + " " + props.list.LASTNAME}{" "}
          </p>
        </h1>
        <h3 className="ion-text-center">
          {" "}
          <b>user name:</b> {props.list.USERNAME}{" "}
        </h3>
        <h3 className="ion-text-center">
          {" "}
          <b>email:</b> {props.list.EMAIL}{" "}
        </h3>
      </IonContent>
    </IonModal>
  );
}
