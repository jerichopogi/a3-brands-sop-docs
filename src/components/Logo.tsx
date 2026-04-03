"use client";

export default function Logo({ size = "md", variant = "dark" }: { size?: "sm" | "md" | "lg"; variant?: "dark" | "light" }) {
  const dims = { sm: { w: 120, h: 48 }, md: { w: 180, h: 72 }, lg: { w: 260, h: 104 } };
  const { w, h } = dims[size];

  // "dark" variant = for dark backgrounds (light text), "light" variant = for light backgrounds (dark text)
  const grayColor = variant === "dark" ? "#d1d5db" : "#6B7280";
  const mutedColor = variant === "dark" ? "#9ca3af" : "#9ca3af";
  const brandGreen = "#5a9e3a";

  return (
    <svg width={w} height={h} viewBox="0 0 260 104" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Car silhouette */}
      <path
        d="M40 62 C50 58, 70 45, 100 42 C130 39, 160 40, 185 42 C200 43, 215 48, 220 55 L220 62 C215 65, 200 66, 185 65 C170 64, 130 64, 100 65 C70 66, 50 65, 40 62Z"
        stroke={grayColor}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Car window */}
      <path
        d="M110 44 C125 41, 145 40, 165 42 C170 42, 178 45, 182 50 L108 50 Z"
        stroke={mutedColor}
        strokeWidth="1"
        fill="none"
      />
      {/* Bar chart */}
      <rect x="120" y="30" width="12" height="20" rx="1" fill={grayColor} opacity="0.4" />
      <rect x="136" y="24" width="12" height="26" rx="1" fill={grayColor} opacity="0.5" />
      <rect x="152" y="18" width="12" height="32" rx="1" fill={brandGreen} opacity="0.6" />
      <rect x="168" y="10" width="12" height="40" rx="1" fill={brandGreen} opacity="0.7" />
      <rect x="184" y="4" width="12" height="46" rx="1" fill={brandGreen} opacity="0.9" />
      {/* A3 text */}
      <text x="30" y="92" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="34" fill={brandGreen}>A3</text>
      {/* Brands text */}
      <text x="82" y="92" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="34" fill={grayColor}>Brands</text>
      {/* LLC */}
      <text x="202" y="78" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="10" fill={mutedColor}>LLC</text>
      {/* Tagline */}
      <text x="36" y="103" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="8" letterSpacing="3" fill={mutedColor}>AUTOMOTIVE SEO EXPERTS</text>
    </svg>
  );
}
