import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonToast,
} from "@ionic/react";
import { add, trashBin } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { deleteTask, getTasks } from "../api/taskApi";
import TaskModal from "./Modal/TaskModal";
import { format, parseJSON } from "date-fns";
import UpdateTaskModal from "./Modal/UpdateTaskModal";
import { enterAnimation, leaveAnimation } from "../Utils/ModalUtil";
import { UserContext } from "../context/UserContext";
import {
  defaultAssignedToUser,
  getAssignedUser,
  getFirstAndLastName,
} from "../types/AssignedToUser";
export default function Task(props: any) {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState<any>({});
  const modal = useRef<HTMLIonModalElement>(null);
  const updateTaskModal = useRef<HTMLIonModalElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { token } = useContext(UserContext);

  let initialState = {
    TASKNAME: "",
    STARTTIME: "",
    ENDTIME: "",
    DESCRIPTION: "",
    ASSIGNEDTO: defaultAssignedToUser,
    TASKSTATUS: "",
    NOTES: "",
  };
  const [state, setState] = useState(initialState);
  const handleChange = (input: any) => (e: any) => {
    if (input === "ASSIGNEDTO") {
      setState({ ...state, [input]: getAssignedUser(e.target.value) });
    } else setState({ ...state, [input]: e.target.value });
  };

  const {
    TASKNAME,
    STARTTIME,
    ENDTIME,
    DESCRIPTION,
    ASSIGNEDTO,
    TASKSTATUS,
    NOTES,
  } = state;
  const values = {
    TASKNAME,
    STARTTIME,
    ENDTIME,
    DESCRIPTION,
    ASSIGNEDTO,
    TASKSTATUS,
    NOTES,
  };

  useEffect(() => {
    if (toastMessage !== "") {
      setShowToast(true);
    }
  }, [toastMessage]);

  useEffect(() => {
    async function loadTasks() {
      let result = await getTasks(props.event?.EVENTID, token);
      if (result) {
        setTaskList(result);
      }
    }
    loadTasks();
  }, [props.event]);

  useEffect(() => {
    async function loadTasks() {
      let result = await getTasks(props.event?.EVENTID, token);
      if (result) {
        setTaskList(result);
      }
    }
    loadTasks();
    // eslint-disable-next-line
  }, [toastMessage]);

  function dismiss() {
    modal.current?.dismiss();
    updateTaskModal.current?.dismiss();
  }
  function getTaskCardCSS(status: any): string | undefined {
    if (status === "Completed") return "taskCardCompleted";
    else return "taskCard";
  }
  async function deleteTaskHandler(taskId: any) {
    let result = await deleteTask(taskId, token);
    if (result === "Success") {
      const newTask = taskList.filter((task: any) => task.TASKID !== taskId);
      setTaskList([...newTask]);
      setToastMessage("task deleted!");
    }
  }
  return (
    <>
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
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton id="task-modal">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <div className="eventCardsDiv">
        {taskList?.map((task: any) => {
          return (
            <>
              <IonCard
                class={getTaskCardCSS(task.TASKSTATUS ?? task.taskStatus)}
                key={task.TASKID}
              >
                <IonCardHeader>
                  <IonItem class="item-backgroundColor">
                    <IonButton
                      color={"danger"}
                      slot="end"
                      size="default"
                      onClick={() => deleteTaskHandler(task.TASKID)}
                    >
                      Remove
                      <IonIcon slot="end" icon={trashBin}></IonIcon>
                    </IonButton>
                  </IonItem>

                  <IonCardTitle className="ion-text-capitalize ion-text-wrap">
                    {task.TASKNAME ?? task.taskName}
                  </IonCardTitle>

                  <IonCardSubtitle>
                    Status: {task.TASKSTATUS ?? task.taskStatus}
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    Assigned To:{" "}
                    {getFirstAndLastName(task.ASSIGNEDTO) ??
                      getFirstAndLastName(task.assignedTo)}
                  </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  <p>
                    <b>description:</b> {task.DESCRIPTION ?? task.description}
                  </p>
                  <p>
                    <b>Notes:</b> {task.NOTES ?? task.notes}
                  </p>

                  <p>
                    <b>Start Period:</b>
                    {task.STARTTIME
                      ? format(
                          parseJSON(task.STARTTIME.toString()),
                          "MMM d, yyyy, K:m a "
                        )
                      : format(
                          parseJSON(task.startTime.toString()),
                          "MMM d, yyyy, K:m a "
                        )}
                  </p>

                  <p>
                    <b>Completion Date:</b>{" "}
                    {task.ENDTIME
                      ? format(
                          parseJSON(task.ENDTIME.toString()),
                          "MMM d, yyyy, K:m a "
                        )
                      : format(
                          parseJSON(task.endTime.toString()),
                          "MMM d, yyyy, K:m a "
                        )}
                  </p>
                </IonCardContent>
                <IonButton
                  fill="solid"
                  shape="round"
                  expand="block"
                  id={"taskUpdate-modal" + task.TASKID}
                  // onIonFocus={(e) => setupdateModalTriggerId(e.target.id)}
                  onClick={(e: any) => {
                    setTask(task);
                    // setModalTitle("Update Task");
                    // setupdateModalTriggerId(e.target.id);
                  }}
                >
                  Edit
                </IonButton>
              </IonCard>
              <UpdateTaskModal
                token={token}
                triggerId={"taskUpdate-modal" + task?.TASKID}
                modal={updateTaskModal}
                setState={setState}
                event={props.event}
                // handleUpdateChange={handleUpdateChange}
                helpers={props.helpers}
                dismiss={dismiss}
                task={task}
                setTask={setTask}
                taskList={taskList}
                setTaskList={setTaskList}
                setToastMessage={setToastMessage}
                modalTitle={"Update Task"}
                enterAnimation={enterAnimation}
                leaveAnimation={leaveAnimation}
              />
            </>
          );
        })}
      </div>

      <TaskModal
        token={token}
        triggerId={"task-modal"}
        modal={modal}
        setState={setState}
        event={props.event}
        handleChange={handleChange}
        helpers={props.helpers}
        values={values}
        dismiss={dismiss}
        task={task}
        taskList={taskList}
        setTaskList={setTaskList}
        setToastMessage={setToastMessage}
        modalTitle={"Add Task"}
        enterAnimation={enterAnimation}
        leaveAnimation={leaveAnimation}
      />
    </>
  );
}
