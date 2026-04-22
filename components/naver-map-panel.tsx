"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    naver?: {
      maps: {
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

type Coordinates = {
  lat: number;
  lng: number;
};

export default function NaverMapPanel({
  address,
  salonName
}: NaverMapPanelProps) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  const [scriptReady, setScriptReady] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [statusText, setStatusText] = useState("주소 좌표 확인 중");

  const naverSearchUrl = useMemo(
    () => `https://map.naver.com/p/search/${encodeURIComponent(`${salonName} ${address}`)}`,
    [address, salonName]
  );

  useEffect(() => {
    if (!clientId || !scriptReady || !window.naver?.maps?.Service) {
      return;
    }

    window.naver.maps.Service.geocode({ query: address }, (resultStatus, response) => {
      if (
        resultStatus !== window.naver?.maps.Service.Status.OK ||
        response.v2.addresses.length === 0
      ) {
        setStatusText("좌표 확인 실패");
        return;
      }

      const firstAddress = response.v2.addresses[0];
      setCoordinates({
        lat: Number(firstAddress.y),
        lng: Number(firstAddress.x)
      });
      setStatusText("정적 지도 표시 중");
    });
  }, [address, clientId, scriptReady]);

  const staticMapUrl = coordinates
    ? `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=720&h=420&center=${coordinates.lng},${coordinates.lat}&level=16&scale=2&markers=type:d|size:mid|pos:${coordinates.lng} ${coordinates.lat}|color:0x0B7A75&X-NCP-APIGW-API-KEY-ID=${clientId}`
    : "";

  return (
    <div className="map-shell">
      {clientId ? (
        <>
          <Script
            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`}
            strategy="afterInteractive"
            onLoad={() => setScriptReady(true)}
          />

          {coordinates ? (
            <a href={naverSearchUrl} rel="noreferrer" target="_blank">
              <img
                alt={`${salonName} 네이버 지도`}
                className="map-static-image"
                src={staticMapUrl}
              />
            </a>
          ) : (
            <div className="map-loading">
              <strong>{statusText}</strong>
              <span>지도를 누르면 네이버 지도에서 바로 확인할 수 있게 준비한다.</span>
            </div>
          )}

          <div className="map-status">
            <span>{coordinates ? "네이버 정적 지도" : statusText}</span>
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
              `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`를 연결하면 이 영역에 네이버 정적
              지도가 표시된다.
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
