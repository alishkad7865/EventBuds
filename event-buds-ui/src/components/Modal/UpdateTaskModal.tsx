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
import { useState } from "react";
import { updateTask } from "../../api/taskApi";

export default function TaskModal(props: any) {
  const [task, setTask] = useState(props.task);
  const handleUpdateChange = (input: any) => (e: any) => {
    setTask({ ...task, [input]: e.target.value });
  };
  async function updateTaskHandler() {
    let Task = {
      eventId: props.event.EVENTID,
      taskName: task.TASKNAME,
      description: task.DESCRIPTION,
      assignedTo: task.ASSIGNEDTO,
      startTime:
        task.STARTTIME !== ""
          ? new Date(task.STARTTIME).toISOString()
          : new Date().toISOString(),
      endTime:
        task.ENDTIME !== ""
          ? new Date(task.ENDTIME).toISOString()
          : new Date().toISOString(),
      taskStatus: task.TASKSTATUS,
      notes: task.NOTES,
    };

    await updateTask(task.TASKID, JSON.stringify(Task), props.token).then(
      (response: any) => {
        if (response === "Success") {
          props.setToastMessage("Task Updated!");
          props.dismiss();
        } else {
          props.setToastMessage("Task Update Failed, Try Again!");
        }
      }
    );
  }
  return (
    <IonModal
      id={"taskUpdate-modal" + task?.TASKID}
      ref={props.modal}
      trigger={"taskUpdate-modal" + task?.TASKID}
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
              onIonChange={handleUpdateChange("TASKNAME")}
              defaultValue={task.TASKNAME}
              value={task.TASKNAME}
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
              placeholder="Select Helper"
              onIonChange={handleUpdateChange("ASSIGNEDTO")}
              defaultValue={task.ASSIGNEDTO}
              value={task.ASSIGNEDTO}
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
          <IonItem className="addSpaceAbove">
            <IonLabel position="stacked" className="dateLabel">
              Start Date
            </IonLabel>
            <IonDatetimeButton datetime="startDate"></IonDatetimeButton>

            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="startDate"
                onIonChange={handleUpdateChange("STARTTIME")}
                defaultValue={task.STARTTIME}
                value={task.STARTTIME}
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
                onIonChange={handleUpdateChange("ENDTIME")}
                defaultValue={task.ENDTIME}
                value={task.ENDTIME}
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
