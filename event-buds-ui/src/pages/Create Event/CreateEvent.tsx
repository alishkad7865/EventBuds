import { useEffect, useState } from "react";
import { getAllUsers, getUser } from "../../api/userApi";
import AddMembers from "./AddMembers";
import "./CreateEvent.css";
import EventInfo from "./EventInfo";

export default function CreateEvent(props: any) {
  let initialState = {
    step: 1,
    eventTitle: "",
    eventStartTime: new Date(),
    eventEndTime: new Date(),
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

  useEffect(() => {
    async function loadUserData() {
      let result = await getUser(1);
      console.log(result);
      if (result) {
        setFriends(JSON.parse(result.FRIENDS));
      }
      console.log(friends)
    }
    async function loadAllUsers() {
      let result = await getAllUsers(1);
      if (result) {
        setAllUsers(result);
      }
    }
    loadUserData();
    loadAllUsers();
  }, []);

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
  };

  const { step } = state;
  const {
    eventTitle,
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
    eventStartTime,
    eventEndTime,
    location,
    eventType,
    description,
    capacity,
    price,
  };
  switch (step) {
    case 1:
      return (
        <EventInfo
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      );
    case 2:
      return (
        <AddMembers
          nextStep={nextStep}
          prevStep={prevStep}
          setState={setState}
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
        />
      );
    default:
      return <></>;
  }
}
