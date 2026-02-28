import { useState } from "react";
import { C, type Event, fmt, getStatus } from "./tokens.ts";

// ═══════════════════════════════════════════════════
//   TYPES
// ═══════════════════════════════════════════════════
interface EventCardProps {
  ev: Event;
  onClick: () => void;
}

// ═══════════════════════════════════════════════════
//   EVENT CARD
// ═══════════════════════════════════════════════════
const EventCard: React.FC<EventCardProps> = ({ ev, onClick }) => {
  const s = getStatus(ev.requiredRoles);
  const [hov, setHov] = useState(false);
  const [btnHov, setBtnHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: C.border,
        borderRadius: 16,
        overflow: "hidden",
        background: C.white,
        cursor: "pointer",
        transition: "all 0.25s",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov ? `4px 8px 0 ${C.navy}` : "none",
      }}
    >
      {/* Poster Image */}
      <div style={{ position:"relative", height:190, overflow:"hidden" }}>
        <img
          src={ev.poster}
          alt={ev.title}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s", transform:hov?"scale(1.07)":"scale(1)", filter:hov?"grayscale(0%)":"grayscale(30%)" }}
          onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=380&fit=crop"; }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(27,20,100,0.5) 0%,transparent 55%)" }}/>
        {/* Category badge */}
        <span style={{ position:"absolute", top:12, left:12, background:C.navy, color:C.white, fontSize:11, fontWeight:700, padding:"5px 13px", borderRadius:99, letterSpacing:0.5 }}>
          {ev.category}
        </span>
        {/* Status pill */}
        <div style={{ position:"absolute", top:12, right:12, display:"flex", alignItems:"center", gap:5, background:`${C.white}ee`, backdropFilter:"blur(6px)", borderRadius:99, padding:"5px 11px", border:C.border }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:s.dot, display:"block" }}/>
          <span style={{ fontSize:11, fontWeight:700, color:C.navy }}>{s.label}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:"18px 20px 0", borderTop:C.border }}>
        <div style={{ color:C.pink, fontSize:12, fontWeight:700, marginBottom:5, textTransform:"uppercase", letterSpacing:0.5 }}>{fmt(ev.date)}</div>
        <h3 style={{ fontFamily:"'Boogaloo',cursive", fontSize:22, color:C.navy, marginBottom:6, lineHeight:1.2, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{ev.title}</h3>
        <p style={{ color:C.navy, fontSize:12, fontWeight:600, lineHeight:1.6, opacity:0.65, marginBottom:16, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{ev.description}</p>
      </div>

      {/* Footer button */}
      <div style={{ borderTop:C.border }}>
        <button
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          style={{ width:"100%", padding:"13px 20px", background:btnHov?C.navy:C.pink, border:"none", display:"flex", alignItems:"center", justifyContent:"space-between", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:12, textTransform:"uppercase", letterSpacing:1, color:C.white, cursor:"pointer", transition:"all 0.2s" }}
        >
          <span>{ev.club}</span>
          <i className="fa-solid fa-chevron-right" style={{ fontSize:12 }}/>
        </button>
      </div>
    </div>
  );
};

export default EventCard;