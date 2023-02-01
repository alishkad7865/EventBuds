import {
  IonAvatar,
  IonButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
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

  useEffect(() => {
    async function loadAllUsers() {
      let result = await getAllUsers(1);
      if (result) {
        setotherUsersList(result);
      }
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
                <IonAvatar slot="start">
                  <img
                    alt="Silhouette of a person's head"
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </IonAvatar>
                <IonLabel>
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
              </IonItem>
            );
          })}
        </IonList>
      </IonHeader>
    </>
  );
}
