import { useEffect, useState } from "react";
import style from "../styles/Main.module.css";
import { Info } from "./Info";
import { Keyboard } from "./Keyboard";
import { TextArea } from "./TextArea";
import { trans } from "../constants/Trans";
import { reload } from "../utils/Page";
import { STATE } from "../constants/String";

export function Main() {
  const [key, setKey] = useState();
  const [enter, setEnter] = useState(false);
  const [start, setStart] = useState(false);
  const [char, setChar] = useState(0);
  const [accuracy, setAccuracy] = useState({
    pre: { total: 0, correct: 0 },
    now: { total: 0, correct: 0 },
  });

  const onkeydown = (e) => {
    setEnter(e.key === "Enter");
    if (e.key !== "Backspace") setChar((pre) => pre + 1);
    if (trans[e.key]) setKey(trans[e.key]);
    else setKey(e.key);
  };
  const onkeyup = (e) => {
    setKey("");
  };

  useEffect(() => {
    if (start) {
      document.body.addEventListener("keydown", onkeydown);
      document.body.addEventListener("keyup", onkeyup);
    } else {
      document.body.removeEventListener("keydown", onkeydown);
      document.body.removeEventListener("keyup", onkeyup);
    }
  }, [start]);

  return (
    <main>
      <div className={style[`btn-stack`]}>
        <button
          className={start ? style[`button-inactive`] : style[`button-active`]}
          onClick={() => setStart(!start)}
        >
          {start ? STATE.STOP : STATE.START}
        </button>
        <button onClick={reload}>{STATE.RESTART}</button>
      </div>
      <Info state={start} char={char} accuracy={accuracy} />
      <div className={start ? style.active : style.inactive}>
        <TextArea enter={enter} state={start} setAccuracy={setAccuracy} />
        <div className={style.keyboard}>
          <Keyboard value={key} />
        </div>
      </div>
    </main>
  );
}
