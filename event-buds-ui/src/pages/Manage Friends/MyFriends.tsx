import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  useIonAlert,
} from "@ionic/react";
import { useContext, useEffect, useRef, useState } from "react";
import FriendsModal from "../../components/FriendsModal";
import { UserContext } from "../../context/UserContext";
import "./ManageFriends.css";

setupIonicReact();

export default function MyFriends(props: any) {
  const [presentAlert] = useIonAlert();
  const { user } = useContext(UserContext);
  const [friendsList, setfriendsList] = useState([]);
  const [modalFriendData, setModalFriendData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  useEffect(() => {
    if (JSON.parse(user.FRIENDS).length > 0)
      setfriendsList(JSON.parse(user.FRIENDS));
  }, []);
  return (
    <>
      <IonHeader>
        <IonToolbar class="toolbarMargin">
          <IonSearchbar class="searchbarBorder"></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <FriendsModal
        expand="block"
        modal={modal}
        isOpen={isOpen}
        list={modalFriendData}
        setIsOpen={setIsOpen}
      />
      <IonList>
        {friendsList.length === 0 && (
          <h5 className="ion-text-center labelColour">No Friends Added!</h5>
        )}
        {friendsList.map((list: any) => {
          return (
            <IonItem class="itemBackground" key={list.EMAIL + props.title}>
              <IonAvatar
                slot="start"
                onClick={() => {
                  setIsOpen(true);
                  setModalFriendData(list);
                }}
              >
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>

              <IonLabel
                onClick={() => {
                  setIsOpen(true);
                  setModalFriendData(list);
                }}
              >
                <h6 className="labelColour ion-text-capitalize">
                  {" "}
                  <b className="labelColour">
                    {list.FIRSTNAME + " " + list.LASTNAME}{" "}
                  </b>
                </h6>
                <p>{list.EMAIL}</p>
              </IonLabel>

              <IonButton
                onClick={() => {
                  presentAlert({
                    header: "Are you sure?",
                    cssClass: "custom-alert",
                    buttons: [
                      {
                        text: "Yes",
                      },

                      {
                        text: "Cancel",
                      },
                    ],
                  });
                }}
              >
                Remove Friend
              </IonButton>
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
}
