export type CountryCode = {
  iso: string;
  name: string;
  dial: string;
  flag: string;
};

/** Popular first, then A–Z. Dial is digits only (no +). */
export const COUNTRY_CODES: CountryCode[] = [
  { iso: "IN", name: "India", dial: "91", flag: "🇮🇳" },
  { iso: "GB", name: "United Kingdom", dial: "44", flag: "🇬🇧" },
  { iso: "US", name: "United States", dial: "1", flag: "🇺🇸" },
  { iso: "AE", name: "United Arab Emirates", dial: "971", flag: "🇦🇪" },
  { iso: "CA", name: "Canada", dial: "1", flag: "🇨🇦" },
  { iso: "AU", name: "Australia", dial: "61", flag: "🇦🇺" },
  { iso: "DE", name: "Germany", dial: "49", flag: "🇩🇪" },
  { iso: "SA", name: "Saudi Arabia", dial: "966", flag: "🇸🇦" },
  { iso: "QA", name: "Qatar", dial: "974", flag: "🇶🇦" },
  { iso: "KW", name: "Kuwait", dial: "965", flag: "🇰🇼" },
  { iso: "OM", name: "Oman", dial: "968", flag: "🇴🇲" },
  { iso: "BH", name: "Bahrain", dial: "973", flag: "🇧🇭" },
  { iso: "SG", name: "Singapore", dial: "65", flag: "🇸🇬" },
  { iso: "MY", name: "Malaysia", dial: "60", flag: "🇲🇾" },
  { iso: "NP", name: "Nepal", dial: "977", flag: "🇳🇵" },
  { iso: "BD", name: "Bangladesh", dial: "880", flag: "🇧🇩" },
  { iso: "LK", name: "Sri Lanka", dial: "94", flag: "🇱🇰" },
  { iso: "PK", name: "Pakistan", dial: "92", flag: "🇵🇰" },
  { iso: "NG", name: "Nigeria", dial: "234", flag: "🇳🇬" },
  { iso: "ZA", name: "South Africa", dial: "27", flag: "🇿🇦" },
  { iso: "KE", name: "Kenya", dial: "254", flag: "🇰🇪" },
  { iso: "IE", name: "Ireland", dial: "353", flag: "🇮🇪" },
  { iso: "NZ", name: "New Zealand", dial: "64", flag: "🇳🇿" },
  { iso: "FR", name: "France", dial: "33", flag: "🇫🇷" },
  { iso: "IT", name: "Italy", dial: "39", flag: "🇮🇹" },
  { iso: "ES", name: "Spain", dial: "34", flag: "🇪🇸" },
  { iso: "NL", name: "Netherlands", dial: "31", flag: "🇳🇱" },
  { iso: "CH", name: "Switzerland", dial: "41", flag: "🇨🇭" },
  { iso: "SE", name: "Sweden", dial: "46", flag: "🇸🇪" },
  { iso: "NO", name: "Norway", dial: "47", flag: "🇳🇴" },
  { iso: "DK", name: "Denmark", dial: "45", flag: "🇩🇰" },
  { iso: "FI", name: "Finland", dial: "358", flag: "🇫🇮" },
  { iso: "BE", name: "Belgium", dial: "32", flag: "🇧🇪" },
  { iso: "AT", name: "Austria", dial: "43", flag: "🇦🇹" },
  { iso: "PT", name: "Portugal", dial: "351", flag: "🇵🇹" },
  { iso: "PL", name: "Poland", dial: "48", flag: "🇵🇱" },
  { iso: "TR", name: "Turkey", dial: "90", flag: "🇹🇷" },
  { iso: "EG", name: "Egypt", dial: "20", flag: "🇪🇬" },
  { iso: "CN", name: "China", dial: "86", flag: "🇨🇳" },
  { iso: "JP", name: "Japan", dial: "81", flag: "🇯🇵" },
  { iso: "KR", name: "South Korea", dial: "82", flag: "🇰🇷" },
  { iso: "PH", name: "Philippines", dial: "63", flag: "🇵🇭" },
  { iso: "ID", name: "Indonesia", dial: "62", flag: "🇮🇩" },
  { iso: "TH", name: "Thailand", dial: "66", flag: "🇹🇭" },
  { iso: "VN", name: "Vietnam", dial: "84", flag: "🇻🇳" },
  { iso: "BR", name: "Brazil", dial: "55", flag: "🇧🇷" },
  { iso: "MX", name: "Mexico", dial: "52", flag: "🇲🇽" },
  { iso: "AR", name: "Argentina", dial: "54", flag: "🇦🇷" },
  { iso: "GH", name: "Ghana", dial: "233", flag: "🇬🇭" },
  { iso: "UG", name: "Uganda", dial: "256", flag: "🇺🇬" },
  { iso: "TZ", name: "Tanzania", dial: "255", flag: "🇹🇿" },
  { iso: "RW", name: "Rwanda", dial: "250", flag: "🇷🇼" },
  { iso: "ET", name: "Ethiopia", dial: "251", flag: "🇪🇹" },
  { iso: "MA", name: "Morocco", dial: "212", flag: "🇲🇦" },
  { iso: "JO", name: "Jordan", dial: "962", flag: "🇯🇴" },
  { iso: "LB", name: "Lebanon", dial: "961", flag: "🇱🇧" },
  { iso: "IQ", name: "Iraq", dial: "964", flag: "🇮🇶" },
  { iso: "IR", name: "Iran", dial: "98", flag: "🇮🇷" },
  { iso: "RU", name: "Russia", dial: "7", flag: "🇷🇺" },
  { iso: "UA", name: "Ukraine", dial: "380", flag: "🇺🇦" },
  { iso: "HK", name: "Hong Kong", dial: "852", flag: "🇭🇰" },
  { iso: "TW", name: "Taiwan", dial: "886", flag: "🇹🇼" },
];

export const DEFAULT_COUNTRY_DIAL = "91";

export function findCountry(dial: string, iso?: string) {
  if (iso) {
    const byIso = COUNTRY_CODES.find((c) => c.iso === iso);
    if (byIso) return byIso;
  }
  return COUNTRY_CODES.find((c) => c.dial === dial) || COUNTRY_CODES[0];
}
