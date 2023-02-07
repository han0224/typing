import { useEffect, useState } from "react";
import style from "../styles/Main.module.css";
import { Info } from "./Info";
import { Keyboard } from "./Keyboard";
import { TextArea } from "./TextArea";
import { trans } from "../utils/trans";

export function Main() {
  const [key, setKey] = useState();
  const [enter, setEnter] = useState(false);
  const [start, setStart] = useState(false);
  const [char, setChar] = useState(0);

  const onkeydown = (e) => {
    setEnter(e.key === "Enter");
    if (e.key !== "Backspace") setChar((pre) => pre + 1);
    if (trans[e.key]) setKey(trans[e.key]);
    else setKey(e.key);
  };
  const onkeyup = (e) => {
    setKey("");
  };

  const onclick = (e) => {
    setStart(!start);
  };
  const reload = (e) => {
    window.location.reload(false);
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
          onClick={onclick}
        >
          {start ? "중지" : "시작"}
        </button>
        <button onClick={reload}>다시 시작</button>
      </div>
      <Info state={start} char={char} />
      <div className={start ? style.active : style.inactive}>
        <TextArea enter={enter} state={start} />
        <div className={style.keyboard}>
          <Keyboard value={key} />
        </div>
      </div>
    </main>
  );
}
