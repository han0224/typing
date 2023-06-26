/* eslint-disable react-hooks/exhaustive-deps */
import kadvice from "kadvice";
import { Text } from "./Text";
import { useCallback, useEffect, useState } from "react";
import style from "../styles/TextArea.module.css";

/**
 * isEnter: enter를 누렀는가?
 * isStart: 시작상태인가?
 * setAccuracy: 정확도 state setState
 */
export function TextArea({ isEnter, isStart, setAccuracy, keyDown, keyUp }) {
  const [pre, setPre] = useState({ text: "", typing: [] });
  const [now, setNow] = useState({ text: "", typing: [] });
  const [next, setNext] = useState({ text: "", typing: [] });

  const onChange = (e) => {
    // 현재 작성중인 모든 텍스트들
    const { value } = e.target;
    // 현재 작성중인 텍스트들 중 올바르게 작성한 텍스트 갯수
    let correctNum = 0;
    // TODO: 매번 입력할때마다 처음부터 끝까지 입력한값을 비교하고 있음 -> 현재 입력한 값만을 비교해 correctNum을 변경하는 방법으로 변경
    // onChange에서 e.target은 input 내 입력된 텍스트만을 가져옴
    // -> 현재 글자를 지웠는지 확인하는 방법 고민
    for (let i = 0; i < value.length - 1; i++) {
      if (value[i] === now.text[i]) correctNum += 1;
    }
    // 정확도 변경
    setAccuracy.now({ total: value.length - 1, correct: correctNum });

    setNow({ ...now, typing: value.split("") });
  };

  // enter를 눌렀을 경우 now state 값을 pre로 교체해주고
  // now 값을 next 값으로 변경
  // next 값은 새로운 랜덤값으로 설정
  // accuracy.pre 값을 현재 text의 길이와, 정확도로 설정
  // accuracy.now 값은 초기화
  // accuracy.now 값을 props로 가져오지않았기에 다시 correct 값을 계산하여 accruacy.pre 값을 변경
  const nowTyping = useCallback(() => {
    const nowCorrect = now.text
      .split("")
      .reduce(
        (acc, cur, index) => (cur === now.typing[index] ? acc + 1 : acc),
        0
      );
    setAccuracy.addPre(now.text.length, nowCorrect);
    setAccuracy.now({ total: 0, correct: 0 });

    setPre({ text: now.text, typing: now.typing });
    setNow({ text: next.text, typing: next.typing });
    setNext((next) => {
      return { ...next, text: kadvice.random().message };
    });
  }, [now, next]);

  useEffect(() => {
    if (isEnter) nowTyping();
  }, [isEnter]);

  // 초기설정
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
          {isStart ? (
            <input
              type={"text"}
              value={now.typing.join("")}
              onChange={onChange}
              onKeyDown={keyDown}
              onKeyUp={keyUp}
              autoFocus
            ></input>
          ) : (
            ""
          )}
        </p>
      </div>
      {/* next는 오타를 확인할 필요가 없으므로 Text컴포넌트 사용 X */}
      <div>
        <p>{next.text}</p>
        <p>{next.typing}</p>
      </div>
    </div>
  );
}
