import styles from "./NavButton.module.css";

function NavButton({ children, onClick }) {
  return (
    <div onClick={onClick} className={styles.navButton}>
      {children}
    </div>
  );
}

export default NavButton;
