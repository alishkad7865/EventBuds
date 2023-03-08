export function ongoingArraySortedByDateASC(array: any) {
  return array
    .filter((list: any) => list.STATUS === "Ongoing")
    .sort(
      (a: any, b: any) =>
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        new Date(b?.STARTDATETIME) < new Date(a?.STARTDATETIME)
    )
    .slice(0, 5);
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
