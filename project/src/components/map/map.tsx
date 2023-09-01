import { useEffect, useRef } from 'react';
import { Map, TileLayer, Marker, Icon } from 'leaflet';
import { OffersData } from '../../types/offers';
import { getActiveHoverOffer } from '../../store/selectors';
import { useAppSelector } from '../../hooks';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  points: OffersData[];
  heightMap: number;
};

const MapComponent = ({ points, heightMap }: MapProps) => {
  const mapInstanceRef = useRef<Map | null>(null);
  const markerRefs = useRef<Array<Marker>>([]);
  const activeHoverOffer = useAppSelector(getActiveHoverOffer);

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      const currentCity = points[0].city;
      const mapInstance = new Map(mapContainer, {
        center: [currentCity.location.latitude, currentCity.location.longitude],
        zoom: currentCity.location.zoom,
      });

      new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(mapInstance);

      mapInstanceRef.current = mapInstance;
      return () => {
        mapInstance.remove();
      };
    }
  }, [points]);

  useEffect(() => {
    const mapInstance = mapInstanceRef.current;
    if (mapInstance) {
      markerRefs.current.forEach((marker) => marker.remove());
      markerRefs.current = [];

      points.forEach((point) => {
        const icon = new Icon({
          iconUrl: point.id === activeHoverOffer ? './img/pin-active.svg' : './img/pin.svg',
          iconSize: [27, 39],
          iconAnchor: [20, 40],
        });

        const marker = new Marker([point.location.latitude, point.location.longitude], { icon }).addTo(mapInstance);
        markerRefs.current.push(marker);
      });
    }
  }, [points, activeHoverOffer]);

  return <div id="map" style={{ height: `${heightMap}px` }}></div>;
};

export default MapComponent;
