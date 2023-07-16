import React, { useRef, useEffect } from "react";

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: props.center,
      zoom: props.zoom,
    });

    new window.google.maps.Marker({ position: props.center, map: map });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, zoom]);

  return <div ref={mapRef} style={{ height: "300px", width: "100%" }}></div>;
};

export default Map;
