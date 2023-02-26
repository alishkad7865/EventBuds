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
import { addFriend, getAllUsers } from "../../api/userApi";
import { UserContext } from "../../context/UserContext";
import { add_friend_status, Friend } from "../../types/Friends";
import "./ManageFriends.css";
setupIonicReact();

export default function AddFriends(props: any) {
  const [presentAlert] = useIonAlert();
  const [otherUsersList, setotherUsersList] = useState([]);
  const { token } = useContext(UserContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { friendsList, setfriendsList } = props;
  useEffect(() => {
    async function loadAllUsers() {
      let result = await getAllUsers(token);
      if (result) {
        setotherUsersList(result);
      }
    }
    loadAllUsers();
  }, []);
  useEffect(() => {
    if (toastMessage !== "") {
      setShowToast(true);
    }
  }, [toastMessage]);

  async function addFriendHandler(friend: Friend) {
    //set api endpoint to update friend
    let new_friend = add_friend_status(friend, "sent");
    await addFriend(token, new_friend).then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        setToastMessage(response.data);
        setfriendsList([...friendsList, new_friend]);
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
        <IonList class="itemBackground">
          {otherUsersList
            .filter((list: any) => {
              return (
                !friendsList.find((user: any) => user.USERID === list.USERID) &&
                list.USERID !== props.user.USERID
              );
            })
            .map((list: any) => {
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
                      <b>{list.FIRSTNAME + " " + list.LASTNAME} </b>
                    </h2>
                    <p>{list.EMAIL}</p>
                  </IonLabel>
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
                              addFriendHandler(list);
                            },
                          },
                        ],
                      })
                    }
                  >
                    Send Request
                  </IonButton>
                </IonItem>
              );
            })}
        </IonList>
      </IonHeader>
    </>
  );
}
