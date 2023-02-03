import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { useState } from "react";

setupIonicReact();

export default function MyFriends(props: any) {
  const [friendsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IonList>
        {friendsList.map((list: any) => {
          return (
            <IonModal isOpen={isOpen}>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Profile</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => setIsOpen(false)}>
                      Close
                    </IonButton>
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
                    {list.FIRSTNAME + " " + list.LASTNAME}{" "}
                  </b>
                </h1>
                <h6 className="ion-text-center"> Email: {list.EMAIL} </h6>
              </IonContent>
            </IonModal>
          );
        })}
      </IonList>
    </>
  );
}
