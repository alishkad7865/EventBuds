import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
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

import { addCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getAllUsers, getUser } from "../../api/userApi";
import "./ManageFriends.css";
setupIonicReact();

export default function AddFriends(props: any) {
  const [presentAlert] = useIonAlert();
  const [otherUsersList, setotherUsersList] = useState([]);
  const [friendsList, setfriendsList] = useState([]);
const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function loadAllUsers() {
      let result = await getAllUsers(1);
      console.log(result);
      if (result) {
        setotherUsersList(result);
      }
      
      console.log(otherUsersList);
    }

    loadAllUsers();
  }, []);
  return (
    <>
      <IonHeader>
        <IonToolbar class="toolbarMargin">
          <IonSearchbar class="searchbarBorder"></IonSearchbar>
        </IonToolbar>

        <IonList class="itemBackground">
          {otherUsersList.map((list: any) => {
            return (
              <IonItem class="itemBackground" key={list.EMAIL + props.title}>
                <IonAvatar slot= "start" onClick={() => setIsOpen(true)}>
                  <img
                    alt="Silhouette of a person's head"
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </IonAvatar>
                <IonLabel onClick={() => setIsOpen(true)}>
                  <h2 className="ion-text-capitalize">
                    {" "}
                    <b>{list.FIRSTNAME + " " + list.LASTNAME} </b>
                  </h2>
                  <p>{list.EMAIL}</p>{" "}
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
                  Add Friend
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
      </IonHeader>
    </>
  );
}
