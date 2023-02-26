import {
  IonAvatar,
  IonButton,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonToast,
  IonToolbar,
  setupIonicReact,
  useIonAlert,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { getFriends, removeFriend } from "../../api/userApi";
import { UserContext } from "../../context/UserContext";
import { Friend } from "../../types/Friends";
import "./ManageFriends.css";
setupIonicReact();

export default function MyFriends(props: any) {
  const [presentAlert] = useIonAlert();
  const { token } = useContext(UserContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { friendsList, setfriendsList } = props;
  useEffect(() => {
    async function loadFriends() {
      let result = await getFriends(token);
      console.log(result.data);
      if (result) {
        setfriendsList(result.data);
      }
    }
    loadFriends();
  }, []);
  useEffect(() => {
    async function loadFriends() {
      let result = await getFriends(token);
      console.log(result.data);
      if (result) {
        setfriendsList(result.data);
      }
    }
    loadFriends();
  }, [toastMessage]);
  useEffect(() => {
    if (toastMessage !== "") {
      setShowToast(true);
    }
  }, [toastMessage]);
  async function removeFriendHandler(friend: Friend) {
    //set api endpoint to update friend
    await removeFriend(token, friend).then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        setToastMessage(response.data);
      } else {
        setToastMessage("Request Failed, Try Again!");
      }
    });
  }
  return (
    <>
      <IonHeader>
        <IonToolbar class="toolbarMargin">
          <IonSearchbar class="searchbarBorder"></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonToast
        isOpen={showToast}
        position="top"
        onDidDismiss={() => {
          setShowToast(false);
          setToastMessage("");
        }}
        message={toastMessage}
        duration={3000}
      />
      <IonList>
        {friendsList.length === 0 && (
          <h5 className="ion-text-center labelColour">No Friends Added!</h5>
        )}
        {friendsList.map((list: any) => {
          return (
            <IonItem class="itemBackground" key={list.EMAIL + "_friendlist"}>
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
              {list.STATUS === "accepted" ? (
                <IonButton
                  onClick={() =>
                    presentAlert({
                      header: "Are you sure?",
                      cssClass: "custom-alert",
                      mode: "ios",
                      buttons: [
                        {
                          text: "Cancel",
                          role: "Cancel",
                          cssClass: "alert-button-cancel",
                          handler: () => {
                            console.log("Cancelled");
                          },
                        },
                        {
                          text: "Yes",
                          role: "confirm",
                          cssClass: "alert-button-confirm",
                          handler: () => {
                            removeFriendHandler(list);
                          },
                        },
                      ],
                    })
                  }
                >
                  Remove Friend
                </IonButton>
              ) : (
                <div className="addChip">
                  <IonButton disabled expand="full" shape="round">
                    {list.STATUS}
                  </IonButton>
                </div>
              )}
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
}
