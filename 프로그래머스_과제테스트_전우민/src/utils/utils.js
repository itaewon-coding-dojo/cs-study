export const throttle = (callbackEvent, ms) => {
  let flag = true;

  return (e) => {
    if (!flag) return;

    callbackEvent(e);
    flag = false;
    setTimeout(() => { flag = true }, ms);
  };
};
