const baseWidget = {
  id: "whatever",
  type: "rotaryPot", // rotaryPot, linearPot, rotaryEncoder, linearEncoder, button, imageFrame,
  serverData: {
    // Data that is relevant to communicating with the server, etc. the button press, which app volume control, etc.
  },
  resources: {
    // Icon data, image for image frame, etc.
  },
  state: {
    // The non-layout related state of the component, like volume level, titles, names, icons, settings, etc.
  },
  layout: {
    // The layout related state, must follow the react-grid-layout 'state' object conventions
    // You do not need to include the 'i' property. WidgetFactory will automatically add it
  },
};
