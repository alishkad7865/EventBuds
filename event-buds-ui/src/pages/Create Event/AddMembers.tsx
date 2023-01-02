import { IonBackButton, IonButton, IonButtons, IonChip, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonNote, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { arrowForwardCircle, star } from 'ionicons/icons';
import "./CreateEvent.css";

export default function AddMembers(props:any) {
//   const [demoData, setDemoData] = useState([]);
//   useEffect(()=>{
//     //use logs for hooks
//   },[demoData]);

  return (
      <IonContent fullscreen className='container'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add Members</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div><IonButtons className=''>
            <IonBackButton defaultHref="/CreateEvent"></IonBackButton>
        </IonButtons></div>
        
        <div className='memberTitleDiv'>
          <h3 className='memberTitleHeader'>Add Helpers</h3>
          <div className='addChip'id='addHelperButton'><IonChip >+ Add</IonChip></div>
        </div>
        <div className='memberTitleDiv'>
          <h3 className='memberTitleHeader'>Add Guests</h3>
          <div className='addChip' id='addGuestsButton'><IonChip >+ Add</IonChip></div>
        </div>
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
      </IonContent>
  );
};

