import { keyboardItem } from "../constants/KeyboardItem";
import style from "../styles/Keyboard.module.css";

export function Keyboard({ value }) {
  return (
    <div className={style.keyboard}>
      {keyboardItem.map((keyboardRow, i) => (
        <div className={style.row} key={`row-${i}`}>
          {keyboardRow.map((key, j) => (
            <div id={key === value ? style.down : ""} key={`${j}line-${i}`}>
              <p>{key}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
