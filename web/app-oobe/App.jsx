import { useState } from "react";
import Nav from "./components/Nav/Nav";
import Body from "./components/Body/Body";
import Page1 from "./components/SetupPages/Page1/Page1";
import { Card } from "@nextui-org/react";
import Page2 from "./components/SetupPages/Page2/Page2";
import Page3 from "./components/SetupPages/Page3/Page3";
import Page4 from "./components/SetupPages/Page4/Page4";
import Page5 from "./components/SetupPages/Page5/Page5";
import Page6 from "./components/SetupPages/Page6/Page6";

function App() {
  const [page, setPage] = useState(5);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const pages = [
    <Page1 key={0} setPage={setPage} />,
    <Page2 key={1} setDeviceInfo={setDeviceInfo} setPage={setPage} />,
    <Page3
      key={2}
      deviceInfo={deviceInfo}
      setDeviceInfo={setDeviceInfo}
      setPage={setPage}
    />,
    <Page4
      key={3}
      deviceInfo={deviceInfo}
      setDeviceInfo={setDeviceInfo}
      setPage={setPage}
    />,
    <Page5
      key={4}
      deviceInfo={deviceInfo}
      setDeviceInfo={setDeviceInfo}
      setPage={setPage}
    />,
    <Page6
      key={5}
      deviceInfo={deviceInfo}
      setDeviceInfo={setDeviceInfo}
      setPage={setPage}
    />,
  ];

  return (
    <div
      className={`h-svh flex flex-col relative overflow-y-scroll bg-background text-foreground ${
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
