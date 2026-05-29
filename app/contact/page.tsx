"use client";

import { useState, useEffect, useMemo } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle, RefreshCw, Copy, Download, X, ChevronsUpDown, Check } from "lucide-react";
import { postData, getData } from "../server/fetch-beckend-services";
import dynamic from "next/dynamic";

const LiveTrackingMap = dynamic(() => import("@/app/contact/live-tracking-map"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border bg-muted/50 flex items-center justify-center" style={{ height: 500 }}>
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
});
// ==================== COUNTRIES WITH FLAGS (ALL COUNTRIES) ====================
const countries = [
  { flag: "🇦🇫", name: "Afghanistan" },
  { flag: "🇦🇱", name: "Albania" },
  { flag: "🇩🇿", name: "Algeria" },
  { flag: "🇦🇩", name: "Andorra" },
  { flag: "🇦🇴", name: "Angola" },
  { flag: "🇦🇬", name: "Antigua and Barbuda" },
  { flag: "🇦🇷", name: "Argentina" },
  { flag: "🇦🇲", name: "Armenia" },
  { flag: "🇦🇼", name: "Aruba" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇦🇹", name: "Austria" },
  { flag: "🇦🇿", name: "Azerbaijan" },
  { flag: "🇧🇸", name: "Bahamas" },
  { flag: "🇧🇭", name: "Bahrain" },
  { flag: "🇧🇩", name: "Bangladesh" },
  { flag: "🇧🇧", name: "Barbados" },
  { flag: "🇧🇾", name: "Belarus" },
  { flag: "🇧🇪", name: "Belgium" },
  { flag: "🇧🇿", name: "Belize" },
  { flag: "🇧🇯", name: "Benin" },
  { flag: "🇧🇲", name: "Bermuda" },
  { flag: "🇧🇹", name: "Bhutan" },
  { flag: "🇧🇴", name: "Bolivia" },
  { flag: "🇧🇦", name: "Bosnia and Herzegovina" },
  { flag: "🇧🇼", name: "Botswana" },
  { flag: "🇧🇷", name: "Brazil" },
  { flag: "🇧🇳", name: "Brunei" },
  { flag: "🇧🇬", name: "Bulgaria" },
  { flag: "🇧🇫", name: "Burkina Faso" },
  { flag: "🇧🇮", name: "Burundi" },
  { flag: "🇰🇭", name: "Cambodia" },
  { flag: "🇨🇲", name: "Cameroon" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇨🇻", name: "Cape Verde" },
  { flag: "🇰🇾", name: "Cayman Islands" },
  { flag: "🇨🇫", name: "Central African Republic" },
  { flag: "🇹🇩", name: "Chad" },
  { flag: "🇨🇱", name: "Chile" },
  { flag: "🇨🇳", name: "China" },
  { flag: "🇨🇴", name: "Colombia" },
  { flag: "🇰🇲", name: "Comoros" },
  { flag: "🇨🇬", name: "Congo" },
  { flag: "🇨🇷", name: "Costa Rica" },
  { flag: "🇭🇷", name: "Croatia" },
  { flag: "🇨🇺", name: "Cuba" },
  { flag: "🇨🇾", name: "Cyprus" },
  { flag: "🇨🇿", name: "Czech Republic" },
  { flag: "🇩🇰", name: "Denmark" },
  { flag: "🇩🇯", name: "Djibouti" },
  { flag: "🇩🇲", name: "Dominica" },
  { flag: "🇩🇴", name: "Dominican Republic" },
  { flag: "🇪🇨", name: "Ecuador" },
  { flag: "🇪🇬", name: "Egypt" },
  { flag: "🇸🇻", name: "El Salvador" },
  { flag: "🇬🇶", name: "Equatorial Guinea" },
  { flag: "🇪🇷", name: "Eritrea" },
  { flag: "🇪🇪", name: "Estonia" },
  { flag: "🇪🇹", name: "Ethiopia" },
  { flag: "🇫🇯", name: "Fiji" },
  { flag: "🇫🇮", name: "Finland" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇬🇦", name: "Gabon" },
  { flag: "🇬🇲", name: "Gambia" },
  { flag: "🇬🇪", name: "Georgia" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇬🇭", name: "Ghana" },
  { flag: "🇬🇷", name: "Greece" },
  { flag: "🇬🇩", name: "Grenada" },
  { flag: "🇬🇹", name: "Guatemala" },
  { flag: "🇬🇳", name: "Guinea" },
  { flag: "🇬🇼", name: "Guinea-Bissau" },
  { flag: "🇬🇾", name: "Guyana" },
  { flag: "🇭🇹", name: "Haiti" },
  { flag: "🇭🇳", name: "Honduras" },
  { flag: "🇭🇰", name: "Hong Kong" },
  { flag: "🇭🇺", name: "Hungary" },
  { flag: "🇮🇸", name: "Iceland" },
  { flag: "🇮🇳", name: "India" },
  { flag: "🇮🇩", name: "Indonesia" },
  { flag: "🇮🇷", name: "Iran" },
  { flag: "🇮🇶", name: "Iraq" },
  { flag: "🇮🇪", name: "Ireland" },
  { flag: "🇮🇱", name: "Israel" },
  { flag: "🇮🇹", name: "Italy" },
  { flag: "🇯🇲", name: "Jamaica" },
  { flag: "🇯🇵", name: "Japan" },
  { flag: "🇯🇴", name: "Jordan" },
  { flag: "🇰🇿", name: "Kazakhstan" },
  { flag: "🇰🇪", name: "Kenya" },
  { flag: "🇰🇮", name: "Kiribati" },
  { flag: "🇰🇵", name: "North Korea" },
  { flag: "🇰🇷", name: "South Korea" },
  { flag: "🇰🇼", name: "Kuwait" },
  { flag: "🇰🇬", name: "Kyrgyzstan" },
  { flag: "🇱🇦", name: "Laos" },
  { flag: "🇱🇻", name: "Latvia" },
  { flag: "🇱🇧", name: "Lebanon" },
  { flag: "🇱🇸", name: "Lesotho" },
  { flag: "🇱🇷", name: "Liberia" },
  { flag: "🇱🇾", name: "Libya" },
  { flag: "🇱🇮", name: "Liechtenstein" },
  { flag: "🇱🇹", name: "Lithuania" },
  { flag: "🇱🇺", name: "Luxembourg" },
  { flag: "🇲🇬", name: "Madagascar" },
  { flag: "🇲🇼", name: "Malawi" },
  { flag: "🇲🇾", name: "Malaysia" },
  { flag: "🇲🇻", name: "Maldives" },
  { flag: "🇲🇱", name: "Mali" },
  { flag: "🇲🇹", name: "Malta" },
  { flag: "🇲🇭", name: "Marshall Islands" },
  { flag: "🇲🇷", name: "Mauritania" },
  { flag: "🇲🇺", name: "Mauritius" },
  { flag: "🇲🇽", name: "Mexico" },
  { flag: "🇫🇲", name: "Micronesia" },
  { flag: "🇲🇩", name: "Moldova" },
  { flag: "🇲🇨", name: "Monaco" },
  { flag: "🇲🇳", name: "Mongolia" },
  { flag: "🇲🇪", name: "Montenegro" },
  { flag: "🇲🇦", name: "Morocco" },
  { flag: "🇲🇿", name: "Mozambique" },
  { flag: "🇲🇲", name: "Myanmar" },
  { flag: "🇳🇦", name: "Namibia" },
  { flag: "🇳🇷", name: "Nauru" },
  { flag: "🇳🇵", name: "Nepal" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇳🇿", name: "New Zealand" },
  { flag: "🇳🇮", name: "Nicaragua" },
  { flag: "🇳🇪", name: "Niger" },
  { flag: "🇳🇬", name: "Nigeria" },
  { flag: "🇲🇰", name: "North Macedonia" },
  { flag: "🇳🇴", name: "Norway" },
  { flag: "🇴🇲", name: "Oman" },
  { flag: "🇵🇰", name: "Pakistan" },
  { flag: "🇵🇼", name: "Palau" },
  { flag: "🇵🇸", name: "Palestine" },
  { flag: "🇵🇦", name: "Panama" },
  { flag: "🇵🇬", name: "Papua New Guinea" },
  { flag: "🇵🇾", name: "Paraguay" },
  { flag: "🇵🇪", name: "Peru" },
  { flag: "🇵🇭", name: "Philippines" },
  { flag: "🇵🇱", name: "Poland" },
  { flag: "🇵🇹", name: "Portugal" },
  { flag: "🇵🇷", name: "Puerto Rico" },
  { flag: "🇶🇦", name: "Qatar" },
  { flag: "🇷🇴", name: "Romania" },
  { flag: "🇷🇺", name: "Russia" },
  { flag: "🇷🇼", name: "Rwanda" },
  { flag: "🇰🇳", name: "Saint Kitts and Nevis" },
  { flag: "🇱🇨", name: "Saint Lucia" },
  { flag: "🇻🇨", name: "Saint Vincent and the Grenadines" },
  { flag: "🇼🇸", name: "Samoa" },
  { flag: "🇸🇲", name: "San Marino" },
  { flag: "🇸🇹", name: "Sao Tome and Principe" },
  { flag: "🇸🇦", name: "Saudi Arabia" },
  { flag: "🇸🇳", name: "Senegal" },
  { flag: "🇷🇸", name: "Serbia" },
  { flag: "🇸🇨", name: "Seychelles" },
  { flag: "🇸🇱", name: "Sierra Leone" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇸🇰", name: "Slovakia" },
  { flag: "🇸🇮", name: "Slovenia" },
  { flag: "🇸🇧", name: "Solomon Islands" },
  { flag: "🇸🇴", name: "Somalia" },
  { flag: "🇿🇦", name: "South Africa" },
  { flag: "🇸🇸", name: "South Sudan" },
  { flag: "🇪🇸", name: "Spain" },
  { flag: "🇱🇰", name: "Sri Lanka" },
  { flag: "🇸🇩", name: "Sudan" },
  { flag: "🇸🇷", name: "Suriname" },
  { flag: "🇸🇿", name: "Eswatini" },
  { flag: "🇸🇪", name: "Sweden" },
  { flag: "🇨🇭", name: "Switzerland" },
  { flag: "🇸🇾", name: "Syria" },
  { flag: "🇹🇼", name: "Taiwan" },
  { flag: "🇹🇯", name: "Tajikistan" },
  { flag: "🇹🇿", name: "Tanzania" },
  { flag: "🇹🇭", name: "Thailand" },
  { flag: "🇹🇱", name: "Timor-Leste" },
  { flag: "🇹🇬", name: "Togo" },
  { flag: "🇹🇴", name: "Tonga" },
  { flag: "🇹🇹", name: "Trinidad and Tobago" },
  { flag: "🇹🇳", name: "Tunisia" },
  { flag: "🇹🇷", name: "Türkiye" },
  { flag: "🇹🇲", name: "Turkmenistan" },
  { flag: "🇹🇻", name: "Tuvalu" },
  { flag: "🇺🇬", name: "Uganda" },
  { flag: "🇺🇦", name: "Ukraine" },
  { flag: "🇦🇪", name: "United Arab Emirates" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇺🇾", name: "Uruguay" },
  { flag: "🇺🇿", name: "Uzbekistan" },
  { flag: "🇻🇺", name: "Vanuatu" },
  { flag: "🇻🇪", name: "Venezuela" },
  { flag: "🇻🇳", name: "Vietnam" },
  { flag: "🇾🇪", name: "Yemen" },
  { flag: "🇿🇲", name: "Zambia" },
  { flag: "🇿🇼", name: "Zimbabwe" },
].sort((a, b) => a.name.localeCompare(b.name));

const countryToDialCode: Record<string, string> = {
  "Afghanistan": "93",
  "Albania": "355",
  "Algeria": "213",
  "Andorra": "376",
  "Angola": "244",
  "Antigua and Barbuda": "1268",
  "Argentina": "54",
  "Armenia": "374",
  "Aruba": "297",
  "Australia": "61",
  "Austria": "43",
  "Azerbaijan": "994",
  "Bahamas": "1242",
  "Bahrain": "973",
  "Bangladesh": "880",
  "Barbados": "1246",
  "Belarus": "375",
  "Belgium": "32",
  "Belize": "501",
  "Benin": "229",
  "Bermuda": "1441",
  "Bhutan": "975",
  "Bolivia": "591",
  "Bosnia and Herzegovina": "387",
  "Botswana": "267",
  "Brazil": "55",
  "Brunei": "673",
  "Bulgaria": "359",
  "Burkina Faso": "226",
  "Burundi": "257",
  "Cambodia": "855",
  "Cameroon": "237",
  "Canada": "1",
  "Cape Verde": "238",
  "Cayman Islands": "1345",
  "Central African Republic": "236",
  "Chad": "235",
  "Chile": "56",
  "China": "86",
  "Colombia": "57",
  "Comoros": "269",
  "Congo": "242",
  "Costa Rica": "506",
  "Croatia": "385",
  "Cuba": "53",
  "Cyprus": "357",
  "Czech Republic": "420",
  "Denmark": "45",
  "Djibouti": "253",
  "Dominica": "1767",
  "Dominican Republic": "1809",
  "Ecuador": "593",
  "Egypt": "20",
  "El Salvador": "503",
  "Equatorial Guinea": "240",
  "Eritrea": "291",
  "Estonia": "372",
  "Ethiopia": "251",
  "Fiji": "679",
  "Finland": "358",
  "France": "33",
  "Gabon": "241",
  "Gambia": "220",
  "Georgia": "995",
  "Germany": "49",
  "Ghana": "233",
  "Greece": "30",
  "Grenada": "1473",
  "Guatemala": "502",
  "Guinea": "224",
  "Guinea-Bissau": "245",
  "Guyana": "592",
  "Haiti": "509",
  "Honduras": "504",
  "Hong Kong": "852",
  "Hungary": "36",
  "Iceland": "354",
  "India": "91",
  "Indonesia": "62",
  "Iran": "98",
  "Iraq": "964",
  "Ireland": "353",
  "Israel": "972",
  "Italy": "39",
  "Jamaica": "1876",
  "Japan": "81",
  "Jordan": "962",
  "Kazakhstan": "7",
  "Kenya": "254",
  "Kiribati": "686",
  "North Korea": "850",
  "South Korea": "82",
  "Kuwait": "965",
  "Kyrgyzstan": "996",
  "Laos": "856",
  "Latvia": "371",
  "Lebanon": "961",
  "Lesotho": "266",
  "Liberia": "231",
  "Libya": "218",
  "Liechtenstein": "423",
  "Lithuania": "370",
  "Luxembourg": "352",
  "Madagascar": "261",
  "Malawi": "265",
  "Malaysia": "60",
  "Maldives": "960",
  "Mali": "223",
  "Malta": "356",
  "Marshall Islands": "692",
  "Mauritania": "222",
  "Mauritius": "230",
  "Mexico": "52",
  "Micronesia": "691",
  "Moldova": "373",
  "Monaco": "377",
  "Mongolia": "976",
  "Montenegro": "382",
  "Morocco": "212",
  "Mozambique": "258",
  "Myanmar": "95",
  "Namibia": "264",
  "Nauru": "674",
  "Nepal": "977",
  "Netherlands": "31",
  "New Zealand": "64",
  "Nicaragua": "505",
  "Niger": "227",
  "Nigeria": "234",
  "North Macedonia": "389",
  "Norway": "47",
  "Oman": "968",
  "Pakistan": "92",
  "Palau": "680",
  "Palestine": "970",
  "Panama": "507",
  "Papua New Guinea": "675",
  "Paraguay": "595",
  "Peru": "51",
  "Philippines": "63",
  "Poland": "48",
  "Portugal": "351",
  "Puerto Rico": "1787",
  "Qatar": "974",
  "Romania": "40",
  "Russia": "7",
  "Rwanda": "250",
  "Saint Kitts and Nevis": "1869",
  "Saint Lucia": "1758",
  "Saint Vincent and the Grenadines": "1784",
  "Samoa": "685",
  "San Marino": "378",
  "Sao Tome and Principe": "239",
  "Saudi Arabia": "966",
  "Senegal": "221",
  "Serbia": "381",
  "Seychelles": "248",
  "Sierra Leone": "232",
  "Singapore": "65",
  "Slovakia": "421",
  "Slovenia": "386",
  "Solomon Islands": "677",
  "Somalia": "252",
  "South Africa": "27",
  "South Sudan": "211",
  "Spain": "34",
  "Sri Lanka": "94",
  "Sudan": "249",
  "Suriname": "597",
  "Eswatini": "268",
  "Sweden": "46",
  "Switzerland": "41",
  "Syria": "963",
  "Taiwan": "886",
  "Tajikistan": "992",
  "Tanzania": "255",
  "Thailand": "66",
  "Timor-Leste": "670",
  "Togo": "228",
  "Tonga": "676",
  "Trinidad and Tobago": "1868",
  "Tunisia": "216",
  "Türkiye": "90",
  "Turkmenistan": "993",
  "Tuvalu": "688",
  "Uganda": "256",
  "Ukraine": "380",
  "United Arab Emirates": "971",
  "United Kingdom": "44",
  "United States": "1",
  "Uruguay": "598",
  "Uzbekistan": "998",
  "Vanuatu": "678",
  "Venezuela": "58",
  "Vietnam": "84",
  "Yemen": "967",
  "Zambia": "260",
  "Zimbabwe": "263",
};

function getDialCode(countryName: string): string {
  return countryToDialCode[countryName] || "";
}

// ==================== SEARCHABLE COUNTRY COMBOBOX ====================
function CountryCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white h-10 text-left font-normal"
        >
          {value ? (
            <span className="flex items-center gap-2">
              <span className="text-xl">{countries.find((country) => country.name === value)?.flag}</span>
              {value}
            </span>
          ) : (
            "Select your country"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {countries.map((country) => (
                <CommandItem
                  key={country.name}
                  value={country.name}
                  onSelect={() => {
                    onChange(value === country.name ? "" : country.name);
                    setOpen(false);
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{country.flag}</span>
                    {country.name}
                  </span>
                  <Check
                    className={`ml-auto h-4 w-4 ${
                      value === country.name ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Static Data
const contactInfo = [
  { name: "Email", value: "office.cognicode@gmail.com", icon: Mail, description: "Send us an email anytime" },
  { name: "Phone", value: "+917000515617", icon: Phone, description: "Mon-Fri from 9am to 6pm IST" },
  { name: "Office", value: "B/2, Mahesh Nagar, Tulsi Vihar Colony, Gwalior, Madhya Pradesh 474002", icon: MapPin, description: "Visit our office" },
  { name: "Working Hours", value: "24/7 Online Support", icon: Clock, description: "We're always here to help" },
];

const serviceOptions = [
  "Thesis Writing Support", "Research Paper Writing", "Dissertation Support",
  "Literature Review", "Synopsis Writing", "Data Analysis",
  "Plagiarism Removal", "Editing & Proofreading", "Other",
];

const faqs = [
  { question: "How long does it take to complete a thesis?", answer: "Typically 3-6 months depending on complexity." },
  { question: "Do you provide a plagiarism report?", answer: "Yes, we provide a comprehensive Turnitin report." },
  { question: "Can I communicate directly with the writer?", answer: "Yes, direct communication is available." },
  { question: "What if I'm not satisfied with the work?", answer: "We offer free revisions." },
  { question: "Is my information kept confidential?", answer: "Absolutely. Strict confidentiality is maintained." },
  { question: "What payment methods do you accept?", answer: "Credit cards, bank transfers, and digital payments." },
];

export default function ContactPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");

  // Form states for normal users
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", country: "", service: "", subject: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Modal state
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // ==================== ADMIN STATUS CHECK ====================
  const checkAdminStatus = async () => {
    const stored = localStorage.getItem("admin");
    const shouldBeAdmin = !!stored;

    if (shouldBeAdmin !== isAdmin) {
      setIsAdmin(shouldBeAdmin);
      if (shouldBeAdmin) {
        await fetchAllRequests();
      }
    }
  };

  useEffect(() => {
    checkAdminStatus();

    window.addEventListener("storage", checkAdminStatus);
    window.addEventListener("focus", checkAdminStatus);
    window.addEventListener("adminStatusChanged", checkAdminStatus);

    return () => {
      window.removeEventListener("storage", checkAdminStatus);
      window.removeEventListener("focus", checkAdminStatus);
      window.removeEventListener("adminStatusChanged", checkAdminStatus);
    };
  }, [isAdmin]);

  const fetchAllRequests = async () => {
    setLoadingRequests(true);
    try {
      const result = await getData("clientrequests/get_clientrequests");
      if (result?.success && Array.isArray(result.requests)) {
        setRequests(result.requests);
      }
    } catch (error) {
      console.error("Error fetching client requests:", error);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dialCode = getDialCode(formData.country);
      const fullPhone = dialCode && formData.phone 
        ? `+${dialCode}${formData.phone.replace(/\D/g, '')}` 
        : formData.phone;

      const payload = {
        ...formData,
        phone: fullPhone,
      };

      const result = await postData("clientrequests/clientrequests", payload);
      if (result?.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", phone: "", country: "", service: "", subject: "", message: "" });
        }, 3000);
      } else {
        alert(result?.message || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== FILTERED & SORTED REQUESTS ====================
  const filteredRequests = useMemo(() => {
    let data = [...requests].sort((a, b) => Number(a.clientId) - Number(b.clientId));

    return data.filter((req) => {
      const matchesService = serviceFilter === "All" || req.service === serviceFilter;

      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        req.name?.toLowerCase().includes(searchLower) ||
        req.email?.toLowerCase().includes(searchLower) ||
        req.phone?.toLowerCase().includes(searchLower) ||
        req.country?.toLowerCase().includes(searchLower) ||
        req.subject?.toLowerCase().includes(searchLower) ||
        req.message?.toLowerCase().includes(searchLower) ||
        req.service?.toLowerCase().includes(searchLower);

      return matchesService && matchesSearch;
    });
  }, [requests, searchTerm, serviceFilter]);

  // ==================== COPY FULL DETAILS ====================
  const copyRequestDetails = async () => {
    if (!selectedRequest) return;

    const details = `
Client Request Details
──────────────────────
Query ID      : #${selectedRequest.clientId}
Name          : ${selectedRequest.name}
Email         : ${selectedRequest.email}
Phone         : ${selectedRequest.phone || "Not provided"}
Country       : ${selectedRequest.country || "Not provided"}
Service       : ${selectedRequest.service || "—"}
Subject       : ${selectedRequest.subject}
Message       : ${selectedRequest.message}
Submitted On  : ${new Date(selectedRequest.created_at).toLocaleString("en-IN")}
    `.trim();

    try {
      await navigator.clipboard.writeText(details);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      alert("Failed to copy to clipboard");
    }
  };

  // ==================== EXPORT TO EXCEL (CSV) ====================
  const exportToExcel = () => {
    if (filteredRequests.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = ["Sr. No.", "Query ID", "Name", "Email", "Phone", "Country", "Service", "Subject", "Message", "Submitted Date"];

    const rows = filteredRequests.map((req, index) => [
      index + 1,
      req.clientId,
      req.name,
      req.email,
      req.phone || "",
      req.country || "",
      req.service || "",
      req.subject,
      req.message,
      new Date(req.created_at).toLocaleDateString("en-IN"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `client-requests-${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-foreground py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl">
                Contact Us
              </h1>
              <p className="mt-6 text-lg leading-8 text-background/70">
                {isAdmin
                  ? "Managing all client inquiries • CogniCode Admin Portal"
                  : "Have a question or ready to start your project? Get in touch with our team."}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info) => (
                <div key={info.name} className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-border">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">{info.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{info.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form / Admin Table + FAQ */}
        <section className="bg-muted py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           {/* The main container wrapper now correctly adapts based on whether it's showing the admin layout or user layout */}
<div className={`grid grid-cols-1 gap-10 md:gap-16 ${isAdmin ? 'w-full' : 'lg:grid-cols-2'}`}>
  <div>
    {isAdmin ? (
      // Admin panel responsive updates
      <div className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">Client Requests</h2>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                COGNICODE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              onClick={fetchAllRequests}
              variant="outline"
              size="sm"
              disabled={loadingRequests}
              className="flex-1 sm:flex-initial text-xs sm:text-sm"
            >
              <RefreshCw className={`h-3.5 w-3.5 mr-1.5 sm:mr-2 ${loadingRequests ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button
              onClick={exportToExcel}
              variant="default"
              size="sm"
              className="flex-1 sm:flex-initial text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700"
            >
              <Download className="h-3.5 w-3.5 mr-1.5 sm:mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search name, email, phone, country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white w-full"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="bg-white w-full">
                <SelectValue placeholder="All Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Services</SelectItem>
                {serviceOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Highly Responsive Table Shell */}
        <div className="rounded-2xl border bg-card overflow-hidden shadow-sm max-w-full">
          <div className="overflow-x-auto w-full max-h-[520px]">
            <Table className="min-w-[900px] lg:min-w-full table-auto">
              <TableHeader className="sticky top-0 bg-black z-40 border-b border-white/20 shadow-md">
                <TableRow className="hover:bg-black">
                  <TableHead className="text-white font-semibold w-14 text-center py-4">Sr.</TableHead>
                  <TableHead className="text-white font-semibold py-4">Name</TableHead>
                  <TableHead className="text-white font-semibold py-4">Email</TableHead>
                  <TableHead className="text-white font-semibold py-4">Phone</TableHead>
                  <TableHead className="text-white font-semibold py-4">Country</TableHead>
                  <TableHead className="text-white font-semibold py-4">Service</TableHead>
                  <TableHead className="text-white font-semibold max-w-[150px] py-4">Subject</TableHead>
                  <TableHead className="text-white font-semibold max-w-[200px] py-4">Message</TableHead>
                  <TableHead className="text-white font-semibold w-24 text-right py-4 pr-4">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingRequests ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12 text-white/70 bg-black/90">
                      Loading requests...
                    </TableCell>
                  </TableRow>
                ) : filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                      {searchTerm || serviceFilter !== "All"
                        ? "No matching requests found"
                        : "No client requests yet."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((req: any, index: number) => (
                    <TableRow
                      key={req.clientId}
                      className="hover:bg-muted/70 cursor-pointer [&:nth-child(odd)]:bg-muted/30 border-b border-border/60 last:border-none transition-colors"
                      onClick={() => setSelectedRequest(req)}
                    >
                      <TableCell className="font-medium text-center px-2">{index + 1}</TableCell>
                      <TableCell className="font-medium max-w-[120px] truncate">{req.name}</TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        <a href={`mailto:${req.email}`} className="text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                          {req.email}
                        </a>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{req.phone || "—"}</TableCell>
                      <TableCell className="max-w-[100px] truncate">{req.country || "—"}</TableCell>
                      <TableCell className="max-w-[120px] truncate">{req.service || "—"}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{req.subject}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                        {req.message?.length > 60 ? `${req.message.substring(0, 57)}...` : req.message}
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground pr-4 whitespace-nowrap">
                        {new Date(req.created_at).toLocaleDateString("en-IN")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Dialog Component Responsive Refactoring */}
        <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
          <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[92vh] p-0 overflow-hidden rounded-2xl">
            <DialogHeader className="sticky top-0 z-50 bg-background border-b p-4 sm:p-6 flex flex-row items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <DialogTitle className="flex flex-wrap items-center gap-2 text-lg sm:text-xl font-bold">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Details
                  </span>
                  <Button
                    onClick={copyRequestDetails}
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-xs px-2"
                  >
                    <Copy className="h-3 w-3" />
                    {copySuccess ? "Copied!" : "Copy"}
                  </Button>
                </DialogTitle>
                
              </div>
              <DialogDescription className="mt-1 text-xs sm:text-sm truncate">
                  Query ID: <span className="font-mono bg-muted px-1.5 py-0.5 rounded">#{selectedRequest?.clientId}</span>
                </DialogDescription>

              <Button
                onClick={() => setSelectedRequest(null)}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 rounded-full shrink-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogHeader>

            <div className="overflow-y-auto p-4 sm:p-6 max-h-[calc(92vh-130px)]">
              <div className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium text-muted-foreground">Full Name</p>
                    <p className="text-base sm:text-lg font-semibold break-words">{selectedRequest?.name}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium text-muted-foreground">Country</p>
                    <p className="font-medium break-words">{selectedRequest?.country || "Not provided"}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium text-muted-foreground">Email Address</p>
                    <a href={`mailto:${selectedRequest?.email}`} className="font-medium text-blue-600 hover:underline block break-all">
                      {selectedRequest?.email}
                    </a>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium text-muted-foreground">Phone Number</p>
                    <p className="font-medium break-words">{selectedRequest?.phone || "Not provided"}</p>
                  </div>
                  <div className="space-y-0.5 sm:col-span-2">
                    <p className="text-xs font-medium text-muted-foreground">Service Required</p>
                    <p className="font-medium">{selectedRequest?.service || "—"}</p>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-muted-foreground">Subject</p>
                  <p className="text-sm sm:text-base font-medium leading-relaxed border-l-2 border-primary pl-3 break-words">
                    {selectedRequest?.subject}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Message</p>
                  <div className="bg-muted/70 p-4 sm:p-5 rounded-xl text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap max-h-[250px] overflow-y-auto border break-words">
                    {selectedRequest?.message}
                  </div>
                </div>

                <div className="pt-4 border-t text-xs text-muted-foreground flex flex-wrap items-center gap-1.5">
                  <span>Submitted on:</span>
                  <span className="font-medium">
                    {selectedRequest && new Date(selectedRequest.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    ) : (
      /* NORMAL USER FORM WITH ADAPTIVE LAYOUT BREAKPOINTS */
      <div className="w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
            <MessageSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-tight">Send Us a Message</h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-6 md:mb-8">
          Fill out the form below and we&apos;ll get back to you within 24 hours.
        </p>

        {isSubmitted ? (
          <div className="rounded-2xl bg-primary/10 p-6 sm:p-8 text-center">
            <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold">Message Sent Successfully!</h3>
            <p className="text-sm text-muted-foreground mt-2">We&apos;ll respond within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Full Name *</label>
                <Input className="bg-white w-full" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Email Address *</label>
                <Input className="bg-white w-full" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>

            {/* Country → Phone → Service (Adapts seamlessly across mobile, tablet, and desktop) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {/* Country */}
              <div className="sm:col-span-1">
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Country *</label>
                <CountryCombobox 
                  value={formData.country} 
                  onChange={(value) => setFormData({ ...formData, country: value })} 
                />
              </div>

              {/* Phone Number Input Custom Sizing Container */}
              <div className="sm:col-span-1 md:col-span-1">
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Phone Number</label>
                <div className="flex w-full">
                  <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 border border-r-0 bg-muted rounded-l-xl text-xs sm:text-sm font-medium text-muted-foreground min-w-[85px] sm:min-w-[100px] justify-center shrink-0">
                    {formData.country ? (
                      <>
                        <span className="text-lg sm:text-xl">
                          {countries.find((c) => c.name === formData.country)?.flag}
                        </span>
                        <span className="font-semibold text-foreground whitespace-nowrap">
                          +{getDialCode(formData.country)}
                        </span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">+</span>
                    )}
                  </div>

                  <Input 
                    className="rounded-l-none bg-white flex-1 min-w-0" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                    placeholder={formData.country ? "7000515617" : "Phone number"}
                    type="tel"
                  />
                </div>
                {formData.country && (
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Format: +{getDialCode(formData.country)} (number)
                  </p>
                )}
              </div>

              {/* Service Required */}
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Service Required *</label>
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Subject *</label>
              <Input className="bg-white w-full" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Message *</label>
              <Textarea className="bg-white w-full" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
            </div>

            <Button type="submit" size="lg" className="w-full text-sm sm:text-base py-5 sm:py-6" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : <span className="flex items-center justify-center gap-2">Send Message <Send className="h-4 w-4" /></span>}
            </Button>
          </form>
        )}
      </div>
    )}
  </div>

  {/* FAQ Column (Only displays when not in Admin perspective, stacks perfectly) */}
  {!isAdmin && (
    <div className="w-full lg:border-l lg:pl-10 xl:pl-16 border-border/40 mt-6 lg:mt-0">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
          <MessageSquare className="h-5 w-5 text-primary-foreground" />
        </div>
        <h2 className="font-serif text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/60">
            <AccordionTrigger className="text-left text-sm sm:text-base py-3.5 sm:py-4 hover:no-underline font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )}
</div>
          </div>
        </section>

        {/* Live Map + CTA sections unchanged */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <LiveTrackingMap />
          </div>
        </section>

        <section className="bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">Ready to Get Started?</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">Take the first step toward academic success.</p>
              <div className="mt-10 flex justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <a href="tel:+917000515617"><Phone className="mr-2 h-4 w-4" /> Call Now</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:office.cognicode@gmail.com"><Mail className="mr-2 h-4 w-4" /> Email Us</a>
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