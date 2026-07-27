"use client";

import React from "react";
import {
  Globe,
  List,
  Tag,
  Fingerprint,
  Search,
  Link as LinkIcon,
  User,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
  Share2,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  ArrowLeft,
} from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number;
}

export function Icon({ name, className = "", size = 20, ...props }: IconProps) {
  switch (name.toLowerCase()) {
    case "globe":
      return <Globe size={size} className={className} {...props} />;
    case "list":
      return <List size={size} className={className} {...props} />;
    case "tag":
      return <Tag size={size} className={className} {...props} />;
    case "fingerprint":
      return <Fingerprint size={size} className={className} {...props} />;
    case "search":
      return <Search size={size} className={className} {...props} />;
    case "link":
      return <LinkIcon size={size} className={className} {...props} />;
    case "user":
      return <User size={size} className={className} {...props} />;
    case "mail":
      return <Mail size={size} className={className} {...props} />;
    case "menu":
      return <Menu size={size} className={className} {...props} />;
    case "moon":
      return <Moon size={size} className={className} {...props} />;
    case "sun":
      return <Sun size={size} className={className} {...props} />;
    case "x":
    case "close":
      return <X size={size} className={className} {...props} />;
    case "share":
      return <Share2 size={size} className={className} {...props} />;
    case "chevron-right":
      return <ChevronRight size={size} className={className} {...props} />;
    case "chevron-left":
      return <ChevronLeft size={size} className={className} {...props} />;
    case "calendar":
      return <Calendar size={size} className={className} {...props} />;
    case "clock":
      return <Clock size={size} className={className} {...props} />;
    case "arrow-left":
      return <ArrowLeft size={size} className={className} {...props} />;
    default:
      return <Globe size={size} className={className} {...props} />;
  }
}
