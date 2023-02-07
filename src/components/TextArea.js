import kadvice from "kadvice";
import { Text } from "./Text";
import { useEffect, useState } from "react";
import style from "../styles/TextArea.module.css";

export function TextArea({ enter, state }) {
  const [pre, setPre] = useState({ text: "", typing: [] });
  const [now, setNow] = useState({ text: "", typing: [] });
  const [next, setNext] = useState({ text: "", typing: [] });

  const onChange = (e) => {
    setNow({ ...now, typing: e.target.value.split("") });
  };
  const nowTyping = () => {
    setPre({ text: now.text, typing: now.typing });
    setNow({ text: next.text, typing: next.typing });
    setNext({ ...next, text: kadvice.random().message });
  };
  useEffect(() => {
    if (enter) {
      nowTyping();
    }
  }, [enter]);

  useEffect(() => {
    setPre({ text: "", typing: "" });
    setNext({ ...next, text: kadvice.random(1).message });
    setNow({ ...now, text: kadvice.random(2).message });
  }, []);

  return (
    <div className={style["text-area"]}>
      <div>
        <Text text={pre.text} input={pre.typing} state={"pre"} />
        <p>{pre.typing}</p>
      </div>
      <div className={style.typing}>
        <Text text={now.text} input={now.typing} state={"now"} />
        <p>
          {state ? (
            <input
              type={"text"}
              value={now.typing.join("")}
              onChange={onChange}
              autoFocus
            ></input>
          ) : (
            ""
          )}
        </p>
      </div>
      <div>
        <p>{next.text}</p>
        <p>{next.typing}</p>
      </div>
    </div>
  );
}
