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
  Search,
  FileText,
  Tag,
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
    case "file-text":
    case "file":
      return <FileText {...iconProps} />;
    case "search":
      return <Search {...iconProps} />;
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "x":
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} {...props}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      );
    case "outlook":
    case "email":
    case "mail":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "panel-left":
    case "panel-left-close":
    case "panel-close":
    case "sidebar-collapse":
      return <PanelLeftClose {...iconProps} />;
    case "panel-left-open":
    case "panel-open":
    case "sidebar-expand":
      return <PanelLeftOpen {...iconProps} />;
    case "menu":
      return <Menu {...iconProps} />;
    case "moon":
      return <Moon {...iconProps} />;
    case "sun":
      return <Sun {...iconProps} />;
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
