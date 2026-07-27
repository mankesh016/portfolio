import { MapPin, Mail, GraduationCap, Globe, Award, BookOpen, Star } from "lucide-react";

export const LUCIDE_ICON_MAP = {
  MapPin,
  Mail,
  GraduationCap,
  Globe,
  Award,
  BookOpen,
  Star,
} as const;

export type LucideIconKey = keyof typeof LUCIDE_ICON_MAP;
