import React, { useState } from "react";
import axios from "axios";

const ImageComponent = ({ setItem, item }) => {
  const [file, setFile] = useState();

  const uploader = async (event) => {
    const data = new FormData();
    //prettier-ignore
    //hold data
    //append date/hash to fileName
    //Change storage of files aws
    data.append("file", event.target.files[0]);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post("/uploads", data, config);
      console.log(response);
      setItem({ ...item, image: response.data });
    } catch (error) {
      console.log(error);
    }
  };
  const test = () => alert("hi");
  return (
    <div>
      <form action="# ">
        <input
          type="file"
          name="file"
          onChange={(event) => {
            uploader(event);
          }}
        />
      </form>
      {/* <button
        onClick={() => {
          test();
        }}
      >
        upload
      </button> */}
    </div>
  );
};

export default ImageComponent;
