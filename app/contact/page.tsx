"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  Navigation,
  ExternalLink,
  Locate,
  Route,
  Timer,
  MapPinned,
} from "lucide-react";

// ==================== LEAFLET MAP ====================
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ==================== CUSTOM MARKERS ====================

// Office marker - red pin with building icon
const officeIcon = L.divIcon({
  className: "",
  html: `
    <div style="position:relative;width:40px;height:50px;">
      <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C8.95 0 0 8.95 0 20c0 14.25 20 30 20 30s20-15.75 20-30C40 8.95 31.05 0 20 0z" fill="#DC2626"/>
        <circle cx="20" cy="18" r="10" fill="white"/>
        <path d="M15 22V14l5-3 5 3v8h-3v-4h-4v4h-3z" fill="#DC2626"/>
      </svg>
    </div>
  `,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
});

// User marker - blue pulsing dot
const userIcon = L.divIcon({
  className: "",
  html: `
    <div style="position:relative;display:flex;align-items:center;justify-content:center;">
      <div style="
        position:absolute;
        width:44px;height:44px;
        border-radius:50%;
        background:rgba(59,130,246,0.2);
        animation:livePulse 2s ease-out infinite;
      "></div>
      <div style="
        position:absolute;
        width:28px;height:28px;
        border-radius:50%;
        background:rgba(59,130,246,0.3);
        animation:livePulse 2s ease-out infinite 0.5s;
      "></div>
      <div style="
        width:16px;height:16px;
        border-radius:50%;
        background:#3B82F6;
        border:3px solid white;
        box-shadow:0 2px 8px rgba(59,130,246,0.5);
        position:relative;
        z-index:2;
      "></div>
    </div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  popupAnchor: [0, -22],
});

// ==================== FIT BOUNDS COMPONENT ====================
function FitBounds({
  bounds,
}: {
  bounds: L.LatLngBoundsExpression | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    }
  }, [bounds, map]);
  return null;
}

// ==================== CONTACT DATA ====================

const contactInfo = [
  {
    name: "Email",
    value: "office.cognicode@gmail.com",
    icon: Mail,
    description: "Send us an email anytime",
  },
  {
    name: "Phone",
    value: "+917000515617",
    icon: Phone,
    description: "Mon-Fri from 9am to 6pm IST",
  },
  {
    name: "Office",
    value:
      "B/2, Mahesh Nagar, Tulsi Vihar Colony, Gwalior, Madhya Pradesh 474002",
    icon: MapPin,
    description: "Visit our office",
  },
  {
    name: "Working Hours",
    value: "24/7 Online Support",
    icon: Clock,
    description: "We're always here to help",
  },
];

const serviceOptions = [
  "Thesis Writing Support",
  "Research Paper Writing",
  "Dissertation Support",
  "Literature Review",
  "Synopsis Writing",
  "Data Analysis",
  "Plagiarism Removal",
  "Editing & Proofreading",
  "Other",
];

const faqs = [
  {
    question: "How long does it take to complete a thesis?",
    answer:
      "The timeline depends on the complexity and length of your thesis. Typically, a complete thesis support project takes 3-6 months. However, we offer expedited services for urgent requirements. Contact us to discuss your specific timeline needs.",
  },
  {
    question: "Do you provide a plagiarism report?",
    answer:
      "Yes, we provide a comprehensive Turnitin plagiarism report with every project. We guarantee that all content is original and falls below the acceptable similarity threshold (typically under 10%).",
  },
  {
    question: "Can I communicate directly with the writer?",
    answer:
      "Yes, our Premium plan includes direct communication with your assigned expert through scheduled Zoom calls. All plans include communication through our project management system.",
  },
  {
    question: "What if I'm not satisfied with the work?",
    answer:
      "We offer revision rounds as part of our service packages. If the delivered work doesn't meet the agreed specifications, we'll revise it at no additional cost. Customer satisfaction is our top priority.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Absolutely. We maintain strict confidentiality policies. Your personal information, research data, and all project details are kept secure and never shared with third parties.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, bank transfers, and popular digital payment methods. For larger projects, we offer installment payment options. Contact us to discuss payment arrangements.",
  },
];

// ==================== MAIN COMPONENT ====================

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ==================== LIVE TRACKING STATES ====================
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [route, setRoute] = useState<[number, number][]>([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [trackingStatus, setTrackingStatus] = useState<
    "idle" | "locating" | "routing" | "tracking" | "arrived"
  >("idle");
  const [mapBounds, setMapBounds] = useState<L.LatLngBoundsExpression | null>(
    null
  );

  const watchIdRef = useRef<number | null>(null);
  const routeThrottleRef = useRef<number>(0);

  // CogniCode IT Solutions exact coordinates
  const OFFICE_COORDS: [number, number] = [26.2097169, 78.1959066];

  // ==================== FETCH ROUTE FROM OSRM (FREE, NO API KEY) ====================
  const fetchRoute = useCallback(
    async (from: [number, number]) => {
      // Throttle: max one route request every 5 seconds
      const now = Date.now();
      if (now - routeThrottleRef.current < 5000) return;
      routeThrottleRef.current = now;

      try {
        const origin = `${from[1]},${from[0]}`;
        const destination = `${OFFICE_COORDS[1]},${OFFICE_COORDS[0]}`;

        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${origin};${destination}?overview=full&geometries=geojson&steps=true`
        );
        const data = await res.json();

        if (data.code === "Ok" && data.routes?.[0]) {
          const routeCoords: [number, number][] =
            data.routes[0].geometry.coordinates.map(
              (coord: number[]) => [coord[1], coord[0]] as [number, number]
            );
          setRoute(routeCoords);

          const dist = data.routes[0].distance;
          const dur = data.routes[0].duration;

          if (dist < 1000) {
            setDistance(`${Math.round(dist)} m`);
          } else {
            setDistance(`${(dist / 1000).toFixed(1)} km`);
          }

          const hours = Math.floor(dur / 3600);
          const mins = Math.round((dur % 3600) / 60);
          if (hours > 0) {
            setDuration(`${hours} hr ${mins} min`);
          } else {
            setDuration(`${mins} min`);
          }

          // Check if arrived (within 100 meters)
          if (dist < 100) {
            setTrackingStatus("arrived");
            stopTracking();
          }

          // Fit map bounds to show full route
          const bounds = L.latLngBounds([from, OFFICE_COORDS]);
          routeCoords.forEach((c) => bounds.extend(c));
          setMapBounds(bounds);
        }
      } catch {
        // Silently fail on route update — keep last known route
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // ==================== START LIVE TRACKING ====================
  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoadingLocation(true);
    setLocationError("");
    setTrackingStatus("locating");

    // watchPosition = continuous live tracking (updates as user moves)
    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const userPos: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setUserLocation(userPos);
        setIsLoadingLocation(false);
        setIsTracking(true);

        setTrackingStatus("routing");
        await fetchRoute(userPos);
        setTrackingStatus("tracking");
      },
      (err) => {
        setIsLoadingLocation(false);
        setIsTracking(false);
        setTrackingStatus("idle");

        switch (err.code) {
          case err.PERMISSION_DENIED:
            setLocationError(
              "Location access denied. Please enable location in your browser settings and try again."
            );
            break;
          case err.POSITION_UNAVAILABLE:
            setLocationError(
              "Location unavailable. Please check your GPS or network connection."
            );
            break;
          case err.TIMEOUT:
            setLocationError("Location request timed out. Please try again.");
            break;
          default:
            setLocationError("An unknown error occurred. Please try again.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0, // Always get fresh position
      }
    );
  }, [fetchRoute]);

  // ==================== STOP LIVE TRACKING ====================
  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
    if (trackingStatus !== "arrived") {
      setTrackingStatus("idle");
    }
  }, [trackingStatus]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // ==================== FORM HANDLER ====================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  // ==================== STATUS CONFIG ====================
  const getStatusConfig = () => {
    switch (trackingStatus) {
      case "locating":
        return { text: "Locating you...", color: "bg-amber-500", pulse: true };
      case "routing":
        return {
          text: "Calculating route...",
          color: "bg-blue-500",
          pulse: true,
        };
      case "tracking":
        return {
          text: "Live Tracking Active",
          color: "bg-emerald-500",
          pulse: true,
        };
      case "arrived":
        return {
          text: "You have arrived!",
          color: "bg-emerald-500",
          pulse: false,
        };
      default:
        return { text: "Ready", color: "bg-gray-400", pulse: false };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Pulse animation CSS */}
      <style jsx global>{`
        @keyframes livePulse {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        @keyframes statusPulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .status-pulse {
          animation: statusPulse 1.5s ease-in-out infinite;
        }
        .leaflet-container {
          font-family: inherit;
          z-index: 0;
        }
      `}</style>

      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-foreground py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl">
                Contact Us
              </h1>
              <p className="mt-6 text-lg leading-8 text-background/70">
                Have a question or ready to start your project? Get in touch
                with our team. We&apos;re here to help you succeed in your
                academic journey.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info) => (
                <div
                  key={info.name}
                  className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-border"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">
                    {info.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {info.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {info.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & FAQ */}
        <section className="bg-muted py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <MessageSquare className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Send Us a Message
                  </h2>
                </div>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours with a detailed response.
                </p>

                {isSubmitted ? (
                  <div className="rounded-2xl bg-primary/10 p-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Message Sent Successfully!
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Thank you for reaching out. We&apos;ll respond within 24
                      hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 70005 15617"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="service"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Service Required *
                        </label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            setFormData({ ...formData, service: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        placeholder="Brief description of your inquiry"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="Please provide details about your project requirements, timeline, and any specific questions you have..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* FAQ */}
              <div id="faq">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <MessageSquare className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="text-muted-foreground mb-8">
                  Find quick answers to common questions about our services.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-base font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== LIVE TRACKING MAP SECTION ==================== */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Navigation className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Live Directions to Our Office
                  </h2>
                </div>
                <p className="text-muted-foreground ml-[52px]">
                  Real-time GPS tracking to navigate to CogniCode IT Solutions
                </p>
              </div>

              {/* Live Status Badge */}
              {trackingStatus !== "idle" && (
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium ${statusConfig.color}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full bg-white ${
                      statusConfig.pulse ? "status-pulse" : ""
                    }`}
                  />
                  {statusConfig.text}
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {!isTracking ? (
                <Button
                  size="lg"
                  className="sm:col-span-2 w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
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
                  className="sm:col-span-2 w-full gap-2"
                  variant="destructive"
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
                onClick={() => {
                  window.open(
                    "https://www.google.com/maps/dir/?api=1&destination=26.2097169,78.1959066&destination_place_id=ChIJA79LlZnHdDkRbo6OmkmKWK8&travelmode=driving",
                    "_blank"
                  );
                }}
              >
                <ExternalLink className="h-4 w-4" />
                Open in Google Maps
              </Button>
            </div>

            {/* Error Message */}
            {locationError && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 mb-6 flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">{locationError}</p>
                  <p className="text-xs mt-1 opacity-80">
                    Make sure GPS is enabled and location permission is granted.
                  </p>
                </div>
              </div>
            )}

            {/* Route Info Cards */}
            {distance && duration && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-card rounded-xl border p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Route className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="text-lg font-bold text-foreground">
                      {distance}
                    </p>
                  </div>
                </div>
                <div className="bg-card rounded-xl border p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                    <Timer className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ETA</p>
                    <p className="text-lg font-bold text-foreground">
                      {duration}
                    </p>
                  </div>
                </div>
                <div className="bg-card rounded-xl border p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                    <MapPinned className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="text-sm font-bold text-foreground leading-tight">
                      CogniCode Office
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Arrived Banner */}
            {trackingStatus === "arrived" && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 mb-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 mx-auto mb-3">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                  You&apos;ve Arrived!
                </h3>
                <p className="text-emerald-600 dark:text-emerald-500 mt-1">
                  Welcome to CogniCode IT Solutions
                </p>
              </div>
            )}

            {/* Live Map */}
            <div
              className="rounded-2xl overflow-hidden border border-border shadow-lg"
              style={{ height: "500px" }}
            >
              <MapContainer
                center={OFFICE_COORDS}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Auto fit bounds when route changes */}
                <FitBounds bounds={mapBounds} />

                {/* Office Marker */}
                <Marker position={OFFICE_COORDS} icon={officeIcon}>
                  <Popup>
                    <div style={{ textAlign: "center", padding: "4px" }}>
                      <strong style={{ fontSize: "14px" }}>
                        CogniCode IT Solutions
                      </strong>
                      <br />
                      <span style={{ fontSize: "12px", color: "#666" }}>
                        B/2, Mahesh Nagar, Tulsi Vihar Colony
                        <br />
                        Gwalior, MP 474002
                      </span>
                    </div>
                  </Popup>
                </Marker>

                {/* User Location - Live Pulsing Blue Dot */}
                {userLocation && (
                  <Marker position={userLocation} icon={userIcon}>
                    <Popup>
                      <div style={{ textAlign: "center", padding: "4px" }}>
                        <strong style={{ fontSize: "14px" }}>
                          Your Location
                        </strong>
                        <br />
                        <span style={{ fontSize: "11px", color: "#666" }}>
                          Live GPS &bull; Updates automatically
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* Route Polyline with glow effect */}
                {route.length > 0 && (
                  <>
                    {/* Shadow/glow line */}
                    <Polyline
                      positions={route}
                      color="#3B82F6"
                      weight={10}
                      opacity={0.2}
                    />
                    {/* Main route line */}
                    <Polyline
                      positions={route}
                      color="#3B82F6"
                      weight={5}
                      opacity={0.9}
                    />
                  </>
                )}
              </MapContainer>
            </div>

            {/* Bottom helper text */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              Your location updates in real-time as you move &bull; Route
              recalculates automatically &bull; Best accuracy on mobile with GPS
              enabled
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
                Take the first step toward academic success. Our team is ready
                to help you achieve your research goals.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
                <Button size="lg" variant="secondary" asChild>
                  <a
                    href="tel:+917000515617"
                    className="flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <a
                    href="mailto:office.cognicode@gmail.com"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}