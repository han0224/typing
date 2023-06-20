/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from "react";
import { INFO } from "../constants/String";
import style from "../styles/Info.module.css";
import { formatTime } from "../utils/Format";
import { InfoItem } from "./InfoItem";

/**
 * state: 시작 혹은 중지 상태
 * char: 타자 속도하기 위한 상태
 * accuracy: 정확도
 */
export function Info({ state, char, accuracy }) {
  const [time, setTime] = useState(0); // timer 시간
  const timer = useRef(null); // timer
  const bestRef = useRef(0);

  // 1초마다 cpm, best 변경
  // 현재 타자 속도
  const cpm = useMemo(() => {
    return Math.floor((char / time) * 60) || 0;
  }, [time]);

  // 최고 타자 속도
  const best = useMemo(() => {
    const maxValue = Math.max(cpm, bestRef.current);
    bestRef.current = maxValue;
    return maxValue;
  }, [time]);

  /**
   * state가 true인 경우 timer 동작
   * false인 경우 timer 삭제
   */
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
      <InfoItem info={INFO.TIME} value={formatTime(time)} />
      <InfoItem info={INFO.CPM} value={cpm} />
      <InfoItem info={INFO.BEST} value={best} />
      <InfoItem info={INFO.ACCURACY} value={accuracy} />
    </div>
  );
}
