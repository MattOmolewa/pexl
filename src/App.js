import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("furniture");

  console.log(text);

  function handleSubmit(e) {
    e.preventDefault();
    fetchPhotos();
  }

  async function fetchPhotos() {
    try {
      const result = await axios.get(`https://api.pexels.com/v1/search`, {
        params: {
          query: text,
        },
        headers: {
          authorization:
            "563492ad6f9170000100000180922bf40fb44010aa0c740342bdabd6",
        },
      });
      console.log(result.data.photos);
      setPhotos(result.data.photos);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="App container">
      <Input text={text} setText={setText} handleSubmit={handleSubmit} />

      <div className="card-columns">
        {loading ? (
          <h3>loading...</h3>
        ) : photos.length == 0 ? (
          <h3 style={{ textAlign: "center" }}>Can't find image</h3>
        ) : (
          photos.map((data) => (
            <div className="card" key={data.id}>
              <img className="card-img-top" src={data.src.medium} alt="nicee" />
              <div className="card-body">
                <p className="card-text">{data.photographer}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Input({ text, setText, handleSubmit }) {
  // const [text, setText] = useState("");

  // function handleSubmit(e) {
  //   e.preventDefault();
  // }
  return (
    <form className="my-4" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="form-control"
          placeholder="Search images..."
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default App;
