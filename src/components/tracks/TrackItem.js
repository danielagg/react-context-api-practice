import React from "react";
import { Link } from "react-router-dom";

const TrackItem = props => {
  const { track } = props;

  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">{track.artist_name}</h5>
          <p className="card-text">
            <strong>
              <i className="fas fa-play mr-2" />
              Track
            </strong>
            : {track.track_name}
            <br />
            <strong>
              <i className="fas fa-compact-disc mr-2" />
              Album
            </strong>
            : {track.album_name}
          </p>
          <Link
            to={`lyrics/track/${track.track_id}`}
            className="btn btn-dark btn-block"
          >
            <i className="fas fa-chevron-right mr-2" />
            View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
