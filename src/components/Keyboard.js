import style from "../styles/Keyboard.module.css";
export function Keyboard() {
  const keyboardItem = [
    ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ", "[", "]"],
    ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ", ";", `'`],
    ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", ",", ".", "/"],
  ];

  return (
    <div className={style.keyboard}>
      <div className={style.row}>
        {keyboardItem[0].map((v, i) => (
          <div className={style.key} key={`firstLine-${i}`}>
            <p>{v}</p>
          </div>
        ))}
      </div>
      <div className={style.row}>
        {keyboardItem[1].map((v, i) => (
          <div className={style.key} key={`secondLine-${i}`}>
            <p>{v}</p>
          </div>
        ))}
      </div>
      <div className={style.row}>
        {keyboardItem[2].map((v, i) => (
          <div className={style.key} key={`thirdLine-${i}`}>
            <p>{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
