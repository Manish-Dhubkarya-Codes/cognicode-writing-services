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
  Gauge,
  AlertTriangle,
  LocateFixed,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  Tooltip,
  Circle,
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

// User icon with directional arrow (rotated via CSS)
function createUserIcon(heading: number | null) {
  const rotation = heading !== null && heading >= 0 ? heading : 0;
  const showArrow = heading !== null && heading >= 0;

  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:56px;height:56px;display:flex;align-items:center;justify-content:center">
      <div style="position:absolute;width:56px;height:56px;border-radius:50%;background:rgba(37,99,235,0.12);animation:gps-ring 2s ease-out infinite"></div>
      <div style="position:absolute;width:36px;height:36px;border-radius:50%;background:rgba(37,99,235,0.2);animation:gps-ring 2s ease-out infinite 0.5s"></div>
      ${
        showArrow
          ? `<div style="position:absolute;width:40px;height:40px;transform:rotate(${rotation}deg);z-index:9;pointer-events:none">
            <svg viewBox="0 0 40 40" style="width:100%;height:100%">
              <path d="M20 2 L28 18 L20 14 L12 18 Z" fill="rgba(37,99,235,0.6)" stroke="rgba(37,99,235,0.9)" stroke-width="1"/>
            </svg>
          </div>`
          : ""
      }
      <div style="width:20px;height:20px;border-radius:50%;background:#2563EB;border:3.5px solid white;box-shadow:0 0 0 2px rgba(37,99,235,0.4),0 2px 8px rgba(0,0,0,0.3);position:relative;z-index:10"></div>
    </div>`,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    popupAnchor: [0, -28],
  });
}

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

// ===== Geometry Utilities =====

/** Haversine distance in meters */
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

/** Calculate bearing from point A to point B in degrees (0-360) */
function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(radLat2);
  const x =
    Math.cos(radLat1) * Math.sin(radLat2) -
    Math.sin(radLat1) * Math.cos(radLat2) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

/**
 * Snap a point to the nearest position on a polyline.
 * Returns: { point, segmentIndex, distanceFromRoute, distanceAlongRoute }
 */
function snapToRoute(
  lat: number,
  lng: number,
  route: [number, number][]
): {
  point: [number, number];
  segmentIndex: number;
  distanceFromRoute: number;
  distanceAlongRoute: number;
} {
  if (route.length < 2) {
    return {
      point: route[0] || [lat, lng],
      segmentIndex: 0,
      distanceFromRoute: 0,
      distanceAlongRoute: 0,
    };
  }

  let minDist = Infinity;
  let bestPoint: [number, number] = route[0];
  let bestSegIdx = 0;
  let bestFraction = 0;

  for (let i = 0; i < route.length - 1; i++) {
    const [aLat, aLng] = route[i];
    const [bLat, bLng] = route[i + 1];

    // Project point onto segment using flat-earth approximation (good for short segments)
    const dx = bLng - aLng;
    const dy = bLat - aLat;
    const lenSq = dx * dx + dy * dy;

    let t = 0;
    if (lenSq > 0) {
      t = ((lng - aLng) * dx + (lat - aLat) * dy) / lenSq;
      t = Math.max(0, Math.min(1, t));
    }

    const projLat = aLat + t * dy;
    const projLng = aLng + t * dx;
    const d = haversineDistance(lat, lng, projLat, projLng);

    if (d < minDist) {
      minDist = d;
      bestPoint = [projLat, projLng];
      bestSegIdx = i;
      bestFraction = t;
    }
  }

  // Calculate distance along route up to snapped point
  let distAlong = 0;
  for (let i = 0; i < bestSegIdx; i++) {
    distAlong += haversineDistance(
      route[i][0],
      route[i][1],
      route[i + 1][0],
      route[i + 1][1]
    );
  }
  distAlong +=
    haversineDistance(
      route[bestSegIdx][0],
      route[bestSegIdx][1],
      route[bestSegIdx + 1][0],
      route[bestSegIdx + 1][1]
    ) * bestFraction;

  return {
    point: bestPoint,
    segmentIndex: bestSegIdx,
    distanceFromRoute: minDist,
    distanceAlongRoute: distAlong,
  };
}

/** Calculate remaining distance along route from a segment index */
function remainingRouteDistance(
  route: [number, number][],
  fromSegIdx: number,
  fromFraction: number
): number {
  if (route.length < 2 || fromSegIdx >= route.length - 1) return 0;

  // Partial distance of current segment
  let dist =
    haversineDistance(
      route[fromSegIdx][0],
      route[fromSegIdx][1],
      route[fromSegIdx + 1][0],
      route[fromSegIdx + 1][1]
    ) *
    (1 - fromFraction);

  // Full segments after
  for (let i = fromSegIdx + 1; i < route.length - 1; i++) {
    dist += haversineDistance(
      route[i][0],
      route[i][1],
      route[i + 1][0],
      route[i + 1][1]
    );
  }
  return dist;
}

/** Smooth heading using exponential moving average to prevent jitter */
function smoothHeading(
  current: number | null,
  target: number,
  alpha: number = 0.3
): number {
  if (current === null) return target;
  // Handle wrap-around (e.g., 350° -> 10°)
  let diff = target - current;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return ((current + diff * alpha) % 360 + 360) % 360;
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
    case "rotary": {
      const exit = step.maneuver?.exit;
      return exit
        ? `At the roundabout, take the ${ordinal(exit)} exit${roadRef}`
        : `Enter the roundabout and take the exit${roadRef}`;
    }
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

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ===== Direction Icon =====
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

// ===== Format helpers =====
function formatDist(m: number): string {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(1)} km`;
}

function formatSpeed(mps: number): string {
  const kmh = mps * 3.6;
  return `${Math.round(kmh)} km/h`;
}

function formatETA(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs} hr ${mins} min`;
  return `${mins} min`;
}

// ===== Map Controller =====
function MapController({
  targetPosition,
  officeCoords,
  route,
  fitTrigger,
  isTracking,
  followUser,
  speed,
}: {
  targetPosition: [number, number] | null;
  officeCoords: [number, number];
  route: [number, number][];
  fitTrigger: number;
  isTracking: boolean;
  followUser: boolean;
  speed: number;
}) {
  const map = useMap();

  // Fit bounds when route first loads
  useEffect(() => {
    if (targetPosition && route.length > 0 && fitTrigger > 0) {
      const bounds = L.latLngBounds([targetPosition, officeCoords]);
      route.forEach((c) => bounds.extend(c));
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    }
  }, [fitTrigger]);

  // Follow user when tracking with speed-based zoom
  useEffect(() => {
    if (!targetPosition || !followUser) return;

    if (isTracking) {
      // Speed-based zoom: zoom out at higher speeds for better forward visibility
      const kmh = speed * 3.6;
      let zoom = 18;
      if (kmh > 80) zoom = 15;
      else if (kmh > 60) zoom = 15.5;
      else if (kmh > 40) zoom = 16;
      else if (kmh > 20) zoom = 17;

      map.setView(targetPosition, zoom, {
        animate: true,
        duration: 0.8,
      });
    }
  }, [targetPosition, isTracking, followUser, speed, map]);

  return null;
}

// ===== Constants =====
const OFFICE_COORDS: [number, number] = [26.20986098994172, 78.1931633754292];
const ARRIVAL_THRESHOLD_M = 100;
const OFF_ROUTE_THRESHOLD_M = 50; // meters before triggering reroute
const REROUTE_COOLDOWN_MS = 8000; // minimum time between reroutes
const STEP_ADVANCE_RADIUS_M = 30; // advance to next step within this radius

// ===== MAIN COMPONENT =====
export default function LiveTrackingMap() {
  // -- Location & Route State --
  const [rawUserLocation, setRawUserLocation] = useState<[number, number] | null>(null);
  const [snappedLocation, setSnappedLocation] = useState<[number, number] | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [traveledRoute, setTraveledRoute] = useState<[number, number][]>([]);
  const [remainingRoute, setRemainingRoute] = useState<[number, number][]>([]);
  const [steps, setSteps] = useState<RouteStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [distanceRemaining, setDistanceRemaining] = useState("");
  const [etaSeconds, setEtaSeconds] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [fitTrigger, setFitTrigger] = useState(0);
  const [heading, setHeading] = useState<number | null>(null);
  const [smoothedHeading, setSmoothedHeading] = useState<number | null>(null);
  const [followUser, setFollowUser] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [speed, setSpeed] = useState(0); // m/s
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [isOffRoute, setIsOffRoute] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState<
    "idle" | "locating" | "routing" | "tracking" | "rerouting" | "arrived"
  >("idle");

  // -- Refs --
  const watchIdRef = useRef<number | null>(null);
  const lastRouteFetchRef = useRef<number>(0);
  const spokenStepsRef = useRef<Set<string>>(new Set());
  const routeDataRef = useRef<{ distance: number; duration: number }>({ distance: 0, duration: 0 });
  const stepsRef = useRef<RouteStep[]>([]);
  const routeRef = useRef<[number, number][]>([]);
  const currentStepRef = useRef(0);

  // Keep refs in sync
  useEffect(() => { stepsRef.current = steps; }, [steps]);
  useEffect(() => { routeRef.current = route; }, [route]);
  useEffect(() => { currentStepRef.current = currentStepIndex; }, [currentStepIndex]);

  // ===== Voice Guidance =====
  const speak = useCallback(
    (text: string, priority: boolean = false) => {
      if (!audioEnabled && !priority) return;
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    },
    [audioEnabled]
  );

  // ===== Smart voice guidance with Google-like distance callouts =====
  const announceStep = useCallback(
    (stepIdx: number, distToManeuver: number, isReroute: boolean = false) => {
      const localSteps = stepsRef.current;
      if (stepIdx >= localSteps.length) return;
      const step = localSteps[stepIdx];

      if (isReroute) {
        const key = `reroute-${Date.now()}`;
        if (!spokenStepsRef.current.has(key)) {
          spokenStepsRef.current.add(key);
          speak("Rerouting.", true);
        }
        return;
      }

      // Announce at these distance thresholds
      const thresholds = [
        { dist: 500, key: `${stepIdx}-500`, prefix: "In 500 meters" },
        { dist: 200, key: `${stepIdx}-200`, prefix: "In 200 meters" },
        { dist: 100, key: `${stepIdx}-100`, prefix: "In 100 meters" },
        { dist: 40, key: `${stepIdx}-now`, prefix: "" },
      ];

      for (const t of thresholds) {
        if (distToManeuver <= t.dist && !spokenStepsRef.current.has(t.key)) {
          spokenStepsRef.current.add(t.key);
          const msg = t.prefix
            ? `${t.prefix}, ${step.instruction}`
            : step.instruction;
          speak(msg);
          break; // Only announce one threshold at a time
        }
      }
    },
    [speak]
  );

  // ===== Process GPS update: snap, detect off-route, advance step, update display =====
  const processLocationUpdate = useCallback(
    (loc: [number, number], currentRoute: [number, number][], currentSteps: RouteStep[]) => {
      if (currentRoute.length < 2) return;

      // 1. Snap to route
      const snap = snapToRoute(loc[0], loc[1], currentRoute);
      setSnappedLocation(snap.point);

      // 2. Off-route detection
      const offRoute = snap.distanceFromRoute > OFF_ROUTE_THRESHOLD_M;
      setIsOffRoute(offRoute);

      // 3. Split route into traveled + remaining
      const segIdx = snap.segmentIndex;
      const traveled = currentRoute.slice(0, segIdx + 1).concat([snap.point]);
      const remaining = [snap.point].concat(currentRoute.slice(segIdx + 1));
      setTraveledRoute(traveled);
      setRemainingRoute(remaining);

      // 4. Calculate bearing from route geometry (much smoother than GPS heading)
      if (segIdx < currentRoute.length - 1) {
        const routeBearing = calculateBearing(
          currentRoute[segIdx][0],
          currentRoute[segIdx][1],
          currentRoute[segIdx + 1][0],
          currentRoute[segIdx + 1][1]
        );
        setSmoothedHeading((prev) => smoothHeading(prev, routeBearing, 0.25));
      }

      // 5. Advance step based on distance to each maneuver point
      if (currentSteps.length > 0) {
        const curIdx = currentStepRef.current;

        // Check if we've passed the current step's maneuver point
        let newIdx = curIdx;
        for (let i = curIdx; i < currentSteps.length; i++) {
          const distToStep = haversineDistance(
            snap.point[0],
            snap.point[1],
            currentSteps[i].location[0],
            currentSteps[i].location[1]
          );
          if (distToStep < STEP_ADVANCE_RADIUS_M && i < currentSteps.length - 1) {
            newIdx = i + 1;
          } else {
            break;
          }
        }

        // Also check: if user is much closer to a future step, jump ahead
        if (newIdx === curIdx && curIdx < currentSteps.length - 2) {
          const distCurrent = haversineDistance(
            snap.point[0], snap.point[1],
            currentSteps[curIdx].location[0], currentSteps[curIdx].location[1]
          );
          const distNext = haversineDistance(
            snap.point[0], snap.point[1],
            currentSteps[curIdx + 1].location[0], currentSteps[curIdx + 1].location[1]
          );
          // If we're closer to next step AND have passed current step
          if (distNext < distCurrent && distCurrent > currentSteps[curIdx].distance * 0.7) {
            newIdx = curIdx + 1;
          }
        }

        setCurrentStepIndex(newIdx);

        // 6. Voice guidance for upcoming maneuver
        if (newIdx < currentSteps.length) {
          const distToManeuver = haversineDistance(
            snap.point[0],
            snap.point[1],
            currentSteps[newIdx].location[0],
            currentSteps[newIdx].location[1]
          );
          announceStep(newIdx, distToManeuver);
        }
      }

      // 7. Update remaining distance & ETA
      const totalRouteLen = routeDataRef.current.distance;
      const totalRouteDur = routeDataRef.current.duration;
      if (totalRouteLen > 0) {
        const fraction = Math.min(snap.distanceAlongRoute / totalRouteLen, 1);
        const remDist = totalRouteLen * (1 - fraction);
        const remTime = totalRouteDur * (1 - fraction);
        setDistanceRemaining(formatDist(remDist));
        setEtaSeconds(remTime);
      }
    },
    [announceStep]
  );

  // ===== Fetch route from OSRM =====
  const fetchRoute = useCallback(
    async (from: [number, number], forceReroute: boolean = false): Promise<boolean> => {
      const now = Date.now();
      const cooldown = forceReroute ? REROUTE_COOLDOWN_MS : 10000;
      if (now - lastRouteFetchRef.current < cooldown) return false;
      lastRouteFetchRef.current = now;

      if (forceReroute) {
        setTrackingStatus("rerouting");
      }

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
          routeRef.current = coords;

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
          stepsRef.current = allSteps;

          // Store total distance/duration for ETA calculation
          routeDataRef.current = {
            distance: routeData.distance,
            duration: routeData.duration,
          };

          setDistanceRemaining(formatDist(routeData.distance));
          setEtaSeconds(routeData.duration);

          if (forceReroute) {
            // Reset step tracking on reroute
            setCurrentStepIndex(0);
            currentStepRef.current = 0;
            spokenStepsRef.current.clear();
            announceStep(-1, 0, true); // Announce "Rerouting"
          }

          setFitTrigger((p) => p + 1);
          setTrackingStatus("tracking");
          setIsOffRoute(false);

          // Process the snap immediately with new route
          processLocationUpdate(from, coords, allSteps);

          // Check arrival
          const distToOffice = haversineDistance(
            from[0], from[1], OFFICE_COORDS[0], OFFICE_COORDS[1]
          );
          if (distToOffice < ARRIVAL_THRESHOLD_M) {
            setTrackingStatus("arrived");
            speak("You have arrived at CogniCode IT Solutions. Welcome!", true);
            if (watchIdRef.current !== null) {
              navigator.geolocation.clearWatch(watchIdRef.current);
              watchIdRef.current = null;
            }
            setIsTracking(false);
            return true;
          }

          return true;
        }
      } catch {
        // Keep last known route
      }
      return false;
    },
    [speak, announceStep, processLocationUpdate]
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
    currentStepRef.current = 0;
    setIsOffRoute(false);
    setFollowUser(true);

    let initialRouteFetched = false;

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setRawUserLocation(loc);

        // Speed & accuracy
        if (pos.coords.speed !== null && pos.coords.speed >= 0) {
          setSpeed(pos.coords.speed);
        }
        if (pos.coords.accuracy !== null) {
          setAccuracy(pos.coords.accuracy);
        }

        // GPS heading (supplement route-based bearing)
        if (
          pos.coords.heading !== null &&
          pos.coords.heading !== undefined &&
          !isNaN(pos.coords.heading) &&
          pos.coords.speed !== null &&
          pos.coords.speed > 1 // Only use GPS heading when actually moving
        ) {
          setHeading(pos.coords.heading);
        }

        setIsLoadingLocation(false);
        setIsTracking(true);

        // Fetch route on first fix, then periodically or on off-route
        if (!initialRouteFetched) {
          setTrackingStatus("routing");
          speak("Route found. Starting navigation.", true);
          const ok = await fetchRoute(loc);
          if (ok) initialRouteFetched = true;
        } else {
          // Process with existing route
          processLocationUpdate(loc, routeRef.current, stepsRef.current);

          // Check if off-route → reroute
          const snap = snapToRoute(loc[0], loc[1], routeRef.current);
          if (snap.distanceFromRoute > OFF_ROUTE_THRESHOLD_M) {
            await fetchRoute(loc, true);
          } else {
            // Periodic route refresh every 30s to keep ETA accurate
            const now = Date.now();
            if (now - lastRouteFetchRef.current > 30000) {
              await fetchRoute(loc);
            }
          }
        }
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
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000, // fresher positions for better tracking
      }
    );
  }, [fetchRoute, processLocationUpdate, speak]);

  // ===== Stop tracking =====
  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    window.speechSynthesis?.cancel();
    setIsTracking(false);
    setIsOffRoute(false);
    setTrackingStatus((prev) => (prev === "arrived" ? "arrived" : "idle"));
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null)
        navigator.geolocation.clearWatch(watchIdRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  // ===== Derived display location: use snapped when on-route, raw when off =====
  const displayLocation = useMemo(() => {
    if (isOffRoute || !snappedLocation) return rawUserLocation;
    return snappedLocation;
  }, [rawUserLocation, snappedLocation, isOffRoute]);

  // ===== Dynamic user icon with heading =====
  const currentUserIcon = useMemo(() => {
    return createUserIcon(smoothedHeading);
  }, [smoothedHeading]);

  // ===== Upcoming steps =====
  const upcomingSteps = useMemo(() => {
    return steps.slice(currentStepIndex, currentStepIndex + 3);
  }, [steps, currentStepIndex]);

  // ===== Distance to next maneuver =====
  const distToNextManeuver = useMemo(() => {
    if (!displayLocation || steps.length === 0 || currentStepIndex >= steps.length) return null;
    return haversineDistance(
      displayLocation[0], displayLocation[1],
      steps[currentStepIndex].location[0], steps[currentStepIndex].location[1]
    );
  }, [displayLocation, steps, currentStepIndex]);

  // ===== Status badge =====
  const statusMap: Record<string, { text: string; color: string; pulse: boolean }> = {
    idle: { text: "", color: "", pulse: false },
    locating: { text: "Locating you...", color: "bg-amber-500", pulse: true },
    routing: { text: "Calculating route...", color: "bg-blue-600", pulse: true },
    tracking: { text: "Live Tracking", color: "bg-emerald-500", pulse: true },
    rerouting: { text: "Rerouting...", color: "bg-amber-500", pulse: true },
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

        .map-rotation-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
        }

        .direction-panel {
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.15) transparent;
        }
        .direction-panel::-webkit-scrollbar { width: 4px; }
        .direction-panel::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }

        @keyframes step-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.3); }
          50% { box-shadow: 0 0 0 6px rgba(37,99,235,0); }
        }
        .active-step { animation: step-pulse 2s ease-in-out infinite; }

        @keyframes reroute-flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .reroute-flash { animation: reroute-flash 0.6s ease-in-out 3; }
      `}</style>

      {/* ===== HEADER ===== */}
      <div className="mb-6">
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
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md ${status.color} ${trackingStatus === "rerouting" ? "reroute-flash" : ""}`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full bg-white ${status.pulse ? "live-dot" : ""}`}
              />
              {status.text}
            </div>
          )}
        </div>


        {/* Off-route warning */}
        {isOffRoute && isTracking && (
          <div className="mb-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 rounded-xl p-3 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                Off route — recalculating...
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-500">
                Drive back to the highlighted route or a new one will be calculated
              </p>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {!isTracking ? (
            <Button
              size="lg"
              className="col-span-2 md:col-span-1 w-full gap-2 text-base font-semibold"
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
              className="w-full gap-2 text-base font-semibold"
              onClick={stopTracking}
            >
              <Locate className="h-5 w-5" />
              Stop Tracking
            </Button>
          )}

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
              {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              {audioEnabled ? "Audio ON" : "Audio OFF"}
            </Button>
          )}

          <Button
            size="lg"
            variant="outline"
            className="w-full gap-2"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/dir/?api=1&destination=26.20986098994172,78.1931633754292&travelmode=driving",
                "_blank"
              )
            }
          >
            <ExternalLink className="h-4 w-4" />
            Google Maps
          </Button>
        </div>

        {/* Route Stats */}
        {distanceRemaining && etaSeconds > 0 && (
          <div className="flex overflow-x-auto w-[100%] gap-3">
            <div className="bg-card shrink-0 rounded-xl border px-4 py-2 w-fit flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
                <Route className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  Remaining
                </p>
                <p className="text-lg font-bold text-foreground">{distanceRemaining}</p>
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
                <p className="text-lg font-bold text-foreground">{formatETA(etaSeconds)}</p>
              </div>
            </div>
            {speed > 0.5 && (
              <div className="bg-card rounded-xl shrink-0 border px-4 py-2 w-fit flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950">
                  <Gauge className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                    Speed
                  </p>
                  <p className="text-lg font-bold text-foreground">{formatSpeed(speed)}</p>
                </div>
              </div>
            )}
            <div className="bg-card rounded-xl border px-4 py-2 w-fit flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950">
                <MapPinned className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  To
                </p>
                <p className="text-sm font-bold text-foreground leading-tight">CogniCode Office</p>
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
            On desktop, location is approximate. For GPS accuracy, use your phone.
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
          <p className="text-emerald-600 text-sm mt-1">Welcome to CogniCode IT Solutions</p>
        </div>
      )}

      {/* ===== MAP ===== */}
      <div className="map-rotation-wrapper border border-border shadow-lg" style={{ height: 500 }}>
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
            targetPosition={displayLocation}
            officeCoords={OFFICE_COORDS}
            route={route}
            fitTrigger={fitTrigger}
            isTracking={isTracking}
            followUser={followUser}
            speed={speed}
          />

          {/* Office marker */}
          <Marker position={OFFICE_COORDS} icon={officeIcon}>
            <Tooltip permanent direction="right" offset={[12, -20]} className="office-label">
              <strong>CogniCode IT Solutions</strong>
            </Tooltip>
            <Popup>
              <div style={{ textAlign: "center", lineHeight: 1.5 }}>
                <strong style={{ fontSize: 14 }}>CogniCode IT Solutions</strong>
                <br />
                <span style={{ fontSize: 12, color: "#666" }}>
                  B/2, Mahesh Nagar, Tulsi Vihar Colony
                  <br />
                  Gwalior, MP 474002
                </span>
              </div>
            </Popup>
          </Marker>

          {/* GPS accuracy circle */}
          {displayLocation && accuracy && accuracy > 15 && (
            <Circle
              center={displayLocation}
              radius={accuracy}
              pathOptions={{
                color: "rgba(37,99,235,0.3)",
                fillColor: "rgba(37,99,235,0.08)",
                fillOpacity: 1,
                weight: 1,
              }}
            />
          )}

          {/* User marker with directional icon */}
          {displayLocation && (
            <Marker position={displayLocation} icon={currentUserIcon}>
              <Popup>
                <div style={{ textAlign: "center", lineHeight: 1.5 }}>
                  <strong style={{ fontSize: 14 }}>Your Location</strong>
                  <br />
                  <span style={{ fontSize: 11, color: "#666" }}>
                    {snappedLocation && !isOffRoute ? "Snapped to route" : "Raw GPS"}
                    {accuracy && ` • ±${Math.round(accuracy)}m`}
                    {speed > 0.5 && ` • ${formatSpeed(speed)}`}
                  </span>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Traveled route (gray) */}
          {traveledRoute.length > 1 && (
            <Polyline
              positions={traveledRoute}
              pathOptions={{
                color: "#9CA3AF",
                weight: 6,
                opacity: 0.5,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          )}

          {/* Remaining route (blue glow + solid) */}
          {remainingRoute.length > 1 && (
            <>
              <Polyline
                positions={remainingRoute}
                pathOptions={{
                  color: "#2563EB",
                  weight: 12,
                  opacity: 0.15,
                }}
              />
              <Polyline
                positions={remainingRoute}
                pathOptions={{
                  color: "#2563EB",
                  weight: 5,
                  opacity: 0.9,
                  lineCap: "round",
                  lineJoin: "round",
                }}
              />
            </>
          )}

          {/* If no split yet, show full route */}
          {traveledRoute.length === 0 && route.length > 0 && (
            <>
              <Polyline
                positions={route}
                pathOptions={{ color: "#2563EB", weight: 10, opacity: 0.15 }}
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

          {/* Maneuver point markers */}
          {steps
            .filter(
              (s, i) =>
                s.maneuverType !== "depart" &&
                s.maneuverType !== "arrive" &&
                i >= currentStepIndex // Only show upcoming turns
            )
            .map((step, i) => {
              const isNext = steps.indexOf(step) === currentStepIndex;
              const turnIcon = L.divIcon({
                className: "",
                html: `<div style="width:${isNext ? 14 : 10}px;height:${isNext ? 14 : 10}px;background:${isNext ? "#1D4ED8" : "#2563EB"};border:${isNext ? 3 : 2}px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.35)"></div>`,
                iconSize: [isNext ? 14 : 10, isNext ? 14 : 10],
                iconAnchor: [isNext ? 7 : 5, isNext ? 7 : 5],
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

        {/* Re-center button (floats over map) */}
        {isTracking && !followUser && (
          <button
            className="absolute bottom-4 right-4 z-[1000] bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setFollowUser(true)}
          >
            <LocateFixed className="h-5 w-5 text-blue-600" />
          </button>
        )}
      </div>

      {/* Accuracy info */}
      {isTracking && accuracy && (
        <p className="text-center text-xs text-muted-foreground mt-2">
          GPS accuracy: ±{Math.round(accuracy)}m
          {accuracy > 100 && " (low accuracy — try moving outdoors)"}
          {speed > 0.5 && ` • Speed: ${formatSpeed(speed)}`}
        </p>
      )}

      <p className="text-center text-xs text-muted-foreground mt-2">
        Route snaps to road • Auto-reroutes when off-track • Recalculates ETA in real-time
      </p>

      {/* Full directions list */}
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
                      ? "opacity-40"
                      : ""
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    i === currentStepIndex
                      ? "bg-blue-600 text-white"
                      : i < currentStepIndex
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-400"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < currentStepIndex ? (
                    <CheckCircle size={16} className="text-gray-400" />
                  ) : (
                    <DirectionIcon type={step.maneuverType} modifier={step.maneuverModifier} size={16} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm truncate ${
                      i === currentStepIndex
                        ? "font-bold text-blue-700 dark:text-blue-300"
                        : i < currentStepIndex
                          ? "text-gray-400 line-through"
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
                {i === currentStepIndex && distToNextManeuver !== null && (
                  <span className="text-xs font-bold text-blue-600 shrink-0">
                    {formatDist(distToNextManeuver)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </details>
      )}
    </>
  );
}