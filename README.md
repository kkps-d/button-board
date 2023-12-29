# button-board

The ultimate macro pad web app

<u>**Note: Look into the compound component pattern in the react course. This may be useful in the future**</u>

## In development

- [ ] Move more hard coded Board stuff into BoardContext

## Developer tasks

- [ ] Test for all sizes of grid
-

# Minimum Viable Product

## Features

### Board

The board where you place your widgets.

- The board can be edited
  - Widgets can be added or removed
    - A panel with available widgets can be accessed in edit mode, but not in normal mode
    - Another panel to temporarily store widgets is also available to sort layout problems
  - Widgets can be resized
    - Some widgets have minimum sizes, such as linear sliders
  - Some widgets have toggleable orientation
    - This could be handled in react-grid-layout: [Dynamic Minimum and Maximum Width/Height](https://react-grid-layout.github.io/react-grid-layout/examples/10-dynamic-min-max-wh.html)
  - Layout is automatically saved to server
- The board is sized on first setup
  - Sizing can be triggered manually
- Grid size can be changed to fit more or less widgets

## Widgets

### Button

The venerable button. Does whatever (mostly) a button can do.

- Binds to a keyboard key or mouse key
- Binds to an audio function
  - Volume up, volume down, mute current/specific audio output
  - Volume up, volume down, mute specific application
- Binds to an application or command
  - Start an application
  - Run a command via Run, cmd, or PowerShell
- Shows a label OR an icon

### Rotary Input / Linear Input

An infinite continuous input, works like a scroll wheel or a rotary encoder. Could be used for as scroll input, timeline scrubbing, zooming etc.

- Binds to a keyboard key or mouse key
  - Two keys can be bound for up and down
  - Bound keys will be rapidly triggered on input
  - Customizable trigger intervals: coarse, medium, fine
- Shows an optional label

### Rotary Knob / Linear Slider

A finite absolute input that is bound in a range, works like a volume knob or a potentiometer. Used exclusively for volume control

- Binds to an audio function
  - Control absolute volume of current/specific audio output
  - Control absolute volume of specific application
  - Long press to mute
  - Optional peak meter
- Shows optionally the icon and title of the audio output or application being controlled

### Image Frame

A widget that displays an image of your choice.

- Upload an image of your choice
- Choose image fit: `cover` or `fit`

## Implementation Details by Features

### Widget Descriptor

A JavaScript object that describes what a widget is

```
const baseWidget = {
  id: "",
  type: "",
  serverData: {},
  resources: {},
  state: {},
  layout: {},
};
```

#### Properties

- `id` - The ID of the widget. This is used to assign grid layout properties to the component, and this ID could also be referenced in the server for storage and identification
- `type` - The type of the component, which is one of the below:
  - `button`, `rotaryPot`, `linearPot`, `rotaryEncoder`, `linearEncoder`, `imageFrame`
  - This is used by `WidgetFactory` to determine what kind of widget needs to be returned
- `serverData` - Data that is required to identify the component to the server, such as functionality, application that it is controlling, commands that it is going to run, what key presses are assigned
  - Subject to change, probably rename to `functionality` or `logic`
- `resources` - Links to static resources, such as icon data or images for the image widget
- `state` - The non-layout related state of the component, like widget titles, app names, volume levels, configuration and settings, etc.
- `layout` - The layout object that is required by `react-grid-layout`, and also must follow its rules and properties. However, the `i` field will be ignored, as the `WidgetFactory` function will automatically generate it

### Edit mode for board

When the edit mode is triggered, all widgets will be informed via `useContext`. Several changes will be performed in the UI:

1. The board will be scaled down and moved to the right. To scale it down, both its CSS and the `react-grid-layout` property must be changed
2. There will be a new pane on the left that contains the available widgets
3. Existing widgets will allow resizing and moving. Tapping the widget should bring up a small context menu with the following options: `Edit function`, `Store temporarily`, `Delete widget`. Widgets' other interactions will be disabled
4. Quitting edit mode will save the new functions of the widget and the layout, and sync them to the server

### Edit function for widgets

When the widget is first placed, or the `Edit function` option is selected, there will be a new modal where the user can edit the functionality of the widget.

#### Options available

- `button`

  - Click function
  - Display text or Icon

- `rotaryEncoder` / `linearEncoder`

  - Up / clockwise / right function
  - Down / anticlockwise / left function
  - Optional click function
  - Display text
  - Mini Icon

- `rotaryPot` / `linearPot`

  - Select audio device or application
  - Enable/disable snapping to points
  - Enable/disable show audio device or application icon and name
  - Enable/disable long press to mute
  - Enable/disable always show current volume

- `imageFrame`
  - Select image
  - Change image fit between `fit` and `cover`
