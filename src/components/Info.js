import { useEffect, useRef, useState } from "react";
import style from "../styles/Info.module.css";

export function Info({ state }) {
  const [time, setTime] = useState(0);
  const timer = useRef(null);
  useEffect(() => {
    console.log(state);
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
        <p>{time}</p>
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
