import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
// import useFirebaseStorage from "./useFirebaseStorage";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { firebaseApp } from "../../firebase/config";

const ImageComponent = ({ setImage, file, item }) => {
  const [error, setError] = useState();
  const storage = getStorage(firebaseApp);

  const imageRef = ref(storage, file.name);

  const uploadTask = uploadBytesResumable(imageRef, file);

  useEffect(() => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      async () => {
        // Upload completed successfully, now we can get the download URL
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setImage(url);
        console.log(url);
      }
    );
  }, [file]);

  return <h6>uploaded</h6>;
};

export default ImageComponent;
