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
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getUserEvent } from "../../api/eventApi";
import { getUser } from "../../api/userApi";
import "./profile.css";
export default function Profile(props: any) {
  const [user, setUser] = useState({
    ADDRESS: String,
    BIODATA: String,
    EMAIL: String,
    FIRSTNAME: String,
    FRIENDS: String,
    LASTNAME: String,
    SEX: String,
    USERID: Number,
  });

  const [eventCount, setEventCount] = useState(0);
  const [friendsCount, setFriendsCount] = useState(0);
  async function loadUserData() {
    let result = await getUser(1);
    if (result) {
      setUser(result);
      setFriendsCount(JSON.parse(result.FRIENDS).length);
    }
  }
  async function loadUserEvents() {
    let result = await getUserEvent(1);
    if (result) {
      setEventCount(result.length);
    }
  }
  useEffect(() => {
    loadUserData();
    loadUserEvents();
  }, []);
  return (
    <IonPage>
      <IonContent>
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
                    <h1>test lastname</h1>
                  </IonCardTitle>
                  <IonCardSubtitle class="ion-text-center ion-text-capitalize">
                    <h6>
                      Bio:<b>{user.BIODATA.toString()}</b>
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
                    Email: <b>{user.EMAIL.toString()}</b>
                  </h3>
                  <br />
                  <br />
                  <h3>
                    Address: <b>{user.ADDRESS.toString()}</b>
                  </h3>
                  <br />
                  <br />
                  <h3>
                    Sex: <b>{user.SEX.toString()}</b>
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
