import { useState } from "react";
import { C,type Page } from "./tokens.ts";
import { GlobalStyles, Nav, NavLink, PinkBtn, DoodleAccent } from "./components.tsx";

// ═══════════════════════════════════════════════════
//   TYPES
// ═══════════════════════════════════════════════════
interface HomePageProps {
  onNav: (target: Page, id?: string) => void;
}

// ═══════════════════════════════════════════════════
//   HOMEPAGE
// ═══════════════════════════════════════════════════
const HomePage: React.FC<HomePageProps> = ({ onNav }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);
  const [btnHov, setBtnHov] = useState(false);

  const stats = [
    { num: "700+", label: "Students",  desc: "actively finding their campus crew", icon: "fa-solid fa-user-group" },
    { num: "6",    label: "Years",     desc: "connecting campus communities",       icon: null, badge: "Loved By Students" },
    { num: "100%", label: "Events",    desc: "open and free for all students",      icon: null, badge2: "Campus First" },
  ];

  const features = [
    { icon: "fa-solid fa-bullhorn",           title: "Post Events",      desc: "Share your club events with the campus in minutes." },
    { icon: "fa-solid fa-magnifying-glass",   title: "Explore & Filter", desc: "Discover events by category, date, or keyword." },
    { icon: "fa-solid fa-calendar-days",      title: "Track Dates",      desc: "Never miss an event with date-wise listings." },
    { icon: "fa-solid fa-paper-plane",        title: "Stay Connected",   desc: "Reach every corner of campus with your post." },
  ];

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", background: C.white, color: C.navy }}>
      <GlobalStyles />

      {/* ── NAV ── */}
      <Nav
        onNav={onNav}
        center={
          <>
            <NavLink onClick={() => onNav("explore")}>Explore</NavLink>
            <NavLink>About Us</NavLink>
            <NavLink>Contacts</NavLink>
            <NavLink>FAQ</NavLink>
          </>
        }
        right={
          <PinkBtn onClick={() => onNav("post")} small>
            <i className="fa-solid fa-pen-to-square" />Post an Event
          </PinkBtn>
        }
      />

      {/* ── HERO ── */}
      <section style={{ padding:"0 48px 0", position:"relative", borderBottom:C.border, overflow:"hidden", minHeight:320, display:"flex", alignItems:"center", background:C.white }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:1 }}>
          <svg viewBox="0 0 1100 320" fill="none" style={{ width:"100%", height:"100%" }} preserveAspectRatio="xMidYMid slice">
            <path d="M900 40 L905 55 L920 60 L905 65 L900 80 L895 65 L880 60 L895 55Z" fill="#FF69B4" opacity="0.9"/>
            <path d="M980 110 L984 122 L996 126 L984 130 L980 142 L976 130 L964 126 L976 122Z" fill="#FF69B4" opacity="0.6"/>
            <path d="M60 90 L64 102 L76 106 L64 110 L60 122 L56 110 L44 106 L56 102Z" fill="#1B1464" opacity="0.4"/>
            <circle cx="90" cy="60" r="16" fill="none" stroke="#1B1464" strokeWidth="2"/>
            <circle cx="90" cy="60" r="6" fill="#FF69B4"/>
            <circle cx="90" cy="40" r="11" fill="#FFB6D9" stroke="#1B1464" strokeWidth="1.5"/>
            <circle cx="90" cy="80" r="11" fill="#FFB6D9" stroke="#1B1464" strokeWidth="1.5"/>
            <circle cx="70" cy="60" r="11" fill="#FFB6D9" stroke="#1B1464" strokeWidth="1.5"/>
            <circle cx="110" cy="60" r="11" fill="#FFB6D9" stroke="#1B1464" strokeWidth="1.5"/>
            <path d="M150 270 Q240 295 330 270 Q420 245 510 270 Q600 295 690 270" stroke="#1B1464" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M860 55 L872 32 L888 55 L904 28 L920 55 L930 55 L930 72 L860 72Z" fill="none" stroke="#1B1464" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M1000 220 C1000 214 993 208 986 214 C979 208 972 214 972 220 C972 232 986 244 986 244 C986 244 1000 232 1000 220Z" fill="#FF69B4" stroke="#1B1464" strokeWidth="1.5"/>
            <path d="M840 110 L850 120 M850 110 L840 120" stroke="#FF69B4" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M55 185 L65 195 M65 185 L55 195" stroke="#1B1464" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="1060" cy="80" r="5" fill="#FF69B4"/>
            <circle cx="1075" cy="100" r="4" fill="#FF69B4"/>
            <circle cx="1050" cy="108" r="4" fill="#FF69B4"/>
          </svg>
        </div>
        <h1 style={{ fontFamily:"'Boogaloo',cursive", fontSize:"clamp(80px,11vw,140px)", lineHeight:0.88, color:"transparent", WebkitTextStroke:"3px #1B1464", letterSpacing:"-2px", position:"relative", zIndex:2, userSelect:"none", padding:"40px 0" }}>
          Campus<br/>Crew
        </h1>
      </section>

      {/* ── MISSION ── */}
      <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr 200px", gap:48, padding:"52px 48px", borderBottom:C.border, alignItems:"center" }}>
        <div style={{ fontSize:14, lineHeight:1.8, color:C.navy, fontWeight:600 }}>
          <span style={{ fontWeight:900, color:C.pink, textTransform:"uppercase", letterSpacing:1, fontSize:14 }}>Our Mission </span>
          is to help every student find their tribe — the events, clubs, and teammates that make college life extraordinary. We are building a space where you never have to miss out again.
        </div>
        <div style={{ fontSize:14, lineHeight:1.8, color:C.navy, fontWeight:600 }}>
          Whether you're a fresher trying to find someone to team up for your first hackathon or an art enthusiast waiting for thier partner , CampusCrew is your trusted partner. Post team up requests, explore opportunities, and connect instantly.
        </div>
        <div style={{ display:"flex", justifyContent:"center" }}>
          <button
            onClick={() => onNav("explore")}
            onMouseEnter={e => (e.currentTarget.style.background = C.navy)}
            onMouseLeave={e => (e.currentTarget.style.background = C.pink)}
            style={{ width:130, height:130, borderRadius:"50%", background:C.pink, border:C.border, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6, cursor:"pointer", transition:"all 0.2s" }}
          >
            <i className="fa-solid fa-arrow-right" style={{ color:C.white, fontSize:20 }}/>
            <span style={{ fontWeight:900, fontSize:12, color:C.white, textTransform:"uppercase", letterSpacing:1, textAlign:"center", lineHeight:1.2 }}>Explore<br/>Events</span>
          </button>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderBottom:C.border }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background:C.pinkCard, borderRight:i<2?C.border:"none", padding:"44px 36px", position:"relative" }}>
            {s.icon && <i className={s.icon} style={{ fontSize:28, color:C.navy, marginBottom:16, display:"block" }}/>}
            {s.badge2 && (
              <div style={{ position:"absolute", top:18, right:18, fontWeight:800, fontSize:10, textTransform:"uppercase", letterSpacing:1, lineHeight:1.4, color:C.navy, textAlign:"right" }}>
                {s.badge2.split(" ").map((w, j) => <div key={j}>{w}</div>)}
              </div>
            )}
            <div style={{ fontFamily:"'Boogaloo',cursive", fontSize:68, color:C.pink, lineHeight:1, marginBottom:12 }}>{s.num}</div>
            <div style={{ fontWeight:900, fontSize:13, textTransform:"uppercase", letterSpacing:1, color:C.navy, marginBottom:6 }}>{s.label}</div>
            <div style={{ fontSize:13, fontWeight:600, color:C.navy, lineHeight:1.55, opacity:0.8 }}>{s.desc}</div>
            {s.badge && (
              <div style={{ position:"absolute", bottom:18, left:18, fontWeight:800, fontStyle:"italic", fontSize:10, textTransform:"uppercase", letterSpacing:1, lineHeight:1.4, color:C.navy }}>
                {s.badge.split(" ").map((w, j) => <div key={j}>{w}</div>)}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding:"56px 48px", borderBottom:C.border }}>
        <h2 style={{ fontFamily:"'Boogaloo',cursive", fontSize:48, color:C.pink, textTransform:"uppercase", letterSpacing:1, marginBottom:36 }}>
          <i className="fa-solid fa-star" style={{ fontSize:36, color:C.navy, marginRight:14, verticalAlign:"middle" }}/>
          What We Offer
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
          {features.map((f, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div
                key={i}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{ background:C.pinkCard, border:C.border, borderRadius:16, padding:"32px 24px", transition:"all 0.22s", transform:hov?"translateY(-5px)":"translateY(0)", boxShadow:hov?`4px 8px 0 ${C.navy}`:"none", cursor:"default" }}
              >
                <i className={f.icon} style={{ fontSize:30, color:C.navy, marginBottom:16, display:"block" }}/>
                <div style={{ fontFamily:"'Boogaloo',cursive", fontSize:22, color:C.pink, marginBottom:8, letterSpacing:0.5 }}>{f.title}</div>
                <div style={{ fontSize:13, fontWeight:600, color:C.navy, lineHeight:1.6, opacity:0.85 }}>{f.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SIGN UP FORM ── */}
      <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr", background:C.pinkPale, borderTop:C.border }}>
        <div style={{ padding:"56px 48px", borderRight:C.border, position:"relative" }}>
          <DoodleAccent style={{ position:"absolute", top:24, right:24, opacity:0.5 }}/>
          <h2 style={{ fontFamily:"'Boogaloo',cursive", fontSize:40, color:C.pink, textTransform:"uppercase", lineHeight:1.1, marginBottom:20, letterSpacing:1 }}>
            <i className="fa-solid fa-star" style={{ color:C.navy, fontSize:26, marginRight:10, verticalAlign:"middle" }}/>
            Post Your First Event Free
          </h2>
          <p style={{ fontSize:14, lineHeight:1.8, fontWeight:600, color:C.navy, maxWidth:340 }}>
            We'll help you reach every student on campus. Post your request, set your event requirements, and GET SET WIN.
          </p>
          <div style={{ position:"absolute", bottom:30, right:30, color:C.navy, opacity:0.2 }}>
            <i className="fa-solid fa-arrow-right" style={{ fontSize:36, transform:"rotate(30deg)", display:"inline-block" }}/>
          </div>
        </div>
        <div style={{ padding:"56px 48px", display:"flex", flexDirection:"column", gap:16, justifyContent:"center" }}>
          {sent ? (
            <div style={{ textAlign:"center" }}>
              <i className="fa-solid fa-circle-check" style={{ fontSize:56, color:C.pink, marginBottom:16, display:"block" }}/>
              <h3 style={{ fontFamily:"'Boogaloo',cursive", fontSize:32, color:C.pink, marginBottom:8 }}>You're In!</h3>
              <p style={{ color:C.navy, fontWeight:600, fontSize:14 }}>We'll reach out to {form.email} shortly.</p>
            </div>
          ) : (
            <>
              {([["name","Your Name","text"],["phone","Phone Number","tel"],["email","E-mail","email"]] as [string,string,string][]).map(([key, ph, type]) => (
                <input
                  key={key}
                  type={type}
                  placeholder={ph}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ width:"100%", padding:"14px 20px", border:`2px solid ${C.pink}`, borderRadius:99, background:"transparent", fontFamily:"'Nunito',sans-serif", fontSize:14, fontWeight:600, color:C.navy, outline:"none", transition:"border-color 0.2s" }}
                  onFocus={e => (e.target.style.borderColor = C.navy)}
                  onBlur={e => (e.target.style.borderColor = C.pink)}
                />
              ))}
              <button
                onClick={() => { if (form.name && form.email) setSent(true); }}
                onMouseEnter={() => setBtnHov(true)}
                onMouseLeave={() => setBtnHov(false)}
                style={{ padding:"15px", background:btnHov?C.navy:C.pink, border:C.border, borderRadius:99, fontWeight:900, fontSize:14, textTransform:"uppercase", letterSpacing:1, color:C.white, transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
              >
                <i className="fa-solid fa-paper-plane"/>Get Started Free
              </button>
            </>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:C.border, padding:"26px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", background:C.white, fontFamily:"'Nunito',sans-serif" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:38, height:38, borderRadius:"50%", border:C.border, background:C.pinkPale, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:12, color:C.navy }}>CC</div>
          <span style={{ fontWeight:800, fontSize:15, color:C.navy }}>CampusCrew</span>
        </div>
        <div style={{ display:"flex", gap:28 }}>
          {["About","Explore","Contact","FAQ"].map(l => {
            const [h, setH] = useState(false);
            return (
              <button key={l} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                style={{ background:"none", border:"none", fontWeight:700, fontSize:12, textTransform:"uppercase", letterSpacing:0.5, color:h?C.pink:C.navy, cursor:"pointer", transition:"color 0.18s", fontFamily:"'Nunito',sans-serif" }}>
                {l}
              </button>
            );
          })}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {([["fa-brands fa-instagram","ig"],["fa-brands fa-facebook-f","fb"],["fa-brands fa-telegram","tg"]] as [string,string][]).map(([icon, id]) => {
            const [h, setH] = useState(false);
            return (
              <button key={id}
                onMouseEnter={() => setH(true)}
                onMouseLeave={() => setH(false)}
                style={{ width:36, height:36, border:C.border, borderRadius:"50%", background:h?C.pink:"transparent", borderColor:h?C.pink:C.navy, display:"flex", alignItems:"center", justifyContent:"center", color:h?C.white:C.navy, fontSize:13, cursor:"pointer", transition:"all 0.18s" }}>
                <i className={icon}/>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
};

export default HomePage;