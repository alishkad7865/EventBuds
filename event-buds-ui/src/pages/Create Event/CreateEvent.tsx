import { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../api/userApi";
import AddMembers from "../../components/EventForm/AddMembers";
import "./CreateEvent.css";
import EventInfoForm from "../../components/EventForm/EventInfoForm";
import { UserContext } from "../../context/UserContext";

export default function CreateEvent(props: any) {
  let initialState = {
    step: 1,
    eventTitle: "",
    lastRegDate: "",
    eventStartTime: "",
    eventEndTime: "",
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
  const { user, token } = useContext(UserContext);
  useEffect(() => {
    setFriends(JSON.parse(user.FRIENDS));
    async function loadAllUsers() {
      let result = await getAllUsers(token);
      if (result) {
        setAllUsers(result);
      }
    }
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
  switch (step) {
    case 1:
      return (
        <EventInfoForm
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
        />
      );
    default:
      return <></>;
  }
}
