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
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonToast,
} from "@ionic/react";
import { add, filterOutline, trashBin } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { deleteTask, getTasks } from "../../api/taskApi";
import TaskModal from "./Modal/TaskModal";

import UpdateTaskModal from "./Modal/UpdateTaskModal";
import { enterAnimation, leaveAnimation } from "../../Utils/ModalUtil";
import { UserContext } from "../../context/UserContext";
import {
  defaultAssignedToUser,
  getAssignedUser,
  getFirstAndLastName,
} from "../../types/AssignedToUser";
import {
  completedTaskArraySortedByDateASC,
  LocaleDateTimeISOFormat,
  ongoingTaskArraySortedByDateASC,
  parseDateToReadableFormat,
  taskAssignedArraySortedByDateASC,
} from "../../Utils/ArrayUtil";
export default function Task(props: any) {
  const { taskList, setTaskList } = props;
  const [task, setTask] = useState<any>({});
  const modal = useRef<HTMLIonModalElement>(null);
  const updateTaskModal = useRef<HTMLIonModalElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { token, user } = useContext(UserContext);
  const [filter, setFilter] = useState("assignedToMe");
  const [filterTaskList, setFilterTaskList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isTaskNameValid, setIsTaskNameValid] = useState<boolean | false>();
  const [isStartDateValid, setIsStartDateValid] = useState<boolean>(true);
  const [isEndDateValid, setIsEndDateValid] = useState<boolean>(true);

  let initialState = {
    TASKNAME: "",
    STARTTIME: LocaleDateTimeISOFormat(props.event.STARTDATETIME),
    ENDTIME: LocaleDateTimeISOFormat(props.event.ENDDATETIME),
    DESCRIPTION: "",
    ASSIGNEDTO: defaultAssignedToUser,
    TASKSTATUS: "Ongoing",
    NOTES: "",
  };
  const [state, setState] = useState(initialState);
  const handleChange = (input: any) => (e: any) => {
    if (input === "ASSIGNEDTO") {
      setState({ ...state, [input]: getAssignedUser(e.target.value) });
    } else setState({ ...state, [input]: e.target.value });
    validate(e);
  };

  useEffect(() => {
    if (filter === "assignedToMe") {
      setFilterTaskList(
        taskAssignedArraySortedByDateASC(taskList, user.USERID)
      );
    } else if (filter === "ongoing") {
      setFilterTaskList(ongoingTaskArraySortedByDateASC(taskList));
    } else if (filter === "completed")
      setFilterTaskList(completedTaskArraySortedByDateASC(taskList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, taskList]);
  function ValidateAllFields(task: any) {
    validateOnSubmit("TASKNAME", task.TASKNAME, task);
    validateOnSubmit("startDate", task.STARTTIME, task);
    validateOnSubmit("endDate", task.ENDTIME, task);
    return isTaskNameValid && isEndDateValid && isStartDateValid;
  }
  function SetAllValidatorsFalse() {
    setIsTaskNameValid(false);
    setIsEndDateValid(false);
    setIsStartDateValid(false);
  }
  const validateOnSubmit = (name: string, value: string, task: any) => {
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
  const validate = (ev: Event) => {
    const { name, value } = ev.target as HTMLInputElement;
    if (name === "TASKNAME") {
      if (value.trim() === "") {
        setIsTaskNameValid(false);
      } else {
        setIsTaskNameValid(true);
      }
    }
    if (name === "startDate") {
      if (new Date(value) > new Date(ENDTIME)) {
        setIsEndDateValid(false);
        setIsStartDateValid(false);
      } else {
        setIsStartDateValid(true);
        setIsEndDateValid(true);
      }
    }
    if (name === "endDate") {
      setIsStartDateValid(false);

      if (new Date(value) < new Date(STARTTIME)) {
        setIsEndDateValid(false);
        setIsStartDateValid(false);
      } else {
        setIsStartDateValid(true);
        setIsEndDateValid(true);
      }
    }
  };
  const markTouched = () => {
    setIsTouched(true);
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

  const validator = {
    isTaskNameValid,
    isEndDateValid,
    isStartDateValid,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (result.message === "Success") {
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
        <IonFabButton
          id="task-modal"
          disabled={props.event.STATUS === "Completed"}
        >
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonRow class="ion-justify-content-end">
        <IonRadioGroup
          value={filter}
          onIonChange={(e: any) => {
            setFilter(e.target.value);
          }}
        >
          <p>
            <IonIcon icon={filterOutline} class="ion-padding-end"></IonIcon>
            Filter:
          </p>
          <IonLabel class="ion-padding">Assigned to Me</IonLabel>
          <IonRadio slot="end" value="assignedToMe">
            Assigned to Me
          </IonRadio>
          <IonLabel class="ion-padding">Ongoing</IonLabel>
          <IonRadio slot="end" value="ongoing">
            Ongoing
          </IonRadio>
          <IonLabel class="ion-padding">Completed</IonLabel>
          <IonRadio slot="end" value="completed">
            Completed
          </IonRadio>
        </IonRadioGroup>
      </IonRow>
      <div className="eventCardsDiv">
        {filterTaskList?.map((task: any) => {
          return (
            <>
              <IonCard
                class={getTaskCardCSS(task.TASKSTATUS ?? task.taskStatus)}
                key={`${task.TASKID}_${filter}`}
              >
                <IonCardHeader>
                  <IonItem class="item-backgroundColor">
                    <IonButton
                      color={"danger"}
                      slot="end"
                      size="default"
                      onClick={() => deleteTaskHandler(task.TASKID)}
                      disabled={props.event.STATUS === "Completed"}
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
                      ? parseDateToReadableFormat(task.STARTTIME.toString())
                      : parseDateToReadableFormat(task.startTime.toString())}
                  </p>

                  <p>
                    <b>Completion Date:</b>{" "}
                    {task.ENDTIME
                      ? parseDateToReadableFormat(task.ENDTIME.toString())
                      : parseDateToReadableFormat(task.endTime.toString())}
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
                    setShowModal(true);
                    // setModalTitle("Update Task");
                    // setupdateModalTriggerId(e.target.id);
                  }}
                  disabled={props.event.STATUS === "Completed"}
                >
                  Edit
                </IonButton>
              </IonCard>
            </>
          );
        })}
      </div>
      <UpdateTaskModal
        token={token}
        triggerId={"taskUpdate-modal" + task?.TASKID}
        modal={updateTaskModal}
        setState={setState}
        event={props.event}
        showModal={showModal}
        setShowModal={setShowModal}
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
        isTouched={isTouched}
        markTouched={markTouched}
      />
      <TaskModal
        token={token}
        triggerId={"task-modal"}
        modal={modal}
        initialState={initialState}
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
        ValidateAllFields={ValidateAllFields}
        SetAllValidatorsFalse={SetAllValidatorsFalse}
        validator={validator}
        validate={validate}
        isTouched={isTouched}
        markTouched={markTouched}
      />
    </>
  );
}
