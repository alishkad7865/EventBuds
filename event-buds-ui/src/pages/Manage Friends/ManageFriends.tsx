import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useState } from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import MyFriends from "./MyFriends";
import AddFriends from "./AddFriends";

export default function ManageFriends(props: any) {
  const [segment, setSegment] = useState("Friends");
  function handleSegmentChange(value: any) {
    if (value === "Friends") {
      return <MyFriends />;
    } else if (value === "Add") {
      return <AddFriends />;
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSegment
            value={segment}
            onIonChange={(e: any) => {
              console.log(e.detail.value);
              setSegment(e.detail.value);
            }}
            mode="ios"
          >
            <IonSegmentButton class="FriendsTabs" value="Friends">
              {" "}
              <b>My Friends</b>{" "}
            </IonSegmentButton>
            <IonSegmentButton class="FriendsTabs" value="Add">
              {" "}
              <b>Add Friends</b>{" "}
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>{handleSegmentChange(segment)}</IonContent>
    </IonPage>
  );
}
