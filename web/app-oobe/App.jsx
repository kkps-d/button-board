import { useState } from "react";
import Nav from "./components/Nav/Nav";
import Body from "./components/Body/Body";
import Page1 from "./components/SetupPages/Page1/Page1";
import { Card } from "@nextui-org/react";
import Page2 from "./components/SetupPages/Page2/Page2";

function App() {
  const [page, setPage] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [darkMode, setDarkMode] = useState(true);

  const pages = [
    <Page1 key={0} setDeviceInfo={setDeviceInfo} setPage={setPage} />,
    <Page2 key={1} setDeviceInfo={setDeviceInfo} setPage={setPage} />,
  ];

  return (
    <div
      className={`h-svh flex flex-col relative bg-background text-foreground ${
        darkMode ? "dark" : "light"
      }`}
    >
      <Nav />
      <Body>
        <Card className="w-5/6 sm:w-96 transition-all">{pages[page]}</Card>
      </Body>
    </div>
  );
}

export default App;
