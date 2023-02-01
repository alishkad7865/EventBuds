import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  useIonAlert,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getUser } from "../../api/userApi";
import "./ManageFriends.css";

setupIonicReact();

export default function MyFriends(props: any) {
  const [presentAlert] = useIonAlert();

  const [friendsList, setfriendsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      let result = await getUser(1);
      if (result) {
        setfriendsList(JSON.parse(result.FRIENDS));
      }
    }

    loadUserData();
  }, []);
  return (
    <>
      <IonHeader>
        <IonToolbar class="toolbarMargin">
          <IonSearchbar class="searchbarBorder"></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonList>
        {friendsList.map((list: any) => {
          return (
            <IonItem class="itemBackground" key={list.EMAIL + props.title}>
              <IonAvatar slot="start" onClick={() => setIsOpen(true)}>
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>

              <IonLabel onClick={() => setIsOpen(true)}>
                <h6 className="labelColour ion-text-capitalize">
                  {" "}
                  <b className="labelColour">
                    {list.FIRSTNAME + " " + list.LASTNAME}{" "}
                  </b>
                </h6>
                <p>{list.EMAIL}</p>
              </IonLabel>

              <IonButton
                onClick={() =>
                  presentAlert({
                    header: "Are you sure?",
                    cssClass: "custom-alert",
                    buttons: [
                      {
                        text: "Yes",
                      },

                      {
                        text: "Cancel",
                      },
                    ],
                  })
                }
              >
                Remove Friend
              </IonButton>
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
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
}
