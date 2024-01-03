import styles from "./Test.module.css";

function Test() {
  return (
    <div className={`widget ${styles.test}`}>
      <div className={styles.inner}></div>
    </div>
  );
}

export default Test;
