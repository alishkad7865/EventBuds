import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getDemoTotal } from "../api/demoApi";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [demoData, setDemoData] = useState([]);
  async function getDemoData() {
    var result = await getDemoTotal("Tab 1");
    if (result) {
      setDemoData(result);
    }
  }
  useEffect(() => {
    //use logs for hooks
  }, [demoData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
        <p>This is tab 1 and Welcome to the Event bud app</p>
        <button onClick={getDemoData}> Get Data!</button>
        <h3>
          {demoData.length > 0 ? "API CLICK Data! " + demoData[0][2] : ""}
        </h3>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
