import style from "../styles/TextArea.module.css";

export function TextArea() {
  return (
    <div className={style["text-area"]}>
      <div>
        <p>pre</p>
        <p></p>
      </div>
      <div className={style.typing}>
        <p>now</p>
        <p></p>
      </div>
      <div>
        <p>next</p>
        <p></p>
      </div>
    </div>
  );
}
