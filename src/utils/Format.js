export const formatTime = (time) => {
  return `${`0${Math.floor(time / 60)}`.slice(-2)}:${`0${time % 60}`.slice(
    -2
  )}`;
};
