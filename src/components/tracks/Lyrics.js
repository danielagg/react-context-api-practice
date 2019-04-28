import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../layout/LoadingSpinner";

const Lyrics = props => {
  const [lyrics, setLyrics] = useState();

  useEffect(() => {
    Axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
        props.match.params.track_id
      }&apikey=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => {
        setLyrics(res.data.message.body.lyrics);
      })
      .catch(err => console.log(err));
  }, []);

  if (lyrics === undefined || Object.keys(lyrics).length === 0) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          Go back
        </Link>
        <div className="card">
          <h5 className="card-header">
            TrackName by <span className="text-secondary">Artist</span>
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics_body}</p>
          </div>
        </div>
      </>
    );
  }
};

export default Lyrics;
