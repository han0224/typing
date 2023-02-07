import { useEffect } from "react";
import style from "../styles/Keyboard.module.css";
export function Keyboard({ value }) {
  const keyboardItem = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ", "[", "]"],
    ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ", ";", `'`],
    ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", ",", ".", "/"],
  ];

  return (
    <div className={style.keyboard}>
      <div className={style.row}>
        {keyboardItem[0].map((v, i) => (
          <div id={v === value ? style.down : ""} key={`firstLine-${i}`}>
            <p>{v}</p>
          </div>
        ))}
      </div>
      <div className={style.row}>
        {keyboardItem[1].map((v, i) => (
          <div id={v === value ? style.down : ""} key={`secondLine-${i}`}>
            <p>{v}</p>
          </div>
        ))}
      </div>
      <div className={style.row}>
        {keyboardItem[2].map((v, i) => (
          <div id={v === value ? style.down : ""} key={`thirdLine-${i}`}>
            <p>{v}</p>
          </div>
        ))}
      </div>
      <div className={style.row}>
        {keyboardItem[3].map((v, i) => (
          <div id={v === value ? style.down : ""} key={`fourthLine-${i}`}>
            <p>{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
