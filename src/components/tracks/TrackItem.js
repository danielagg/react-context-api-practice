import React from "react";

const TrackItem = props => {
  const { track } = props;

  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <p>{track.artist_name}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
