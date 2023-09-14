import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      height="290"
      width={"290"}
      src={`${embedId}?autoplay=0"`}
      frameBorder="0"
      allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture"
      autoplay="false"
      allowFullScreen
      style={{ margin: "auto" }}
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
