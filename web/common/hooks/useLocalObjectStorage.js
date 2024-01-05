import { useLocalStorage } from "@uidotdev/usehooks";

function useLocalObjectStorage(key, initialObject) {
  const [_key, _setKey] = useLocalStorage(key, JSON.stringify(initialObject));

  function setKey(object) {
    _setKey(JSON.stringify(object));
  }

  return [JSON.parse(_key), setKey];
}

export default useLocalObjectStorage;
