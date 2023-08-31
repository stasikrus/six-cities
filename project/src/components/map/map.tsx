// import React, { useEffect, useRef } from "react";
// import leaflet from 'leaflet';
// import PropTypes from 'prop-types';
// import { getActiveHoverOffer } from "../../store/selectors";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useRef, useEffect } from "react";
import useMap from "../../hooks/useMap";
// import { ActionCreator } from "../../store/action";

// import "leaflet/dist/leaflet.css";
import { getActiveHoverOffer } from "../../store/selectors";

const Map = ({ points, heightMap }) => {

  const mapRef = useRef(null);
  const activeHoverOffer = useAppSelector(getActiveHoverOffer);
  const dispatch = useAppDispatch();

  const currentCityMap = points[0].city.location;

  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers = [];

    points.forEach((point) => {
      const customIcon = leaflet.icon({
        iconUrl: point.id === activeHoverOffer ? `./img/pin-active.svg`: `./img/pin.svg`,
        iconSize: [27, 39]
      });

      const marker = leaflet.marker({
        lat: point.location.latitude,
        lng: point.location.longitude
      },
      {
        icon: customIcon
      })
      .addTo(mapRef.current)
      .bindPopup(point.title);
      markers.push(marker);
    });

    return () => {
      markers.forEach(marker => marker.remove());
    };

  }, [activeHoverOffer, points]);

  useEffect(() => {
    return () => {
      dispatch(ActionCreator.hoverOffer(null));
    }
  }, []);

  return (
    <div id="map" style={{ height: `${heightMap}px` }}></div>
  );
};

Map.propTypes = {
  points: PropTypes.array.isRequired,
  heightMap: PropTypes.number.isRequired,
}

export default React.memo(Map);
