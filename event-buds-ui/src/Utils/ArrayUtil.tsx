import { format, parseISO, parseJSON } from "date-fns";

export function ongoingArraySortedByDateASC(array: any) {
  return array
    .filter((list: any) => list.STATUS === "Ongoing")
    .sort(
      (a: any, b: any) =>
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        new Date(b?.STARTDATETIME) < new Date(a?.STARTDATETIME)
    );
}

export function ongoingTaskArraySortedByDateASC(array: any) {
  return array
    .filter(
      (list: any) => list.TASKSTATUS === "Ongoing" || list.TASKSTATUS === null
    )
    .sort(
      (a: any, b: any) =>
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        new Date(b?.STARTDATETIME) < new Date(a?.STARTDATETIME)
    );
}

export function taskAssignedArraySortedByDateASC(array: any, userid: Number) {
  return array
    .filter((list: any) => list.ASSIGNEDTO.USERID === userid)
    .sort(
      (a: any, b: any) =>
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        new Date(b?.STARTDATETIME) < new Date(a?.STARTDATETIME)
    );
}

export function completedTaskArraySortedByDateASC(array: any) {
  return array
    .filter((list: any) => list.TASKSTATUS === "Completed")
    .sort(
      (a: any, b: any) =>
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        new Date(b?.STARTDATETIME) < new Date(a?.STARTDATETIME)
    );
}

export function upcomingArraySortedByDateASC(array: any) {
  return array
    .filter(
      (list: any) =>
        list.STATUS === "Ongoing" &&
        new Date(list.STARTDATETIME) > new Date() &&
        new Date(list.STARTDATETIME) < nextweek()
    )
    .sort(
      (a: any, b: any) =>
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        new Date(b?.STARTDATETIME) < new Date(a?.STARTDATETIME)
    );
}

export function completedArraySortedByDateASC(array: any) {
  return array
    .filter((list: any) => list.STATUS === "Completed")
    .sort(
      (a: any, b: any) =>
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        new Date(b?.STARTDATETIME) < new Date(a?.STARTDATETIME)
    )
    .slice(0, 5);
}

function nextweek() {
  var today = new Date();
  var nextweek = new Date(
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
