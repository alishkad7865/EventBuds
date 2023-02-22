import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTabButton,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
// import App from "../App";
// import { list, notifications } from "ionicons/icons";
// import NotificationModal from "./NotificationModal";

// function Menu() {
//   const [presentAlert] = useIonAlert();

//   const [friendsList, setfriendsList] = useState([]);
//   const [modalFriendData, setModalNotificationData] = useState({});
//   const [isOpen, setIsOpen] = useState(false);
//   const modal = useRef<HTMLIonModalElement>(null);
//   function setTriggerId(id: any) {
//     throw new Error("Function not implemented.");
//   }

//   function setOpen(arg0: boolean) {
//     throw new Error("Function not implemented.");
//   }

//   function setTitle(arg0: string) {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <>
//       <IonMenu contentId="main-content">
//         <IonHeader>
//           <IonToolbar>
//             <IonTitle>Menu Content</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <IonContent className="ion-padding">
//           <IonItem href="/Home">
//             <IonLabel>Home</IonLabel>
//           </IonItem>

//           <IonItem href="/ManageFriends">
//             <IonLabel>Friends</IonLabel>
//           </IonItem>

//           <IonItem href="/CreateEvent">
//             {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-circle-plus" /> */}
//             <IonLabel>Create</IonLabel>
//           </IonItem>

//           <IonItem href="/PublicEvents">
//             <IonLabel>Public Events</IonLabel>
//           </IonItem>

//           <IonItem href="/Profile">
//             <IonLabel>My Profile</IonLabel>
//           </IonItem>
//           {/* <IonItem button tab="home">
//                 <IonLabel>Home</IonLabel>
//             </IonItem> */}
//         </IonContent>
//       </IonMenu>
//       <IonPage id="main-content">
//         <IonHeader>
//           <IonToolbar>
//             <IonButtons
//               onClick={() => {
//                 setIsOpen(true);
//                 setModalNotificationData(list);
//               }}
//               slot="end"
//               id="open-modal"
//             >
//               <IonTabButton>
//                 <IonIcon icon={notifications} id="open-modal" />
//               </IonTabButton>

//               <NotificationModal
//                 expand="block"
//                 modal={modal}
//                 isOpen={isOpen}
//                 list={modalFriendData}
//                 setIsOpen={setIsOpen}
//                 trigger="open-modal"
//               />
//             </IonButtons>
//             <IonButtons slot="start">
//               <IonMenuButton></IonMenuButton>
//             </IonButtons>

//             <IonTitle>EventBuds</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <IonContent className="ion-padding">
//           <App />
//         </IonContent>
//       </IonPage>
//     </>
import {
  calendarOutline,
  checkboxOutline,
  createOutline,
  homeOutline,
  logInOutline,
  notifications,
  peopleOutline,
} from "ionicons/icons";
import Logout from "./Logout";

function Menu(props: any) {
  function getHeaderComponent() {
    if (props.page === "home") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={homeOutline} size="large" />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </>
      );
    } else if (props.page === "manage friends") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={peopleOutline} size="large" />
          </IonButtons>
          <IonTitle>Manage Friends</IonTitle>
        </>
      );
    } else if (props.page === "create event") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={createOutline} size="large" />
          </IonButtons>
          <IonTitle>Create Event</IonTitle>
        </>
      );
    } else if (props.page === "public events") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={calendarOutline} size="large" />
          </IonButtons>
          <IonTitle>Public Events</IonTitle>
        </>
      );
    } else if (props.page === "profile") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={peopleOutline} size="large" />
          </IonButtons>
          <IonTitle>My Profile</IonTitle>
        </>
      );
    } else if (props.page === "event") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={calendarOutline} size="large" />
          </IonButtons>
          <IonTitle>Event</IonTitle>
        </>
      );
    }
    if (props.page === "task") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={checkboxOutline} size="large" />
          </IonButtons>
          <IonTitle>Task</IonTitle>
        </>
      );
    }
    if (props.page === "login") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={logInOutline} size="large" />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </>
      );
    }
    if (props.page === "signup") {
      return (
        <>
          <IonButtons slot="start" className="navButton">
            <IonIcon icon={logInOutline} size="large" />
          </IonButtons>
          <IonTitle>SignUp</IonTitle>
        </>
      );
    }
  }
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="end">
          <IonTabButton>
            <IonIcon icon={notifications} />
          </IonTabButton>
        </IonButtons>
        {getHeaderComponent()}
        <Logout pageName={props.page} />
      </IonToolbar>
    </IonHeader>
  );
}
export default Menu;
