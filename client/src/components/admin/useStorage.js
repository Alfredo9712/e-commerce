import { useState, useEffect } from "react";
import { projectStorage } from "../../firebase/config";

const useStorage = (file) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    storageRef.put(file).on("state_changed", async () => {
      const url = await storageRef.getDownloadURL();
      setUrl(url);
    });
  }, [file]);
  return { url };
};
export default useStorage;
