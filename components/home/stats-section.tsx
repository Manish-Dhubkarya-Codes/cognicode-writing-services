import Image from "next/image";
import { Clock, Users, FileText, Award } from "lucide-react";
import Trusted_Scholars from "../../public/Trusted_Scholars.png";
const stats = [
  {
    id: 1,
    name: "Years of Experience",
    value: "15+",
    icon: Clock,
    description: "Trusted expertise since 2009",
  },
  {
    id: 2,
    name: "Projects Completed",
    value: "12,000+",
    icon: FileText,
    description: "Across all academic disciplines",
  },
  {
    id: 3,
    name: "Satisfied Clients",
    value: "8,000+",
    icon: Users,
    description: "Scholars worldwide trust us",
  },
  {
    id: 4,
    name: "Delivery Rate",
    value: "100%",
    icon: Award,
    description: "On-time, every time",
  },
];

export function StatsSection() {
  return (
<div>
  <Image src={Trusted_Scholars} alt="Trusted Scholars" className="w-full h-auto mb-8 x-8 rounded-lg shadow-lg" />
</div>
  );
}
