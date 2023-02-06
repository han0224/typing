import { useCallback, useEffect, useRef, useState } from "react";
import style from "../styles/Main.module.css";
import { Info } from "./Info";
import { Keyboard } from "./Keyboard";
import { TextArea } from "./TextArea";
export function Main() {
  const [key, setKey] = useState();
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
  useEffect(() => {
    document.body.addEventListener("keydown", onkeydown);
    document.body.addEventListener("keyup", onkeyup);
  }, []);

  return (
    <main>
      <Info />
      <TextArea />
      <div className={style.keyboard}>
        <Keyboard value={key} />
      </div>
    </main>
  );
}
