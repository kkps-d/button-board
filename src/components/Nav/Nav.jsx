import { useState } from "react";
import styles from "./Nav.module.css";
import NavButton from "./NavButton";

function Nav() {
  const [version, setVersion] = useState(-2);

  var licenseTag = "";

  switch (version) {
    case 1:
      licenseTag = "";
      break;

    case 2:
      licenseTag = "Plus";
      break;

    case 3:
      licenseTag = "Pro";
      break;

    case -1:
      licenseTag = "βeta";
      break;

    case -2:
      licenseTag = "αlpha";
      break;

    default:
      break;
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.name}>
          Button Board{version === 0 ? " Free" : " "}
        </span>
        {version > 1 ? (
          <span className={styles.licensed}>{licenseTag}</span>
        ) : null}
        {version < 0 ? (
          <span className={styles.prerelease}>{licenseTag}</span>
        ) : null}
      </div>

      <NavButton>Settings</NavButton>
    </nav>
  );
}

export default Nav;
