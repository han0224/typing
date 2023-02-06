import style from "../styles/Main.module.css";
import { Info } from "./Info";
import { Keyboard } from "./Keyboard";
import { TextArea } from "./TextArea";
export function Main() {
  return (
    <main>
      <Info />
      <TextArea />
      <div className={style.keyboard}>
        <Keyboard />
      </div>
    </main>
  );
}
