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
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} {...props}>
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03.7-1.5 1.5-1.5h2v-3.8c-.78-.1-2.17-.2-3.5-.2-3.6 0-5.5 2.1-5.5 5.5v2H5.5v4H9v10.5h5V13.5z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} {...props}>
          <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.54 1.06 1.54 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.25 9.25 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.59.69.49A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
        </svg>
      );
    case "x-social":
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} {...props}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} {...props}>
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S17.63 0 12 0zm5.56 8.16l-2.02 9.53c-.15.68-.55.84-1.12.52l-3.1-2.28-1.5 1.44c-.16.16-.3.3-.61.3l.22-3.17 5.77-5.21c.25-.22-.05-.34-.39-.12l-7.13 4.49-3.07-.96c-.67-.21-.68-.67.14-.99l12.01-4.63c.56-.21 1.05.13.8 1.08z" />
        </svg>
      );
    case "outlook":
    case "email":
    case "mail":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} {...props}>
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
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
    case "moments":
    case "log":
    case "logs":
    case "message-square":
    case "chat":
      return <MessageSquare {...iconProps} />;
    default:
      return <Home {...iconProps} />;
  }
}
