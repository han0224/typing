import { useEffect, useRef, useState } from "react";
import style from "../styles/Info.module.css";
import { formatTime } from "../utils/Format";
import { InfoItem } from "./InfoItem";

export function Info({ state, char, accuracy }) {
  const [time, setTime] = useState(0);
  const timer = useRef(null);
  const [cpm, setCpm] = useState(0);
  const [best, setBest] = useState(0);

  const getAccuracy = () => {
    const correct = accuracy.pre.correct + accuracy.now.correct;
    const total = accuracy.pre.total + accuracy.now.total;
    if (total === 0) return `100%`;
    return Math.floor((correct / total) * 100) + "%";
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
    }
    clearInterval(timer.current);
  }, [state]);

  return (
    <div className={style.info}>
      <InfoItem info={"진행시간(초)"} value={formatTime(time)} />
      <InfoItem info={"타수(타/m)"} value={best} />
      <InfoItem info={"정확도"} value={getAccuracy()} />
    </div>
  );
}
