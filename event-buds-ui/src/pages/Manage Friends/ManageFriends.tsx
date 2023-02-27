import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useContext, useState } from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import MyFriends from "./MyFriends";
import AddFriends from "./AddFriends";
import Menu from "../../components/Menu";
import { UserContext } from "../../context/UserContext";

export default function ManageFriends(props: any) {
  const [segment, setSegment] = useState("Friends");
  const { user } = useContext(UserContext);
  const [friendsList, setfriendsList] = useState<any>([]);

  function handleSegmentChange(value: any) {
    if (value === "Friends") {
      return (
        <MyFriends setfriendsList={setfriendsList} friendsList={friendsList} />
      );
    } else if (value === "Add") {
      return (
        <AddFriends
          user={user}
          setfriendsList={setfriendsList}
          friendsList={friendsList}
        />
      );
    }
  }

  return (
    <IonPage>
      <Menu page={"manage friends"} />
      <IonContent>
        <IonSegment
          value={segment}
          onIonChange={(e: any) => {
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
        {handleSegmentChange(segment)}
      </IonContent>
    </IonPage>
  );
}
