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

export default function TaskModal(props: any) {
  const { values, handleChange } = props;
  async function saveTask() {
    let Task = {
      eventId: props.event.EVENTID,
      taskName: values.TASKNAME,
      description: values.DESCRIPTION,
      assignedTo: values.ASSIGNEDTO,
      startTime: values.STARTTIME,
      endTime: values.ENDTIME,
      taskStatus: values.TASKSTATUS,
      notes: values.NOTES,
    };

    await createTask(JSON.stringify(Task)).then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        props.setToastMessage("Task Created Successfully!");
        // props.setTaskList([...props.taskList, Task]);
        props.dismiss();
      } else {
        props.setToastMessage("Task Creation Failed, Try Again!");
      }
    });
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
          <IonItem className="addSpaceAbove">
            <IonLabel position="stacked" className="ionLabel">
              Task Name
            </IonLabel>
            <IonInput
              clearInput={true}
              placeholder="Enter event title"
              onIonChange={handleChange("TASKNAME")}
              defaultValue={values.TASKNAME}
              value={values.TASKNAME}
            ></IonInput>
            <IonNote slot="helper">Enter a Task Name</IonNote>
            <IonNote slot="error">Invalid Title</IonNote>
          </IonItem>
          <IonItem counter={true} className="addSpaceAbove">
            <IonLabel position="stacked" className="ionLabel">
              Description
            </IonLabel>
            <IonTextarea
              placeholder="Type something here"
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
                  <IonSelectOption
                    key={list.EMAIL}
                    value={list.FIRSTNAME + " " + list.LASTNAME}
                  >
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
              onIonChange={handleChange("TASKSTATUS")}
            >
              <IonSelectOption value="Ongoing">Ongoing</IonSelectOption>
              <IonSelectOption value="Completed">Completed</IonSelectOption>
            </IonSelect>
            <IonNote slot="helper">Enter a valid Title</IonNote>
            <IonNote slot="error">Invalid Title</IonNote>
          </IonItem>
          <IonItem className="addSpaceAbove">
            <IonLabel position="stacked" className="dateLabel">
              Start Date
            </IonLabel>
            <IonDatetimeButton datetime="startDate"></IonDatetimeButton>

            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="startDate"
                onIonChange={handleChange("STARTTIME")}
                defaultValue={values.STARTTIME}
              >
                <span slot="title">Start Date</span>
              </IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem className="addSpaceAbove">
            <IonLabel position="stacked" className="dateLabel">
              End date
            </IonLabel>
            <IonDatetimeButton datetime="endDate"></IonDatetimeButton>

            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="endDate"
                onIonChange={handleChange("ENDTIME")}
                defaultValue={values.ENDTIME}
              >
                <span slot="title">Completion Date</span>
              </IonDatetime>
            </IonModal>
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