import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Consumer } from "../../context";
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
      <Consumer>
        {value => {
          const { track_list } = value;

          // get single, currently displayed track from context
          const currentTrack = track_list
            .map(item => item.track)
            .filter(
              track =>
                parseInt(track.track_id) ===
                parseInt(props.match.params.track_id)
            )[0];

          if (currentTrack === undefined) {
            throw new Error("Cannot find selected track");
          }

          if (track_list === undefined || track_list.length === 0) {
            return (
              <>
                <Link to="/" className="btn btn-dark btn-sm mb-4">
                  Go back
                </Link>
                <LoadingSpinner />
              </>
            );
          } else {
            return (
              <>
                <Link to="/" className="btn btn-dark btn-sm mb-4">
                  Go back
                </Link>
                <div className="card">
                  <h5 className="card-header">
                    {currentTrack.track_name} by{" "}
                    <span className="text-secondary">
                      {currentTrack.artist_name}
                    </span>
                  </h5>
                  <div className="card-body">
                    <p className="card-text">{lyrics.lyrics_body}</p>
                  </div>
                </div>
                <ul className="list-group mt-3">
                  <li className="list-group-item">
                    <strong>Track rating</strong>: {currentTrack.track_rating}
                  </li>
                  <li className="list-group-item">
                    <strong>Number of favorits</strong>:{" "}
                    {currentTrack.num_favourite}
                  </li>
                  <li className="list-group-item">
                    {parseInt(currentTrack.explicit) === 1 ? (
                      <strong>This is an explicit track.</strong>
                    ) : (
                      <p>This track is not explicit.</p>
                    )}
                  </li>
                </ul>
              </>
            );
          }
        }}
      </Consumer>
    );
  }
};

export default Lyrics;
