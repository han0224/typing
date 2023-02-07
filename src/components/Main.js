import { useCallback, useEffect, useRef, useState } from "react";
import style from "../styles/Main.module.css";
import { Info } from "./Info";
import { Keyboard } from "./Keyboard";
import { TextArea } from "./TextArea";
export function Main() {
  const [key, setKey] = useState();
  const [enter, setEnter] = useState(false);
  const [start, setStart] = useState(false);

  const trans = {
    ㅃ: "ㅂ",
    ㅉ: "ㅈ",
    ㄸ: "ㄷ",
    ㄲ: "ㄱ",
    ㅆ: "ㅅ",
    ㅒ: "ㅐ",
    ㅖ: "ㅔ",
  };
  const onkeydown = useCallback(
    (e) => {
      setEnter(e.key === "Enter");
      if (trans[e.key]) setKey(trans[e.key]);
      else setKey(e.key);
    },
    [key]
  );
  const onkeyup = useCallback(
    (e) => {
      setKey("");
    },
    [key]
  );
  const onclick = (e) => {
    setStart(!start);
  };
  const reload = (e) => {
    console.log("!");
    window.location.reload(false);
  };

  useEffect(() => {
    document.body.addEventListener("keydown", onkeydown);
    document.body.addEventListener("keyup", onkeyup);
  }, []);

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
      <Info state={start} />
      <div className={start ? style.active : style.inactive}>
        <TextArea enter={enter} state={start} />
        <div className={style.keyboard}>
          <Keyboard value={key} />
        </div>
      </div>
    </main>
  );
}
