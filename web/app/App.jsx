import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/solid";
import SettingsModal from "./components/SettingsModal/SettingsModal";
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [bgImageUrl, setBgImageUrl] = useLocalStorage("bgImageUrl", null);
  const settingsModalProps = useDisclosure();

  return (
    <div
      className={`h-svh flex flex-col relative bg-background text-foreground ${
        darkMode ? "dark" : "light"
      }`}
      style={{
        backgroundImage: `url("${bgImageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <Nav
        onNavOpen={settingsModalProps.onOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <SettingsModal
        darkMode={darkMode}
        settingsModalProps={settingsModalProps}
      />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
