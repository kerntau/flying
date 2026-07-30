"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      const { name, value, id } = metric;
      const roundedValue = Math.round(name === "CLS" ? value * 1000 : value);
      console.debug(
        `%c[Web Vitals] ${name}: ${roundedValue}${name === "CLS" ? " (x1000)" : "ms"} (ID: ${id})`,
        "color: #10b981; font-weight: bold;"
      );
    }
  });

  return null;
}
