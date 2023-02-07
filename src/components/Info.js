import { useEffect, useRef, useState } from "react";
import style from "../styles/Info.module.css";

export function Info({ state, char }) {
  const [time, setTime] = useState(0);
  const timer = useRef(null);
  const [cpm, setCpm] = useState(0);
  const [best, setBest] = useState(0);

  const formatTime = (time) => {
    return `${`0${Math.floor(time / 60)}`.slice(-2)}:${`0${time % 60}`.slice(
      -2
    )}`;
  };
  useEffect(() => {
    if (time === 0) return;
    setCpm(Math.floor((char / time) * 60) || 0);
    setBest(Math.max(cpm, best));
  }, [cpm, best, char, time]);

  useEffect(() => {
    if (state) {
      timer.current = setInterval(() => {
        setTime((pre) => pre + 1);
      }, 1000);
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
        <p>{cpm}</p>
      </div>
      <div>
        <p>최고타수</p>
        <p>{best}</p>
      </div>
    </div>
  );
}
