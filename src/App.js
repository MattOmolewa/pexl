import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [photos, setPhotos] = useState([]);

  async function fetchPhotos() {
    try {
      const result = await axios.get(`https://api.pexels.com/v1/search`, {
        params: {
          query: "Jesus",
        },
        headers: {
          authorization:
            "563492ad6f9170000100000180922bf40fb44010aa0c740342bdabd6",
        },
      });
      console.log(result.data.photos);
      setPhotos(result.data.photos);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="App container">
      {photos.map((data) => (
        <div className="card" key={data.id}>
          <img className="card-img-top" src={data.src.original} alt="nicee" />
          <div className="card-body">
            <p className="card-text">{data.photographer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
