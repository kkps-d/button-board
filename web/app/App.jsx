import { useState } from "react";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div
      className={`h-svh flex flex-col relative bg-background text-foreground ${
        darkMode ? "dark" : "light"
      }`}
    >
      <p>{isOpen}</p>
      <Nav onNavOpen={onOpen} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={`text-foreground ${darkMode ? "dark" : "light"}`}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Settings
              </ModalHeader>
              <ModalBody>
                {/* Vertical tabs coming soon apparently */}
                <Tabs>
                  <Tab title="Demo board">asdf</Tab>
                  <Tab title="SDVX">fffd</Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Body />
      <Footer />
    </div>
  );
}

export default App;
