import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import { chevronDownCircleOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { GetUserEvents } from "../../api/eventApi";
import Menu from "../../components/Menu";
import { UserContext } from "../../context/UserContext";
import "./profile.css";
export default function Profile(props: any) {
  const { user, token, userLoggedIn } = useContext(UserContext);

  const [eventCount, setEventCount] = useState(0);
  const [friendsCount, setFriendsCount] = useState(0);

  async function loadUserEvents() {
    let result = await GetUserEvents(token);
    if (result) {
      setEventCount(result.length);
    }
  }
  async function loadFriendsCount() {
    user?.FRIENDS &&
      setFriendsCount(
        user?.FRIENDS?.filter((user: any) => user.STATUS === "accepted").length
      );
  }
  useEffect(() => {
    loadFriendsCount();
    loadUserEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoggedIn]);

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      loadFriendsCount();
      loadUserEvents();
      event.detail.complete();
    }, 3000);
  }
  return (
    <IonPage>
      <Menu page={"profile"} />
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="auto" class="ion-justify-content-center">
              <div className="profileCard">
                <div className="profilePic">
                  <img
                    style={{
                      height: "200px",
                      borderRadius: "50%",
                    }}
                    alt="Silhouette of a person's head"
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </div>
                <IonCardHeader>
                  <IonCardTitle class="ion-text-center ion-text-capitalize">
                    <h1>
                      {" "}
                      {`${user?.FIRSTNAME ?? ""} ${user?.LASTNAME ?? ""}`}
                    </h1>
                  </IonCardTitle>
                  <IonCardSubtitle class="ion-text-center ion-text-capitalize">
                    <h6>
                      Bio:<b>{user?.BIO ?? ""}</b>
                    </h6>
                  </IonCardSubtitle>
                </IonCardHeader>
              </div>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeLg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <h2>About</h2>
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <h3>
                    Email: <b>{user?.EMAIL.toString()}</b>
                  </h3>
                  <br />
                  <br />
                  <h3>
                    Address: <b>{user?.ADDRESS?.toString() ?? ""}</b>
                  </h3>
                  <br />
                  <br />
                  <h3>
                    Sex: <b>{user?.SEX?.toString() ?? ""}</b>
                  </h3>
                  <br />
                  <br />
                </IonCardContent>
              </IonCard>
            </IonCol>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <IonCol>
                <IonCard style={{ minWidth: "300px" }}>
                  <IonCardHeader>
                    <IonCardTitle>
                      <h2>Total Events </h2>
                    </IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    <b>{eventCount}</b>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard style={{ minWidth: "300px" }}>
                  <IonCardHeader>
                    <IonCardTitle>
                      <h2>Friends</h2>
                    </IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    <b>{friendsCount}</b>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
