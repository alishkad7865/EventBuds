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
import { Route, withRouter } from "react-router";
import Tab2 from "../Tab2";
import UserProfile from "./UserProfile";

setupIonicReact();





export default function MyFriends() {
  const [presentAlert] = useIonAlert();
  const [segment, setSegment] = useState("uProfile");
  
  function handleSegmentChange(value: any) {
    if (value === "uProfile") {
      return <UserProfile />;
    } else if (value === "abc") {
      return 
    }
  }
  return (
    <>
      <IonHeader>
        <IonToolbar></IonToolbar>
        <IonToolbar>
          <IonSearchbar></IonSearchbar>
        </IonToolbar>

        

        <IonList>
          <IonItem>
            <IonLabel> Mary</IonLabel>
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

         
            
          <IonItem>
            <IonLabel>Megan</IonLabel>
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

          <IonItem>
            <IonLabel>Morgan</IonLabel>
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
          <IonItem>
            <IonLabel>Mark</IonLabel>
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
          <IonItem>
            <IonLabel>Mason</IonLabel>
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
        </IonList>
      </IonHeader>
    </>
  );
}
