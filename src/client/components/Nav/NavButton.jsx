import styles from "./NavButton.module.css";

function NavButton({ children, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${styles.navButton} ${active ? styles.active : ""}`}
    >
      {children}
    </div>
  );
}

export default NavButton;
