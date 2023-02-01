import {
  IonAvatar,
  IonButton,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
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
              <IonAvatar slot="start">
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>
              <IonLabel>
                <h2 className="labelColour ion-text-capitalize">
                  {" "}
                  <b className="labelColour">
                    {list.FIRSTNAME + " " + list.LASTNAME}{" "}
                  </b>
                </h2>
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
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
}
