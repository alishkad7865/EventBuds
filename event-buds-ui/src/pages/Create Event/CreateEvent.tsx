import { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../api/userApi";
import AddMembers from "../../components/EventForm/AddMembers";
import "./CreateEvent.css";
import EventInfoForm from "../../components/EventForm/EventInfoForm";
import { UserContext } from "../../context/UserContext";
import { parseJSON } from "date-fns";
import { LocaleDateTimeISOFormat } from "../../Utils/ArrayUtil";

export default function CreateEvent(props: any) {
  let initialState = {
    step: 1,
    eventTitle: "",
    lastRegDate: LocaleDateTimeISOFormat(new Date().toISOString()),
    eventStartTime: LocaleDateTimeISOFormat(new Date().toISOString()),
    eventEndTime: LocaleDateTimeISOFormat(new Date().toISOString()),
    location: "",
    eventType: undefined,
    description: "",
    capacity: 0,
    price: 0,
  };
  const [state, setState] = useState(initialState);
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [helpers, setHelpers] = useState<any>([]);
  const [guests, setGuests] = useState<any>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [eventCreatedModal, setEventCreatedModal] = useState(false);
  const [eventCreatedModalData, setEventCreatedModalData] = useState({
    eventTitle: "",
    eventtype: "",
  });

  const { user, token } = useContext(UserContext);

  // Validators states
  const [isTouched, setIsTouched] = useState(false);
  const [isTitleValid, setIsTitleValid] = useState<boolean>(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(false);
  const [isStartDateValid, setIsStartDateValid] = useState<boolean>(false);
  const [isEndDateValid, setIsEndDateValid] = useState<boolean>(false);
  const [isEventTypeValid, setIsEventTypeValid] = useState<boolean>(false);
  const [isLocationValid, setIsLocationValid] = useState<boolean>(false);

  useEffect(() => {
    if (user?.FRIENDS) {
      setFriends(
        user?.FRIENDS?.filter((user: any) => user.STATUS === "accepted")
      );
    }
    async function loadAllUsers() {
      let result = await getAllUsers(token);
      if (result) {
        setAllUsers(result);
      }
    }
    loadAllUsers();
  }, []);

  function ValidateAllFields() {
    return (
      isTitleValid &&
      isDescriptionValid &&
      isEndDateValid &&
      isStartDateValid &&
      isLocationValid &&
      isEventTypeValid
    );
  }
  function SetAllValidatorsFalse() {
    setIsTitleValid(false);
    setIsDescriptionValid(false);
    setIsEndDateValid(false);
    setIsStartDateValid(false);
    setIsLocationValid(false);
    setIsEventTypeValid(false);
  }
  const validate = (ev: Event) => {
    const { name, value } = ev.target as HTMLInputElement;
    if (name === "eventTitle") {
      if (value.trim() === "") {
        setIsTitleValid(false);
      } else {
        setIsTitleValid(true);
      }
    }
    if (name === "lastRegDate") {
      setIsStartDateValid(false);

      if (new Date(value) >= new Date(eventEndTime)) {
        setIsEndDateValid(false);
      } else if (new Date(value) >= new Date(eventStartTime))
        setIsStartDateValid(false);
    }
    if (name === "eventStartTime") {
      setIsStartDateValid(false);

      if (new Date(value) >= new Date(eventEndTime)) {
        setIsEndDateValid(false);
      } else if (new Date(value) < new Date(lastRegDate)) {
        setIsStartDateValid(false);
      } else if (
        new Date(value) < new Date(eventEndTime) &&
        new Date(value) > new Date(lastRegDate)
      ) {
        setIsStartDateValid(true);
        setIsEndDateValid(true);
      }
    }
    if (name === "eventEndTime") {
      setIsEndDateValid(false);
      if (new Date(value) <= new Date(eventStartTime)) {
        setIsStartDateValid(false);
      } else if (new Date(value) < new Date(lastRegDate)) {
        setIsEndDateValid(false);
      } else if (
        new Date(value) > new Date(eventStartTime) &&
        new Date(value) > new Date(lastRegDate)
      ) {
        setIsStartDateValid(true);
        setIsEndDateValid(true);
      }
    }
    if (name === "description") {
      value.trim() === "" || value === null
        ? setIsDescriptionValid(false)
        : setIsDescriptionValid(true);
    }
    if (name === "eventType") {
      value !== undefined
        ? setIsEventTypeValid(true)
        : setIsEventTypeValid(false);
    }
    if (name === "location") {
      value !== "" ? setIsLocationValid(true) : setIsLocationValid(false);
    }
  };
  const markTouched = () => {
    setIsTouched(true);
  };

  const nextStep = () => {
    const { step } = state;
    setState({
      ...state,
      step: step + 1,
    });
  };

  // Go back to prev step
  const prevStep = () => {
    const { step } = state;
    setState({
      ...state,
      step: step - 1,
    });
  };

  const handleChange = (input: any) => (e: any) => {
    setState({ ...state, [input]: e.target.value });
    validate(e);
  };

  const { step } = state;
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
  } = state;
  const values = {
    eventTitle,
    lastRegDate,
    eventStartTime,
    eventEndTime,
    location,
    eventType,
    description,
    capacity,
    price,
  };

  const validator = {
    isTitleValid,
    isDescriptionValid,
    isEndDateValid,
    isStartDateValid,
    isLocationValid,
    isEventTypeValid,
  };
  switch (step) {
    case 1:
      return (
        <EventInfoForm
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
          markTouched={markTouched}
          isTouched={isTouched}
          validate={validate}
          ValidateAllFields={ValidateAllFields}
          validator={validator}
          eventCreatedModal={eventCreatedModal}
          setEventCreatedModal={setEventCreatedModal}
          eventCreatedModalData={eventCreatedModalData}
          setEventCreatedModalData={setEventCreatedModalData}
        />
      );
    case 2:
      return (
        <AddMembers
          token={token}
          nextStep={nextStep}
          prevStep={prevStep}
          setState={setState}
          user={user}
          handleChange={handleChange}
          values={values}
          friends={friends}
          allUsers={allUsers}
          helpers={helpers}
          guests={guests}
          setHelpers={setHelpers}
          setGuests={setGuests}
          modalData={modalData}
          setModalData={setModalData}
          setToastMessage={setToastMessage}
          initialState={initialState}
          ValidateAllFields={ValidateAllFields}
          SetAllValidatorsFalse={SetAllValidatorsFalse}
          eventCreatedModal={eventCreatedModal}
          setEventCreatedModal={setEventCreatedModal}
          setEventCreatedModalData={setEventCreatedModalData}
        />
      );
    default:
      return <></>;
  }
}
