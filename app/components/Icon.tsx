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
  Calendar,
  Clock,
  ArrowLeft,
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
    case "globe":
      return <Globe {...iconProps} />;
    case "list":
      return <List {...iconProps} />;
    case "tag":
      return <Tag {...iconProps} />;
    case "search":
      return <Search {...iconProps} />;
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
    case "calendar":
      return <Calendar {...iconProps} />;
    case "clock":
      return <Clock {...iconProps} />;
    case "arrow-left":
      return <ArrowLeft {...iconProps} />;
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
