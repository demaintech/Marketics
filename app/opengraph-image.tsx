import { ImageResponse } from "next/og";

export const alt = "Marketics — Your Go-To Marketer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 72px",
          color: "#fff",
          background:
            "radial-gradient(ellipse at 68% 30%, rgba(124,58,237,.52), transparent 40%), radial-gradient(ellipse at 28% 85%, rgba(192,38,211,.25), transparent 38%), #050408",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.14,
            backgroundImage:
              "linear-gradient(rgba(196,181,253,.28) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,253,.28) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse at center, black 5%, transparent 76%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-1px",
          }}
        >
          <div
            style={{
              width: 13,
              height: 13,
              borderRadius: 999,
              background: "#c084fc",
              boxShadow: "0 0 24px #c084fc",
            }}
          />
          marketics
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#e9d5ff",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Marketing for what&apos;s next
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              lineHeight: 0.98,
              fontWeight: 700,
              letterSpacing: "-6px",
            }}
          >
            <div style={{ display: "flex" }}>
              Your <span style={{ color: "#d8b4fe", marginLeft: 20 }}>Go-To</span>
            </div>
            <div style={{ display: "flex" }}>Marketer</div>
          </div>
          <div
            style={{
              width: 390,
              height: 8,
              borderRadius: 999,
              marginLeft: 4,
              background: "linear-gradient(90deg, #8b5cf6, #d946ef)",
              transform: "rotate(-1deg)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#c4b5fd",
            fontSize: 17,
            letterSpacing: "1px",
          }}
        >
          <span>STRATEGY · BRAND · GROWTH</span>
          <span>marketics.biz</span>
        </div>
      </div>
    ),
    size,
  );
}
