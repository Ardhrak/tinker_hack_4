import { useState } from "react";
import { C, CATEGORIES,type Page, type Event } from "./tokens.ts";
import { GlobalStyles, Nav, PinkBtn } from "./components";

// ═══════════════════════════════════════════════════
//   TYPES
// ═══════════════════════════════════════════════════
interface PostEventPageProps {
  onNav: (target: Page, id?: string) => void;
  onAdd: (event: Event) => void;
}

interface FormState {
  title: string;
  description: string;
  date: string;
  category: string;
  subcategory: string;
  roles: string;
  poster: string;
  contact: string;
  club: string;
}

// ═══════════════════════════════════════════════════
//   POST EVENT PAGE
// ═══════════════════════════════════════════════════
const PostEventPage: React.FC<PostEventPageProps> = ({ onNav, onAdd }) => {
  const [form, setForm] = useState<FormState>({
    title:"", description:"", date:"", category:"",
    subcategory:"", roles:"", poster:"", contact:"", club:"",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof FormState, v: string) => setForm(f => ({ ...f, [k]: v }));
  const subs = form.category ? CATEGORIES[form.category] ?? [] : [];

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim())       e.title       = "Required";
    if (!form.description.trim()) e.description = "Required";
    if (!form.date)               e.date        = "Required";
    if (!form.category)           e.category    = "Pick a category";
    if (!form.contact.trim())     e.contact     = "Required";
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      date: form.date,
      category: form.category,
      subcategory: form.subcategory,
      requiredRoles: form.roles.split(",").map(r => r.trim()).filter(Boolean),
      poster: form.poster || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=380&fit=crop",
      contact: form.contact,
      club: form.club,
    });
    setDone(true);
  };

  const inputStyle = (name: keyof FormState): React.CSSProperties => ({
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 18px",
    border: `2px solid ${errors[name] ? "#ef4444" : C.pink}`,
    borderRadius: 12,
    background: C.white,
    fontFamily: "'Nunito',sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: C.navy,
    outline: "none",
    transition: "border-color 0.2s",
  });

  // ── Sub-components ──
  interface FieldProps {
    label: string;
    name: keyof FormState;
    type?: string;
    ph?: string;
    area?: boolean;
  }

  const Field: React.FC<FieldProps> = ({ label, name, type = "text", ph, area = false }) => (
    <div>
      <label style={{ display:"block", fontWeight:800, fontSize:11, textTransform:"uppercase", letterSpacing:"2px", color:C.navy, marginBottom:8, opacity:0.6 }}>{label}</label>
      {area
        ? <textarea value={form[name]} onChange={e => set(name, e.target.value)} placeholder={ph} rows={4}
            style={{ ...inputStyle(name), resize:"none" }}
            onFocus={e => (e.target.style.borderColor = C.navy)}
            onBlur={e => (e.target.style.borderColor = errors[name] ? "#ef4444" : C.pink)}/>
        : <input type={type} value={form[name]} onChange={e => set(name, e.target.value)} placeholder={ph}
            style={inputStyle(name)}
            onFocus={e => (e.target.style.borderColor = C.navy)}
            onBlur={e => (e.target.style.borderColor = errors[name] ? "#ef4444" : C.pink)}/>
      }
      {errors[name] && <p style={{ color:"#ef4444", fontSize:12, marginTop:5 }}>⚠ {errors[name]}</p>}
    </div>
  );

  interface BlockProps {
    title: string;
    icon: string;
    children: React.ReactNode;
  }

  const Block: React.FC<BlockProps> = ({ title, icon, children }) => (
    <div style={{ background:C.pinkCard, border:C.border, borderRadius:16, padding:"28px", marginBottom:16 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
        <i className={icon} style={{ color:C.navy, fontSize:18 }}/>
        <p style={{ fontFamily:"'Boogaloo',cursive", fontSize:22, color:C.pink, letterSpacing:0.5 }}>{title}</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>{children}</div>
    </div>
  );

  // ── Done state ──
  if (done) return (
    <div style={{ minHeight:"100vh", background:C.pinkPale, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Nunito',sans-serif" }}>
      <div style={{ textAlign:"center", maxWidth:400, padding:24 }}>
        <i className="fa-solid fa-party-horn" style={{ fontSize:80, color:C.pink, marginBottom:20, display:"block" }}/>
        <h2 style={{ fontFamily:"'Boogaloo',cursive", fontSize:52, color:C.pink, marginBottom:10, letterSpacing:1 }}>Event Posted!</h2>
        <p style={{ color:C.navy, fontSize:15, fontWeight:600, lineHeight:1.65, marginBottom:36 }}>Your event is live. Students across campus can now discover it!</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <PinkBtn onClick={() => onNav("explore")}>
            <i className="fa-solid fa-compass"/>Explore Events
          </PinkBtn>
          <button
            onClick={() => {
              setDone(false);
              setForm({ title:"", description:"", date:"", category:"", subcategory:"", roles:"", poster:"", contact:"", club:"" });
              setErrors({});
            }}
            style={{ background:"transparent", border:C.border, color:C.navy, fontWeight:800, padding:"12px 26px", borderRadius:99, cursor:"pointer", fontSize:13, textTransform:"uppercase", letterSpacing:0.5, fontFamily:"'Nunito',sans-serif" }}>
            Post Another
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:C.white, fontFamily:"'Nunito',sans-serif" }}>
      <GlobalStyles />
      <Nav
        onNav={onNav}
        right={<span style={{ fontWeight:700, fontSize:13, color:C.navy, opacity:0.5, textTransform:"uppercase", letterSpacing:1 }}>Post an Event</span>}
      />
      <div style={{ maxWidth:660, margin:"0 auto", padding:"48px 24px 80px" }}>
        <div style={{ marginBottom:36 }}>
          <h1 style={{ fontFamily:"'Boogaloo',cursive", fontSize:52, color:C.pink, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>Post an Event</h1>
          <p style={{ color:C.navy, fontSize:14, fontWeight:600, opacity:0.6 }}>Share your event with campus. Find the team you need.</p>
        </div>

        {/* Block 1: Basic Info */}
        <Block title="Basic Info" icon="fa-solid fa-circle-info">
          <Field label="Event Title *"        name="title"       ph="e.g. Spring Hackathon 2026"/>
          <Field label="Club / Organization"  name="club"        ph="e.g. Tech Society"/>
          <Field label="Description *"        name="description" ph="What's it about? Who should join?" area/>
        </Block>

        {/* Block 2: Details */}
        <Block title="Details" icon="fa-solid fa-calendar-days">
          <Field label="Event Date *" name="date" type="date" ph=""/>
          <div>
            <label style={{ display:"block", fontWeight:800, fontSize:11, textTransform:"uppercase", letterSpacing:"2px", color:C.navy, marginBottom:10, opacity:0.6 }}>Category *</label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {Object.keys(CATEGORIES).map(cat => {
                const sel = form.category === cat;
                const [h, setH] = useState(false);
                return (
                  <button key={cat}
                    onClick={() => { set("category", cat); set("subcategory", ""); }}
                    onMouseEnter={() => setH(true)}
                    onMouseLeave={() => setH(false)}
                    style={{ padding:"8px 18px", borderRadius:99, fontSize:13, fontWeight:700, border:"2px solid #1B1464", background:sel||h?C.navy:C.white, color:sel||h?C.white:C.navy, cursor:"pointer", transition:"all 0.18s", fontFamily:"'Nunito',sans-serif" }}>
                    {cat}
                  </button>
                );
              })}
            </div>
            {errors.category && <p style={{ color:"#ef4444", fontSize:12, marginTop:8 }}>⚠ {errors.category}</p>}
          </div>
          {subs.length > 0 && (
            <div>
              <label style={{ display:"block", fontWeight:800, fontSize:11, textTransform:"uppercase", letterSpacing:"2px", color:C.navy, marginBottom:8, opacity:0.6 }}>Subcategory</label>
              <select value={form.subcategory} onChange={e => set("subcategory", e.target.value)}
                style={{ width:"100%", padding:"13px 18px", border:`2px solid ${C.pink}`, borderRadius:12, background:C.white, fontFamily:"'Nunito',sans-serif", fontSize:14, fontWeight:600, color:C.navy, outline:"none", appearance:"none" }}>
                <option value="">Choose subcategory</option>
                {subs.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}
        </Block>

        {/* Block 3: Team & Media */}
        <Block title="Team & Media" icon="fa-solid fa-users">
          <Field label="Required Roles" name="roles" ph="Frontend Dev, Designer, ML Engineer (comma separated)"/>
          <Field label="Poster Image URL" name="poster" ph="https://your-image.com/poster.jpg"/>
        </Block>

        {/* Block 4: Contact */}
        <Block title="Contact" icon="fa-solid fa-envelope">
          <Field label="Contact Info *" name="contact" ph="email@campus.edu or @instagramhandle"/>
        </Block>

        {/* Submit */}
        <button
          onClick={submit}
          onMouseEnter={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.pink; e.currentTarget.style.transform = "translateY(0)"; }}
          style={{ width:"100%", background:C.pink, color:C.white, fontWeight:900, fontSize:16, padding:"18px", borderRadius:99, border:C.border, cursor:"pointer", textTransform:"uppercase", letterSpacing:1, transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:10, fontFamily:"'Nunito',sans-serif" }}>
          <i className="fa-solid fa-rocket"/>Post Event
        </button>
      </div>
    </div>
  );
};

export default PostEventPage;