import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonNote, IonPage, IonRouterOutlet, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { arrowForwardCircle } from 'ionicons/icons';
import { Route } from 'react-router';
import AddMembers from './AddMembers';
import "./CreateEvent.css";

export default function CreateEvent(props:any) {
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
      <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/AddMembers" component={AddMembers} />
      </IonRouterOutlet>
      </IonReactRouter>
      <IonContent className='container'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create Event</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h2>CREATE EVENT</h2>
        <IonItem>
          <IonLabel position="stacked" className='ionLabel'>Event title</IonLabel>
          <IonInput clearInput={true} placeholder="Enter event title"></IonInput>
          <IonNote slot="helper">Enter a valid Title</IonNote>
          <IonNote slot="error">Invalid Title</IonNote> 
        </IonItem>
      {/* <IonDatetime presentation="date-time" preferWheel={true}><span slot="title">Select a Starting Date Time</span></IonDatetime> */}
        <IonItem>
          <IonLabel position="stacked" className='dateLabel'>Start Time</IonLabel>
          <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
          
          <IonModal keepContentsMounted={true}>
            <IonDatetime id="datetime"><span slot="title">End Time</span></IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked" className='dateLabel'>End Time</IonLabel>
          <IonDatetimeButton datetime="EndTime"></IonDatetimeButton>
          
          <IonModal keepContentsMounted={true}>
            <IonDatetime id="EndTime"><span slot="title">End Time</span></IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked" className='ionLabel'>Location</IonLabel>
          <IonInput clearInput={true} placeholder="Enter full location"></IonInput>
          <IonNote slot="error">Invalid Location</IonNote> 
        </IonItem>
        <IonItem >
          <IonLabel position="stacked" className='ionLabel'>Event Type</IonLabel>
            <IonSelect interface="action-sheet" placeholder="Event Type">
              <IonSelectOption value="public">Public</IonSelectOption>
              <IonSelectOption value="private">Private</IonSelectOption>
            </IonSelect>
          <IonNote slot="error">Invalid Location</IonNote> 
        </IonItem>
        <IonItem counter={true}>
          <IonLabel position="stacked" className='ionLabel'>Description</IonLabel>
          <IonTextarea
            placeholder="Type something here"
            autoGrow={true}
            value=""
            maxlength={200}
          ></IonTextarea>
          <IonNote slot="error">Description Cant be null</IonNote> 
        </IonItem>
        <IonButton expand='full' href="/AddMembers">
          Next
          <IonIcon slot="end" icon={arrowForwardCircle}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

