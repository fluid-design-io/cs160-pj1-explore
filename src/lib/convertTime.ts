// a function to convert time in minutes to hours and minutes

export const convertTime = (time: number): string => {
  const hours = Math.floor(time / 60);
  if (hours === 0) {
    return `${time} minutes`;
  }
  const minutes = time % 60;
  return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
};
