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
import { getFriends, removeFriend } from "../../api/userApi";
import { useContext, useEffect, useRef, useState } from "react";
import FriendsModal from "../../components/FriendsModal";
import { UserContext } from "../../context/UserContext";
import { Friend } from "../../types/Friends";
import "./ManageFriends.css";
import { chevronDownCircleOutline } from "ionicons/icons";

setupIonicReact();

export default function MyFriends(props: any) {
  const [presentAlert] = useIonAlert();
  const { token, userLoggedIn } = useContext(UserContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { friendsList, setfriendsList } = props;
  const [modalFriendData, setModalFriendData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  let [results, setResults] = useState([...friendsList]);

  const handleChange = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(
      friendsList.filter(
        (friend: any) =>
          friend.FIRSTNAME.toLowerCase().indexOf(query) > -1 ||
          friend.LASTNAME.toLowerCase().indexOf(query) > -1 ||
          friend.EMAIL.toLowerCase().indexOf(query) > -1 ||
          friend.USERNAME.toLowerCase().indexOf(query) > -1
      )
    );
  };

  async function loadFriends() {
    setIsLoading(true);
    let result = await getFriends(token);
    if (result) {
      setfriendsList(result.data);
    }
    setIsLoading(false);
  }

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      loadFriends();
      event.detail.complete();
    }, 3000);
  }

  useEffect(() => {
    setResults(friendsList);
  }, [friendsList]);

  useEffect(() => {
    loadFriends();
  }, []);

  useEffect(() => {
    if (userLoggedIn) {
      loadFriends();
    }
  }, [toastMessage, userLoggedIn]);

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
            debounce={1000}
            placeholder="Search by First name, Last name or Email"
            onIonChange={(ev) => handleChange(ev)}
          ></IonSearchbar>
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
      <FriendsModal
        expand="block"
        modal={modal}
        isOpen={isOpen}
        list={modalFriendData}
        setIsOpen={setIsOpen}
      />
      {isLoading ? (
        <IonSpinner name="crescent"></IonSpinner>
      ) : (
        <IonList>
          {friendsList.length === 0 ? (
            <IonGrid>
              <IonRow class="ion-justify-content-center">
                <IonImg
                  class="icon-svg"
                  src="assets/svg/friends.svg"
                  alt="folder-empty"
                />
              </IonRow>
              <IonRow class="ion-justify-content-center">
                <h2 className="icon-svg">No Friends Added!</h2>
              </IonRow>
              <IonRow class="ion-justify-content-center">
                <h4 className="icon-svg">click Add button to add friends</h4>
                <IonButton
                  className="ion-padding"
                  onClick={() => props.setSegment("Add")}
                >
                  Add
                </IonButton>
              </IonRow>
            </IonGrid>
          ) : friendsList.length >= 0 && results.length > 0 ? (
            results?.map((list: any) => {
              return (
                <IonItem
                  class="itemBackground"
                  key={list.EMAIL + "_friendlist"}
                >
                  <IonAvatar
                    slot="start"
                    onClick={() => {
                      setIsOpen(true);
                      setModalFriendData(list);
                    }}
                  >
                    <img
                      alt="Silhouette of a person's head"
                      src="https://ionicframework.com/docs/img/demos/avatar.svg"
                    />
                  </IonAvatar>

                  <IonLabel
                    onClick={() => {
                      setIsOpen(true);
                      setModalFriendData(list);
                    }}
                  >
                    <h6 className="labelColour ion-text-capitalize">
                      {" "}
                      <b className="labelColour">
                        {list.FIRSTNAME + " " + list.LASTNAME}{" "}
                      </b>
                    </h6>
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
                <h2 className="icon-svg">No Friends Found!</h2>
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
    </>
  );
}
