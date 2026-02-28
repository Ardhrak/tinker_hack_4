import { useState } from "react";
import { C, type Event, type Page, fmtL, getStatus } from "./tokens.ts";
import { GlobalStyles, Nav, PinkBtn } from "./components.tsx";

// ═══════════════════════════════════════════════════
//   TYPES
// ═══════════════════════════════════════════════════
interface EventDetailsPageProps {
  onNav: (target: Page, id?: string) => void;
  event: Event | null;
}

// ═══════════════════════════════════════════════════
//   EVENT DETAILS PAGE
// ═══════════════════════════════════════════════════
const EventDetailsPage: React.FC<EventDetailsPageProps> = ({ onNav, event }) => {
  const [interested, setInterested] = useState(false);
  const [modal, setModal] = useState(false);

  // Not found state
  if (!event) return (
    <div style={{ minHeight:"100vh", background:C.pinkPale, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Nunito',sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <i className="fa-solid fa-circle-exclamation" style={{ fontSize:56, color:C.pink, marginBottom:16, display:"block" }}/>
        <h2 style={{ fontFamily:"'Boogaloo',cursive", fontSize:36, color:C.navy, marginBottom:20 }}>Event Not Found</h2>
        <PinkBtn onClick={() => onNav("explore")}>
          <i className="fa-solid fa-compass"/>Browse Events
        </PinkBtn>
      </div>
    </div>
  );

  const s = getStatus(event.requiredRoles);

  // Sidebar info rows
  type InfoRow = [string, string, string];
  const infoRows: (InfoRow | false)[] = [
    ["fa-solid fa-calendar-days",    "Date",         fmtL(event.date)],
    ["fa-solid fa-building-columns", "Organized by", event.club || "Campus Club"],
    ["fa-solid fa-chart-bar",        "Status",       s.desc],
    event.contact ? ["fa-solid fa-envelope", "Contact", event.contact] : false,
  ];

  return (
    <div style={{ minHeight:"100vh", background:C.white, fontFamily:"'Nunito',sans-serif" }}>
      <GlobalStyles />
      <Nav
        onNav={onNav}
        right={
          <button
            onClick={() => onNav("explore")}
            onMouseEnter={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = C.white; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.navy; }}
            style={{ background:"transparent", border:C.border, color:C.navy, fontWeight:700, fontSize:13, padding:"9px 20px", borderRadius:99, cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.18s", textTransform:"uppercase", letterSpacing:0.5, fontFamily:"'Nunito',sans-serif" }}>
            <i className="fa-solid fa-arrow-left"/>Back
          </button>
        }
      />

      <div style={{ maxWidth:980, margin:"0 auto", padding:"44px 24px 80px" }}>

        {/* ── Hero Image ── */}
        <div style={{ border:C.border, borderRadius:16, overflow:"hidden", marginBottom:24, height:340, position:"relative" }}>
          <img
            src={event.poster}
            alt={event.title}
            style={{ width:"100%", height:"100%", objectFit:"cover" }}
            onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop"; }}
          />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(27,20,100,0.78) 0%,rgba(27,20,100,0.05) 55%,transparent)" }}/>
          <div style={{ position:"absolute", bottom:28, left:32, right:32 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12, flexWrap:"wrap" }}>
              <span style={{ background:C.pink, color:C.white, fontSize:12, fontWeight:700, padding:"6px 15px", borderRadius:99, border:`1.5px solid ${C.white}40` }}>{event.category}</span>
              {event.subcategory && (
                <span style={{ background:`${C.white}25`, backdropFilter:"blur(8px)", color:C.white, fontSize:12, fontWeight:600, padding:"6px 15px", borderRadius:99, border:`1px solid ${C.white}35` }}>{event.subcategory}</span>
              )}
              <div style={{ display:"flex", alignItems:"center", gap:6, background:`${C.white}20`, backdropFilter:"blur(8px)", borderRadius:99, padding:"6px 13px", border:`1px solid ${C.white}30` }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:s.dot, display:"block" }}/>
                <span style={{ fontSize:12, fontWeight:700, color:C.white }}>{s.label}</span>
              </div>
            </div>
            <h1 style={{ fontFamily:"'Boogaloo',cursive", color:C.white, fontSize:"clamp(28px,4vw,48px)", lineHeight:1.05, letterSpacing:0.5 }}>{event.title}</h1>
          </div>
        </div>

        {/* ── 2-col layout ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:20, alignItems:"start" }}>

          {/* Left: Description + Roles */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ background:C.pinkCard, border:C.border, borderRadius:16, padding:"28px" }}>
              <h2 style={{ fontFamily:"'Boogaloo',cursive", fontSize:28, color:C.pink, marginBottom:14, letterSpacing:0.5 }}>About This Event</h2>
              <p style={{ color:C.navy, lineHeight:1.8, fontSize:14, fontWeight:600 }}>{event.description}</p>
            </div>

            {event.requiredRoles.length > 0 && (
              <div style={{ background:C.pinkCard, border:C.border, borderRadius:16, padding:"28px" }}>
                <h2 style={{ fontFamily:"'Boogaloo',cursive", fontSize:28, color:C.pink, marginBottom:14, letterSpacing:0.5 }}>
                  Required Roles{" "}
                  <span style={{ fontSize:16, fontWeight:600, color:C.navy, fontFamily:"'Nunito',sans-serif" }}>({event.requiredRoles.length} open)</span>
                </h2>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {event.requiredRoles.map((r, i) => (
                    <span key={i} style={{ background:C.white, color:C.navy, fontSize:12, fontWeight:700, padding:"8px 16px", borderRadius:99, border:C.border }}>{r}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {/* Info card */}
            <div style={{ background:C.pinkCard, border:C.border, borderRadius:16, padding:"22px" }}>
              {(infoRows.filter(Boolean) as InfoRow[]).map(([icon, label, val], i, arr) => (
                <div key={i}>
                  <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                    <div style={{ width:38, height:38, borderRadius:10, background:C.white, border:C.border, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>
                      <i className={icon} style={{ color:C.navy }}/>
                    </div>
                    <div style={{ minWidth:0 }}>
                      <div style={{ color:C.navy, fontSize:9, fontWeight:800, letterSpacing:"2.5px", textTransform:"uppercase", marginBottom:3, opacity:0.55 }}>{label}</div>
                      <div style={{ color:C.navy, fontWeight:700, fontSize:12, wordBreak:"break-word", lineHeight:1.45 }}>{val}</div>
                    </div>
                  </div>
                  {i < arr.length - 1 && <div style={{ borderTop:C.border, margin:"14px 0" }}/>}
                </div>
              ))}
            </div>

            {/* Interest button */}
            <button
              onClick={() => { if (!interested) { setInterested(true); setModal(true); } }}
              disabled={interested}
              onMouseEnter={e => { if (!interested) e.currentTarget.style.background = C.navy; }}
              onMouseLeave={e => { if (!interested) e.currentTarget.style.background = C.pink; }}
              style={{ width:"100%", fontFamily:"'Nunito',sans-serif", background:interested?"#22c55e18":C.pink, color:interested?"#22c55e":C.white, fontWeight:900, fontSize:14, padding:"16px", borderRadius:99, border:interested?"2px solid #22c55e50":C.border, cursor:interested?"default":"pointer", textTransform:"uppercase", letterSpacing:1, transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <i className={interested ? "fa-solid fa-check" : "fa-solid fa-hand"}/>
              {interested ? "You're Interested!" : "I'm Interested!"}
            </button>

            {!interested && (
              <p style={{ textAlign:"center", color:C.navy, fontSize:11, fontWeight:600, opacity:0.45 }}>The organizer will be notified</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Interest Modal ── */}
      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(27,20,100,0.6)", backdropFilter:"blur(12px)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
          <div style={{ background:C.white, border:C.border, borderRadius:20, padding:"48px 40px", maxWidth:380, width:"100%", textAlign:"center", boxShadow:`6px 8px 0 ${C.navy}` }}>
            <i className="fa-solid fa-party-horn" style={{ fontSize:60, color:C.pink, marginBottom:16, display:"block" }}/>
            <h3 style={{ fontFamily:"'Boogaloo',cursive", fontSize:34, color:C.pink, marginBottom:8, letterSpacing:0.5 }}>Interest Noted!</h3>
            <p style={{ color:C.navy, fontSize:13, fontWeight:600, lineHeight:1.65, marginBottom:6 }}>
              You've expressed interest in <strong>{event.title}</strong>.
            </p>
            <p style={{ color:C.navy, fontSize:12, fontWeight:600, opacity:0.6, marginBottom:28 }}>
              Reach out at <strong style={{ color:C.navy, opacity:1 }}>{event.contact}</strong>
            </p>
            <PinkBtn onClick={() => setModal(false)}>
              <i className="fa-solid fa-rocket"/>Awesome!
            </PinkBtn>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;