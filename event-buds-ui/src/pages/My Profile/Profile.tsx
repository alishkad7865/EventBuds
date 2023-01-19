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
import "./profile.css";
export default function Profile() {
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
                      Bio:<b>This is my biodata</b>
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
                    Email: <b>a@g.ca</b>
                  </h3>
                  <br />
                  <br />
                  <h3>
                    Address: <b>128 Regina Ave</b>
                  </h3>
                  <br />
                  <br />
                  <h3>
                    Sex: <b>Male</b>
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
                    <b>7</b>
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
                    <b>6</b>
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
