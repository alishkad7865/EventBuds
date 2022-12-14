import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack, closeCircle } from "ionicons/icons";
import { useRef, useState } from "react";
import { createEvent } from "../../api/eventApi";
import CustomModal from "../../components/CustomModal";
import "./CreateEvent.css";

export default function AddMembers(props: any) {
  const [title, setTitle] = useState("");
  const [triggerId, setTriggerId] = useState("");
  const [open, setOpen] = useState(false);
  const {
    eventTitle,
    eventStartTime,
    eventEndTime,
    location,
    eventType,
    description,
    capacity,
    price,
  } = props.values;

  async function SubmitEvent() {
    let Event = {
      eventTitle: eventTitle,
      eventStartTime: new Date(eventStartTime).toISOString(),
      eventEndTime: new Date(eventEndTime).toISOString(),
      location: location,
      eventType: eventType,
      description: description,
      capacity: capacity,
      price: price,
      createdBy: "a@g.ca", // update to user info
      ownerId: 1, // update to user info
      helpers: props.helpers,
      guests: props.guests,
    };
    await createEvent(JSON.stringify(Event)).then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        props.setGuests([]);
        props.setToastMessage("Event Created Successfully!");
        props.setState(props.initialState);
      }
    });
  }
  function Back(e: any) {
    e.preventDefault();
    props.prevStep();
  }

  const modal = useRef<HTMLIonModalElement>(null);

  function handleRemoveUser(list: [], item: any) {
    return list.filter((list: any) => {
      return list !== item;
    });
  }
  return (
    <IonPage>
      <IonContent className="container">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add Members</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CustomModal
          helpers={props.helpers}
          guests={props.guests}
          setHelpers={props.setHelpers}
          setGuests={props.setGuests}
          data={props.modalData}
          title={title}
          triggerId={triggerId}
          modal={modal}
          open={open}
          setOpen={setOpen}
        />
        <div className="addSpaceAbove">
          <IonButtons className="" onClick={Back}>
            <IonIcon slot="end" icon={arrowBack} size="large"></IonIcon>
          </IonButtons>
        </div>

        <div className="memberTitleDiv">
          <h3 className="memberTitleHeader">Add Helpers</h3>
          <div className="addChip" id="addHelperButton">
            <IonButton
              id="open-modal"
              shape="round"
              expand="block"
              onIonFocus={(e) => setTriggerId(e.target.id)}
              onClick={(e: any) => {
                props.setModalData(
                  props.friends.filter((friend: any) => {
                    return props.helpers.indexOf(friend) === -1;
                  })
                );
                setOpen(true);
                setTriggerId(e.target.id);
                setTitle("Add Helpers");
              }}
            >
              + Add
            </IonButton>
          </div>
        </div>

        {props.helpers?.map((list: any) => {
          return (
            <IonChip key={list.EMAIL + "_helper"}>
              <IonAvatar>
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>
              <IonLabel>{list.FIRSTNAME + " " + list.LASTNAME}</IonLabel>

              <IonIcon
                icon={closeCircle}
                onClick={() =>
                  props.setHelpers(handleRemoveUser(props.helpers, list))
                }
              ></IonIcon>
            </IonChip>
          );
        })}
        <div className="memberTitleDiv">
          <h3 className="memberTitleHeader">Add Guests</h3>
          <div className="addChip" id="addGuestsButton">
            <IonButton
              id="guest-modal"
              shape="round"
              expand="block"
              onIonFocus={(e) => setTriggerId(e.target.id)}
              onClick={(e: any) => {
                props.setModalData(
                  props.allUsers.filter((guest: any) => {
                    return props.guests.indexOf(guest) === -1;
                  })
                );
                setOpen(true);
                setTriggerId(e.target.id);
                setTitle("Add Guests");
              }}
            >
              + Add
            </IonButton>
          </div>
        </div>

        {props.guests?.map((list: any) => {
          return (
            <IonChip key={list.EMAIL + "_guests"}>
              <IonAvatar>
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>
              <IonLabel>{list.FIRSTNAME + " " + list.LASTNAME}</IonLabel>
              <IonIcon
                icon={closeCircle}
                onClick={() =>
                  props.setGuests(handleRemoveUser(props.guests, list))
                }
              ></IonIcon>
            </IonChip>
          );
        })}
        <IonItem className="addSpaceAbove">
          <IonLabel position="stacked" className="ionLabel">
            Capacity:{" "}
          </IonLabel>
          <IonInput
            type="number"
            placeholder="000"
            onIonChange={props.handleChange("capacity")}
            defaultValue={props.values.capacity}
          ></IonInput>
        </IonItem>

        <IonItem className="addSpaceAbove">
          <IonLabel position="stacked" className="ionLabel">
            Price:{" "}
          </IonLabel>
          <IonInput
            type="number"
            placeholder="000"
            onIonChange={props.handleChange("price")}
            defaultValue={price}
          ></IonInput>
        </IonItem>

        <div className="addSpaceAbove">
          <IonButton
            slot="start"
            className="saveModalButton"
            expand="block"
            shape="round"
            onClick={SubmitEvent}
          >
            Submit
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
