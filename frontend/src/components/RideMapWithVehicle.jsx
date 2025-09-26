import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-polylinedecorator";

const RideMapWithVehicle = ({ startCoords, endCoords }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(startCoords[0], startCoords[1]),
        L.latLng(endCoords[0], endCoords[1]),
      ],
      createMarker: () => null,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    routingControl.on("routesfound", (e) => {
      const route = e.routes[0].coordinates;
      let i = 0;

      // Add route arrow decorator
      const arrowHead = L.polylineDecorator(
        L.polyline(route),
        {
          patterns: [
            {
              offset: 25,
              repeat: 50,
              symbol: L.Symbol.arrowHead({
                pixelSize: 10,
                polygon: false,
                pathOptions: { stroke: true, color: "#f00" },
              }),
            },
          ],
        }
      ).addTo(map);

      // Create vehicle marker
      const vehicleMarker = L.marker(route[0], {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61168.png",
          iconSize: [40, 40],
        }),
      }).addTo(map);

      // Smooth animation with requestAnimationFrame
      let animationFrame;
      const move = () => {
        if (i >= route.length) return;
        vehicleMarker.setLatLng(route[i]);
        i++;
        animationFrame = requestAnimationFrame(move);
      };
      move();

      // Clean-up
      return () => {
        cancelAnimationFrame(animationFrame);
        map.removeLayer(arrowHead);
        map.removeLayer(vehicleMarker);
      };
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [startCoords, endCoords]);

  return (
    <MapContainer
      center={startCoords}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default RideMapWithVehicle;
