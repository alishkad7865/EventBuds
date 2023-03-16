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
import { createTask } from "../../api/taskApi";
import { LocaleDateTimeISOFormat } from "../../Utils/ArrayUtil";

export default function TaskModal(props: any) {
  const {
    values,
    handleChange,
    event,
    markTouched,
    validator,
    isTouched,
    ValidateAllFields,
  } = props;
  async function saveTask() {
    let Task = {
      eventId: props.event.EVENTID,
      taskName: values.TASKNAME,
      description: values.DESCRIPTION,
      assignedTo: JSON.stringify(values.ASSIGNEDTO).toString(),
      startTime:
        values.STARTTIME !== "" ? values.STARTTIME : new Date().toISOString(),
      endTime:
        values.ENDTIME !== "" ? values.ENDTIME : new Date().toISOString(),
      taskStatus: values.TASKSTATUS,
      notes: values.NOTES,
    };
    if (ValidateAllFields(values) === true) {
      await createTask(JSON.stringify(Task), props.token).then(
        (response: any) => {
          if (response.status >= 200 && response.status < 300) {
            props.setToastMessage("Task Created Successfully!");
            props.setState(props.initialState);
            props.dismiss();
          } else {
            props.setToastMessage("Task Creation Failed, Try Again!");
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
      id="task-modal"
      ref={props.modal}
      trigger={props.triggerId}
      enterAnimation={props.enterAnimation}
      leaveAnimation={props.leaveAnimation}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.modalTitle}</IonTitle>
          <IonButtons slot="end">
            <IonButton color="light" onClick={() => props.dismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem
            fill="solid"
            className={`addSpaceAbove ${
              validator.isTaskNameValid && "ion-valid"
            } ${validator.isTaskNameValid === false && "ion-invalid"} ${
              isTouched && "ion-touched"
            }`}
          >
            <IonLabel position="stacked" className="ionLabel">
              Task Name
            </IonLabel>
            <IonInput
              clearInput={true}
              name="TASKNAME"
              placeholder="Enter event title"
              onIonChange={handleChange("TASKNAME")}
              onIonBlur={() => markTouched()}
              defaultValue={values.TASKNAME}
              value={values.TASKNAME}
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
              onIonChange={handleChange("DESCRIPTION")}
              defaultValue={values.DESCRIPTION}
              value={values.DESCRIPTION}
            ></IonTextarea>
            <IonNote slot="error">Description Cant be null</IonNote>
          </IonItem>
          <IonItem className="addSpaceAbove">
            <IonLabel position="stacked" className="ionLabel">
              assigned To
            </IonLabel>
            <IonSelect
              interface="popover"
              placeholder="Select Helper"
              onIonChange={handleChange("ASSIGNEDTO")}
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
              value={values.TASKSTATUS}
              onIonChange={handleChange("TASKSTATUS")}
            >
              <IonSelectOption value="Ongoing">Ongoing</IonSelectOption>
              <IonSelectOption value="Completed">Completed</IonSelectOption>
            </IonSelect>
            <IonNote slot="helper">Enter a valid Title</IonNote>
            <IonNote slot="error">Invalid Title</IonNote>
          </IonItem>

          <IonItem
            fill="solid"
            className={`addSpaceAbove ${
              validator.isStartDateValid && "ion-valid"
            } ${validator.isStartDateValid === false && "ion-invalid"} ${
              isTouched && "ion-touched"
            }`}
          >
            <IonLabel position="stacked" className="dateLabel">
              Start Date
            </IonLabel>
            <IonDatetimeButton datetime="startDate"></IonDatetimeButton>

            <IonModal keepContentsMounted={true} id={"date"}>
              <IonDatetime
                id="startDate"
                name="startDate"
                min={LocaleDateTimeISOFormat(event.STARTDATETIME)}
                max={LocaleDateTimeISOFormat(event.ENDDATETIME)}
                onIonChange={handleChange("STARTTIME")}
                onIonBlur={() => markTouched()}
                value={values.STARTTIME}
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
            className={`addSpaceAbove ${
              validator.isEndDateValid && "ion-valid"
            } ${validator.isEndDateValid === false && "ion-invalid"} ${
              isTouched && "ion-touched"
            }`}
          >
            <IonLabel position="stacked" className="dateLabel">
              End date
            </IonLabel>
            <IonDatetimeButton datetime="endDate"></IonDatetimeButton>

            <IonModal keepContentsMounted={true} id={"date"}>
              <IonDatetime
                id="endDate"
                name="endDate"
                onIonChange={handleChange("ENDTIME")}
                onIonBlur={() => markTouched()}
                value={values.ENDTIME}
                min={
                  values.STARTTIME ||
                  LocaleDateTimeISOFormat(event.STARTDATETIME)
                }
                max={LocaleDateTimeISOFormat(event.ENDDATETIME)}
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
              onIonChange={handleChange("NOTES")}
              defaultValue={values.NOTES}
              value={values.NOTES}
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
              saveTask();
            }}
          >
            Save
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
}
