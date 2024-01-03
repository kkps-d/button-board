# button-board-server

## REST API

`!` are unimplemented

### `/devices`

- `get` - Gets all devices
- `post` - Creates a new device
  - `{ "name": "deviceName" }`

### `/devices/{id}`

- `get` - Gets a specific device
- `!` `delete` - Deletes a specific device
- `!` `patch` - Updates a device
  - `{ "device properties": "..." }`

### `/devices/{id}/boards`

- `get` - Gets the boards of the device
- `!` `post` - Creates a new board
  - `{ "name": "boardName" }`

### `/devices/{id}/boards/{boardId}`

- `!` `get` - Gets a specific board
- `!` `delete` - Deletes a specific board
- `!` `patch` - Updates a board
  - `{ "board properties": "..." }`
