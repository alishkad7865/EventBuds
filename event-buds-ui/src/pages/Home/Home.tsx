import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getUser } from "../../api/userApi";

export default function Home(props: any) {
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

  async function loadUserData() {
    let result = await getUser(1);
    if (result) {
      setUser(result);
    }
  }
  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <IonPage>
      <IonContent className="container">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create Event</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h2>
          Welcome <>{user.FIRSTNAME}</>
        </h2>
      </IonContent>
    </IonPage>
  );
}
