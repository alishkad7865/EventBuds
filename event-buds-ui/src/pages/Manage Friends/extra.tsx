import {
  IonApp,
  IonButton,
  IonCheckbox,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRouterOutlet,
  IonSearchbar,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  useIonAlert,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { people, person, star } from "ionicons/icons";
import { useState } from "react";
import { Route } from "react-router";
import UserProfile from "./UserProfile";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/UserProfile">
            <UserProfile />
          </Route>
        </IonRouterOutlet>
        <IonTabButton tab="UserProfile" href="/UserProfile">
          <IonIcon icon={person} />
          <IonLabel>My Profile</IonLabel>
        </IonTabButton>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default function MyFriends() {
  const [presentAlert] = useIonAlert();
  const [segment, setSegment] = useState("uProfile");

  function handleSegmentChange(value: any) {
    if (value === "uProfile") {
      return <UserProfile />;
    } else if (value === "abc") {
      return;
    }
  }
  return (
    <>
      <IonHeader>
        <IonToolbar></IonToolbar>
        <IonToolbar>
          <IonSearchbar></IonSearchbar>
        </IonToolbar>

        <IonLabel>Users</IonLabel>

        <IonList>
          <IonItem>
            <IonLabel> Mary</IonLabel>
            <IonButton
              onClick={() =>
                presentAlert({
                  header: "Remove Friend?",
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
              ...
            </IonButton>
          </IonItem>

          <IonTabButton href="/UserProfile">
            <IonLabel>Megan</IonLabel>
          </IonTabButton>

          <IonItem>
            <IonLabel>Morgan</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Mark</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Mason</IonLabel>
          </IonItem>
        </IonList>
      </IonHeader>
    </>
  );
}
