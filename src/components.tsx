import { useState, useEffect } from "react";
import { C, type Page } from "./tokens.ts";

// ═══════════════════════════════════════════════════
//   GLOBAL STYLES
// ═══════════════════════════════════════════════════
export const GlobalStyles: React.FC = () => {
  useEffect(() => {
    const id = "cc-global";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Boogaloo&display=swap');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Nunito', sans-serif; }
      input::placeholder, textarea::placeholder { color: #FFB3DE; font-weight: 600; font-family: 'Nunito', sans-serif; }
      input:focus, textarea:focus, select:focus { outline: none; }
      button { font-family: 'Nunito', sans-serif; cursor: pointer; }
      @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
      @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.4} }
      .anim-fadeup { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
      .anim-delay1 { animation-delay: 0.1s; }
      .anim-delay2 { animation-delay: 0.2s; }
      .anim-delay3 { animation-delay: 0.3s; }
      .anim-delay4 { animation-delay: 0.4s; }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
};

// ═══════════════════════════════════════════════════
//   NAV
// ═══════════════════════════════════════════════════
interface NavProps {
  onNav: (target: Page, id?: string) => void;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export const Nav: React.FC<NavProps> = ({ onNav, center, right }) => (
  <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 48px", borderBottom:C.border, background:C.white, position:"sticky", top:0, zIndex:100, fontFamily:"'Nunito',sans-serif" }}>
    <button onClick={()=>onNav("home")} style={{ display:"flex", alignItems:"center", gap:10, background:"none", border:"none", cursor:"pointer", padding:0 }}>
      <div style={{ width:40, height:40, borderRadius:"50%", border:C.border, background:C.pinkPale, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13, color:C.navy, letterSpacing:"-0.5px" }}>CC</div>
      <span style={{ fontWeight:800, fontSize:17, color:C.navy, letterSpacing:"-0.3px" }}>CampusCrew</span>
    </button>
    {center && <div style={{ display:"flex", gap:32 }}>{center}</div>}
    <div style={{ display:"flex", gap:10, alignItems:"center" }}>{right}</div>
  </nav>
);

// ═══════════════════════════════════════════════════
//   NAV LINK
// ═══════════════════════════════════════════════════
interface NavLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ children, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ background:"none", border:"none", fontWeight:700, fontSize:13, color:hov?C.pink:C.navy, textTransform:"uppercase", letterSpacing:"0.5px", cursor:"pointer", transition:"color 0.18s", fontFamily:"'Nunito',sans-serif" }}
    >
      {children}
    </button>
  );
};

// ═══════════════════════════════════════════════════
//   PINK BUTTON
// ═══════════════════════════════════════════════════
interface PinkBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  small?: boolean;
  outline?: boolean;
  style?: React.CSSProperties;
}

export const PinkBtn: React.FC<PinkBtnProps> = ({ children, onClick, small = false, outline = false, style: extraStyle }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background: outline ? (hov ? C.navy : "transparent") : (hov ? C.navy : C.pink),
        color: C.white,
        border: outline ? C.border : "2.5px solid #1B1464",
        borderRadius: 99,
        padding: small ? "9px 20px" : "12px 26px",
        fontWeight: 800,
        fontSize: small ? 12 : 13,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: 8,
        whiteSpace: "nowrap",
        fontFamily: "'Nunito',sans-serif",
        ...extraStyle,
      }}
    >
      {children}
    </button>
  );
};

// ═══════════════════════════════════════════════════
//   DOODLE ACCENT
// ═══════════════════════════════════════════════════
interface DoodleAccentProps {
  style?: React.CSSProperties;
}

export const DoodleAccent: React.FC<DoodleAccentProps> = ({ style = {} }) => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none" style={style}>
    <path d="M10 30 Q20 10 35 30 Q50 50 65 30" stroke="#1B1464" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M60 10 L63 18 L71 21 L63 24 L60 32 L57 24 L49 21 L57 18Z" fill="#FF69B4" opacity="0.8"/>
    <circle cx="15" cy="48" r="4" fill="#FF69B4" opacity="0.6"/>
    <circle cx="25" cy="52" r="3" fill="#FF69B4" opacity="0.4"/>
  </svg>
);