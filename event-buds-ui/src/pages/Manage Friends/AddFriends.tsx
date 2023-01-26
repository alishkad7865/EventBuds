import {
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
