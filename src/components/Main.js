import { useEffect, useRef, useState } from "react";
import style from "../styles/Main.module.css";
import { Info } from "./Info";
import { Keyboard } from "./Keyboard";
import { TextArea } from "./TextArea";
import { enToKr, trans } from "../constants/Trans";
import { reload } from "../utils/Page";
import { STATE } from "../constants/String";

export function Main() {
  const [key, setKey] = useState(); // 현재 눌린 키, 화면에 있는 키보드에 표시해두기 위한 용도
  const [enter, setEnter] = useState(false); // enter를 눌렀는지
  const [start, setStart] = useState(false); // 시작상태인지
  const [char, setChar] = useState(0); // 타자속도 계산하기 위한
  const [viewAccuracy, setViewAccuracy] = useState("100%");
  // 정확도, pre: 현재 작성하고 있는 문장 이전까지, now: 현재 작성하는 문장
  // ref로 한이유: 컴포넌트가 재랜더링되더라도 이전 값은 계속 가지고 있어야 하기에
  const accuracy = useRef({
    pre: { total: 0, correct: 0 },
    now: { total: 0, correct: 0 },
  });
  // accuracy 변경 함수
  const setAccuracy = {
    pre: (newValue) => {
      accuracy.current.pre = newValue;
      setViewAccuracy(() => getAccuracy(accuracy.current));
    },
    addPre: (total, correct) => {
      accuracy.current.pre = {
        total: accuracy.current.pre.total + total,
        correct: accuracy.current.pre.correct + correct,
      };
      setViewAccuracy(() => getAccuracy(accuracy.current));
    },
    now: (newValue) => {
      accuracy.current.now = newValue;
      setViewAccuracy(() => getAccuracy(accuracy.current));
    },
  };
  const getAccuracy = (accuracy) => {
    // 정확도
    const correct = accuracy.pre.correct + accuracy.now.correct;
    // 전체 글자수
    const total = accuracy.pre.total + accuracy.now.total;
    if (total <= 0) return `100%`;
    return Math.floor((correct / total) * 100) + "%";
  };

  /**
   * 사용자의 운영체제를 반환해주는 함수
   * mac: keydown 이벤트의 event.key는 한글 영어 상관없이 사용자가 입력한 문자가 나옴
   * window: keydown 이벤트의 event.key는 한글에서 사용자가 입력한 문자가 제대로 나오지 않음
   * -> 그렇기에 사용자가 window를 사용하는지, mac을 사용하는지 구분해야함
   */
  // const checkUserOS = () => {
  //   if (!("navigator" in window)) {
  //     return "unknown";
  //   }
  //   const platform = (
  //     navigator.userAgentData?.platform || navigator.platform
  //   )?.toLowerCase();

  //   if (platform.startsWith("win")) return "windows";
  //   if (platform.startsWith("mac")) return "macos";
  //   return "unknown";
  // };

  /**
   *
   * @param {KeyboardEvent<HTMLImageElement>} e
   * 현재 누른 키에 대한 정보 변경 함수
   * enter: 현재 enter을 누른상태면 enter state true
   * 쌍자음에 대한 정보는 화면에 있는 키보드에 보이지 않으므로 변환하여 key에 저장
   */
  const onkeydown = (e) => {
    const { key, code } = e;

    if (code.includes("Digit")) {
      const a = code.slice(5);
      setKey(a);
      return;
    }
    if (!code.includes("Key")) {
      console.log("!@3", key);
      if (trans[key]) setKey(trans[key]);
      else setKey(key);
      return;
    }
    const tmp = code.slice(3);
    const currentKey = enToKr[tmp.toLowerCase()];
    setEnter(key === "Enter");
    console.log(key, code);
    if (key !== "Backspace") setChar((pre) => pre + 1);

    if (trans[currentKey]) setKey(trans[currentKey]);
    else setKey(currentKey);
  };
  /**
   * keyup 이벤트가 발생한 경우 눌린 키가 없으므로 setkey를 공백문자로 설정
   */
  const onkeyup = () => {
    setKey("");
  };

  /**
   * 시작 상태일때 onkeydown, onkeyup 함수를 이벤트리스너에 추가
   * 시작 상태가 아닐 경우 이벤트리스너에서 제거
   */
  // useEffect(() => {
  //   if (start) {
  //     document.body.addEventListener("keydown", onkeydown);
  //     document.body.addEventListener("keyup", onkeyup);
  //   } else {
  //     document.body.removeEventListener("keydown", onkeydown);
  //     document.body.removeEventListener("keyup", onkeyup);
  //   }
  // }, [start]);
  useEffect(() => {}, []);

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
      <Info state={start} char={char} accuracy={viewAccuracy} />
      <div className={start ? style.active : style.inactive}>
        <TextArea
          isEnter={enter}
          isStart={start}
          setAccuracy={setAccuracy}
          keyDown={onkeydown}
          keyUp={onkeyup}
        />
        <div className={style.keyboard}>
          <Keyboard value={key} />
        </div>
      </div>
    </main>
  );
}
