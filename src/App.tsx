import { useEffect, useState } from "react";
import { type Event, type Page } from "./tokens";
import { GlobalStyles } from "./components";
import HomePage         from "./Homepage";
import PostEventPage    from "./Posteventpage";
import ExplorePage      from "./ExplorePage";
import EventDetailsPage from "./EventDetailsPage";
import { supabase } from "./supabase";

// ═══════════════════════════════════════════════════
//   APP ROOT
// ═══════════════════════════════════════════════════
export default function App() {
  const [page,   setPage]   = useState<Page>("home");
  const [selId,  setSelId]  = useState<string | null>(null);
  
  const [events, setEvents] = useState<Event[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false })
    .then(({ data, error }) => {
      if (error) console.error(error);
      else setEvents(
        (data ?? []).map(e => ({
          ...e,
          requiredRoles: e.required_roles ?? [],
        }))
      );
      setLoading(false);
    });
}, []);
  const onNav = (target: Page, id?: string) => {
    setPage(target);
    if (id) setSelId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ev = selId ? events.find(e => e.id === selId) ?? null : null;
const handleAdd = async (event: Event) => {
  const { error } = await supabase.from("events").insert({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    category: event.category,
    subcategory: event.subcategory,
    required_roles: event.requiredRoles,
    poster: event.poster,
    contact: event.contact,
    club: event.club,
  });

  if (error) {
    console.error("Failed to save event:", error);
    return;
  }

  // Only update local state after successful DB write
  setEvents(p => [event, ...p]);
};
  return (
    <>
      <GlobalStyles />
      <div style={{ fontFamily: "'Nunito',sans-serif" }}>
        {page === "home"    && <HomePage    onNav={onNav}/>}
       {page === "post" && <PostEventPage onNav={onNav} onAdd={handleAdd}/>}
       {page === "explore" && <ExplorePage onNav={onNav} events={events} loading={loading}/>}
        {page === "details" && <EventDetailsPage onNav={onNav} event={ev}/>}
      </div>
    </>
  );
}