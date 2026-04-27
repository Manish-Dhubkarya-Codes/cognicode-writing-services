"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  MapPin, CheckCircle, Navigation, ExternalLink, Locate,
  Route, Timer, MapPinned, Volume2, VolumeX, ArrowUp,
  CornerUpLeft, CornerUpRight, ArrowUpLeft, ArrowUpRight,
  RotateCcw, RotateCw, MoveUp, Milestone, Gauge, AlertTriangle,
  LocateFixed, Car, Compass, X, ChevronDown, ChevronUp,
} from "lucide-react";
import {
  MapContainer, TileLayer, Marker, Popup, Polyline,
  useMap, Tooltip, Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ─── Fix Leaflet default icons ───────────────────────────────────────────────
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ─── Custom Icons ─────────────────────────────────────────────────────────────
const officeIcon = L.divIcon({
  className: "",
  html: `<div style="filter:drop-shadow(0 4px 8px rgba(0,0,0,0.4))">
    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C9 0 0 9 0 20c0 14 20 30 20 30s20-16 20-30C40 9 31 0 20 0z" fill="#EF4444"/>
      <circle cx="20" cy="19" r="11" fill="white"/>
      <rect x="14" y="13" width="12" height="12" rx="2" fill="#EF4444"/>
      <rect x="16" y="15" width="3" height="3" rx="0.5" fill="white"/>
      <rect x="21" y="15" width="3" height="3" rx="0.5" fill="white"/>
      <rect x="18" y="20" width="4" height="5" rx="0.5" fill="white"/>
    </svg>
  </div>`,
  iconSize: [40, 50], iconAnchor: [20, 50], popupAnchor: [0, -52],
});

function createUserIcon(heading: number | null, driveMode: boolean) {
  const rotation = heading !== null && heading >= 0 ? heading : 0;
  const showArrow = heading !== null && heading >= 0;

  if (driveMode) {
    return L.divIcon({
      className: "",
      html: `<div style="position:relative;width:64px;height:64px;display:flex;align-items:center;justify-content:center">
        <div style="position:absolute;width:64px;height:64px;border-radius:50%;background:rgba(37,99,235,0.10);animation:gps-ring 2s ease-out infinite"></div>
        <div style="position:absolute;width:42px;height:42px;border-radius:50%;background:rgba(37,99,235,0.18);animation:gps-ring 2s ease-out infinite 0.5s"></div>
        <div style="position:absolute;z-index:9;width:46px;height:46px;">
          <svg viewBox="0 0 46 46" style="width:100%;height:100%;filter:drop-shadow(0 3px 8px rgba(0,0,0,0.4))">
            <path d="M23 4 L38 28 L23 22 L8 28 Z" fill="#2563EB" stroke="white" stroke-width="2.5" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>`,
      iconSize: [64, 64], iconAnchor: [32, 32], popupAnchor: [0, -32],
    });
  }

  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:52px;height:52px;display:flex;align-items:center;justify-content:center">
      <div style="position:absolute;width:52px;height:52px;border-radius:50%;background:rgba(37,99,235,0.10);animation:gps-ring 2s ease-out infinite"></div>
      <div style="position:absolute;width:34px;height:34px;border-radius:50%;background:rgba(37,99,235,0.18);animation:gps-ring 2s ease-out infinite 0.5s"></div>
      ${showArrow ? `<div style="position:absolute;width:36px;height:36px;transform:rotate(${rotation}deg);z-index:9">
        <svg viewBox="0 0 36 36" style="width:100%;height:100%">
          <path d="M18 2 L26 16 L18 12 L10 16 Z" fill="rgba(37,99,235,0.55)" stroke="rgba(37,99,235,0.85)" stroke-width="1"/>
        </svg>
      </div>` : ""}
      <div style="width:18px;height:18px;border-radius:50%;background:#2563EB;border:3px solid white;box-shadow:0 0 0 2px rgba(37,99,235,0.35),0 2px 8px rgba(0,0,0,0.3);position:relative;z-index:10"></div>
    </div>`,
    iconSize: [52, 52], iconAnchor: [26, 26], popupAnchor: [0, -26],
  });
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  maneuverType: string;
  maneuverModifier: string;
  name: string;
  location: [number, number];
}

// ─── Geometry Utilities ───────────────────────────────────────────────────────
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(radLat2);
  const x = Math.cos(radLat1) * Math.sin(radLat2) - Math.sin(radLat1) * Math.cos(radLat2) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function snapToRoute(lat: number, lng: number, route: [number, number][]): {
  point: [number, number]; segmentIndex: number; distanceFromRoute: number; distanceAlongRoute: number;
} {
  if (route.length < 2) return { point: route[0] || [lat, lng], segmentIndex: 0, distanceFromRoute: 0, distanceAlongRoute: 0 };

  let minDist = Infinity, bestPoint: [number, number] = route[0], bestSegIdx = 0, bestFraction = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const [aLat, aLng] = route[i]; const [bLat, bLng] = route[i + 1];
    const dx = bLng - aLng; const dy = bLat - aLat; const lenSq = dx * dx + dy * dy;
    let t = 0;
    if (lenSq > 0) { t = Math.max(0, Math.min(1, ((lng - aLng) * dx + (lat - aLat) * dy) / lenSq)); }
    const projLat = aLat + t * dy; const projLng = aLng + t * dx;
    const d = haversineDistance(lat, lng, projLat, projLng);
    if (d < minDist) { minDist = d; bestPoint = [projLat, projLng]; bestSegIdx = i; bestFraction = t; }
  }
  let distAlong = 0;
  for (let i = 0; i < bestSegIdx; i++) distAlong += haversineDistance(route[i][0], route[i][1], route[i + 1][0], route[i + 1][1]);
  distAlong += haversineDistance(route[bestSegIdx][0], route[bestSegIdx][1], route[bestSegIdx + 1][0], route[bestSegIdx + 1][1]) * bestFraction;
  return { point: bestPoint, segmentIndex: bestSegIdx, distanceFromRoute: minDist, distanceAlongRoute: distAlong };
}

function smoothHeading(current: number | null, target: number, alpha = 0.3): number {
  if (current === null) return target;
  let diff = target - current;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return (((current + diff * alpha) % 360) + 360) % 360;
}

// Shortest signed angular distance from a -> b in degrees, in [-180, 180]
function angleDelta(a: number, b: number): number {
  let d = ((b - a + 540) % 360) - 180;
  return d;
}

// ─── Instruction Builder ──────────────────────────────────────────────────────
function buildInstruction(step: any): string {
  const type = step.maneuver?.type || ""; const modifier = step.maneuver?.modifier || "";
  const name = step.name || ""; const roadRef = name ? ` onto ${name}` : "";
  switch (type) {
    case "depart": return `Head ${modifier || "straight"}${roadRef}`;
    case "arrive": return modifier === "left" ? "Destination on the left" : modifier === "right" ? "Destination on the right" : "You have arrived";
    case "turn": return `Turn ${modifier}${roadRef}`;
    case "new name": return `Continue${roadRef}`;
    case "merge": return `Merge ${modifier}${roadRef}`;
    case "on ramp": return `Take the ramp${roadRef}`;
    case "off ramp": return `Take the exit${roadRef}`;
    case "fork": return `Keep ${modifier} at the fork${roadRef}`;
    case "end of road": return `Turn ${modifier}${roadRef}`;
    case "continue": return `Continue${roadRef}`;
    case "roundabout": case "rotary": {
      const exit = step.maneuver?.exit;
      return exit ? `Take the ${ordinal(exit)} exit at roundabout${roadRef}` : `Enter the roundabout${roadRef}`;
    }
    default: return modifier ? `${modifier.charAt(0).toUpperCase() + modifier.slice(1)}${roadRef}` : `Continue${roadRef}`;
  }
}
function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"]; const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ─── Direction Icon ───────────────────────────────────────────────────────────
function DirectionIcon({ type, modifier, size = 20, className = "", color }: { type: string; modifier: string; size?: number; className?: string; color?: string }) {
  const props = { size, className, color };
  if (type === "arrive") return <CheckCircle {...props} />;
  if (type === "depart") return <MoveUp {...props} />;
  if (type === "roundabout" || type === "rotary") return <RotateCw {...props} />;
  switch (modifier) {
    case "left": return <CornerUpLeft {...props} />;
    case "right": return <CornerUpRight {...props} />;
    case "sharp left": return <RotateCcw {...props} />;
    case "sharp right": return <RotateCw {...props} />;
    case "slight left": return <ArrowUpLeft {...props} />;
    case "slight right": return <ArrowUpRight {...props} />;
    case "uturn": return <RotateCcw {...props} />;
    default: return <ArrowUp {...props} />;
  }
}

// ─── Format Helpers ───────────────────────────────────────────────────────────
function fmtDist(m: number) { return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`; }
function fmtSpeed(mps: number) { return `${Math.round(mps * 3.6)}`; }
function fmtETA(s: number) {
  const h = Math.floor(s / 3600); const m = Math.round((s % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m} min`;
}
function fmtArrival(s: number) {
  const d = new Date(Date.now() + s * 1000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAP CONTROLLER — handles rotation, follow, fit-bounds, and pan detection
// ═══════════════════════════════════════════════════════════════════════════════
function MapController({
  targetPosition, officeCoords, route, fitTrigger,
  isTracking, followUser, speed, driveMode, mapRotation,
  isUserGesturing, onUserPan,
}: {
  targetPosition: [number, number] | null; officeCoords: [number, number];
  route: [number, number][]; fitTrigger: number; isTracking: boolean;
  followUser: boolean; speed: number; driveMode: boolean; mapRotation: number;
  isUserGesturing: boolean; onUserPan: () => void;
}) {
  const map = useMap();
  const lastAppliedRotRef = useRef(0);
  const tilesPatchedRef = useRef(false);

  // ════════════════════════════════════════════════════════════════════════
  // TILE BUFFER PATCH — fixes gray corners during rotation.
  //
  // Leaflet only loads tiles for the unrotated visible rectangle. When the
  // map rotates, the corners of the visible area extend beyond that rectangle
  // and show as gray. We override `_getTiledPixelBounds` on every TileLayer
  // to load 50% extra tiles in every direction, which is enough to cover
  // any rotation up to ~60° with no visible gaps.
  // ════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (tilesPatchedRef.current) return;
    let patched = false;
    map.eachLayer((layer) => {
      const tl = layer as any;
      if (tl && typeof tl._getTiledPixelBounds === "function" && !tl._rotationBufferPatched) {
        const orig = tl._getTiledPixelBounds.bind(tl);
        tl._getTiledPixelBounds = function (center: any) {
          const b = orig(center);
          const w = b.max.x - b.min.x;
          const h = b.max.y - b.min.y;
          // 50% extra on each side handles rotations up to ~60° without gray corners.
          // sqrt(2) ≈ 1.41 covers a 45° rotation; we add headroom.
          const padX = w * 0.5;
          const padY = h * 0.5;
          return new (L as any).Bounds(
            new (L as any).Point(b.min.x - padX, b.min.y - padY),
            new (L as any).Point(b.max.x + padX, b.max.y + padY)
          );
        };
        tl._rotationBufferPatched = true;
        if (typeof tl.redraw === "function") tl.redraw();
        patched = true;
      }
    });
    if (patched) tilesPatchedRef.current = true;
  }, [map]);

  // ── Apply rotation to Leaflet panes
  // tilePane + overlayPane rotate; markerPane/shadowPane/popup/tooltip counter-rotate
  // so markers + labels stay upright.
  //
  // SMOOTHNESS: during user gestures (touch / mouse-drag / heading-lock active updates),
  // we apply rotation immediately with no transition for snappy feedback. Between GPS-driven
  // heading updates we use a short CSS transition for buttery smoothness as the bearing
  // shifts gradually.
  useEffect(() => {
    const panes = map.getPanes() as Record<string, HTMLElement>;
    const size = map.getSize();
    const cx = size.x / 2; const cy = size.y / 2;
    const origin = `${cx}px ${cy}px`;
    const rot = -mapRotation;
    const counterRot = mapRotation;

    // Decide whether to use a transition. During active gesture: instant (snappy).
    // Otherwise: smooth easing for heading updates and snap-backs.
    const delta = Math.abs(angleDelta(lastAppliedRotRef.current, mapRotation));
    const useTransition = !isUserGesturing && delta > 0.1 && delta < 120;
    const transitionStr = useTransition
      ? "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "transform 0s";

    for (const paneName of ["tilePane", "overlayPane"]) {
      const pane = panes[paneName];
      if (!pane) continue;
      pane.style.willChange = "transform";
      pane.style.transformOrigin = origin;
      pane.style.transition = transitionStr;
      pane.style.transform = rot !== 0
        ? `translateZ(0) rotate(${rot}deg)`
        : "translateZ(0)";
    }

    for (const paneName of ["markerPane", "shadowPane", "tooltipPane", "popupPane"]) {
      const pane = panes[paneName];
      if (!pane) continue;
      pane.style.willChange = "transform";
      pane.style.transformOrigin = origin;
      pane.style.transition = transitionStr;
      pane.style.transform = counterRot !== 0
        ? `translateZ(0) rotate(${counterRot}deg)`
        : "translateZ(0)";
    }

    lastAppliedRotRef.current = mapRotation;
  }, [mapRotation, isUserGesturing, map]);

  // ── Reset pane transforms on unmount
  useEffect(() => {
    return () => {
      const panes = map.getPanes() as Record<string, HTMLElement>;
      for (const paneName of ["tilePane", "overlayPane", "markerPane", "shadowPane", "tooltipPane", "popupPane"]) {
        const pane = panes[paneName];
        if (pane) {
          pane.style.transform = "";
          pane.style.transformOrigin = "";
          pane.style.transition = "";
          pane.style.willChange = "";
        }
      }
    };
  }, [map]);

  // ── Detect user pan/drag to disable follow mode
  useEffect(() => {
    const onDragStart = () => { onUserPan(); };
    map.on("dragstart", onDragStart);
    return () => { map.off("dragstart", onDragStart); };
  }, [map, onUserPan]);

  // ── Fit bounds when route loads
  useEffect(() => {
    if (targetPosition && route.length > 0 && fitTrigger > 0 && !driveMode) {
      const bounds = L.latLngBounds([targetPosition, officeCoords]);
      route.forEach((c) => bounds.extend(c));
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitTrigger]);

  // ── Follow user
  useEffect(() => {
    if (!targetPosition || !followUser) return;
    if (isTracking) {
      const kmh = speed * 3.6;
      const zoom = driveMode ? 18 : kmh > 60 ? 15 : kmh > 30 ? 16 : kmh > 10 ? 17 : 17.5;
      map.setView(targetPosition, zoom, { animate: true, duration: 0.7 });
    }
  }, [targetPosition, isTracking, followUser, speed, driveMode, map]);

  return null;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const OFFICE_COORDS: [number, number] = [26.20986098994172, 78.1931633754292];
const ARRIVAL_THRESHOLD_M = 100;
const OFF_ROUTE_THRESHOLD_M = 50;
const REROUTE_COOLDOWN_MS = 8000;
const STEP_ADVANCE_RADIUS_M = 30;
const MANUAL_ROTATION_RESUME_MS = 6000;

const STATUS_CONFIG = {
  idle: { text: "", color: "", pulse: false },
  locating: { text: "Locating…", color: "#F59E0B", pulse: true },
  routing: { text: "Calculating route…", color: "#3B82F6", pulse: true },
  tracking: { text: "Live Tracking", color: "#10B981", pulse: true },
  rerouting: { text: "Rerouting…", color: "#F59E0B", pulse: true },
  arrived: { text: "Arrived!", color: "#10B981", pulse: false },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function LiveTrackingMap() {
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
  const [smoothedHeading, setSmoothedHeading] = useState<number | null>(null);
  const [followUser, setFollowUser] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [isOffRoute, setIsOffRoute] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState<
    "idle" | "locating" | "routing" | "tracking" | "rerouting" | "arrived"
  >("idle");
  const [driveMode, setDriveMode] = useState(false);
  const [mapRotation, setMapRotation] = useState(0);
  const [isUserGesturing, setIsUserGesturing] = useState(false); // touch or mouse rotate active
  const [manualRotationActive, setManualRotationActive] = useState(false); // drive-mode override
  const [stepsExpanded, setStepsExpanded] = useState(false);

  const watchIdRef = useRef<number | null>(null);
  const lastRouteFetchRef = useRef<number>(0);
  const spokenStepsRef = useRef<Set<string>>(new Set());
  const routeDataRef = useRef({ distance: 0, duration: 0 });
  const stepsRef = useRef<RouteStep[]>([]);
  const routeRef = useRef<[number, number][]>([]);
  const currentStepRef = useRef(0);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const manualRotationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Gesture refs — using refs avoids re-binding listeners during interaction
  // We accumulate per-frame deltas (NOT delta from initial) so rotation past
  // 180° works cleanly without wraparound. This is what makes Google Maps feel
  // continuous — your fingers can spin freely and the map follows turn-for-turn.
  const gestureRef = useRef({
    active: false,
    startRotation: 0,    // mapRotation at gesture start
    prevAngle: 0,        // angle between the two fingers from the previous frame
    accumulatedDelta: 0, // total angular distance the fingers have swept
  });
  const mouseGestureRef = useRef({ active: false, startX: 0, startRot: 0 });

  useEffect(() => { stepsRef.current = steps; }, [steps]);
  useEffect(() => { routeRef.current = route; }, [route]);
  useEffect(() => { currentStepRef.current = currentStepIndex; }, [currentStepIndex]);

  // ── Trigger manual rotation override (drive mode only)
  const triggerManualRotationOverride = useCallback(() => {
    if (!driveMode) return;
    setManualRotationActive(true);
    if (manualRotationTimeoutRef.current) clearTimeout(manualRotationTimeoutRef.current);
    manualRotationTimeoutRef.current = setTimeout(() => {
      setManualRotationActive(false);
    }, MANUAL_ROTATION_RESUME_MS);
  }, [driveMode]);

  // ════════════════════════════════════════════════════════════════════════
  //  TWO-FINGER ROTATION (Google Maps style)
  //
  //  KEY FIX: We accumulate the angular delta PER FRAME, not from the gesture's
  //  initial angle. The previous (broken) approach computed `delta = currentAngle
  //  - initialAngle` and applied a single ±180° wrap fix, which works only for
  //  rotations ≤ 180°. Past that threshold the math wrapped backward and the
  //  map snapped — that's what made it feel "broken" before.
  //
  //  By comparing each frame to the previous frame and summing, the per-frame
  //  delta is always tiny (< a few degrees), so the wrap fix always works and
  //  total rotation accumulates without bound. Spin your fingers as much as
  //  you want; the map tracks 1:1.
  //
  //  Listeners are passive so they don't fight Leaflet's pinch-zoom — you can
  //  rotate AND zoom simultaneously, exactly like Google Maps.
  // ════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    const getAngleBetween = (t1: Touch, t2: Touch): number => {
      // atan2 returns angle in degrees, full -180 to 180 range
      return (Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * 180) / Math.PI;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const startAngle = getAngleBetween(t1, t2);
        gestureRef.current = {
          active: true,
          startRotation: mapRotation,
          prevAngle: startAngle,
          accumulatedDelta: 0,
        };
        setIsUserGesturing(true);
        triggerManualRotationOverride();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && gestureRef.current.active) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const angle = getAngleBetween(t1, t2);

        // Per-frame delta (always small, so wraparound is bulletproof)
        let frameDelta = angle - gestureRef.current.prevAngle;
        if (frameDelta > 180) frameDelta -= 360;
        if (frameDelta < -180) frameDelta += 360;

        gestureRef.current.accumulatedDelta += frameDelta;
        gestureRef.current.prevAngle = angle;

        // Subtract because turning fingers clockwise rotates the world CCW
        // (the map appears to twist opposite to your hand direction)
        const newRot = gestureRef.current.startRotation - gestureRef.current.accumulatedDelta;
        setMapRotation(((newRot % 360) + 360) % 360);
      } else if (e.touches.length < 2 && gestureRef.current.active) {
        // One finger lifted mid-gesture — end rotation but keep current state
        gestureRef.current.active = false;
        setIsUserGesturing(false);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2 && gestureRef.current.active) {
        gestureRef.current.active = false;
        setIsUserGesturing(false);
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [mapRotation, triggerManualRotationOverride]);

  // ── Mouse rotation (desktop): right-click drag OR Alt + Left-click drag
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 2 || (e.button === 0 && e.altKey)) {
        e.preventDefault();
        e.stopPropagation();
        mouseGestureRef.current = { active: true, startX: e.clientX, startRot: mapRotation };
        setIsUserGesturing(true);
        triggerManualRotationOverride();
        document.body.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!mouseGestureRef.current.active) return;
      e.preventDefault();
      const delta = (e.clientX - mouseGestureRef.current.startX) * 0.5;
      setMapRotation((((mouseGestureRef.current.startRot + delta) % 360) + 360) % 360);
    };
    const onMouseUp = () => {
      if (mouseGestureRef.current.active) {
        mouseGestureRef.current.active = false;
        setIsUserGesturing(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("contextmenu", onContextMenu);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("contextmenu", onContextMenu);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [mapRotation, triggerManualRotationOverride]);

  // ── Auto-rotate in drive mode (paused while user is manually rotating or has overridden)
  useEffect(() => {
    if (driveMode && smoothedHeading !== null && !isUserGesturing && !manualRotationActive) {
      setMapRotation(smoothedHeading);
    }
  }, [driveMode, smoothedHeading, isUserGesturing, manualRotationActive]);

  // ── Cleanup the manual-rotation timeout on unmount
  useEffect(() => () => {
    if (manualRotationTimeoutRef.current) clearTimeout(manualRotationTimeoutRef.current);
  }, []);

  // ── Voice
  const speak = useCallback((text: string, priority = false) => {
    if (!audioEnabled && !priority) return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-IN"; u.rate = 0.95; u.pitch = 1.05; u.volume = 1;
    window.speechSynthesis.speak(u);
  }, [audioEnabled]);

  const announceStep = useCallback((stepIdx: number, distToManeuver: number, isReroute = false) => {
    const localSteps = stepsRef.current;
    if (stepIdx >= localSteps.length) return;
    if (isReroute) { speak("Rerouting.", true); return; }
    const step = localSteps[stepIdx];
    for (const t of [
      { dist: 500, key: `${stepIdx}-500`, prefix: "In 500 meters" },
      { dist: 200, key: `${stepIdx}-200`, prefix: "In 200 meters" },
      { dist: 100, key: `${stepIdx}-100`, prefix: "In 100 meters" },
      { dist: 40, key: `${stepIdx}-now`, prefix: "" },
    ]) {
      if (distToManeuver <= t.dist && !spokenStepsRef.current.has(t.key)) {
        spokenStepsRef.current.add(t.key);
        speak(t.prefix ? `${t.prefix}, ${step.instruction}` : step.instruction);
        break;
      }
    }
  }, [speak]);

  const processLocationUpdate = useCallback((
    loc: [number, number], currentRoute: [number, number][], currentSteps: RouteStep[]
  ) => {
    if (currentRoute.length < 2) return;
    const snap = snapToRoute(loc[0], loc[1], currentRoute);
    setSnappedLocation(snap.point);
    setIsOffRoute(snap.distanceFromRoute > OFF_ROUTE_THRESHOLD_M);
    const segIdx = snap.segmentIndex;
    setTraveledRoute(currentRoute.slice(0, segIdx + 1).concat([snap.point]));
    setRemainingRoute([snap.point].concat(currentRoute.slice(segIdx + 1)));
    if (segIdx < currentRoute.length - 1) {
      const bearing = calculateBearing(currentRoute[segIdx][0], currentRoute[segIdx][1], currentRoute[segIdx + 1][0], currentRoute[segIdx + 1][1]);
      setSmoothedHeading((prev) => smoothHeading(prev, bearing, 0.25));
    }
    if (currentSteps.length > 0) {
      let newIdx = currentStepRef.current;
      for (let i = currentStepRef.current; i < currentSteps.length; i++) {
        if (haversineDistance(snap.point[0], snap.point[1], currentSteps[i].location[0], currentSteps[i].location[1]) < STEP_ADVANCE_RADIUS_M && i < currentSteps.length - 1)
          newIdx = i + 1;
        else break;
      }
      setCurrentStepIndex(newIdx);
      if (newIdx < currentSteps.length)
        announceStep(newIdx, haversineDistance(snap.point[0], snap.point[1], currentSteps[newIdx].location[0], currentSteps[newIdx].location[1]));
    }
    const { distance, duration } = routeDataRef.current;
    if (distance > 0) {
      const frac = Math.min(snap.distanceAlongRoute / distance, 1);
      setDistanceRemaining(fmtDist(distance * (1 - frac)));
      setEtaSeconds(duration * (1 - frac));
    }
  }, [announceStep]);

  const fetchRoute = useCallback(async (from: [number, number], forceReroute = false): Promise<boolean> => {
    const now = Date.now();
    if (now - lastRouteFetchRef.current < (forceReroute ? REROUTE_COOLDOWN_MS : 10000)) return false;
    lastRouteFetchRef.current = now;
    if (forceReroute) setTrackingStatus("rerouting");
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${OFFICE_COORDS[1]},${OFFICE_COORDS[0]}?overview=full&geometries=geojson&steps=true`;
      const data = await (await fetch(url)).json();
      if (data.code === "Ok" && data.routes?.[0]) {
        const rd = data.routes[0];
        const coords: [number, number][] = rd.geometry.coordinates.map((c: number[]) => [c[1], c[0]] as [number, number]);
        setRoute(coords); routeRef.current = coords;
        const allSteps: RouteStep[] = [];
        for (const leg of rd.legs)
          for (const step of leg.steps)
            allSteps.push({
              instruction: buildInstruction(step), distance: step.distance, duration: step.duration,
              maneuverType: step.maneuver?.type || "", maneuverModifier: step.maneuver?.modifier || "",
              name: step.name || "", location: [step.maneuver.location[1], step.maneuver.location[0]],
            });
        setSteps(allSteps); stepsRef.current = allSteps;
        routeDataRef.current = { distance: rd.distance, duration: rd.duration };
        setDistanceRemaining(fmtDist(rd.distance)); setEtaSeconds(rd.duration);
        if (forceReroute) { setCurrentStepIndex(0); currentStepRef.current = 0; spokenStepsRef.current.clear(); announceStep(-1, 0, true); }
        setFitTrigger((p) => p + 1); setTrackingStatus("tracking"); setIsOffRoute(false);
        processLocationUpdate(from, coords, allSteps);
        if (haversineDistance(from[0], from[1], OFFICE_COORDS[0], OFFICE_COORDS[1]) < ARRIVAL_THRESHOLD_M) {
          setTrackingStatus("arrived"); speak("You have arrived at CogniCode IT Solutions. Welcome!", true);
          if (watchIdRef.current !== null) { navigator.geolocation.clearWatch(watchIdRef.current); watchIdRef.current = null; }
          setIsTracking(false);
        }
        return true;
      }
    } catch { }
    return false;
  }, [speak, announceStep, processLocationUpdate]);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) { setLocationError("Geolocation not supported."); return; }
    setIsLoadingLocation(true); setLocationError(""); setTrackingStatus("locating");
    spokenStepsRef.current.clear(); setCurrentStepIndex(0); currentStepRef.current = 0;
    setIsOffRoute(false); setFollowUser(true);
    let initialRouteFetched = false;
    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setRawUserLocation(loc);
        if (pos.coords.speed !== null && pos.coords.speed >= 0) setSpeed(pos.coords.speed);
        if (pos.coords.accuracy !== null) setAccuracy(pos.coords.accuracy);
        setIsLoadingLocation(false); setIsTracking(true);
        if (!initialRouteFetched) {
          setTrackingStatus("routing");
          speak("Route found. Starting navigation.", true);
          if (await fetchRoute(loc)) initialRouteFetched = true;
        } else {
          processLocationUpdate(loc, routeRef.current, stepsRef.current);
          if ((snapToRoute(loc[0], loc[1], routeRef.current)).distanceFromRoute > OFF_ROUTE_THRESHOLD_M)
            await fetchRoute(loc, true);
          else if (Date.now() - lastRouteFetchRef.current > 30000)
            await fetchRoute(loc);
        }
      },
      (err) => {
        setIsLoadingLocation(false); setIsTracking(false); setTrackingStatus("idle");
        setLocationError(err.code === err.PERMISSION_DENIED
          ? "Location access denied. Enable location in your browser settings."
          : err.code === err.POSITION_UNAVAILABLE
          ? "Location unavailable. Check your GPS or network."
          : "Location request timed out. Please try again.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
    );
  }, [fetchRoute, processLocationUpdate, speak]);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) { navigator.geolocation.clearWatch(watchIdRef.current); watchIdRef.current = null; }
    window.speechSynthesis?.cancel();
    setIsTracking(false); setIsOffRoute(false); setDriveMode(false); setMapRotation(0);
    setManualRotationActive(false);
    if (manualRotationTimeoutRef.current) clearTimeout(manualRotationTimeoutRef.current);
    setTrackingStatus((p) => p === "arrived" ? "arrived" : "idle");
  }, []);

  useEffect(() => () => {
    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    window.speechSynthesis?.cancel();
  }, []);

  const toggleDriveMode = useCallback(() => {
    setDriveMode((prev) => {
      if (!prev) { setFollowUser(true); return true; }
      setMapRotation(0);
      setManualRotationActive(false);
      if (manualRotationTimeoutRef.current) clearTimeout(manualRotationTimeoutRef.current);
      return false;
    });
  }, []);

  const handleRecenter = useCallback(() => {
    setFollowUser(true);
    if (!driveMode) {
      setMapRotation(0);
    } else {
      setManualRotationActive(false);
      if (manualRotationTimeoutRef.current) clearTimeout(manualRotationTimeoutRef.current);
    }
  }, [driveMode]);

  const handleResetNorth = useCallback(() => {
    setMapRotation(0);
    if (driveMode) {
      setManualRotationActive(true); // Pause auto-rotation when user explicitly resets to north in drive
      if (manualRotationTimeoutRef.current) clearTimeout(manualRotationTimeoutRef.current);
      manualRotationTimeoutRef.current = setTimeout(() => {
        setManualRotationActive(false);
      }, MANUAL_ROTATION_RESUME_MS);
    }
  }, [driveMode]);

  const displayLocation = useMemo(() => {
    if (isOffRoute || !snappedLocation) return rawUserLocation;
    return snappedLocation;
  }, [rawUserLocation, snappedLocation, isOffRoute]);

  const currentUserIcon = useMemo(() => createUserIcon(driveMode ? null : smoothedHeading, driveMode), [smoothedHeading, driveMode]);

  const currentStep = useMemo(() => steps[currentStepIndex] ?? null, [steps, currentStepIndex]);
  const nextStep = useMemo(() => steps[currentStepIndex + 1] ?? null, [steps, currentStepIndex]);

  const distToNextManeuver = useMemo(() => {
    if (!displayLocation || !currentStep) return null;
    return haversineDistance(displayLocation[0], displayLocation[1], currentStep.location[0], currentStep.location[1]);
  }, [displayLocation, currentStep]);

  const statusCfg = STATUS_CONFIG[trackingStatus];

  return (
    <>
      {/* ── Global Styles ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@500;600&display=swap');

        .nav-root * { font-family: 'DM Sans', system-ui, sans-serif; box-sizing: border-box; }
        .nav-mono { font-family: 'DM Mono', monospace !important; }

        @keyframes gps-ring { 0% { transform:scale(0.5);opacity:1 } 100% { transform:scale(2.2);opacity:0 } }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
        @keyframes slide-up { from { transform:translateY(12px);opacity:0 } to { transform:translateY(0);opacity:1 } }
        @keyframes slide-down { from { transform:translateY(-12px);opacity:0 } to { transform:translateY(0);opacity:1 } }
        @keyframes fade-in { from { opacity:0 } to { opacity:1 } }
        @keyframes pulse-recenter {
          0%, 100% { box-shadow: 0 4px 16px rgba(37,99,235,0.45), 0 0 0 0 rgba(37,99,235,0.45); }
          50% { box-shadow: 0 4px 16px rgba(37,99,235,0.45), 0 0 0 14px rgba(37,99,235,0); }
        }
        @keyframes fab-pop { from { transform:scale(0.6);opacity:0 } to { transform:scale(1);opacity:1 } }

        .live-dot { animation: blink 1.4s ease-in-out infinite; }
        .slide-up { animation: slide-up 0.3s ease-out both; }
        .slide-down { animation: slide-down 0.3s ease-out both; }
        .fade-in { animation: fade-in 0.25s ease-out both; }

        /* Leaflet overrides */
        .leaflet-container { font-family: 'DM Sans', system-ui, sans-serif !important; z-index: 0; background: #e5eaf0; }
        .leaflet-popup-content-wrapper { border-radius: 14px !important; box-shadow: 0 8px 32px rgba(0,0,0,0.18) !important; border: 1px solid rgba(0,0,0,0.06) !important; }
        .leaflet-popup-content { margin: 12px 16px !important; font-family: 'DM Sans', system-ui, sans-serif !important; }

        /* GPU layer for tile pane — improves rotation smoothness */
        .leaflet-tile-pane,
        .leaflet-overlay-pane,
        .leaflet-marker-pane,
        .leaflet-shadow-pane,
        .leaflet-tooltip-pane,
        .leaflet-popup-pane {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Map container */
        .map-wrap {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1.5px solid rgba(0,0,0,0.08);
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          background: #e8edf2;
          width: 100%;
          touch-action: pan-x pan-y;
        }
        .map-wrap.drive-mode {
          position: fixed !important;
          inset: 0 !important;
          border-radius: 0 !important;
          border: none !important;
          z-index: 9000 !important;
          height: 100dvh !important;
          touch-action: none;
        }

        /* HUD overlay */
        .hud-layer { position: absolute; inset: 0; pointer-events: none; z-index: 1000; }
        .hud-layer > * { pointer-events: auto; }

        /* Scrollbar */
        .steps-scroll { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.12) transparent; }
        .steps-scroll::-webkit-scrollbar { width: 4px; }
        .steps-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }

        /* Info cards */
        .info-card {
          background: white;
          border: 1.5px solid rgba(0,0,0,0.07);
          border-radius: 14px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          padding: 12px 16px;
          display: flex; align-items: center; gap: 12px;
          flex-shrink: 0;
        }
        @media (prefers-color-scheme: dark) {
          .info-card { background:#1e293b; border-color:rgba(255,255,255,0.08); }
        }

        /* Drive HUD glass */
        .drive-glass {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1.5px solid rgba(255,255,255,0.8);
        }
        @media (prefers-color-scheme: dark) {
          .drive-glass { background:rgba(15,23,42,0.96); border-color:rgba(255,255,255,0.08); }
        }

        .status-badge {
          display: flex; align-items: center; gap: 7px;
          padding: 6px 14px 6px 10px; border-radius: 100px;
          font-size: 13px; font-weight: 600; color: white; line-height: 1;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }

        /* Buttons */
        .nav-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          border-radius: 12px; font-weight: 600; font-size: 14px; cursor: pointer;
          transition: all 0.15s ease; border: none; padding: 0 18px; height: 44px; white-space: nowrap;
        }
        .nav-btn:active { transform: scale(0.97); }
        .btn-primary { background: #2563EB; color: white; }
        .btn-primary:hover { background: #1d4ed8; }
        .btn-danger { background: #EF4444; color: white; }
        .btn-danger:hover { background: #dc2626; }
        .btn-ghost { background: white; color: #374151; border: 1.5px solid rgba(0,0,0,0.1); }
        .btn-ghost:hover { background: #f9fafb; }
        .btn-ghost.active { background: #EFF6FF; color: #2563EB; border-color: #BFDBFE; }

        /* ───────────────────────────────────────────────────────────────────
           DRIVE MODE — Redesigned panels with safe-area support
        ─────────────────────────────────────────────────────────────────── */
        .drive-instruction-panel {
          position: absolute;
          top: calc(env(safe-area-inset-top, 0px) + 12px);
          left: 12px; right: 12px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.10);
        }
        .drive-instruction-main {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: stretch;
          background: linear-gradient(135deg, #1e40af, #2563EB);
        }
        .drive-instruction-icon-col {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 18px 20px;
          min-width: 100px;
          gap: 4px;
        }
        .drive-instruction-icon-col .dist {
          font-size: 16px;
          font-weight: 600;
          color: rgba(255,255,255,0.95);
          margin-top: 4px;
          letter-spacing: -0.01em;
        }
        .drive-instruction-text-col {
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          background: white;
        }
        .drive-instruction-text-col h3 {
          margin: 0;
          font-size: 19px;
          font-weight: 700;
          line-height: 1.25;
          color: #0F172A;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .drive-instruction-text-col p {
          margin: 4px 0 0;
          font-size: 13px;
          color: #64748B;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .drive-instruction-next {
          background: rgba(248, 250, 255, 0.97);
          backdrop-filter: blur(16px);
          border-top: 1.5px solid rgba(37,99,235,0.10);
          padding: 10px 18px;
          display: flex; align-items: center; gap: 10px;
        }
        @media (prefers-color-scheme: dark) {
          .drive-instruction-text-col { background: #0f172a; }
          .drive-instruction-text-col h3 { color: #f1f5f9; }
          .drive-instruction-next {
            background: rgba(30, 41, 59, 0.97);
            border-color: rgba(255,255,255,0.06);
          }
        }

        /* Bottom bar */
        .drive-bottom-bar {
          position: absolute;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 12px);
          left: 12px; right: 12px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08);
        }
        .drive-bottom-grid {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
        }
        .speed-gauge {
          width: 64px; height: 64px;
          border-radius: 14px;
          background: linear-gradient(135deg, #F8FAFC, #F1F5F9);
          border: 2px solid #E2E8F0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .speed-gauge .speed-num {
          font-size: 22px;
          font-weight: 700;
          line-height: 1;
          color: #0F172A;
          letter-spacing: -0.02em;
        }
        .speed-gauge .speed-unit {
          font-size: 9px;
          font-weight: 600;
          color: #94A3B8;
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        @media (prefers-color-scheme: dark) {
          .speed-gauge { background: linear-gradient(135deg, #1e293b, #0f172a); border-color: #334155; }
          .speed-gauge .speed-num { color: #f1f5f9; }
        }

        .drive-eta-block {
          text-align: center;
          min-width: 0;
        }
        .drive-eta-block .eta-num {
          font-size: clamp(22px, 6.5vw, 30px);
          font-weight: 700;
          line-height: 1;
          color: #0F172A;
          letter-spacing: -0.02em;
        }
        .drive-eta-block .eta-meta {
          font-size: 12px;
          color: #64748B;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media (prefers-color-scheme: dark) {
          .drive-eta-block .eta-num { color: #f1f5f9; }
          .drive-eta-block .eta-meta { color: #94a3b8; }
        }

        .drive-exit-btn {
          width: 52px; height: 52px;
          border-radius: 16px;
          background: #EF4444;
          border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(239,68,68,0.4);
          flex-shrink: 0;
          transition: transform 0.15s ease;
        }
        .drive-exit-btn:active { transform: scale(0.94); }

        /* Compass */
        .compass-btn {
          position: absolute;
          top: calc(env(safe-area-inset-top, 0px) + 12px);
          left: 12px;
          width: 46px; height: 46px;
          border-radius: 50%;
          background: rgba(255,255,255,0.97);
          border: 1.5px solid rgba(0,0,0,0.08);
          box-shadow: 0 3px 14px rgba(0,0,0,0.14);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
          backdrop-filter: blur(8px);
          z-index: 1001;
        }
        .compass-btn:hover { background: white; box-shadow: 0 4px 20px rgba(0,0,0,0.18); }
        .compass-btn.in-drive {
          top: auto;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 110px);
          left: 16px;
        }

        /* Float buttons (drive mode side rail) */
        .float-btn {
          width: 46px; height: 46px;
          border-radius: 14px;
          background: rgba(255,255,255,0.97);
          border: 1.5px solid rgba(0,0,0,0.07);
          box-shadow: 0 3px 14px rgba(0,0,0,0.14);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.15s;
          backdrop-filter: blur(8px);
        }
        .float-btn:hover { background: white; }
        .float-btn:active { transform: scale(0.94); }
        .float-btn.active { background: #EFF6FF; border-color: #BFDBFE; }
        @media (prefers-color-scheme: dark) {
          .float-btn { background: rgba(30,41,59,0.97); border-color: rgba(255,255,255,0.08); }
        }

        .drive-side-rail {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 1001;
        }

        /* Recenter FAB */
        .recenter-fab {
          width: 50px; height: 50px;
          border-radius: 50%;
          border: 1.5px solid transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.25s ease;
          z-index: 1002;
          font-family: inherit;
          padding: 0;
          animation: fab-pop 0.25s ease-out;
        }
        .recenter-fab.following {
          background: rgba(255,255,255,0.97);
          box-shadow: 0 4px 16px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08);
          border-color: rgba(0,0,0,0.06);
          backdrop-filter: blur(8px);
        }
        .recenter-fab.following:hover {
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(0,0,0,0.18);
        }
        .recenter-fab.lost {
          background: #2563EB;
          box-shadow: 0 4px 16px rgba(37,99,235,0.45);
          animation: fab-pop 0.25s ease-out, pulse-recenter 1.8s ease-in-out 0.25s infinite;
        }
        .recenter-fab.lost:hover {
          background: #1D4ED8;
          transform: translateY(-2px);
        }
        .recenter-fab:active { transform: translateY(0) scale(0.96); }
        @media (prefers-color-scheme: dark) {
          .recenter-fab.following {
            background: rgba(30,41,59,0.97);
            border-color: rgba(255,255,255,0.08);
          }
          .recenter-fab.following:hover { background: rgba(15,23,42,1); }
        }

        /* Off-route banner */
        .off-route-banner {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: linear-gradient(135deg, #F59E0B, #EA580C);
          color: white;
          padding: 10px 16px;
          font-size: 13px; font-weight: 600;
        }
        .drive-off-route {
          position: absolute;
          top: calc(env(safe-area-inset-top, 0px));
          left: 0; right: 0;
          z-index: 1003;
        }

        /* GPS warning bar */
        .gps-warning {
          background: #FEF3C7;
          padding: 6px 16px;
          text-align: center;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .gps-warning span {
          font-size: 11px;
          color: #B45309;
          font-weight: 600;
        }

        /* Steps drawer */
        .steps-drawer {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: clamp(280px, 80vw, 360px);
          z-index: 1010;
          display: flex; flex-direction: column;
          box-shadow: -8px 0 32px rgba(0,0,0,0.18);
          padding-top: calc(env(safe-area-inset-top, 0px));
          padding-bottom: calc(env(safe-area-inset-bottom, 0px));
        }

        /* Step row */
        .step-row {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 16px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: background 0.1s;
        }
        .step-row:last-child { border-bottom: none; }
        .step-row.current { background: #EFF6FF; }
        .step-row.past { opacity: 0.38; }
        .step-icon-box {
          width: 32px; height: 32px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; background: #F1F5F9; color: #64748B;
        }
        .step-icon-box.current-icon { background: #2563EB; color: white; }

        /* Leaflet zoom control */
        .leaflet-control-zoom { border: none !important; box-shadow: 0 2px 12px rgba(0,0,0,0.12) !important; border-radius: 10px !important; overflow: hidden; }
        .leaflet-control-zoom a { color: #374151 !important; font-size: 18px !important; line-height: 36px !important; width: 36px !important; height: 36px !important; }

        /* ───────────────────────────────────────────────────────────────────
           RESPONSIVE BREAKPOINTS — mobile-first refinements for drive mode
        ─────────────────────────────────────────────────────────────────── */
        @media (max-width: 480px) {
          .drive-instruction-icon-col { min-width: 84px; padding: 14px 14px; }
          .drive-instruction-text-col { padding: 14px 14px; }
          .drive-instruction-text-col h3 { font-size: 17px; }
          .drive-instruction-icon-col .dist { font-size: 14px; }
          .drive-bottom-grid { padding: 12px 14px; gap: 10px; }
          .speed-gauge { width: 58px; height: 58px; }
          .speed-gauge .speed-num { font-size: 20px; }
          .drive-exit-btn { width: 48px; height: 48px; border-radius: 14px; }
          .drive-side-rail { right: 10px; gap: 8px; }
          .float-btn { width: 42px; height: 42px; border-radius: 12px; }
          .compass-btn { width: 42px; height: 42px; }
          .compass-btn.in-drive { left: 12px; bottom: calc(env(safe-area-inset-bottom, 0px) + 100px); }
          .drive-instruction-panel { left: 8px; right: 8px; border-radius: 18px; }
          .drive-bottom-bar { left: 8px; right: 8px; border-radius: 18px; }
        }

        @media (max-width: 360px) {
          .drive-instruction-icon-col { min-width: 72px; padding: 12px 10px; }
          .drive-instruction-text-col h3 { font-size: 16px; }
          .drive-instruction-icon-col .dist { font-size: 13px; }
          .drive-bottom-grid { gap: 8px; padding: 10px 12px; }
          .speed-gauge { width: 52px; height: 52px; }
          .speed-gauge .speed-num { font-size: 18px; }
          .drive-eta-block .eta-num { font-size: 22px; }
          .drive-eta-block .eta-meta { font-size: 11px; }
          .drive-exit-btn { width: 44px; height: 44px; border-radius: 12px; }
        }

        /* Landscape phones — make sure HUD doesn't overwhelm */
        @media (max-height: 480px) and (orientation: landscape) {
          .drive-instruction-panel { right: 30%; }
          .drive-instruction-icon-col { padding: 10px 14px; min-width: 78px; }
          .drive-instruction-text-col { padding: 10px 14px; }
          .drive-instruction-text-col h3 { font-size: 16px; -webkit-line-clamp: 1; }
          .drive-instruction-next { padding: 8px 14px; }
          .drive-bottom-bar { left: auto; right: 12px; bottom: 12px; max-width: 28%; }
          .drive-bottom-grid { grid-template-columns: 1fr; gap: 8px; padding: 10px 12px; }
          .drive-side-rail { right: 12px; top: 12px; transform: none; flex-direction: row; }
        }
      `}</style>

      <div className="nav-root" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

        {/* ── Normal Mode Header ─────────────────────────────────────────── */}
        {!driveMode && (
          <div className="slide-up" style={{ marginBottom: 24 }}>

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#1D4ED8,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(37,99,235,0.35)", flexShrink: 0 }}>
                  <Navigation size={20} color="white" />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "var(--foreground, #0F172A)", lineHeight: 1.2 }}>Live Directions</h2>
                  <p style={{ margin: 0, fontSize: 12, color: "#64748B", marginTop: 2 }}>to CogniCode IT Solutions</p>
                </div>
              </div>

              {trackingStatus !== "idle" && (
                <div className="status-badge" style={{ background: statusCfg.color, flexShrink: 0 }}>
                  <span className="live-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.8)", display: "inline-block" }} />
                  {statusCfg.text}
                </div>
              )}
            </div>

            {isOffRoute && isTracking && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#FFFBEB", border: "1.5px solid #FCD34D", borderRadius: 12, padding: "10px 14px", marginBottom: 14 }}>
                <AlertTriangle size={16} color="#D97706" style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#B45309" }}>Off route — recalculating…</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#92400E", marginTop: 2 }}>Drive back to the blue route or a new one will be calculated</p>
                </div>
              </div>
            )}

            {locationError && (
              <div style={{ display: "flex", gap: 10, background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 12, padding: "10px 14px", marginBottom: 14 }}>
                <MapPin size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#991B1B" }}>{locationError}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#7F1D1D", marginTop: 2 }}>For GPS accuracy, use your phone.</p>
                </div>
              </div>
            )}

            {trackingStatus === "arrived" && (
              <div style={{ background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 14, padding: "18px 20px", marginBottom: 14, textAlign: "center" }}>
                <CheckCircle size={36} color="#16A34A" style={{ marginBottom: 8 }} />
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#15803D" }}>You've Arrived!</h3>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#166534" }}>Welcome to CogniCode IT Solutions</p>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              {!isTracking ? (
                <button className="nav-btn btn-primary" onClick={startTracking} disabled={isLoadingLocation}
                  style={{ flex: "1 1 160px", opacity: isLoadingLocation ? 0.7 : 1 }}>
                  <Locate size={17} />
                  {isLoadingLocation ? "Getting location…" : "Start Navigation"}
                </button>
              ) : (
                <button className="nav-btn btn-danger" onClick={stopTracking} style={{ flex: "1 1 120px" }}>
                  <X size={17} /> Stop
                </button>
              )}

              {isTracking && (
                <>
                  <button className={`nav-btn btn-ghost ${driveMode ? "active" : ""}`} onClick={toggleDriveMode} style={{ flex: "1 1 110px" }}>
                    <Car size={16} /> {driveMode ? "Exit Drive" : "Drive Mode"}
                  </button>
                  <button className={`nav-btn btn-ghost ${audioEnabled ? "active" : ""}`}
                    onClick={() => setAudioEnabled((p) => { if (p) window.speechSynthesis?.cancel(); return !p; })}
                    style={{ flex: "0 1 auto" }} title={audioEnabled ? "Mute" : "Unmute"}>
                    {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>
                </>
              )}

              <button className="nav-btn btn-ghost"
                onClick={() => window.open("https://www.google.com/maps/dir/?api=1&destination=26.20986098994172,78.1931633754292&travelmode=driving", "_blank")}
                style={{ flex: "1 1 120px" }}>
                <ExternalLink size={16} /> Google Maps
              </button>
            </div>

            {distanceRemaining && etaSeconds > 0 && (
              <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
                <div className="info-card">
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Route size={18} color="#2563EB" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Left</p>
                    <p className="nav-mono" style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "var(--foreground,#0F172A)" }}>{distanceRemaining}</p>
                  </div>
                </div>
                <div className="info-card">
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Timer size={18} color="#16A34A" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>ETA</p>
                    <p className="nav-mono" style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "var(--foreground,#0F172A)" }}>{fmtETA(etaSeconds)}</p>
                  </div>
                </div>
                {speed > 0.5 && (
                  <div className="info-card">
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FAF5FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Gauge size={18} color="#7C3AED" />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Speed</p>
                      <p className="nav-mono" style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "var(--foreground,#0F172A)" }}>{fmtSpeed(speed)} <span style={{ fontSize: 11 }}>km/h</span></p>
                    </div>
                  </div>
                )}
                <div className="info-card">
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPinned size={18} color="#EF4444" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Arrive</p>
                    <p className="nav-mono" style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "var(--foreground,#0F172A)" }}>{fmtArrival(etaSeconds)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            MAP CONTAINER
        ════════════════════════════════════════════════════════════════════ */}
        <div ref={mapContainerRef} className={`map-wrap ${driveMode ? "drive-mode" : ""}`}
          style={driveMode ? {} : { height: 480 }}>

          <MapContainer
            center={OFFICE_COORDS}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            zoomControl={!driveMode}
          >
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              attribution="&copy; Google Maps"
              maxZoom={21}
            />
            <MapController
              targetPosition={displayLocation}
              officeCoords={OFFICE_COORDS}
              route={route}
              fitTrigger={fitTrigger}
              isTracking={isTracking}
              followUser={followUser}
              speed={speed}
              driveMode={driveMode}
              mapRotation={mapRotation}
              isUserGesturing={isUserGesturing}
              onUserPan={() => setFollowUser(false)}
            />

            <Marker position={OFFICE_COORDS} icon={officeIcon}>
              {!driveMode && (
                <Tooltip permanent direction="right" offset={[12, -20]}>
                  <span style={{ fontWeight: 600, fontSize: 12 }}>CogniCode IT Solutions</span>
                </Tooltip>
              )}
              <Popup>
                <div style={{ textAlign: "center", lineHeight: 1.5 }}>
                  <strong style={{ fontSize: 14 }}>CogniCode IT Solutions</strong><br />
                  <span style={{ fontSize: 12, color: "#666" }}>B/2, Mahesh Nagar, Tulsi Vihar Colony<br />Gwalior, MP 474002</span>
                </div>
              </Popup>
            </Marker>

            {displayLocation && accuracy && accuracy > 15 && !driveMode && (
              <Circle center={displayLocation} radius={accuracy}
                pathOptions={{ color: "rgba(37,99,235,0.3)", fillColor: "rgba(37,99,235,0.07)", fillOpacity: 1, weight: 1 }} />
            )}

            {displayLocation && (
              <Marker position={displayLocation} icon={currentUserIcon}>
                <Popup>
                  <div style={{ textAlign: "center" }}>
                    <strong>Your Location</strong><br />
                    <span style={{ fontSize: 11, color: "#666" }}>
                      {snappedLocation && !isOffRoute ? "On route" : "GPS"}{accuracy && ` • ±${Math.round(accuracy)}m`}
                    </span>
                  </div>
                </Popup>
              </Marker>
            )}

            {traveledRoute.length > 1 && <Polyline positions={traveledRoute} pathOptions={{ color: "#94A3B8", weight: driveMode ? 7 : 5, opacity: 0.45, lineCap: "round", lineJoin: "round" }} />}

            {remainingRoute.length > 1 && (<>
              <Polyline positions={remainingRoute} pathOptions={{ color: "#2563EB", weight: driveMode ? 16 : 12, opacity: 0.12 }} />
              <Polyline positions={remainingRoute} pathOptions={{ color: "#2563EB", weight: driveMode ? 8 : 5, opacity: 0.9, lineCap: "round", lineJoin: "round" }} />
            </>)}

            {traveledRoute.length === 0 && route.length > 0 && (<>
              <Polyline positions={route} pathOptions={{ color: "#2563EB", weight: driveMode ? 14 : 10, opacity: 0.12 }} />
              <Polyline positions={route} pathOptions={{ color: "#2563EB", weight: driveMode ? 7 : 5, opacity: 0.85, lineCap: "round", lineJoin: "round" }} />
            </>)}

            {steps.filter((s, i) => s.maneuverType !== "depart" && s.maneuverType !== "arrive" && i >= currentStepIndex).map((step, i) => {
              const isNext = steps.indexOf(step) === currentStepIndex;
              return (
                <Marker key={`dot-${i}`} position={step.location} icon={L.divIcon({
                  className: "",
                  html: `<div style="width:${isNext ? 14 : 9}px;height:${isNext ? 14 : 9}px;background:${isNext ? "#1D4ED8" : "#3B82F6"};border:${isNext ? 3 : 2}px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>`,
                  iconSize: [isNext ? 14 : 9, isNext ? 14 : 9], iconAnchor: [isNext ? 7 : 4.5, isNext ? 7 : 4.5],
                })}>
                  <Tooltip direction="top" offset={[0, -8]}><span style={{ fontSize: 12 }}>{step.instruction}</span></Tooltip>
                </Marker>
              );
            })}
          </MapContainer>

          {/* ══════════════════════════════════════════════════════════════
              HUD OVERLAY
          ══════════════════════════════════════════════════════════════ */}
          <div className="hud-layer">

            {/* ── Compass: appears whenever map is rotated ── */}
            {(mapRotation > 1 || (driveMode && mapRotation !== 0)) && (
              <button
                className={`compass-btn ${driveMode ? "in-drive" : ""}`}
                onClick={handleResetNorth}
                title="Reset orientation to North"
              >
                <svg viewBox="0 0 36 36" style={{ width: 28, height: 28, transform: `rotate(${-mapRotation}deg)`, transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)" }}>
                  <path d="M18 5 L21 18 L18 16 L15 18 Z" fill="#EF4444" />
                  <path d="M18 31 L15 18 L18 20 L21 18 Z" fill="#94A3B8" />
                  <text x="18" y="4" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#EF4444">N</text>
                </svg>
              </button>
            )}

            {/* ── Always-visible Recenter FAB during tracking ── */}
            {isTracking && trackingStatus !== "arrived" && (
              <button
                className={`recenter-fab ${followUser ? "following" : "lost"}`}
                onClick={handleRecenter}
                title={followUser ? "Centered on your location" : "Tap to recenter on you"}
                aria-label={followUser ? "Centered on your location" : "Recenter map on your location"}
                style={{
                  position: "absolute",
                  bottom: driveMode
                    ? `calc(env(safe-area-inset-bottom, 0px) + 110px)`
                    : 16,
                  right: driveMode ? 16 : 16,
                }}
              >
                {followUser ? (
                  <LocateFixed size={22} color="#2563EB" />
                ) : (
                  <Locate size={22} color="white" strokeWidth={2.5} />
                )}
              </button>
            )}

            {/* ═══════════════════════════════════════════
                DRIVE MODE HUD
            ═══════════════════════════════════════════ */}
            {driveMode && isTracking && (
              <>
                {isOffRoute && (
                  <div className="off-route-banner drive-off-route slide-down">
                    <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                    Off route — recalculating…
                  </div>
                )}

                {currentStep && (
                  <div
                    className="drive-instruction-panel slide-down"
                    style={isOffRoute ? { top: `calc(env(safe-area-inset-top, 0px) + 50px)` } : {}}
                  >
                    <div className="drive-instruction-main">
                      <div className="drive-instruction-icon-col">
                        <DirectionIcon
                          type={currentStep.maneuverType}
                          modifier={currentStep.maneuverModifier}
                          size={36}
                          color="white"
                        />
                        {distToNextManeuver !== null && (
                          <span className="dist nav-mono">{fmtDist(distToNextManeuver)}</span>
                        )}
                      </div>
                      <div className="drive-instruction-text-col">
                        <h3>{currentStep.instruction}</h3>
                        {currentStep.name && (
                          <p>{currentStep.name}</p>
                        )}
                      </div>
                    </div>
                    {nextStep && (
                      <div className="drive-instruction-next">
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.05em", textTransform: "uppercase" }}>Then</span>
                        <DirectionIcon type={nextStep.maneuverType} modifier={nextStep.maneuverModifier} size={14} color="#64748B" />
                        <span style={{ fontSize: 13, color: "#64748B", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nextStep.instruction}</span>
                        <span className="nav-mono" style={{ fontSize: 12, color: "#94A3B8", flexShrink: 0, fontWeight: 600 }}>{fmtDist(nextStep.distance)}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Right side rail: audio + steps + manual rotation indicator */}
                <div className="drive-side-rail">
                  <button
                    className={`float-btn ${audioEnabled ? "active" : ""}`}
                    onClick={() => setAudioEnabled((p) => { if (p) window.speechSynthesis?.cancel(); return !p; })}
                    title={audioEnabled ? "Mute voice" : "Unmute voice"}
                  >
                    {audioEnabled ? <Volume2 size={18} color="#2563EB" /> : <VolumeX size={18} color="#94A3B8" />}
                  </button>
                  <button
                    className={`float-btn ${stepsExpanded ? "active" : ""}`}
                    onClick={() => setStepsExpanded((p) => !p)}
                    title="All steps"
                  >
                    <Milestone size={18} color={stepsExpanded ? "#2563EB" : "#64748B"} />
                  </button>
                  {manualRotationActive && (
                    <div
                      className="float-btn"
                      style={{ background: "#FEF3C7", borderColor: "#FCD34D", cursor: "default" }}
                      title="Auto-rotate paused — tap recenter to resume"
                    >
                      <RotateCw size={16} color="#B45309" />
                    </div>
                  )}
                </div>

                {stepsExpanded && (
                  <div className="steps-drawer drive-glass fade-in">
                    <div style={{ padding: "14px 16px", borderBottom: "1.5px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>Directions ({steps.length} steps)</span>
                      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 8 }} onClick={() => setStepsExpanded(false)}>
                        <X size={16} />
                      </button>
                    </div>
                    <div className="steps-scroll" style={{ overflowY: "auto", flex: 1 }}>
                      {steps.map((step, i) => (
                        <div key={i} className={`step-row ${i === currentStepIndex ? "current" : i < currentStepIndex ? "past" : ""}`}>
                          <div className={`step-icon-box ${i === currentStepIndex ? "current-icon" : ""}`}>
                            {i < currentStepIndex ? <CheckCircle size={14} /> : <DirectionIcon type={step.maneuverType} modifier={step.maneuverModifier} size={14} />}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: 0, fontSize: 12, fontWeight: i === currentStepIndex ? 700 : 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: i < currentStepIndex ? "line-through" : "none", color: i === currentStepIndex ? "#1D4ED8" : undefined }}>
                              {step.instruction}
                            </p>
                            <p style={{ margin: 0, fontSize: 10, color: "#94A3B8" }}>{fmtDist(step.distance)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="drive-bottom-bar drive-glass slide-up">
                  {accuracy && accuracy > 30 && (
                    <div className="gps-warning">
                      <span>Low GPS accuracy (±{Math.round(accuracy)}m)</span>
                    </div>
                  )}
                  <div className="drive-bottom-grid">
                    <div className="speed-gauge">
                      <span className="speed-num nav-mono">
                        {speed > 0.5 ? fmtSpeed(speed) : "0"}
                      </span>
                      <span className="speed-unit">km/h</span>
                    </div>

                    <div className="drive-eta-block">
                      <p className="eta-num nav-mono">{fmtETA(etaSeconds)}</p>
                      <p className="eta-meta">
                        {distanceRemaining} • arrive {fmtArrival(etaSeconds)}
                      </p>
                    </div>

                    <button
                      onClick={toggleDriveMode}
                      className="drive-exit-btn"
                      title="Exit drive mode"
                      aria-label="Exit drive mode"
                    >
                      <X size={22} color="white" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {!driveMode && isTracking && accuracy && (
          <p style={{ textAlign: "center", fontSize: 11, color: "#94A3B8", marginTop: 8 }}>
            GPS ±{Math.round(accuracy)}m{accuracy > 100 ? " • low accuracy, try outdoors" : ""}
            {speed > 0.5 ? ` • ${fmtSpeed(speed)} km/h` : ""}
          </p>
        )}
        {!driveMode && (
          <p style={{ textAlign: "center", fontSize: 11, color: "#CBD5E1", marginTop: 4 }}>
            Two-finger twist or right-click drag to rotate • Drag to explore • Tap recenter to snap back
          </p>
        )}

        {steps.length > 0 && !driveMode && (
          <div style={{ marginTop: 20 }}>
            <button onClick={() => setStepsExpanded((p) => !p)}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "white", border: "1.5px solid rgba(0,0,0,0.07)", borderRadius: 14, cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700 }}>
                <Milestone size={16} color="#2563EB" />
                All Directions <span style={{ background: "#EFF6FF", color: "#2563EB", borderRadius: 8, padding: "1px 8px", fontSize: 12, fontWeight: 600 }}>{steps.length}</span>
              </span>
              {stepsExpanded ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
            </button>

            {stepsExpanded && (
              <div className="fade-in" style={{ marginTop: 8, background: "white", borderRadius: 14, border: "1.5px solid rgba(0,0,0,0.07)", overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                {steps.map((step, i) => (
                  <div key={i} className={`step-row ${i === currentStepIndex ? "current" : i < currentStepIndex ? "past" : ""}`}
                    style={{ borderBottom: i < steps.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                    <div className={`step-icon-box ${i === currentStepIndex ? "current-icon" : ""}`}
                      style={i === currentStepIndex ? { boxShadow: "0 0 0 4px rgba(37,99,235,0.15)" } : {}}>
                      {i < currentStepIndex ? <CheckCircle size={14} /> : <DirectionIcon type={step.maneuverType} modifier={step.maneuverModifier} size={14} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: i === currentStepIndex ? 700 : 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: i === currentStepIndex ? "#1D4ED8" : undefined, textDecoration: i < currentStepIndex ? "line-through" : "none" }}>
                        {step.instruction}
                      </p>
                      <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94A3B8" }}>
                        {fmtDist(step.distance)}{step.name ? ` • ${step.name}` : ""}
                      </p>
                    </div>
                    {i === currentStepIndex && distToNextManeuver !== null && (
                      <span className="nav-mono" style={{ fontSize: 12, fontWeight: 600, color: "#2563EB", flexShrink: 0 }}>{fmtDist(distToNextManeuver)}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}