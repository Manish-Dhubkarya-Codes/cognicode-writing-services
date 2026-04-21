"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  CheckCircle,
  Navigation,
  ExternalLink,
  Locate,
  Route,
  Timer,
  MapPinned,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  Tooltip
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ===== Fix Leaflet default marker icons =====
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ===== Custom Icons =====
const officeIcon = L.divIcon({
  className: "",
  html: `<div style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35))">
    <svg width="42" height="52" viewBox="0 0 42 52" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 0C9.4 0 0 9.4 0 21c0 15.2 21 31 21 31s21-15.8 21-31C42 9.4 32.6 0 21 0z" fill="#DC2626"/>
      <circle cx="21" cy="19" r="11" fill="white"/>
      <rect x="15" y="13" width="12" height="12" rx="1.5" fill="#DC2626"/>
      <rect x="17" y="15" width="3" height="3" rx="0.5" fill="white"/>
      <rect x="22" y="15" width="3" height="3" rx="0.5" fill="white"/>
      <rect x="19" y="20" width="4" height="5" rx="0.5" fill="white"/>
    </svg>
  </div>`,
  iconSize: [42, 52],
  iconAnchor: [21, 52],
  popupAnchor: [0, -52],
});

const userIcon = L.divIcon({
  className: "",
  html: `<div style="position:relative;width:48px;height:48px;display:flex;align-items:center;justify-content:center">
    <div style="position:absolute;width:48px;height:48px;border-radius:50%;background:rgba(37,99,235,0.15);animation:gps-ring 2s ease-out infinite"></div>
    <div style="position:absolute;width:32px;height:32px;border-radius:50%;background:rgba(37,99,235,0.25);animation:gps-ring 2s ease-out infinite 0.5s"></div>
    <div style="width:18px;height:18px;border-radius:50%;background:#2563EB;border:3.5px solid white;box-shadow:0 0 0 2px rgba(37,99,235,0.4),0 2px 8px rgba(0,0,0,0.3);position:relative;z-index:10"></div>
  </div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -24],
});

// ===== Auto-fit bounds when route is drawn =====
function AutoFitBounds({
  userLocation,
  officeCoords,
  route,
  trigger,
}: {
  userLocation: [number, number] | null;
  officeCoords: [number, number];
  route: [number, number][];
  trigger: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (userLocation && route.length > 0 && trigger > 0) {
      const bounds = L.latLngBounds([userLocation, officeCoords]);
      route.forEach((c) => bounds.extend(c));
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
    }
  }, [trigger, userLocation, officeCoords, route, map]);
  return null;
}

// ===== MAIN COMPONENT =====
export default function LiveTrackingMap() {
  const OFFICE_COORDS: [number, number] = [26.2097169, 78.1959066];

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [fitTrigger, setFitTrigger] = useState(0);
  const [trackingStatus, setTrackingStatus] = useState<
    "idle" | "locating" | "routing" | "tracking" | "arrived"
  >("idle");

  const watchIdRef = useRef<number | null>(null);
  const lastRouteFetchRef = useRef<number>(0);

  // ===== Fetch driving route from OSRM (100% free, no API key needed) =====
  const fetchRoute = useCallback(async (from: [number, number]) => {
    const now = Date.now();
    if (now - lastRouteFetchRef.current < 5000) return;
    lastRouteFetchRef.current = now;

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${OFFICE_COORDS[1]},${OFFICE_COORDS[0]}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.code === "Ok" && data.routes?.[0]) {
        const coords: [number, number][] = data.routes[0].geometry.coordinates.map(
          (c: number[]) => [c[1], c[0]] as [number, number]
        );
        setRoute(coords);

        const dist = data.routes[0].distance;
        const dur = data.routes[0].duration;

        setDistance(dist < 1000 ? `${Math.round(dist)} m` : `${(dist / 1000).toFixed(1)} km`);

        const hrs = Math.floor(dur / 3600);
        const mins = Math.round((dur % 3600) / 60);
        setDuration(hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`);

        setFitTrigger((p) => p + 1);

        if (dist < 100) {
          setTrackingStatus("arrived");
          if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
          }
          setIsTracking(false);
        }
      }
    } catch {
      // keep last known route
    }
  }, []);

  // ===== Start GPS tracking =====
  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    setIsLoadingLocation(true);
    setLocationError("");
    setTrackingStatus("locating");

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(loc);
        setIsLoadingLocation(false);
        setIsTracking(true);
        setTrackingStatus("routing");
        await fetchRoute(loc);
        setTrackingStatus("tracking");
      },
      (err) => {
        setIsLoadingLocation(false);
        setIsTracking(false);
        setTrackingStatus("idle");
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError("Location access denied. Please enable location in browser settings.");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setLocationError("Location unavailable. Check your GPS or network.");
        } else {
          setLocationError("Location request timed out. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, [fetchRoute]);

  // ===== Stop tracking =====
  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
    setTrackingStatus((prev) => (prev === "arrived" ? "arrived" : "idle"));
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  // ===== Status badge =====
  const statusMap: Record<string, { text: string; color: string; pulse: boolean }> = {
    idle: { text: "", color: "", pulse: false },
    locating: { text: "Locating you...", color: "bg-amber-500", pulse: true },
    routing: { text: "Calculating route...", color: "bg-blue-600", pulse: true },
    tracking: { text: "Live Tracking", color: "bg-emerald-500", pulse: true },
    arrived: { text: "Arrived!", color: "bg-emerald-500", pulse: false },
  };
  const status = statusMap[trackingStatus];

  return (
    <>
      <style>{`
        @keyframes gps-ring {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes blink-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .live-dot { animation: blink-dot 1.4s ease-in-out infinite; }
        .leaflet-container { font-family: inherit; z-index: 0; }
        .leaflet-popup-content-wrapper { border-radius: 12px !important; box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important; }
        .leaflet-popup-content { margin: 10px 14px !important; }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Navigation className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Live Directions to Our Office
            </h2>
          </div>
          <p className="text-muted-foreground ml-[52px] text-sm">
            B/2, Mahesh Nagar, Tulsi Vihar Colony, Gwalior, MP 474002
          </p>
        </div>
        {trackingStatus !== "idle" && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md ${status.color}`}>
            <span className={`w-2.5 h-2.5 rounded-full bg-white ${status.pulse ? "live-dot" : ""}`} />
            {status.text}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {!isTracking ? (
          <Button
            size="lg"
            className="sm:col-span-2 w-full gap-2 text-base font-semibold"
            onClick={startTracking}
            disabled={isLoadingLocation}
          >
            <Locate className="h-5 w-5" />
            {isLoadingLocation ? "Getting Your Location..." : "Start Live Tracking"}
          </Button>
        ) : (
          <Button
            size="lg"
            variant="destructive"
            className="sm:col-span-2 w-full gap-2 text-base font-semibold"
            onClick={stopTracking}
          >
            <Locate className="h-5 w-5" />
            Stop Tracking
          </Button>
        )}
        <Button
          size="lg"
          variant="outline"
          className="w-full gap-2"
          onClick={() =>
            window.open(
              "https://www.google.com/maps/dir/?api=1&destination=26.2097169,78.1959066&destination_place_id=ChIJA79LlZnHdDkRbo6OmkmKWK8&travelmode=driving",
              "_blank"
            )
          }
        >
          <ExternalLink className="h-4 w-4" />
          Google Maps
        </Button>
      </div>

      {/* Error */}
      {locationError && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl p-4 mb-5">
          <p className="font-medium text-sm flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            {locationError}
          </p>
          <p className="text-xs mt-1 ml-6 opacity-70">
            On desktop, location is approximate. For GPS accuracy, use your phone.
          </p>
        </div>
      )}

      {/* Route Stats */}
      {distance && duration && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-card rounded-xl border p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
              <Route className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Distance</p>
              <p className="text-lg font-bold text-foreground">{distance}</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950">
              <Timer className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">ETA</p>
              <p className="text-lg font-bold text-foreground">{duration}</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950">
              <MapPinned className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">To</p>
              <p className="text-sm font-bold text-foreground leading-tight">CogniCode Office</p>
            </div>
          </div>
        </div>
      )}

      {/* Arrived */}
      {trackingStatus === "arrived" && (
        <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 mb-5 text-center">
          <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">You&apos;ve Arrived!</h3>
          <p className="text-emerald-600 text-sm mt-1">Welcome to CogniCode IT Solutions</p>
        </div>
      )}

      {/* ===== MAP ===== */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-lg" style={{ height: 500 }}>
        <MapContainer center={OFFICE_COORDS} zoom={16} style={{ height: "100%", width: "100%" }} zoomControl={true}>
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution='&copy; Google Maps'
            maxZoom={20}
          />
          <AutoFitBounds userLocation={userLocation} officeCoords={OFFICE_COORDS} route={route} trigger={fitTrigger} />

          <Marker position={OFFICE_COORDS} icon={officeIcon}>
            <Tooltip
    permanent
    direction="right"
    offset={[12, -20]}
    className="office-label"
  >
    <strong>CogniCode IT Solutions</strong>
  </Tooltip>
            <Popup>
              <div style={{ textAlign: "center", lineHeight: 1.5 }}>
                <strong style={{ fontSize: 14 }}>CogniCode IT Solutions</strong><br />
                <span style={{ fontSize: 12, color: "#666" }}>B/2, Mahesh Nagar, Tulsi Vihar Colony<br />Gwalior, MP 474002</span>
              </div>
            </Popup>
          </Marker>

          {userLocation && (
            <Marker position={userLocation} icon={userIcon}>
              <Popup>
                <div style={{ textAlign: "center", lineHeight: 1.5 }}>
                  <strong style={{ fontSize: 14 }}>Your Location</strong><br />
                  <span style={{ fontSize: 11, color: "#666" }}>Live GPS &bull; Auto-updates</span>
                </div>
              </Popup>
            </Marker>
          )}

          {route.length > 0 && (
            <>
              <Polyline positions={route} pathOptions={{ color: "#2563EB", weight: 10, opacity: 0.15 }} />
              <Polyline positions={route} pathOptions={{ color: "#2563EB", weight: 5, opacity: 0.85, lineCap: "round", lineJoin: "round" }} />
            </>
          )}
        </MapContainer>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Location updates in real-time &bull; Route recalculates automatically &bull; Best accuracy on mobile with GPS
      </p>
    </>
  );
}