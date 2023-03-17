import {
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonList,
  IonFooter,
  IonHeader,
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonTextarea,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { updateTask } from "../../api/taskApi";
import { getAssignedUser } from "../../types/AssignedToUser";
import { LocaleDateTimeISOFormat } from "../../Utils/ArrayUtil";

export default function UpdateTaskModal(props: any) {
  const { task, setTask } = props;
  const { showModal, setShowModal } = props;

  const [isTaskNameValid, setIsTaskNameValid] = useState<boolean>(true);
  const [isStartDateValid, setIsStartDateValid] = useState<boolean | true>(
    true
  );
  const [isEndDateValid, setIsEndDateValid] = useState<boolean | true>(true);

  const handleUpdateChange = (input: any) => (e: any) => {
    if (input === "ASSIGNEDTO") {
      setTask({ ...task, [input]: getAssignedUser(e.target.value) });
    } else setTask({ ...task, [input]: e.target.value });
    validateOnSubmit(e.target.name, e.target.value);
  };

  const { event, validate, markTouched, isTouched } = props;

  function ValidateAllFields(task: any) {
    validateOnSubmit("TASKNAME", task.TASKNAME);
    validateOnSubmit("startDate", task.STARTTIME);
    validateOnSubmit("endDate", task.ENDTIME);
    return isTaskNameValid && isEndDateValid && isStartDateValid;
  }
  // function SetAllValidatorsFalse() {
  //   setIsTaskNameValid(false);
  //   setIsEndDateValid(false);
  //   setIsStartDateValid(false);
  // }
  const validateOnSubmit = (name: string, value: string) => {
    if (name === "TASKNAME") {
      if (value.trim() === "") {
        setIsTaskNameValid(false);
      } else {
        setIsTaskNameValid(true);
      }
    }
    if (name === "startDate") {
      if (new Date(value) > new Date(task.ENDTIME)) {
        setIsEndDateValid(false);
        setIsStartDateValid(false);
      } else {
        setIsStartDateValid(true);
        setIsEndDateValid(true);
      }
    }
    if (name === "endDate") {
      setIsStartDateValid(false);

      if (new Date(value) < new Date(task.STARTTIME)) {
        setIsEndDateValid(false);
        setIsStartDateValid(false);
      } else {
        setIsStartDateValid(true);
        setIsEndDateValid(true);
      }
    }
  };

  async function updateTaskHandler() {
    ValidateAllFields(task);
    let Task = {
      eventId: props.event.EVENTID,
      taskName: task.TASKNAME,
      description: task.DESCRIPTION,
      assignedTo: JSON.stringify(task.ASSIGNEDTO),
      startTime:
        task.STARTTIME !== "" ? task.STARTTIME : new Date().toISOString(),
      endTime: task.ENDTIME !== "" ? task.ENDTIME : new Date().toISOString(),
      taskStatus: task.TASKSTATUS,
      notes: task.NOTES,
    };
    if (ValidateAllFields(task) === true) {
      await updateTask(task.TASKID, JSON.stringify(Task), props.token).then(
        (response: any) => {
          if (response.status >= 200 && response.status < 300) {
            props.setToastMessage("Task Updated Successfully!");
            setShowModal(false);
          } else {
            props.setToastMessage("Task Update Failed, Try Again!");
          }
        }
      );
    } else {
      props.setToastMessage(
        "Task Name, Start date or End Date. Check your fields!"
      );
    }
  }

  return (
    <IonModal
      ref={props.modal}
      isOpen={showModal}
      backdropDismiss={true}
      enterAnimation={props.enterAnimation}
      leaveAnimation={props.leaveAnimation}
      onIonModalWillPresent={() => setShowModal(true)}
      onIonModalWillDismiss={() => setShowModal(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.modalTitle}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color="light"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem
            fill="solid"
            className={`addSpaceAbove ${isTaskNameValid && "ion-valid"} ${
              isTaskNameValid === false && "ion-invalid"
            } ${isTouched && "ion-touched"}`}
          >
            <IonLabel position="stacked" className="ionLabel">
              Task Name
            </IonLabel>
            <IonInput
              clearInput={true}
              name="TASKNAME"
              placeholder="Enter event title"
              onIonChange={handleUpdateChange("TASKNAME")}
              onIonBlur={() => markTouched()}
              defaultValue={task.TASKNAME}
              value={task.TASKNAME}
            ></IonInput>
            <IonNote slot="helper">Enter a Task Name</IonNote>
            <IonNote slot="error">Task Name can't be blank</IonNote>
          </IonItem>
          <IonItem counter={true} className="addSpaceAbove">
            <IonLabel position="stacked" className="ionLabel">
              Description
            </IonLabel>
            <IonTextarea
              placeholder="Type something here"
              name="DESCRIPTION"
              autoGrow={true}
              maxlength={200}
              onIonChange={handleUpdateChange("DESCRIPTION")}
              defaultValue={task.DESCRIPTION}
              value={task.DESCRIPTION}
            ></IonTextarea>
            <IonNote slot="error">Description Cant be null</IonNote>
          </IonItem>
          <IonItem className="addSpaceAbove">
            <IonLabel position="stacked" className="ionLabel">
              assigned To
            </IonLabel>
            <IonSelect
              interface="popover"
              placeholder={
                task.ASSIGNEDTO
                  ? task.ASSIGNEDTO.FIRSTNAME + " " + task.ASSIGNEDTO.LASTNAME
                  : "Select Helper"
              }
              onIonChange={handleUpdateChange("ASSIGNEDTO")}
            >
              {props.helpers?.map((list: any) => {
                return (
                  <IonSelectOption key={list.EMAIL} value={list}>
                    {list.FIRSTNAME + " " + list.LASTNAME}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
            <IonNote slot="helper">Enter a valid Title</IonNote>
            <IonNote slot="error">Invalid Title</IonNote>
          </IonItem>
          <IonItem className="addSpaceAbove">
            <IonLabel position="stacked" className="ionLabel">
              Status
            </IonLabel>
            <IonSelect
              interface="popover"
              placeholder="Select Status"
              onIonChange={handleUpdateChange("TASKSTATUS")}
              defaultValue={task.TASKSTATUS}
              value={task.TASKSTATUS}
            >
              <IonSelectOption value="Ongoing">Ongoing</IonSelectOption>
              <IonSelectOption value="Completed">Completed</IonSelectOption>
            </IonSelect>
            <IonNote slot="helper">Enter a valid Title</IonNote>
            <IonNote slot="error">Invalid Title</IonNote>
          </IonItem>
          <IonItem
            fill="solid"
            className={`addSpaceAbove ${isStartDateValid && "ion-valid"} ${
              isStartDateValid === false && "ion-invalid"
            } ${isTouched && "ion-touched"}`}
          >
            <IonLabel position="stacked" className="dateLabel">
              Start Date
            </IonLabel>
            <IonDatetimeButton datetime="startDate"></IonDatetimeButton>

            <IonModal keepContentsMounted={true} id={"date"}>
              <IonDatetime
                id="startDate"
                name="startDate"
                onIonChange={handleUpdateChange("STARTTIME")}
                defaultValue={task.STARTTIME}
                min={LocaleDateTimeISOFormat(event.STARTDATETIME)}
                max={LocaleDateTimeISOFormat(event.ENDDATETIME)}
                onIonBlur={() => markTouched()}
                value={task.STARTTIME}
                showDefaultButtons={true}
              >
                <span slot="title">Start Date</span>
              </IonDatetime>
            </IonModal>
            <IonNote slot="helper">Enter Task Start Date and Time</IonNote>
            <IonNote slot="error">
              Task's start Time should be less than task's End Time
            </IonNote>
          </IonItem>
          <IonItem
            fill="solid"
            className={`addSpaceAbove ${isEndDateValid && "ion-valid"} ${
              isEndDateValid === false && "ion-invalid"
            } ${isTouched && "ion-touched"}`}
          >
            <IonLabel position="stacked" className="dateLabel">
              End date
            </IonLabel>
            <IonDatetimeButton datetime="endDate"></IonDatetimeButton>

            <IonModal keepContentsMounted={true} id={"date"}>
              <IonDatetime
                id="endDate"
                name="endDate"
                onIonBlur={() => markTouched()}
                onIonChange={handleUpdateChange("ENDTIME")}
                defaultValue={task.ENDTIME}
                min={
                  task.STARTTIME || LocaleDateTimeISOFormat(event.STARTDATETIME)
                }
                max={LocaleDateTimeISOFormat(event.ENDDATETIME)}
                value={task.ENDTIME}
                showDefaultButtons={true}
              >
                <span slot="title">Completion Date</span>
              </IonDatetime>
            </IonModal>
            <IonNote slot="helper">Enter Task End Date and Time</IonNote>
            <IonNote slot="error">
              Task's End Time should be greater than task's Start Time
            </IonNote>
          </IonItem>
          <IonItem counter={true} className="addSpaceAbove">
            <IonLabel position="stacked" className="ionLabel">
              Notes
            </IonLabel>
            <IonTextarea
              placeholder="Add Notes here"
              autoGrow={true}
              maxlength={200}
              onIonChange={handleUpdateChange("NOTES")}
              defaultValue={task.NOTES}
              value={task.NOTES}
            ></IonTextarea>
          </IonItem>
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
              updateTaskHandler();
            }}
          >
            save
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
}
