"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type KakaoMapPanelProps = {
  address: string;
  salonName: string;
};

type MapState =
  | { status: "loading" }
  | { status: "ready"; label: string }
  | { status: "error"; message: string };

type KakaoMapResult = {
  x: string;
  y: string;
  address_name: string;
  road_address?: {
    address_name: string;
  } | null;
};

type KakaoStatus = "OK" | "ZERO_RESULT" | "ERROR";

type KakaoMapsNamespace = {
  load: (callback: () => void) => void;
  Map: new (container: HTMLElement, options: Record<string, unknown>) => KakaoMapInstance;
  LatLng: new (lat: number, lng: number) => unknown;
  Marker: new (options: Record<string, unknown>) => KakaoMarkerInstance;
  InfoWindow: new (options: Record<string, unknown>) => KakaoInfoWindowInstance;
  services: {
    Status: Record<KakaoStatus, KakaoStatus>;
    Geocoder: new () => {
      addressSearch: (
        address: string,
        callback: (result: KakaoMapResult[], status: KakaoStatus) => void
      ) => void;
    };
  };
};

type KakaoGlobal = {
  maps: KakaoMapsNamespace;
};

type KakaoMapInstance = {
  setCenter: (position: unknown) => void;
  setLevel: (level: number) => void;
  setDraggable: (draggable: boolean) => void;
  setZoomable: (zoomable: boolean) => void;
  relayout: () => void;
};

type KakaoMarkerInstance = {
  setMap: (map: KakaoMapInstance | null) => void;
};

type KakaoInfoWindowInstance = {
  open: (map: KakaoMapInstance, marker: KakaoMarkerInstance) => void;
  close: () => void;
};

declare global {
  interface Window {
    kakao?: KakaoGlobal;
  }
}

let kakaoSdkPromise: Promise<KakaoGlobal> | null = null;

function loadKakaoSdk(appKey: string) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("브라우저 환경에서만 지도를 로드할 수 있습니다."));
  }

  if (window.kakao?.maps?.services) {
    return Promise.resolve(window.kakao);
  }

  if (!kakaoSdkPromise) {
    kakaoSdkPromise = new Promise<KakaoGlobal>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>('script[data-kakao-maps="true"]');

      const handleLoad = () => {
        if (!window.kakao?.maps) {
          reject(new Error("카카오 지도 SDK를 불러오지 못했습니다."));
          return;
        }

        window.kakao.maps.load(() => {
          if (window.kakao) {
            resolve(window.kakao);
          } else {
            reject(new Error("카카오 지도 초기화에 실패했습니다."));
          }
        });
      };

      if (existing) {
        if (window.kakao?.maps) {
          handleLoad();
        } else {
          existing.addEventListener("load", handleLoad, { once: true });
          existing.addEventListener("error", () => reject(new Error("카카오 지도 SDK 로드 실패")), {
            once: true
          });
        }
        return;
      }

      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services`;
      script.async = true;
      script.dataset.kakaoMaps = "true";
      script.addEventListener("load", handleLoad, { once: true });
      script.addEventListener("error", () => reject(new Error("카카오 지도 SDK 로드 실패")), {
        once: true
      });
      document.head.appendChild(script);
    });
  }

  return kakaoSdkPromise;
}

export default function KakaoMapPanel({ address, salonName }: KakaoMapPanelProps) {
  const appKey =
    process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY || "";
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<KakaoMapInstance | null>(null);
  const markerRef = useRef<KakaoMarkerInstance | null>(null);
  const infoWindowRef = useRef<KakaoInfoWindowInstance | null>(null);
  const [mapState, setMapState] = useState<MapState>({ status: "loading" });

  const searchLabel = useMemo(() => `${salonName} ${address}`.trim(), [address, salonName]);
  const fallbackMapUrl = useMemo(
    () => `https://map.kakao.com/link/search/${encodeURIComponent(searchLabel)}`,
    [searchLabel]
  );

  useEffect(() => {
    let cancelled = false;

    async function mountMap() {
      if (!mapElementRef.current) {
        return;
      }

      if (!appKey) {
        setMapState({
          status: "error",
          message: "카카오 JavaScript 키가 없어 지도를 띄울 수 없습니다."
        });
        return;
      }

      setMapState({ status: "loading" });

      try {
        const kakao = await loadKakaoSdk(appKey);
        if (cancelled || !mapElementRef.current) {
          return;
        }

        const geocoder = new kakao.maps.services.Geocoder();
        const searchAddress = (query: string) =>
          new Promise<KakaoMapResult[]>((resolve, reject) => {
            geocoder.addressSearch(query, (result, status) => {
              if (status === kakao.maps.services.Status.OK && result.length > 0) {
                resolve(result);
                return;
              }

              reject(new Error("주소 좌표를 찾지 못했습니다."));
            });
          });

        const candidateQueries = [address, searchLabel].filter(Boolean);
        let picked: KakaoMapResult | null = null;

        for (const query of candidateQueries) {
          try {
            const result = await searchAddress(query);
            if (result.length > 0) {
              picked = result[0];
              break;
            }
          } catch {
            continue;
          }
        }

        if (!picked) {
          setMapState({
            status: "error",
            message: "주소 좌표를 찾지 못했습니다."
          });
          return;
        }

        const latitude = Number(picked.y);
        const longitude = Number(picked.x);

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
          setMapState({
            status: "error",
            message: "좌표 값이 올바르지 않습니다."
          });
          return;
        }

        const coords = new kakao.maps.LatLng(latitude, longitude);

        if (!mapRef.current) {
          mapRef.current = new kakao.maps.Map(mapElementRef.current, {
            center: coords,
            level: 3,
            draggable: true,
            scrollwheel: true,
            disableDoubleClick: false
          });
        }

        const map = mapRef.current;
        map.setCenter(coords);
        map.setLevel(3);
        map.setDraggable(true);
        map.setZoomable(true);

        markerRef.current?.setMap(null);
        markerRef.current = new kakao.maps.Marker({
          position: coords,
          map
        });

        infoWindowRef.current?.close();
        infoWindowRef.current = new kakao.maps.InfoWindow({
          content: `<div class="kakao-infowindow">${salonName}</div>`
        });
        infoWindowRef.current.open(map, markerRef.current);

        window.setTimeout(() => {
          map.relayout();
          map.setCenter(coords);
        }, 80);

        setMapState({
          status: "ready",
          label: picked.road_address?.address_name || picked.address_name || address
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        const message = error instanceof Error ? error.message : "카카오 지도를 불러오지 못했습니다.";
        setMapState({
          status: "error",
          message
        });
      }
    }

    void mountMap();

    return () => {
      cancelled = true;
      infoWindowRef.current?.close();
      markerRef.current?.setMap(null);
      markerRef.current = null;
      mapRef.current = null;
    };
  }, [address, appKey, salonName]);

  return (
    <section className="map-shell" aria-label={`${salonName} 위치 지도`}>
      <div className="map-canvas-wrap">
        <div ref={mapElementRef} className="map-canvas kakao-map-canvas" />

        {mapState.status === "loading" ? (
          <div className="map-overlay map-loading" aria-live="polite">
            <strong>카카오 지도를 불러오는 중</strong>
            <span>국내 지도 기준으로 위치와 주변 맥락을 바로 확인할 수 있다.</span>
          </div>
        ) : null}

        {mapState.status === "error" ? (
          <div className="map-overlay map-fallback" aria-live="polite">
            <div className="map-fallback-copy">
              <strong>지도를 바로 띄우지 못했다.</strong>
              <p>{mapState.message} 카카오맵에서 위치를 바로 확인할 수 있다.</p>
            </div>
            <a className="button button-secondary" href={fallbackMapUrl} target="_blank" rel="noreferrer">
              카카오맵에서 열기
            </a>
          </div>
        ) : null}
      </div>

      <div className="map-status">
        <span>
          {mapState.status === "ready"
            ? `${mapState.label} · 손가락 확대/축소 가능`
            : "주소 기반 위치 탐색"}
        </span>
        <a href={fallbackMapUrl} target="_blank" rel="noreferrer">
          큰 지도 보기
        </a>
      </div>
    </section>
  );
}
