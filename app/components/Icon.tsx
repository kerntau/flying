"use client";

import React from "react";
import {
  Home,
  Archive,
  FolderTree,
  Hash,
  Image as ImageIcon,
  Link2,
  User,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
  Share2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Lock,
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Video,
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquare,
  Globe,
  List,
  Tag,
  Search,
} from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, className = "", size = 18, strokeWidth = 1.75, ...props }: IconProps) {
  const iconProps = { size, strokeWidth, className, ...props };

  switch (name.toLowerCase()) {
    case "home":
      return <Home {...iconProps} />;
    case "archive":
      return <Archive {...iconProps} />;
    case "folder":
    case "categories":
      return <FolderTree {...iconProps} />;
    case "hash":
    case "tags":
      return <Hash {...iconProps} />;
    case "image":
    case "photos":
      return <ImageIcon {...iconProps} />;
    case "link":
    case "links":
      return <Link2 {...iconProps} />;
    case "user":
    case "about":
      return <User {...iconProps} />;
    case "lock":
      return <Lock {...iconProps} />;
    case "globe":
      return <Globe {...iconProps} />;
    case "list":
      return <List {...iconProps} />;
    case "tag":
      return <Tag {...iconProps} />;
    case "search":
      return <Search {...iconProps} />;
    case "facebook":
      return (
        <svg viewBox="0 0 256 256" width={size} height={size} fill="currentColor" className={className} {...props}>
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V120a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v16H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,24,0Z" />
        </svg>
      );
    case "x":
    case "twitter":
      return (
        <svg viewBox="0 0 256 256" width={size} height={size} fill="currentColor" className={className} {...props}>
          <path d="M214.75,211.71l-62.6-83.81,60.29-67A8,8,0,0,0,206.47,50H174.54a8,8,0,0,0-6.4,3.16l-46.7,62.06L79.16,53.16A8,8,0,0,0,72.76,50H41.53a8,8,0,0,0-6,13.29l62.6,83.82L37.84,214.1A8,8,0,0,0,43.81,227H75.74a8,8,0,0,0,6.4-3.16l49.27-65.48,44.82,59.76a8,8,0,0,0,6.4,3.16h31.23a8,8,0,0,0,6-13.29Z" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 256 256" width={size} height={size} fill="currentColor" className={className} {...props}>
          <path d="M236.88,26.19a9,9,0,0,0-9.16-1.57L22.22,103.14a9,9,0,0,0-.43,16.59l59.5,29.75,24.63,65.68A9,9,0,0,0,114.41,221c.21,0,.43,0,.64,0a9,9,0,0,0,7.18-4.16l25-38.45,45.42,30.28A9,9,0,0,0,207,203.41L239.39,34.81A9,9,0,0,0,236.88,26.19ZM189,190.91l-47.07-31.38a9,9,0,0,0-12,2l-14.7,22.61L100.91,146l88.58-66.43a8,8,0,0,0-9.6-12.8L79.4,142.16,39.69,122.3,215,52.27Z" />
        </svg>
      );
    case "outlook":
    case "email":
      return (
        <svg viewBox="0 0 256 256" width={size} height={size} fill="currentColor" className={className} {...props}>
          <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm-8,144H40V80l88,55,88-55ZM128,119,40,64H216Z" />
        </svg>
      );
    case "mail":
      return <Mail {...iconProps} />;
    case "menu":
      return <Menu {...iconProps} />;
    case "moon":
      return <Moon {...iconProps} />;
    case "sun":
      return <Sun {...iconProps} />;
    case "x":
    case "close":
      return <X {...iconProps} />;
    case "share":
      return <Share2 {...iconProps} />;
    case "chevron-right":
      return <ChevronRight {...iconProps} />;
    case "chevron-left":
      return <ChevronLeft {...iconProps} />;
    case "chevron-down":
      return <ChevronDown {...iconProps} />;
    case "calendar":
      return <Calendar {...iconProps} />;
    case "clock":
      return <Clock {...iconProps} />;
    case "arrow-left":
      return <ArrowLeft {...iconProps} />;
    case "arrow-right":
      return <ArrowRight {...iconProps} />;
    case "video":
      return <Video {...iconProps} />;
    case "panel-left-close":
      return <PanelLeftClose {...iconProps} />;
    case "panel-left-open":
      return <PanelLeftOpen {...iconProps} />;
    case "message-square":
    case "chat":
      return <MessageSquare {...iconProps} />;
    default:
      return <Home {...iconProps} />;
  }
}
