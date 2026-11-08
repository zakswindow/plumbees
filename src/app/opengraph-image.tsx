import { ImageResponse } from "next/og";

export const alt = "Plumbees, plumbers in London";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#152138", color: "#fff" }}>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: 6 }}>
          <span>PLUMB</span>
          <span style={{ color: "#3981c3" }}>EE</span>
          <span>S</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 40, color: "#d3dcee" }}>Plumbers covering all of London</div>
        <div style={{ marginTop: 12, fontSize: 30, color: "#8fbbe6" }}>Repairs, emergencies and bathrooms</div>
      </div>
    ),
    size,
  );
}
