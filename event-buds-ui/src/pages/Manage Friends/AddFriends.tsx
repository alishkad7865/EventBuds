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
  import { addCircle } from "ionicons/icons"
  
  setupIonicReact();
  
  
  
  
  
  export default function AddFriends() {
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
              <IonLabel> John</IonLabel>
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
                Add Friend
              </IonButton>
            </IonItem>
  
           
              
            <IonItem>
              <IonLabel>Jenny</IonLabel>
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
                Add Friend
              </IonButton>
            </IonItem>
  
            <IonItem>
              <IonLabel>Jackie</IonLabel>
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
                Add Friend
              </IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Jia</IonLabel>
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
                Add Friend
              </IonButton>
            </IonItem>
            <IonItem>
                
              <IonLabel>Jordan</IonLabel>
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
                
               <IonIcon src="/path/to/external/file.svg" name="add-circle"></IonIcon> Add Friend
              </IonButton>
            </IonItem>
          </IonList>
        </IonHeader>
      </>
    );
  }
  