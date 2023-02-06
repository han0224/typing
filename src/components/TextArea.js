import kadvice from "kadvice";
import { useEffect, useState } from "react";
import style from "../styles/TextArea.module.css";

export function TextArea(props) {
  const [pre, setPre] = useState({ text: "", typing: "" });
  const [now, setNow] = useState({ text: "", typing: "" });
  const [next, setNext] = useState({ text: "", typing: "" });

  const onkeydown = (e) => {
    console.log(e);
  };

  useEffect(() => {
    setNext({ ...next, text: kadvice.random(1).message });
    setNow({ ...now, text: kadvice.random(2).message });
  }, []);

  return (
    <div className={style["text-area"]}>
      <div>
        <p>{pre.text}</p>
        <p>{pre.typing}</p>
      </div>
      <div className={style.typing}>
        <p>{now.text}</p>
        <p>
          <input type={"text"} autoFocus></input>
        </p>
      </div>
      <div>
        <p>{next.text}</p>
        <p>{next.typing}</p>
      </div>
    </div>
  );
}
