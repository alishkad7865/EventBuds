import { compareAsc, compareDesc, format, parseISO, parseJSON } from "date-fns";

export function PublicEventSortedByDateASC(array: any) {
  return array
    .filter((list: any) => list.ISPUBLIC === 1)
    .sort((a: any, b: any) =>
      compareDesc(new Date(b?.STARTDATETIME), new Date(a?.STARTDATETIME))
    );
}

export function PrivateEventSortedByDateASC(array: any) {
  return array
    .filter((list: any) => list.ISPUBLIC === 0)
    .sort((a: any, b: any) =>
      compareDesc(new Date(b?.STARTDATETIME), new Date(a?.STARTDATETIME))
    );
}

export function ongoingTaskArraySortedByDateASC(array: any) {
  return array
    .filter(
      (list: any) => list.TASKSTATUS === "Ongoing" || list.TASKSTATUS === null
    )
    .sort((a: any, b: any) =>
      compareDesc(new Date(b?.STARTTIME), new Date(a?.STARTTIME))
    );
}

export function taskAssignedArraySortedByDateASC(array: any, userid: Number) {
  return array
    .filter((list: any) => list.ASSIGNEDTO.USERID === userid)
    .sort((a: any, b: any) =>
      compareDesc(new Date(b?.STARTTIME), new Date(a?.STARTTIME))
    );
}

export function completedTaskArraySortedByDateASC(array: any) {
  return array
    .filter((list: any) => list.TASKSTATUS === "Completed")
    .sort((a: any, b: any) =>
      compareDesc(new Date(b?.STARTTIME), new Date(a?.STARTTIME))
    );
}

export function upcomingArraySortedByDateASC(array: any) {
  return array
    .filter(
      (list: any) =>
        list.STATUS === "Ongoing" &&
        new Date(list.STARTDATETIME).getTime() > new Date().getTime() &&
        new Date(list.STARTDATETIME).getTime() < nextweek().getTime()
    )
    .sort((a: any, b: any) =>
      compareDesc(new Date(b?.STARTDATETIME), new Date(a?.STARTDATETIME))
    );
}

export function completedArraySortedByDateASC(array: any) {
  return array
    .filter((list: any) => list.STATUS === "Completed")
    .sort((a: any, b: any) =>
      compareAsc(new Date(b?.STARTDATETIME), new Date(a?.STARTDATETIME))
    )
    .slice(0, 5);
}

function nextweek() {
  let today = new Date();
  let nextweek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );
  return nextweek;
}

export function LocaleDateTimeISOFormat(date: string) {
  // eslint-disable-next-line no-useless-concat
  return format(parseJSON(date), "yyyy-MM-dd" + "'T'" + "HH:mm:ss");
}

export function currentDateTimeInISOFormat(date: string) {
  return new Date().toISOString();
}

export function parseDateToReadableFormat(date: string): string {
  return format(parseISO(date), "MMM d, yyyy, KK:mm a ");
}
