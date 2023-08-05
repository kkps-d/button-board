import styles from "./BaseWidget.module.css";

function BaseWidget({ className = "", children }) {
  return <div className={`${styles.widget} ${className}`}>{children}</div>;
}

export default BaseWidget;
