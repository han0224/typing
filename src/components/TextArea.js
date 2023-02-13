import kadvice from "kadvice";
import { Text } from "./Text";
import { useCallback, useEffect, useState } from "react";
import style from "../styles/TextArea.module.css";

export function TextArea({ enter, state, setAccuracy }) {
  const [pre, setPre] = useState({ text: "", typing: [] });
  const [now, setNow] = useState({ text: "", typing: [] });
  const [next, setNext] = useState({ text: "", typing: [] });

  const onChange = (e) => {
    const inputText = e.target.value;
    let tmp = 0;
    for (let i = 0; i < inputText.length - 1; i++) {
      if (inputText[i] === now.text[i]) tmp += 1;
    }
    setAccuracy((pre) => {
      return { ...pre, now: { total: inputText.length - 1, correct: tmp } };
    });
    setNow({ ...now, typing: inputText.split("") });
  };

  const nowTyping = useCallback(() => {
    const nowCorrect = now.text
      .split("")
      .reduce(
        (acc, cur, index) => (cur === now.typing[index] ? acc + 1 : acc),
        0
      );
    setAccuracy((pre) => {
      return {
        pre: {
          total: pre.pre.total + now.text.length,
          correct: pre.pre.correct + nowCorrect,
        },
        now: { total: 0, correct: 0 },
      };
    });
    setPre({ text: now.text, typing: now.typing });
    setNow({ text: next.text, typing: next.typing });
    setNext((next) => {
      return { ...next, text: kadvice.random().message };
    });
  }, [now, next]);

  useEffect(() => {
    if (enter) nowTyping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enter]);

  useEffect(() => {
    setPre({ text: "", typing: "" });
    setNext((next) => {
      return { ...next, text: kadvice.random(1).message };
    });
    setNow((now) => {
      return { ...now, text: kadvice.random(2).message };
    });
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
