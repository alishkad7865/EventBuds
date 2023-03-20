import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import {
  checkmarkCircleOutline,
  chevronDownCircleOutline,
  closeCircleOutline,
} from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import {
  acceptEventInvitations,
  GetUserEventInvitations,
  rejectEventInvitations,
} from "../api/eventApi";
import { acceptFriendRequest, getFriends, removeFriend } from "../api/userApi";
import { UserContext } from "../context/UserContext";
import { add_friend_status, Friend } from "../types/Friends";

export default function NotificationModal(props: any) {
  const { token, userLoggedIn } = useContext(UserContext);
  const [friendsList, setfriendsList] = useState<any>([]);
  const [eventInvitations, setEventInvitations] = useState<any>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  async function loadFriends() {
    let result = await getFriends(token);
    if (result) {
      setfriendsList(result.data);
    }
  }
  async function loadInvitations() {
    let invitations = await GetUserEventInvitations(token);
    if (invitations) {
      setEventInvitations(invitations);
    }
  }
  useEffect(() => {
    if (userLoggedIn) {
      loadFriends();
      loadInvitations();
    }
  }, [userLoggedIn]);

  useEffect(() => {
    if (toastMessage !== "") {
      setShowToast(true);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (userLoggedIn) {
      loadFriends();
      loadInvitations();
    }
  }, [toastMessage]);
  async function acceptFriendRequestHandler(friend: Friend) {
    //set api endpoint to update friend
    let new_friend = add_friend_status(friend, "sent");
    await acceptFriendRequest(token, new_friend).then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        setToastMessage(response.data.message);
        setfriendsList([...friendsList, new_friend]);
      } else {
        setToastMessage("Request Failed, Try Again!");
      }
    });
  }
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      loadFriends();
      loadInvitations();
      event.detail.complete();
    }, 3000);
  }
  async function removeFriendHandler(friend: Friend) {
    //set api endpoint to update friend
    await removeFriend(token, friend).then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        setToastMessage(response.data.message);
      } else {
        setToastMessage("Request Failed, Try Again!");
      }
    });
  }
  async function declineInvitationHandler(invitationId: number) {
    await rejectEventInvitations(token, invitationId).then((response: any) => {
      if (response !== null) {
        setToastMessage(response.message);
      } else {
        setToastMessage("Request Failed, Try Again!");
      }
    });
  }

  async function acceptInvitationHandler(invitationId: number) {
    await acceptEventInvitations(token, invitationId).then((response: any) => {
      if (response !== null) {
        setToastMessage(response.message);
      } else {
        setToastMessage("Request Failed, Try Again!");
      }
    });
  }

  return userLoggedIn ? (
    <IonModal
      ref={props.modal}
      trigger={"notification-modal" + props.pageName}
      id={"notification-modal" + props.pageName}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notfications</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => props.dismiss()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>

        <p className="ion-text-center">Pull down to refresh Notifications.</p>
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

        {friendsList.filter((list: any) => list.STATUS === "requested")
          .length === 0 &&
          eventInvitations.length === 0 && (
            <IonGrid>
              <IonRow class="ion-justify-content-center">
                <IonImg
                  class="icon-svg"
                  src="assets/svg/notificationBell.svg"
                  alt="notifications"
                />
              </IonRow>
              <IonRow class="ion-justify-content-center">
                <h2 className="icon-svg">Hurray</h2>
              </IonRow>
              <IonRow class="ion-justify-content-center">
                <h4 className="icon-svg">
                  you don't have more notification to review.
                </h4>
              </IonRow>
            </IonGrid>
          )}
        <IonList>
          {friendsList.map((list: any) => {
            if (list.STATUS === "requested")
              return (
                <IonItem key={list.EMAIL + "_friendlist"}>
                  <IonButton
                    class="NotiModalButtons"
                    fill="outline"
                    onClick={() => removeFriendHandler(list)}
                  >
                    No
                    <IonIcon icon={closeCircleOutline}></IonIcon>
                  </IonButton>
                  <IonAvatar>
                    <img
                      alt="Silhouette of a person's head"
                      src="https://ionicframework.com/docs/img/demos/avatar.svg"
                    />
                  </IonAvatar>
                  <IonLabel>
                    <h6 className="labelColour ion-text-capitalize ion-text-wrap">
                      <b className="labelColour">
                        {list.FIRSTNAME + " " + list.LASTNAME + " "}
                      </b>
                      has requested to be friends with you
                    </h6>
                    <p>{list.EMAIL}</p>
                  </IonLabel>
                  <IonButton
                    class="NotiModalButtons"
                    fill="outline"
                    slot="end"
                    onClick={() => acceptFriendRequestHandler(list)}
                  >
                    Yes
                    <IonIcon icon={checkmarkCircleOutline}></IonIcon>
                  </IonButton>
                </IonItem>
              );
          })}

          {eventInvitations?.map((list: any) => {
            return (
              <IonItem key={list.INVITEID + ""}>
                <IonButton
                  class="NotiModalButtons"
                  fill="outline"
                  onClick={() => declineInvitationHandler(list.INVITEID)}
                >
                  Decline
                  <IonIcon icon={closeCircleOutline}></IonIcon>
                </IonButton>

                {list.ISHELPER ? (
                  <IonLabel>
                    <h6 className="labelColour ion-text-capitalize ion-text-wrap">
                      <b className="labelColour">
                        {list.FIRSTNAME + " " + list.LASTNAME + " "}
                      </b>
                      has requested help with
                      <b className="labelColour"> {list.EVENTTITLE}</b> event.
                    </h6>
                    <p>{list.EMAIL}</p>
                  </IonLabel>
                ) : (
                  <IonLabel>
                    <h6 className="labelColour ion-text-capitalize ion-text-wrap">
                      <b className="labelColour">
                        {list.FIRSTNAME + " " + list.LASTNAME + " "}
                      </b>
                      has invited you to{" "}
                      <b className="labelColour"> {list.EVENTTITLE} </b> event.
                    </h6>
                    <p>{list.EMAIL}</p>
                  </IonLabel>
                )}
                <IonButton
                  class="NotiModalButtons"
                  fill="outline"
                  slot="end"
                  onClick={() => acceptInvitationHandler(list.INVITEID)}
                >
                  Accept
                  <IonIcon icon={checkmarkCircleOutline}></IonIcon>
                </IonButton>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonModal>
  ) : (
    <></>
  );
}
