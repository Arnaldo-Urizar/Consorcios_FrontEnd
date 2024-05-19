import styles from "./wave.module.css";

interface WaveProps {
  pos1?: string;
  pos2?: string;
  pos3?: string;
}
function Wave(props: WaveProps) {
  const { pos1, pos2, pos3 } = props;

  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.bg_color} style={{ position: pos1 }}></div>
        <div
          className={`${styles.wave} ${styles.w1}`}
          style={{ position: pos2 }}
        ></div>
        <div
          className={`${styles.wave} ${styles.w2}`}
          style={{ position: pos3 }}
        ></div>
      </div>
    </div>
  );
}

export default Wave;
