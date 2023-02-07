import { useEffect, useRef, useState } from "react";
import style from "../styles/Info.module.css";

export function Info({ state }) {
  const [time, setTime] = useState(0);
  const timer = useRef(null);

  const formatTime = (time) => {
    return `${`0${Math.floor(time / 60)}`.slice(-2)}:${`0${time % 60}`.slice(
      -2
    )}`;
  };

  useEffect(() => {
    if (state) {
      timer.current = setInterval(() => {
        setTime((pre) => pre + 1);
      }, 500);
      return () => clearInterval(timer.current);
    } else {
      clearInterval(timer.current);
    }
  }, [state]);
  return (
    <div className={style.info}>
      <div>
        <p>진행시간(초)</p>
        <p>{formatTime(time)}</p>
      </div>
      <div>
        <p>타수(타/m)</p>
        <p>256</p>
      </div>
      <div>
        <p>최고타수</p>
        <p>700</p>
      </div>
    </div>
  );
}
