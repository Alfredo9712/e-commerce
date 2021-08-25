import { useState, useEffect } from "react";
import { storage } from "../../firebase/config";

const useFirebaseStorage = (file) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = storage.ref(file.name);
    storageRef.put(file).on("state_changed", async () => {
      const url = await storageRef.getDownloadURL();
      setUrl(url);
    });
  }, [file]);
  return { url };
};

export default useFirebaseStorage;
