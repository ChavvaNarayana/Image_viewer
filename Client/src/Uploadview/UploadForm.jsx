import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/UploadForm.css";

axios.defaults.headers.post["Content-Type"] = "multipart/form-date";

export default function UploadForm() {
  const navigate = useNavigate();
  const [Form, setForm] = useState({
    name: "",
    location: "",
    likes: Math.floor(Math.random() * 50) + 1,
    description: "",
    date: new Date().toDateString(),
  });
  const [Image, setImage] = useState();

  let Submithandler = (e) => {
    e.preventDefault();
    console.log(Form);

    const formData = new FormData();
    formData.append("PostImage", Image);
    formData.append("name", Form.name);
    formData.append("location", Form.location);
    formData.append("likes", Form.likes);
    formData.append("description", Form.description);
    formData.append("date", Form.date);

    console.log(formData);

    axios
      .post("https://image-viewer.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        navigate("/postview");
      })
      .catch((err) => {
        console.log(err);
      });


  };

  let DeleteHandler = (postId) => {
    navigate("/postview");
  };

  const getInputChangeHandler = (key) => {
    if (key !== "PostImage") {
      return (e) => {
        const val = e.target.value;
        setForm((data) => {
          return {
            ...data,
            [key]: val,
          };
        });
      };
    } else {
      return (e) => {
        const val = e.target.files[0];
        console.log(val);
        setImage(val);
      };
    }
  };

  // const UploadInage = (files)=>{
  //   console.log(files[0])
  // }

  return (
    <div className="container">
      <form
        method="POST"
        action="http://localhost:3000/postview"
        encType="multipart/form-date"
        onSubmit={Submithandler}
      >
        <div className="input_file_container">
          <input
            type="file"
            className="File"
            onChange={getInputChangeHandler("PostImage")}
          />
        </div>

        <div className="input_name_container">
          <input
            type="text"
            placeholder="Author"
            value={Form.name}
            onChange={getInputChangeHandler("name")}
          />
        </div>

        <div className="input_location_container">
          <input
            type="text"
            placeholder="Location"
            value={Form.location}
            onChange={getInputChangeHandler("location")}
          />
        </div>

        <div className="input_description_container">
          <input
            type="text"
            placeholder="Description"
            value={Form.description}
            onChange={getInputChangeHandler("description")}
          />
        </div>

        <div className="SubmitButton">
          <button type="submit">POST</button>
        </div>

        <div className="DeleteButton">
          <button type="button" onClick={() => DeleteHandler()}>
            DELETE
          </button>
        </div>

      </form>
    </div>
  );
}
