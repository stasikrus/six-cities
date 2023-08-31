import { useEffect, useRef } from 'react';
import { Map, TileLayer, Marker, Icon } from 'leaflet';
import { OffersData } from '../../types/offers';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  points: OffersData[];
  heightMap: number;
};

const MapComponent = ({ points, heightMap }: MapProps) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const currentCity = points[0].city;
      const mapInstance = new Map(mapRef.current, {
        center: [currentCity.location.latitude, currentCity.location.longitude],
        zoom: currentCity.location.zoom,
      });

      new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(mapInstance);

      points.forEach((point) => {
        const icon = new Icon({
          iconUrl: './img/pin.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        });

        new Marker([point.location.latitude, point.location.longitude], { icon }).addTo(mapInstance);
      });

      // Cleanup
      return () => {
        mapInstance.remove();
      };
    }
  }, [points]);

  return <div id="map" style={{ height: `${heightMap}px` }} ref={mapRef}></div>;
};

export default MapComponent;
