import {
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonCheckbox,
  IonFooter,
  IonHeader,
} from "@ionic/react";
import { useState } from "react";

export default function CustomModal(props: any) {
  const [usersSelected, setUserSelected] = useState<any>([]);

  function dismiss() {
    props.setOpen(false);
    setUserSelected([]);
    props.modal.current?.dismiss();
  }
  function addUsersHelperFunction() {
    if (props.title === "Add Helpers") {
      props.helpers.length > 0 &&
        props.helpers.filter((list: any) => {
          if (usersSelected.indexOf(list) === -1) {
            usersSelected.push(list);
          }
          return list;
        });
      props.setHelpers(usersSelected);
    } else if (props.title === "Add Guests") {
      props.guests.length > 0 &&
        props.guests.filter((list: any) => {
          if (usersSelected.indexOf(list) === -1) {
            usersSelected.push(list);
          }
          return list;
        });
      props.setGuests(usersSelected);
    }
    dismiss();
  }

  return (
    <IonModal
      isOpen={props.open}
      id="custom-modal"
      ref={props.modal}
      trigger={props.triggerId}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton color="light" onClick={() => dismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {props.data.length === 0 && (
            <h5 className="ion-text-center labelColour">No Friends Added!</h5>
          )}
          {props.data?.map((list: any) => {
            return (
              <IonItem key={list.EMAIL + props.title}>
                <IonCheckbox
                  slot="end"
                  value={list.EMAIL}
                  onIonChange={(e: any) => {
                    if (!usersSelected.includes(list) && e.target.checked) {
                      usersSelected.push(list);
                    } else if (
                      !e.target.checked &&
                      usersSelected.includes(list)
                    ) {
                      if (usersSelected.indexOf(list) !== -1) {
                        usersSelected.splice(usersSelected.indexOf(list), 1);
                      }
                    }
                  }}
                ></IonCheckbox>
                <IonAvatar slot="start">
                  <IonImg
                    alt="Silhouette of a person's head"
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </IonAvatar>
                <IonLabel>
                  <h2>{list.FIRSTNAME + " " + list.LASTNAME}</h2>
                  <p>{list.EMAIL}</p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            slot="start"
            className="saveModalButton"
            expand="block"
            shape="round"
            onClick={() => {
              setUserSelected(usersSelected);
              addUsersHelperFunction();
            }}
          >
            Save
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
}
