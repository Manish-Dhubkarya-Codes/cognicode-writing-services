"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
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
  Volume2,
  VolumeX,
  Compass,
  ArrowUp,
  ChevronRight,
  CornerUpLeft,
  CornerUpRight,
  ArrowUpLeft,
  ArrowUpRight,
  RotateCcw,
  RotateCw,
  MoveUp,
  Milestone,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ===== Fix Leaflet default marker icons =====
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
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

// ===== Types =====
interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  maneuverType: string;
  maneuverModifier: string;
  name: string;
  location: [number, number]; // [lat, lng]
}

// ===== Haversine distance in meters =====
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ===== Build human-readable instruction from OSRM step =====
function buildInstruction(step: any): string {
  const type = step.maneuver?.type || "";
  const modifier = step.maneuver?.modifier || "";
  const name = step.name || "";
  const roadRef = name ? ` onto ${name}` : "";

  switch (type) {
    case "depart":
      return `Head ${modifier || "straight"}${roadRef}`;
    case "arrive":
      return modifier === "left"
        ? "Your destination is on the left"
        : modifier === "right"
        ? "Your destination is on the right"
        : "You have arrived at your destination";
    case "turn":
      return `Turn ${modifier}${roadRef}`;
    case "new name":
      return `Continue${roadRef}`;
    case "merge":
      return `Merge ${modifier}${roadRef}`;
    case "on ramp":
      return `Take the ramp ${modifier}${roadRef}`;
    case "off ramp":
      return `Take the exit ${modifier}${roadRef}`;
    case "fork":
      return `Keep ${modifier} at the fork${roadRef}`;
    case "end of road":
      return `Turn ${modifier}${roadRef}`;
    case "continue":
      return `Continue ${modifier}${roadRef}`;
    case "roundabout":
    case "rotary":
      return `Enter the roundabout and take the exit${roadRef}`;
    case "roundabout turn":
      return `At the roundabout, turn ${modifier}${roadRef}`;
    case "use lane":
      return `Use the ${modifier} lane${roadRef}`;
    default:
      return modifier
        ? `${modifier.charAt(0).toUpperCase() + modifier.slice(1)}${roadRef}`
        : `Continue${roadRef}`;
  }
}

// ===== Get direction icon for a maneuver =====
function DirectionIcon({
  type,
  modifier,
  size = 20,
}: {
  type: string;
  modifier: string;
  size?: number;
}) {
  if (type === "arrive")
    return <CheckCircle size={size} className="text-emerald-500" />;
  if (type === "depart") return <MoveUp size={size} />;
  if (type === "roundabout" || type === "rotary")
    return <RotateCw size={size} />;

  switch (modifier) {
    case "left":
      return <CornerUpLeft size={size} />;
    case "right":
      return <CornerUpRight size={size} />;
    case "sharp left":
      return <CornerUpLeft size={size} />;
    case "sharp right":
      return <CornerUpRight size={size} />;
    case "slight left":
      return <ArrowUpLeft size={size} />;
    case "slight right":
      return <ArrowUpRight size={size} />;
    case "uturn":
      return <RotateCcw size={size} />;
    case "straight":
      return <ArrowUp size={size} />;
    default:
      return <ArrowUp size={size} />;
  }
}

// ===== Format distance for display =====
function formatDist(m: number): string {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(1)} km`;
}

// ===== Map controller for rotation + auto-follow =====
function MapController({
  userLocation,
  officeCoords,
  route,
  fitTrigger,
  heading,
  isNavigationMode,
  followUser,
}: {
  userLocation: [number, number] | null;
  officeCoords: [number, number];
  route: [number, number][];
  fitTrigger: number;
  heading: number | null;
  isNavigationMode: boolean;
  followUser: boolean;
}) {
  const map = useMap();

  // Fit bounds when route first loads
  useEffect(() => {
    if (userLocation && route.length > 0 && fitTrigger > 0) {
      const bounds = L.latLngBounds([userLocation, officeCoords]);
      route.forEach((c) => bounds.extend(c));
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    }
  }, [fitTrigger, userLocation, officeCoords, route, map]);

  // Follow user + rotate map in navigation mode
  useEffect(() => {
    if (!userLocation || !followUser) return;

    if (isNavigationMode) {
      // Navigation mode: follow user tightly, higher zoom
      map.setView(userLocation, Math.max(map.getZoom(), 17), {
        animate: true,
        duration: 0.5,
      });
    }
  }, [userLocation, isNavigationMode, followUser, map]);

  // Apply CSS rotation for heading
  useEffect(() => {
    const container = map.getContainer();
    if (isNavigationMode && heading !== null && heading >= 0) {
      container.style.transition = "transform 0.5s ease-out";
      container.style.transform = `rotate(${-heading}deg)`;
    } else {
      container.style.transition = "transform 0.3s ease-out";
      container.style.transform = "rotate(0deg)";
    }
  }, [heading, isNavigationMode, map]);

  return null;
}

// ===== MAIN COMPONENT =====
export default function LiveTrackingMap() {
  const OFFICE_COORDS: [number, number] = [26.2097169, 78.1959066];
  const ARRIVAL_THRESHOLD_M = 250; // meters – GPS can drift ~50-150m on phones

  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [route, setRoute] = useState<[number, number][]>([]);
  const [steps, setSteps] = useState<RouteStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [fitTrigger, setFitTrigger] = useState(0);
  const [heading, setHeading] = useState<number | null>(null);
  const [isNavigationMode, setIsNavigationMode] = useState(false);
  const [followUser, setFollowUser] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [trackingStatus, setTrackingStatus] = useState<
    "idle" | "locating" | "routing" | "tracking" | "arrived"
  >("idle");

  const watchIdRef = useRef<number | null>(null);
  const lastRouteFetchRef = useRef<number>(0);
  const spokenStepsRef = useRef<Set<number>>(new Set());
  const lastAnnouncedDistRef = useRef<number>(Infinity);

  // ===== Speak a direction (Web Speech API) =====
  const speak = useCallback(
    (text: string) => {
      if (!audioEnabled) return;
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    },
    [audioEnabled]
  );

  // ===== Find closest upcoming step based on user location =====
  const updateCurrentStep = useCallback(
    (loc: [number, number]) => {
      if (steps.length === 0) return;

      // Find the nearest step that is still ahead
      let closestIdx = currentStepIndex;
      let closestDist = Infinity;

      for (let i = currentStepIndex; i < steps.length; i++) {
        const d = haversineDistance(
          loc[0],
          loc[1],
          steps[i].location[0],
          steps[i].location[1]
        );
        if (d < closestDist) {
          closestDist = d;
          closestIdx = i;
        }
      }

      // Advance to next step if we're within 40m of current step's maneuver point
      const distToCurrent = haversineDistance(
        loc[0],
        loc[1],
        steps[closestIdx].location[0],
        steps[closestIdx].location[1]
      );

      if (distToCurrent < 40 && closestIdx < steps.length - 1) {
        closestIdx = closestIdx + 1;
      }

      setCurrentStepIndex(closestIdx);

      // Voice guidance: announce upcoming maneuver
      const distToManeuver = haversineDistance(
        loc[0],
        loc[1],
        steps[closestIdx].location[0],
        steps[closestIdx].location[1]
      );

      // Announce at ~200m and ~50m before the turn
      if (distToManeuver < 200 && distToManeuver > 50) {
        if (!spokenStepsRef.current.has(closestIdx * 10 + 1)) {
          spokenStepsRef.current.add(closestIdx * 10 + 1);
          speak(
            `In ${Math.round(distToManeuver)} meters, ${steps[closestIdx].instruction}`
          );
        }
      } else if (distToManeuver <= 50) {
        if (!spokenStepsRef.current.has(closestIdx * 10 + 2)) {
          spokenStepsRef.current.add(closestIdx * 10 + 2);
          speak(steps[closestIdx].instruction);
        }
      }
    },
    [steps, currentStepIndex, speak]
  );

  // ===== Fetch driving route from OSRM with steps =====
  const fetchRoute = useCallback(
    async (from: [number, number]) => {
      const now = Date.now();
      if (now - lastRouteFetchRef.current < 5000) return;
      lastRouteFetchRef.current = now;

      try {
        const url =
          `https://router.project-osrm.org/route/v1/driving/` +
          `${from[1]},${from[0]};${OFFICE_COORDS[1]},${OFFICE_COORDS[0]}` +
          `?overview=full&geometries=geojson&steps=true&alternatives=false&continue_straight=true`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.code === "Ok" && data.routes?.[0]) {
          const routeData = data.routes[0];

          // Extract polyline coords
          const coords: [number, number][] =
            routeData.geometry.coordinates.map(
              (c: number[]) => [c[1], c[0]] as [number, number]
            );
          setRoute(coords);

          // Extract turn-by-turn steps
          const allSteps: RouteStep[] = [];
          for (const leg of routeData.legs) {
            for (const step of leg.steps) {
              allSteps.push({
                instruction: buildInstruction(step),
                distance: step.distance,
                duration: step.duration,
                maneuverType: step.maneuver?.type || "",
                maneuverModifier: step.maneuver?.modifier || "",
                name: step.name || "",
                location: [
                  step.maneuver.location[1],
                  step.maneuver.location[0],
                ] as [number, number],
              });
            }
          }
          setSteps(allSteps);

          // Distance & ETA
          const dist = routeData.distance;
          const dur = routeData.duration;

          setDistance(
            dist < 1000
              ? `${Math.round(dist)} m`
              : `${(dist / 1000).toFixed(1)} km`
          );

          const hrs = Math.floor(dur / 3600);
          const mins = Math.round((dur % 3600) / 60);
          setDuration(
            hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`
          );

          setFitTrigger((p) => p + 1);

          // Check arrival with larger threshold
          const distToOffice = haversineDistance(
            from[0],
            from[1],
            OFFICE_COORDS[0],
            OFFICE_COORDS[1]
          );

          if (distToOffice < ARRIVAL_THRESHOLD_M) {
            setTrackingStatus("arrived");
            speak("You have arrived at CogniCode IT Solutions. Welcome!");
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
    },
    [speak]
  );

  // ===== Start GPS tracking =====
  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    setIsLoadingLocation(true);
    setLocationError("");
    setTrackingStatus("locating");
    spokenStepsRef.current.clear();
    setCurrentStepIndex(0);

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const loc: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setUserLocation(loc);

        // Capture heading for map rotation (available on mobile with GPS movement)
        if (
          pos.coords.heading !== null &&
          pos.coords.heading !== undefined &&
          !isNaN(pos.coords.heading)
        ) {
          setHeading(pos.coords.heading);
        }

        setIsLoadingLocation(false);
        setIsTracking(true);
        setTrackingStatus((prev) =>
          prev === "arrived" ? "arrived" : "tracking"
        );

        await fetchRoute(loc);
        updateCurrentStep(loc);
      },
      (err) => {
        setIsLoadingLocation(false);
        setIsTracking(false);
        setTrackingStatus("idle");
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError(
            "Location access denied. Please enable location in browser settings."
          );
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setLocationError(
            "Location unavailable. Check your GPS or network."
          );
        } else {
          setLocationError("Location request timed out. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 2000 }
    );
  }, [fetchRoute, updateCurrentStep]);

  // ===== Stop tracking =====
  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    window.speechSynthesis?.cancel();
    setIsTracking(false);
    setIsNavigationMode(false);
    setTrackingStatus((prev) => (prev === "arrived" ? "arrived" : "idle"));
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null)
        navigator.geolocation.clearWatch(watchIdRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  // ===== Upcoming steps (next 3) =====
  const upcomingSteps = useMemo(() => {
    return steps.slice(currentStepIndex, currentStepIndex + 3);
  }, [steps, currentStepIndex]);

  // ===== Status badge =====
  const statusMap: Record<
    string,
    { text: string; color: string; pulse: boolean }
  > = {
    idle: { text: "", color: "", pulse: false },
    locating: { text: "Locating you...", color: "bg-amber-500", pulse: true },
    routing: {
      text: "Calculating route...",
      color: "bg-blue-600",
      pulse: true,
    },
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

        /* Smooth rotation origin from center */
        .map-rotation-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
        }
        .map-rotation-wrapper .leaflet-container {
          transform-origin: center center;
        }

        /* Direction panel styling */
        .direction-panel {
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.15) transparent;
        }
        .direction-panel::-webkit-scrollbar { width: 4px; }
        .direction-panel::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }

        /* Step highlight animation */
        @keyframes step-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.3); }
          50% { box-shadow: 0 0 0 6px rgba(37,99,235,0); }
        }
        .active-step { animation: step-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* ==================== IMPROVED RESPONSIVE HEADER + BUTTONS + STATS ==================== */}
      <div className="mb-6">
        {/* Title + Status Row - aligned on all screens, status moves to right on large screens */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Navigation className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground leading-tight">
                Live Directions to Our Office
              </h2>
              <p className="text-muted-foreground text-sm">
                B/2, Mahesh Nagar, Tulsi Vihar Colony, Gwalior, MP 474002
              </p>
            </div>
          </div>

          {/* Status Badge */}
          {trackingStatus !== "idle" && (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md ${status.color}`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full bg-white ${status.pulse ? "live-dot" : ""}`}
              />
              {status.text}
            </div>
          )}
        </div>

        {/* Control Buttons - Responsive: 2 columns on mobile, 4 columns (one line) on md+ screens */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {!isTracking ? (
            <Button
              size="lg"
              className="md:col-span-2 w-full gap-2 text-base font-semibold"
              onClick={startTracking}
              disabled={isLoadingLocation}
            >
              <Locate className="h-5 w-5" />
              {isLoadingLocation
                ? "Getting Your Location..."
                : "Start Live Tracking"}
            </Button>
          ) : (
            <Button
              size="lg"
              variant="destructive"
              className="md:col-span-2 w-full gap-2 text-base font-semibold"
              onClick={stopTracking}
            >
              <Locate className="h-5 w-5" />
              Stop Tracking
            </Button>
          )}

          {/* Navigation mode toggle (only when tracking) */}
          {isTracking && (
            <Button
              size="lg"
              variant={isNavigationMode ? "default" : "outline"}
              className="w-full gap-2"
              onClick={() => {
                setIsNavigationMode((p) => !p);
                setFollowUser(true);
              }}
            >
              <Compass className="h-4 w-4" />
              {isNavigationMode ? "Nav Mode ON" : "Nav Mode"}
            </Button>
          )}

          {/* Audio toggle (only when tracking) */}
          {isTracking && (
            <Button
              size="lg"
              variant={audioEnabled ? "default" : "outline"}
              className="w-full gap-2"
              onClick={() => {
                setAudioEnabled((p) => {
                  if (p) window.speechSynthesis?.cancel();
                  return !p;
                });
              }}
            >
              {audioEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              {audioEnabled ? "Audio ON" : "Audio OFF"}
            </Button>
          )}

          {/* Google Maps - always visible */}
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

        {/* Route Stats - ALWAYS in one horizontal row on every screen size (less vertical space) */}
        {distance && duration && (
          <div className="flex overflow-x-auto w-[100%] gap-3">
            <div className="bg-card shrink-0 rounded-xl border px-4 py-2 w-fit flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
                <Route className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  Distance
                </p>
                <p className="text-lg font-bold text-foreground">{distance}</p>
              </div>
            </div>
            <div className="bg-card rounded-xl shrink-0 border px-4 py-2 w-fit flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950">
                <Timer className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                
                  ETA
                </p>
                <p className="text-lg font-bold text-foreground">{duration}</p>
              </div>
            </div>
            <div className="bg-card rounded-xl border px-4 py-2 w-fit flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950">
                <MapPinned className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  To
                </p>
                <p className="text-sm font-bold text-foreground leading-tight">
                  CogniCode Office
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {locationError && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl p-4 mb-5">
          <p className="font-medium text-sm flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            {locationError}
          </p>
          <p className="text-xs mt-1 ml-6 opacity-70">
            On desktop, location is approximate. For GPS accuracy, use your
            phone.
          </p>
        </div>
      )}

      {/* Arrived */}
      {trackingStatus === "arrived" && (
        <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 mb-5 text-center">
          <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
            You&apos;ve Arrived!
          </h3>
          <p className="text-emerald-600 text-sm mt-1">
            Welcome to CogniCode IT Solutions
          </p>
        </div>
      )}

      {/* ===== MAP ===== */}
      <div
        className="map-rotation-wrapper border border-border shadow-lg"
        style={{ height: 500 }}
      >
        <MapContainer
          center={OFFICE_COORDS}
          zoom={16}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
        >
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution="&copy; Google Maps"
            maxZoom={20}
          />

          <MapController
            userLocation={userLocation}
            officeCoords={OFFICE_COORDS}
            route={route}
            fitTrigger={fitTrigger}
            heading={heading}
            isNavigationMode={isNavigationMode}
            followUser={followUser}
          />

          {/* Office marker */}
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
                <strong style={{ fontSize: 14 }}>
                  CogniCode IT Solutions
                </strong>
                <br />
                <span style={{ fontSize: 12, color: "#666" }}>
                  B/2, Mahesh Nagar, Tulsi Vihar Colony
                  <br />
                  Gwalior, MP 474002
                </span>
              </div>
            </Popup>
          </Marker>

          {/* User marker */}
          {userLocation && (
            <Marker position={userLocation} icon={userIcon}>
              <Popup>
                <div style={{ textAlign: "center", lineHeight: 1.5 }}>
                  <strong style={{ fontSize: 14 }}>Your Location</strong>
                  <br />
                  <span style={{ fontSize: 11, color: "#666" }}>
                    Live GPS &bull; Auto-updates
                  </span>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Route polyline */}
          {route.length > 0 && (
            <>
              <Polyline
                positions={route}
                pathOptions={{
                  color: "#2563EB",
                  weight: 10,
                  opacity: 0.15,
                }}
              />
              <Polyline
                positions={route}
                pathOptions={{
                  color: "#2563EB",
                  weight: 5,
                  opacity: 0.85,
                  lineCap: "round",
                  lineJoin: "round",
                }}
              />
            </>
          )}

          {/* Maneuver point markers (small dots on the route for each turn) */}
          {steps
            .filter(
              (s) =>
                s.maneuverType !== "depart" && s.maneuverType !== "arrive"
            )
            .map((step, i) => {
              const turnIcon = L.divIcon({
                className: "",
                html: `<div style="width:10px;height:10px;background:#2563EB;border:2px solid white;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div>`,
                iconSize: [10, 10],
                iconAnchor: [5, 5],
              });
              return (
                <Marker key={`step-${i}`} position={step.location} icon={turnIcon}>
                  <Tooltip direction="top" offset={[0, -8]}>
                    <span style={{ fontSize: 12 }}>{step.instruction}</span>
                  </Tooltip>
                </Marker>
              );
            })}
        </MapContainer>
      </div>

      {/* Navigation mode hint */}
      {isNavigationMode && (
        <p className="text-center text-xs text-blue-600 dark:text-blue-400 font-medium mt-3">
          <Compass className="inline h-3 w-3 mr-1" />
          Navigation mode: Map rotates with your heading for turn-by-turn
          guidance. Move your device to calibrate.
        </p>
      )}

      <p className="text-center text-xs text-muted-foreground mt-3">
        Location updates in real-time &bull; Route recalculates automatically
        &bull; Best accuracy on mobile with GPS
      </p>

      {/* Full directions list (collapsible) */}
      {steps.length > 0 && (
        <details className="mt-5">
          <summary className="cursor-pointer text-sm font-semibold text-foreground flex items-center gap-2 select-none">
            <Milestone className="h-4 w-4" />
            View All Directions ({steps.length} steps)
          </summary>
          <div className="mt-3 bg-card rounded-xl border divide-y divide-border overflow-hidden">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 ${
                  i === currentStepIndex
                    ? "bg-blue-50 dark:bg-blue-950/30 active-step"
                    : i < currentStepIndex
                    ? "opacity-50"
                    : ""
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    i === currentStepIndex
                      ? "bg-blue-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <DirectionIcon
                    type={step.maneuverType}
                    modifier={step.maneuverModifier}
                    size={16}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm truncate ${
                      i === currentStepIndex
                        ? "font-bold text-blue-700 dark:text-blue-300"
                        : "font-medium text-foreground"
                    }`}
                  >
                    {step.instruction}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDist(step.distance)}
                    {step.name && <span> • {step.name}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </details>
      )}
    </>
  );
}