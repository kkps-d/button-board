import {
  ArrowUpTrayIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  ButtonGroup,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

function SettingsModal({ settingsModalProps, darkMode }) {
  const { isOpen, onOpenChange } = settingsModalProps;
  const [bgImageUrl, setBgImageUrl] = useLocalStorage("bgImageUrl", null);

  function openFilePicker() {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/jpeg, image/png";
      input.style.display = "none";

      input.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) {
          reject("No file selected");
          return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
          console.log(event.target);
          resolve(event.target.result);
        };

        reader.readAsDataURL(file);
      });

      input.addEventListener("click", function (event) {
        event.stopPropagation();
      });

      document.body.appendChild(input);
      input.click();

      // Remove the input element after the file is selected
      input.remove();
    });
  }

  async function onSelectImage() {
    setBgImageUrl(await openFilePicker());
  }

  function onClearImage() {
    setBgImageUrl(null);
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={`text-foreground ${darkMode ? "dark" : "light"}`}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Settings</ModalHeader>
            <ModalBody>
              {/* Vertical tabs coming soon apparently */}
              <Tabs>
                <Tab title="Customization">
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="text-xl">Customization</p>
                    </div>
                    <div>
                      <b>Background Image</b>
                      <p className="text-default-500 text-sm">
                        Change the background image of the board
                      </p>
                    </div>
                    <Image src={bgImageUrl}></Image>
                    <ButtonGroup variant="light">
                      <Button
                        startContent={<PhotoIcon width={20} />}
                        onClick={onSelectImage}
                      >
                        Select image
                      </Button>
                      <Button
                        startContent={<TrashIcon width={20} />}
                        onClick={onClearImage}
                      >
                        Clear image
                      </Button>
                    </ButtonGroup>
                  </div>
                </Tab>
                <Tab title="Others">Under construction!</Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default SettingsModal;
