import {
  IonAvatar,
  IonButton,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonToast,
  IonToolbar,
  RefresherEventDetail,
  setupIonicReact,
  useIonAlert,
} from "@ionic/react";
import { chevronDownCircleOutline } from "ionicons/icons";

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
  const [isLoading, setIsLoading] = useState(false);
  const { friendsList, setfriendsList } = props;
  let [results, setResults] = useState([...otherUsersList]);

  const handleChange = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;

    query = target.value!.toLowerCase();

    setResults(
      otherUsersList?.filter(
        (friend: any) =>
          friend.FIRSTNAME.toLowerCase().indexOf(query) > -1 ||
          friend.LASTNAME.toLowerCase().indexOf(query) > -1 ||
          friend.EMAIL.toLowerCase().indexOf(query) > -1 ||
          friend.USERNAME.toLowerCase().indexOf(query) > -1
      )
    );
  };
  async function loadAllUsers() {
    setIsLoading(true);
    let result = await getAllUsers(token);
    if (result) {
      setotherUsersList(
        result?.filter(
          (friend: any) =>
            !friendsList.find((user: any) => user.USERID === friend.USERID) &&
            friend.USERID !== props.user?.USERID
        )
      );
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setResults(otherUsersList);
  }, [otherUsersList]);

  useEffect(() => {
    loadAllUsers();
  }, [toastMessage]);

  useEffect(() => {
    loadAllUsers();
  }, []);
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      loadAllUsers();
      event.detail.complete();
    }, 3000);
  }
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
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent
          pullingIcon={chevronDownCircleOutline}
          pullingText="Pull to refresh"
          refreshingSpinner="circles"
          refreshingText="Refreshing..."
        ></IonRefresherContent>
      </IonRefresher>
      <IonHeader>
        <IonToolbar class="toolbarMargin">
          <IonSearchbar
            class="searchbarBorder"
            placeholder="Search by First name, Last name or Email"
            debounce={1000}
            onIonChange={(ev) => handleChange(ev)}
          ></IonSearchbar>
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
        {isLoading ? (
          <IonSpinner name="crescent"></IonSpinner>
        ) : (
          <IonList class="itemBackground">
            {results.length > 0 ? (
              results?.map((list: any) => {
                return (
                  <IonItem
                    class="itemBackground"
                    key={list.EMAIL + props.title}
                  >
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
              })
            ) : (
              <IonGrid>
                <IonRow class="ion-justify-content-center">
                  <IonImg
                    class="icon-svg"
                    src="assets/svg/friends.svg"
                    alt="folder-empty"
                  />
                </IonRow>
                <IonRow class="ion-justify-content-center">
                  <h2 className="icon-svg">No Users Found!</h2>
                </IonRow>
                <IonRow class="ion-justify-content-center">
                  <h4 className="icon-svg">
                    Try Searching by different First name, Last name or Email
                  </h4>
                </IonRow>
              </IonGrid>
            )}
          </IonList>
        )}
      </IonHeader>
    </>
  );
}
