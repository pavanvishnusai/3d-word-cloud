import React from "react";

export function HUD({ count }: { count: number }) {
  return (
    <div className="hud">
      <div><strong>3D Word Cloud</strong></div>
      <div className="small">Words: {count}</div>
      <div className="small">Drag: orbit • Scroll: zoom • Hover: focus</div>
    </div>
  );
}
