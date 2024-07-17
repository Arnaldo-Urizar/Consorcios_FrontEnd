import Wave from "react-wavify";
import styles from "./wave.module.css";

function WaveComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <Wave
        fill="var(--primary-color)"
        paused={false}
        style={{
          display: "flex",
          zIndex: -50,
          transform: "rotate(180deg)",
        }}
        options={{
          height: 50,
          amplitude: 45,
          speed: 0.15,
          points: 3,
        }}
      />
    </div>
  );
}

export default WaveComponent;
