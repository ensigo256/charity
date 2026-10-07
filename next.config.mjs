/** @type {import('next').NextConfig} */
const apiOrigin = new URL(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
).origin;
const cspMode = (process.env.NEXT_PUBLIC_CSP_MODE || "report-only").toLowerCase();
const isCspEnforced = cspMode === "enforce" || cspMode === "enforced";
const cspHeaderName = isCspEnforced
  ? "Content-Security-Policy"
  : "Content-Security-Policy-Report-Only";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
    : []),
  {
    key: cspHeaderName,
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self' https://buy.stripe.com",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://burst.shopifycdn.com https://encrypted-tbn0.gstatic.com https://html.kodesolution.com https://images.ladepeche.fr https://images.squarespace-cdn.com https://img.freepik.com https://invisiblechildren.com https://media.easy-peasy.ai https://pbs.twimg.com https://png.pngtree.com https://res.cloudinary.com https://thumbs.dreamstime.com",
      "font-src 'self' data:",
      `connect-src 'self' ${apiOrigin} https://api.cloudinary.com https://www.google-analytics.com https://region1.google-analytics.com https://vitals.vercel-insights.com`,
      "frame-src https://www.google.com",
      ...(process.env.NODE_ENV === "production" ? ["upgrade-insecure-requests"] : []),
    ].join("; "),
  },
];

const nextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
