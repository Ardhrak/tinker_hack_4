import { useState, useMemo } from "react";
import { C, CATEGORIES, type Event, type Page } from "./tokens.ts";
import { GlobalStyles, Nav, NavLink, PinkBtn } from "./components";
import EventCard from "./Eventcard.tsx";

// ═══════════════════════════════════════════════════
//   TYPES
// ═══════════════════════════════════════════════════
interface ExplorePageProps {
  onNav: (target: Page, id?: string) => void;
  events: Event[];
}

// ═══════════════════════════════════════════════════
//   EXPLORE PAGE
// ═══════════════════════════════════════════════════
const ExplorePage: React.FC<ExplorePageProps> = ({ onNav, events }) => {
  const [search, setSearch] = useState("");
  const [cat, setCat]       = useState("All");
  const [sub, setSub]       = useState("All");

  const subs = cat !== "All" ? ["All", ...(CATEGORIES[cat] ?? [])] : [];

  const filtered = useMemo(() =>
    events.filter(e => {
      const ms  = !search || [e.title, e.description, e.club].some(t => t.toLowerCase().includes(search.toLowerCase()));
      const mc  = cat === "All" || e.category === cat;
      const ms2 = sub === "All" || e.subcategory === sub;
      return ms && mc && ms2;
    }),
    [events, search, cat, sub]
  );

  return (
    <div style={{ minHeight:"100vh", background:C.white, fontFamily:"'Nunito',sans-serif" }}>
      <GlobalStyles />
      <Nav
        onNav={onNav}
        center={
          <>
            <NavLink>About Us</NavLink>
            <NavLink>Contacts</NavLink>
            <NavLink>FAQ</NavLink>
          </>
        }
        right={
          <PinkBtn onClick={() => onNav("post")} small>
            <i className="fa-solid fa-plus"/>Post Event
          </PinkBtn>
        }
      />

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 24px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom:36 }}>
          <h1 style={{ fontFamily:"'Boogaloo',cursive", fontSize:52, color:C.pink, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Explore Events</h1>
          <p style={{ color:C.navy, fontSize:13, fontWeight:600, opacity:0.6 }}>{events.length} events happening on campus right now</p>
        </div>

        {/* Filter Panel */}
        <div style={{ background:C.pinkCard, border:C.border, borderRadius:16, padding:"22px 24px", marginBottom:28 }}>
          {/* Search */}
          <div style={{ position:"relative", marginBottom:16 }}>
            <i className="fa-solid fa-magnifying-glass" style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", color:C.navy, opacity:0.5, fontSize:14, pointerEvents:"none" }}/>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events, clubs, keywords..."
              style={{ width:"100%", boxSizing:"border-box", padding:"13px 16px 13px 42px", border:`2px solid ${C.navy}30`, borderRadius:12, background:C.white, fontFamily:"'Nunito',sans-serif", fontSize:14, fontWeight:600, color:C.navy, outline:"none" }}
              onFocus={e => (e.target.style.borderColor = C.navy)}
              onBlur={e => (e.target.style.borderColor = `${C.navy}30`)}
            />
          </div>

          {/* Category pills */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:subs.length ? 10 : 0 }}>
            {["All", ...Object.keys(CATEGORIES)].map(c => {
              const sel = cat === c;
              const [h, setH] = useState(false);
              return (
                <button key={c}
                  onClick={() => { setCat(c); setSub("All"); }}
                  onMouseEnter={() => setH(true)}
                  onMouseLeave={() => setH(false)}
                  style={{ padding:"8px 18px", borderRadius:99, fontSize:13, fontWeight:700, border:"2px solid #1B1464", background:sel||h?C.navy:C.white, color:sel||h?C.white:C.navy, cursor:"pointer", transition:"all 0.18s", fontFamily:"'Nunito',sans-serif" }}>
                  {c}
                </button>
              );
            })}
          </div>

          {/* Subcategory pills */}
          {subs.length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:8 }}>
              {subs.map(s => {
                const sel = sub === s;
                const [h, setH] = useState(false);
                return (
                  <button key={s}
                    onClick={() => setSub(s)}
                    onMouseEnter={() => setH(true)}
                    onMouseLeave={() => setH(false)}
                    style={{ padding:"6px 14px", borderRadius:99, fontSize:12, fontWeight:700, border:`2px solid ${C.navy}40`, background:sel||h?C.pink:"transparent", color:sel||h?C.white:C.navy, cursor:"pointer", transition:"all 0.15s", fontFamily:"'Nunito',sans-serif" }}>
                    {s}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Results count */}
        <p style={{ color:C.navy, fontSize:13, fontWeight:700, marginBottom:20, opacity:0.5, textTransform:"uppercase", letterSpacing:1 }}>
          Showing {filtered.length} event{filtered.length !== 1 ? "s" : ""}{cat !== "All" ? ` · ${cat}` : ""}
        </p>

        {/* Grid or empty state */}
        {filtered.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
            {filtered.map(ev => (
              <EventCard key={ev.id} ev={ev} onClick={() => onNav("details", ev.id)}/>
            ))}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"80px 24px" }}>
            <i className="fa-solid fa-face-frown-open" style={{ fontSize:56, color:C.pink, marginBottom:16, display:"block" }}/>
            <h3 style={{ fontFamily:"'Boogaloo',cursive", fontSize:36, color:C.navy, marginBottom:8 }}>No Events Found</h3>
            <p style={{ color:C.navy, fontSize:14, fontWeight:600, marginBottom:28, opacity:0.6 }}>Try different filters or post the first one!</p>
            <PinkBtn onClick={() => onNav("post")}><i className="fa-solid fa-plus"/>Post an Event</PinkBtn>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;