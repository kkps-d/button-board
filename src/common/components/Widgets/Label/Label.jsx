import styles from "./Label.module.css";

function Label({ description }) {
  return <div className={`widget ${styles.label}`}>Label</div>;
}

export default Label;
