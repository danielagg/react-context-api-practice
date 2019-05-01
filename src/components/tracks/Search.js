import React, { useState } from "react";
import Axios from "axios";
import { Consumer } from "../../context";

const Search = () => {
  const [inputtedTitle, setInputtedTitle] = useState("");

  const onInputtedTitleChange = e => {
    setInputtedTitle(e.target.value);
  };

  return (
    <Consumer>
      {value => {
        return (
          <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
              <i className="fas fa-music" /> Search for a song
            </h1>
            <p className="lead text-center">Get the lyrics for a song</p>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Song title..."
                  name="inputtedTitle"
                  value={inputtedTitle}
                  onChange={onInputtedTitleChange}
                />
              </div>
            </form>
            <button className="btn-primary btn-lg btn-block mb-5" type="submit">
              Get lyrics
            </button>
          </div>
        );
      }}
    </Consumer>
  );
};

export default Search;
