import {
  createAnimation,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonToast,
} from "@ionic/react";
import { add, trashBin } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { getTasks } from "../api/taskApi";
import TaskModal from "./Modal/TaskModal";

export default function Task(props: any) {
  const [triggerId, setTriggerId] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({});
  const [modalTitle, setModalTitle] = useState("");
  const modal = useRef<HTMLIonModalElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  let initialState = {
    taskName: "",
    startDate: new Date(),
    endDate: new Date(),
    description: "",
    assignedTo: "",
    status: "",
    notes: "",
  };
  const [state, setState] = useState(initialState);
  const handleChange = (input: any) => (e: any) => {
    setState({ ...state, [input]: e.target.value });
  };
  const {
    taskName,
    startDate,
    endDate,
    description,
    assignedTo,
    status,
    notes,
  } = state;
  const values = {
    taskName,
    startDate,
    endDate,
    description,
    assignedTo,
    status,
    notes,
  };

  useEffect(() => {
    if (toastMessage !== "") {
      setShowToast(true);
    }
  }, [toastMessage]);

  useEffect(() => {
    async function loadTasks() {
      let result = await getTasks(props.event?.EVENTID);
      if (result) {
        setTaskList(result);
      }
    }
    loadTasks();
  }, [props.event]);

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector("ion-backdrop")!)
      .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector(".modal-wrapper")!)
      .keyframes([
        { offset: 0, opacity: "0", transform: "scale(0)" },
        { offset: 1, opacity: "0.99", transform: "scale(1)" },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing("ease-out")
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction("reverse");
  };
  function dismiss() {
    modal.current?.dismiss();
  }
  function getTaskCardCSS(status: any): string | undefined {
    if (status === "completed") return "taskCardCompleted";
    else return "taskCard";
  }
  return (
    <IonContent>
      <IonToast
        isOpen={showToast}
        position="top"
        onDidDismiss={() => {
          setShowToast(false);
          setToastMessage("");
        }}
        message={toastMessage}
        duration={3000}
      />
      <IonFab slot="fixed" vertical="bottom" horizontal="end" edge={true}>
        <IonFabButton
          id="task-modal"
          onIonFocus={(e) => setTriggerId(e.target.id)}
          onClick={(e: any) => {
            setModalTitle("Add Task");
            setTriggerId(e.target.id);
          }}
        >
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <div className="eventCardsDiv">
        {taskList?.map((task: any) => {
          return (
            <IonCard class={getTaskCardCSS(task.STATUS)} key={task.TASKID}>
              <IonCardHeader>
                <IonButton class="taskEditButton" color={"danger"}>
                  Remove
                  <IonIcon slot="end" icon={trashBin}></IonIcon>
                </IonButton>
                <IonCardTitle className="ion-text-capitalize">
                  {task.TASKNAME}
                </IonCardTitle>
                <IonCardSubtitle>Status: {task.TASKSTATUS}</IonCardSubtitle>
                <IonCardSubtitle>
                  Assigned To: {task.ASSIGNEDTO}
                </IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <p>
                  <b>description:</b> {task.DESCRIPTION}
                </p>
                <p>
                  <b>Notes:</b> {task.NOTES}
                </p>
                <p>
                  <b>Start Period:</b> {task.STARTTIME}
                </p>
                <p>
                  <b>Completion Date:</b> {task.ENDTIME}
                </p>
              </IonCardContent>
              <IonButton
                fill="solid"
                shape="round"
                expand="block"
                onClick={() => setTask(task)}
              >
                Edit
              </IonButton>
            </IonCard>
          );
        })}
      </div>
      <TaskModal
        triggerId={triggerId}
        modal={modal}
        setState={setState}
        event={props.event}
        handleChange={handleChange}
        helpers={props.helpers}
        values={values}
        dismiss={dismiss}
        taskList={taskList}
        setTaskList={setTaskList}
        setToastMessage={setToastMessage}
        modalTitle={modalTitle}
        enterAnimation={enterAnimation}
        leaveAnimation={leaveAnimation}
      />
    </IonContent>
  );
}
