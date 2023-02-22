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
import { useEffect, useRef, useState } from "react";
import { getUser } from "../../api/userApi";
import FriendsModal from "../../components/FriendsModal";
import "./ManageFriends.css";

setupIonicReact();

export default function MyFriends(props: any) {
  const [presentAlert] = useIonAlert();

  const [friendsList, setfriendsList] = useState([]);
  const [modalFriendData, setModalFriendData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  useEffect(() => {
    async function loadUserData() {
      let result = await getUser(1);
      if (result) {
        setfriendsList(JSON.parse(result.FRIENDS));
      }
    }

    loadUserData();
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
                  console.log(list.USERID, "friends user id");
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
