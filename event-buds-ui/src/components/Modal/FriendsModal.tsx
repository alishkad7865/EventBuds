import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";

setupIonicReact();

export default function FriendsModal(props: any) {
  return (
    <IonModal isOpen={props.isOpen} ref={props.modal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => props.setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="GiantAvatar">
          {" "}
          <img
            style={{
              height: "200px",
              borderRadius: "50%",
            }}
            alt="Silhouette of a person's head"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </div>
        <h1 className="ion-text-center ion-text-capitalize">
          {" "}
          <b className="ion-text-center ion-text-capitalize">
            {props.list.FIRSTNAME + " " + props.list.LASTNAME}{" "}
          </b>
        </h1>
        <h6 className="ion-text-center"> Email: {props.list.EMAIL} </h6>
      </IonContent>
    </IonModal>
  );
}
