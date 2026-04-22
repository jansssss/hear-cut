"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type OSMMapPanelProps = {
  address: string;
  salonName: string;
};

type GeocodeResult = {
  lat: string;
  lon: string;
  display_name: string;
};

type MapState =
  | { status: "loading" }
  | { status: "ready"; label: string }
  | { status: "error"; message: string };

export default function OSMMapPanel({ address, salonName }: OSMMapPanelProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const layerRef = useRef<import("leaflet").TileLayer | null>(null);
  const markerRef = useRef<import("leaflet").CircleMarker | null>(null);
  const [mapState, setMapState] = useState<MapState>({ status: "loading" });

  const searchLabel = useMemo(() => `${salonName} ${address}`.trim(), [address, salonName]);
  const openStreetMapUrl = useMemo(() => {
    const query = encodeURIComponent(searchLabel);
    return `https://www.openstreetmap.org/search?query=${query}`;
  }, [searchLabel]);

  useEffect(() => {
    let ignore = false;

    async function mountMap() {
      if (!mapElementRef.current) {
        return;
      }

      setMapState({ status: "loading" });

      try {
        const queryCandidates = [searchLabel, address].filter(Boolean);
        let bestMatch: GeocodeResult | null = null;

        for (const query of queryCandidates) {
          const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=ko&q=${encodeURIComponent(query)}`;
          const response = await fetch(url, {
            headers: {
              Accept: "application/json"
            }
          });

          if (!response.ok) {
            continue;
          }

          const results = (await response.json()) as GeocodeResult[];
          if (results.length > 0) {
            bestMatch = results[0];
            break;
          }
        }

        if (!bestMatch) {
          throw new Error("좌표를 찾지 못했습니다.");
        }

        if (ignore || !mapElementRef.current) {
          return;
        }

        const leaflet = await import("leaflet");
        const latitude = Number(bestMatch.lat);
        const longitude = Number(bestMatch.lon);

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
          throw new Error("좌표 값이 올바르지 않습니다.");
        }

        if (!mapInstanceRef.current) {
          mapInstanceRef.current = leaflet.map(mapElementRef.current, {
            zoomControl: true,
            scrollWheelZoom: true
          });
        }

        const map = mapInstanceRef.current;

        if (layerRef.current) {
          layerRef.current.remove();
        }

        layerRef.current = leaflet
          .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          })
          .addTo(map);

        if (markerRef.current) {
          markerRef.current.remove();
        }

        markerRef.current = leaflet
          .circleMarker([latitude, longitude], {
            radius: 10,
            color: "#0b7a75",
            fillColor: "#10b4ad",
            fillOpacity: 0.92,
            weight: 3
          })
          .addTo(map)
          .bindPopup(`<strong>${salonName}</strong><br />${address}`);

        map.setView([latitude, longitude], 16);
        window.setTimeout(() => {
          map.invalidateSize();
          markerRef.current?.openPopup();
        }, 80);

        setMapState({
          status: "ready",
          label: bestMatch.display_name || address
        });
      } catch (error) {
        if (ignore) {
          return;
        }

        const message = error instanceof Error ? error.message : "지도를 불러오지 못했습니다.";
        setMapState({
          status: "error",
          message
        });
      }
    }

    void mountMap();

    return () => {
      ignore = true;
      markerRef.current?.remove();
      markerRef.current = null;
      layerRef.current?.remove();
      layerRef.current = null;
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [address, salonName, searchLabel]);

  return (
    <section className="map-shell" aria-label={`${salonName} 위치 지도`}>
      <div className="map-canvas-wrap">
        <div ref={mapElementRef} className="map-canvas" />

        {mapState.status === "loading" ? (
          <div className="map-overlay map-loading" aria-live="polite">
            <strong>실시간 지도를 불러오는 중</strong>
            <span>OpenStreetMap과 Leaflet으로 위치를 표시한다.</span>
          </div>
        ) : null}

        {mapState.status === "error" ? (
          <div className="map-overlay map-fallback" aria-live="polite">
            <div className="map-fallback-copy">
              <strong>지도를 바로 띄우지 못했다.</strong>
              <p>{mapState.message} 외부 지도에서 위치를 바로 확인할 수 있다.</p>
            </div>
            <a className="button button-secondary" href={openStreetMapUrl} target="_blank" rel="noreferrer">
              OpenStreetMap에서 열기
            </a>
          </div>
        ) : null}
      </div>

      <div className="map-status">
        <span>{mapState.status === "ready" ? mapState.label : "주소 기반 위치 탐색"}</span>
        <a href={openStreetMapUrl} target="_blank" rel="noreferrer">
          큰 지도 보기
        </a>
      </div>
    </section>
  );
}
