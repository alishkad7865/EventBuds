import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import { useEffect, useState } from 'react';
import ExploreContainer from "../../components/ExploreContainer";

export default function ManageFriends(props:any) {
//   const [demoData, setDemoData] = useState([]);
//   useEffect(()=>{
//     //use logs for hooks
//   },[demoData]);

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Create Event</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Manage Friends</IonTitle>
          </IonToolbar>
        </IonHeader>
        
      </IonContent>
    </IonPage>
  );
};

