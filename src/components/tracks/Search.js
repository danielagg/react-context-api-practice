import React, { useState } from "react";
import Axios from "axios";
import { Consumer } from "../../context";

const Search = () => {
  const [inputtedTitle, setInputtedTitle] = useState("");

  const onInputtedTitleChange = e => {
    setInputtedTitle(e.target.value);
  };

  const searchTrack = (dispatch, e) => {
    e.preventDefault();

    Axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${inputtedTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <Consumer>
      {value => {
        const { dispatch } = value;

        return (
          <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
              <i className="fas fa-music" /> Search for a song
            </h1>
            <p className="lead text-center">Get the lyrics for a song</p>
            <form onSubmit={searchTrack.bind(this, dispatch)}>
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
              <button
                className="btn-primary btn-lg btn-block mb-5"
                type="submit"
              >
                Get lyrics
              </button>
            </form>
          </div>
        );
      }}
    </Consumer>
  );
};

export default Search;
