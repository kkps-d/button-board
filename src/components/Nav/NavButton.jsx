import styles from "./NavButton.module.css";

function NavButton({ children, onClick }) {
  return (
    <button className={styles.navButton} onClick={onClick}>
      {children}
    </button>
  );
}

export default NavButton;
