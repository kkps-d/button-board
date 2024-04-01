import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

function ErrorModal({ settingsModalProps, darkMode, errorType, errorReason }) {
  const { isOpen, onOpenChange } = settingsModalProps;

  let title;
  let content;
  let footer;

  switch (errorType) {
    case "device-not-setup":
      title = "Device not setup";
      content = (
        <>
          <p>This device has not been set up yet.</p>
          <p className="text-default-500 text-sm">
            Please go through the setup process so you can start using button
            board on this device!
          </p>
        </>
      );
      footer = (
        <Button
          color="primary"
          onPress={() => {
            // @TODO update routes once app is prod built}>
            window.location.replace(window.location.origin + "/app-oobe/");
          }}
        >
          Setup Device
        </Button>
      );
      break;
    case "device-not-on-server":
      title = "Device not found";
      content = (
        <>
          <p>This device could not found on the server.</p>
          <p className="text-default-500 text-sm">
            The configuration may have been removed from the server, or there
            may be some connection issues.
            <br />
            Try refreshing the page, or go through the setup process again if
            this does not work.
          </p>
        </>
      );
      footer = (
        <>
          <Button
            variant="light"
            onPress={() => {
              // @TODO update routes once app is prod built}>
              window.location.replace(window.location.origin + "/app-oobe/");
            }}
          >
            Setup device
          </Button>
          <div className="flex-grow"></div>
          <Button
            color="primary"
            onPress={() => {
              location.reload();
            }}
          >
            Refresh page
          </Button>
        </>
      );
      break;

    case "network-error":
      title = "Network error";
      content = (
        <>
          <p>Failed to connect to server.</p>
          <p className="text-default-500 text-sm">
            Please ensure that the server is running, and then refresh this
            page.
          </p>
          <div
            className="text-xs"
            style={{
              fontFamily: "monospace",
              maxHeight: "200px",
              overflowY: "scroll",
            }}
          >
            {errorReason.stack}
          </div>
        </>
      );
      footer = (
        <>
          <div className="flex-grow"></div>
          <Button
            color="primary"
            onPress={() => {
              location.reload();
            }}
          >
            Refresh page
          </Button>
        </>
      );

      break;

    default:
      title = "Unknown error";
      content = <p>Unknown error</p>;
      footer = (
        <>
          <div className="flex-grow"></div>
          <Button
            color="primary"
            onPress={() => {
              location.reload();
            }}
          >
            Refresh page
          </Button>
        </>
      );

      break;
  }

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      onOpenChange={onOpenChange}
      className={`text-foreground ${darkMode ? "dark" : "light"}`}
      closeButton={<div></div>}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{content}</ModalBody>
            <ModalFooter>{footer}</ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ErrorModal;
