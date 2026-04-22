"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    naver?: {
      maps: {
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (element: HTMLElement, options: Record<string, unknown>) => unknown;
        Marker: new (options: Record<string, unknown>) => unknown;
        Service: {
          Status: {
            OK: string;
          };
          geocode: (
            request: { query: string },
            callback: (status: string, response: { v2: { addresses: Array<{ x: string; y: string }> } }) => void
          ) => void;
        };
      };
    };
  }
}

type NaverMapPanelProps = {
  address: string;
  salonName: string;
};

const DEFAULT_CENTER = {
  lat: 35.0161,
  lng: 126.7892
};

export default function NaverMapPanel({
  address,
  salonName
}: NaverMapPanelProps) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [statusText, setStatusText] = useState("지도를 불러오는 중");

  const naverSearchUrl = useMemo(
    () => `https://map.naver.com/p/search/${encodeURIComponent(`${salonName} ${address}`)}`,
    [address, salonName]
  );

  useEffect(() => {
    if (!clientId || !scriptReady || !mapElementRef.current || !window.naver?.maps) {
      return;
    }

    const { maps } = window.naver;
    const fallbackCenter = new maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
    const map = new maps.Map(mapElementRef.current, {
      center: fallbackCenter,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: 2
      }
    });

    maps.Service.geocode({ query: address }, (resultStatus, response) => {
      if (resultStatus !== maps.Service.Status.OK || response.v2.addresses.length === 0) {
        setStatusText("주소를 찾지 못해 기본 위치를 표시한다");
        return;
      }

      const firstAddress = response.v2.addresses[0];
      const point = new maps.LatLng(Number(firstAddress.y), Number(firstAddress.x));

      new maps.Marker({
        position: point,
        map,
        title: salonName
      });

      const mapWithCenter = map as { setCenter?: (value: unknown) => void };
      mapWithCenter.setCenter?.(point);
      setStatusText("네이버 지도 표시 중");
    });
  }, [address, clientId, salonName, scriptReady]);

  return (
    <div className="map-shell">
      {clientId ? (
        <>
          <Script
            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`}
            strategy="afterInteractive"
            onLoad={() => setScriptReady(true)}
          />
          <div className="map-canvas" ref={mapElementRef} />
          <div className="map-status">
            <span>{statusText}</span>
            <a href={naverSearchUrl} rel="noreferrer" target="_blank">
              네이버 지도에서 크게 보기
            </a>
          </div>
        </>
      ) : (
        <div className="map-fallback">
          <div className="map-fallback-copy">
            <strong>네이버 지도 패널</strong>
            <p>
              `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`를 연결하면 이 영역에 실제 지도가
              표시된다.
            </p>
          </div>
          <a className="button button-primary" href={naverSearchUrl} rel="noreferrer" target="_blank">
            네이버 지도 열기
          </a>
        </div>
      )}
    </div>
  );
}
