import style from "../styles/Info.module.css";

export function Info() {
  return (
    <div className={style.info}>
      <div>
        <p>진행시간(초)</p>
        <p>00:00</p>
      </div>
      <div>
        <p>타수(타/m)</p>
        <p>256</p>
      </div>
      <div>
        <p>최고타수</p>
        <p>700</p>
      </div>
    </div>
  );
}
