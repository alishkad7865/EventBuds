import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getUser } from '../../api/userApi';


export default function Home(props:any) {
    const [user, setUser] = useState([]);
    async function loadUserData(){
        let result = await getUser(1);
        console.log(result);
        if (result){
            setUser(result[0][1]);
        }
    }
    useEffect(()=>{
        loadUserData();
    },[]);
    return (
        <IonPage>
            <IonContent className='container'>
                <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Create Event</IonTitle>
                </IonToolbar>
                </IonHeader>
                <h2>Welcome {user}</h2>
                
            </IonContent>
        </IonPage>
  );
};

