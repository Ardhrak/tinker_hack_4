import { useState } from "react";
import { EVENTS, type Event, type Page } from "./tokens";
import { GlobalStyles } from "./components";
import HomePage         from "./Homepage";
import PostEventPage    from "./Posteventpage";
import ExplorePage      from "./Explorepage";
import EventDetailsPage from "./Eventdetailspage";

// ═══════════════════════════════════════════════════
//   APP ROOT
// ═══════════════════════════════════════════════════
export default function App() {
  const [page,   setPage]   = useState<Page>("home");
  const [selId,  setSelId]  = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>(EVENTS);

  const onNav = (target: Page, id?: string) => {
    setPage(target);
    if (id) setSelId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ev = selId ? events.find(e => e.id === selId) ?? null : null;

  return (
    <>
      <GlobalStyles />
      <div style={{ fontFamily: "'Nunito',sans-serif" }}>
        {page === "home"    && <HomePage    onNav={onNav}/>}
        {page === "post"    && <PostEventPage onNav={onNav} onAdd={e => setEvents(p => [e, ...p])}/>}
        {page === "explore" && <ExplorePage  onNav={onNav} events={events}/>}
        {page === "details" && <EventDetailsPage onNav={onNav} event={ev}/>}
      </div>
    </>
  );
}