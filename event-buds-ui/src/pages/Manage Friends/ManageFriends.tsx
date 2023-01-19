import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonContent,
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
  //   useEffect(()=>{
  //     //use logs for hooks
  //   },[demoData]);
  function handleSegmentChange(value: any) {
    if (value === "Friends") {
      return <MyFriends />;
    } else if (value === "Add") {
      return <AddFriends/>;
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
          >
            <IonSegmentButton value="Friends"> My Friends</IonSegmentButton>
            <IonSegmentButton value="Add">Add Friends</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>{handleSegmentChange(segment)}</IonContent>
    </IonPage>
  );
}

