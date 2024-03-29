import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSpinner,
} from "@ionic/react";
import { arrowBack, closeCircle, logoUsd } from "ionicons/icons";
import { useRef, useState } from "react";
import { CreateEvent } from "../../api/eventApi";
import CustomModal from "../Modal/CustomModal";
import Menu from "../Menu";
import "../../pages/Create Event/CreateEvent.css";

export default function AddMembers(props: any) {
  const [title, setTitle] = useState("");
  const [triggerId, setTriggerId] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    eventTitle,
    lastRegDate,
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
      lastRegDate:
        lastRegDate !== ""
          ? new Date(lastRegDate).toISOString()
          : new Date().toISOString(),
      eventStartTime:
        eventStartTime !== ""
          ? new Date(eventStartTime).toISOString()
          : new Date().toISOString(),
      eventEndTime:
        eventEndTime !== ""
          ? new Date(eventEndTime).toISOString()
          : new Date().toISOString(),
      location: location,
      eventType: eventType,
      description: description,
      capacity: capacity === "" ? 0 : parseInt(capacity),
      price: price === "" ? 0 : parseInt(price),
      createdBy: props.user.EMAIL,
      ownerId: props.user.USERID,
      helpers: props.helpers,
      guests: props.guests,
    };
    if (props.ValidateAllFields() === true) {
      setIsLoading(true);
      await CreateEvent(JSON.stringify(Event), props.token).then(
        (response: any) => {
          if (response.status >= 200 && response.status < 300) {
            props.setGuests([]);
            props.setToastMessage("Event Created Successfully!");
            props.setEventCreatedModalData({
              eventTitle: eventTitle,
              eventType: eventType,
            });
            props.setEventCreatedModal(true);
            props.setState(props.initialState);
            props.SetAllValidatorsFalse();
          } else if (response.status >= 500) {
            props.setShowToast(true);
            props.setToastMessage(
              "Internal Server Issue. Please contact admin or developers!"
            );
          } else {
            props.setShowToast(true);
            props.setToastMessage(
              `${response.detail[0].loc[1]}, ${response.detail[0].msg}`
            );
          }
        }
      );
      setIsLoading(false);
    } else {
      props.setShowToast(true);
      props.setToastMessage(
        "One or more validation failed. Check your fields!"
      );
    }
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
      <Menu page={"create event"} />
      <IonContent className="container">
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
                props.friends
                  ? props.setModalData(
                      props.friends?.filter((friend: any) => {
                        return props.helpers.indexOf(friend) === -1;
                      })
                    )
                  : props.setModalData([]);
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
            defaultValue={capacity}
            value={capacity === 0 ? "" : capacity}
          ></IonInput>
        </IonItem>

        <IonItem className="addSpaceAbove">
          <IonLabel position="stacked" className="ionLabel">
            Price:
          </IonLabel>

          <IonInput
            type="number"
            placeholder="000"
            onIonChange={props.handleChange("price")}
            defaultValue={price}
            value={price === 0 ? "" : price}
          >
            <IonIcon icon={logoUsd} slot="start" />
          </IonInput>
        </IonItem>

        <div className="addSpaceAbove">
          <IonButton
            slot="start"
            className="saveModalButton"
            expand="block"
            shape="round"
            onClick={SubmitEvent}
            disabled={isLoading}
          >
            Submit
            {isLoading && <IonSpinner name="crescent"></IonSpinner>}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
