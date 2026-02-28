// ═══════════════════════════════════════════════════
//   DESIGN TOKENS — English Place aesthetic
// ═══════════════════════════════════════════════════
export const C = {
  pink:      "#FF69B4",
  pinkLight: "#FFB6D9",
  pinkPale:  "#FFE4F3",
  pinkCard:  "#FFB6D9",
  navy:      "#1B1464",
  white:     "#FFFFFF",
  border:    "2.5px solid #1B1464",
} as const;

// ═══════════════════════════════════════════════════
//   TYPES
// ═══════════════════════════════════════════════════
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  subcategory: string;
  requiredRoles: string[];
  poster: string;
  contact: string;
  club: string;
}

export interface EventStatus {
  dot: string;
  label: string;
  desc: string;
}

export type Page = "home" | "post" | "explore" | "details";

// ═══════════════════════════════════════════════════
//   DATA
// ═══════════════════════════════════════════════════
export const CATEGORIES: Record<string, string[]> = {
  Tech:     ["Hackathon","Workshop","Coding Club","AI/ML","Web Dev","Robotics"],
  Sports:   ["Football","Basketball","Cricket","Athletics","Swimming","Badminton"],
  Arts:     ["Music","Dance","Drama","Photography","Painting","Film"],
  Academic: ["Debate","Quiz","Research","Seminar","Conference","MUN"],
  Social:   ["Cultural Fest","Volunteering","Networking","Food Festival","Gaming"],
};

export const EVENTS: Event[] = [
  { id:"1", title:"AI Innovation Hackathon", description:"Build next-gen AI-powered tools in 24 hours. Join teams, brainstorm, and ship something amazing that could change campus life forever.", date:"2026-03-15", category:"Tech", subcategory:"Hackathon", requiredRoles:["Frontend Dev","Backend Dev","ML Engineer","UI Designer"], poster:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=380&fit=crop", contact:"techclub@campus.edu", club:"Tech Society" },
  { id:"2", title:"Spring Dance Showcase", description:"A spectacular evening of classical and contemporary dance performances by talented students from across campus.", date:"2026-03-22", category:"Arts", subcategory:"Dance", requiredRoles:["Dancer","Stage Manager","Lighting Crew"], poster:"https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&h=380&fit=crop", contact:"arts@campus.edu", club:"Dance Club" },
  { id:"3", title:"Inter-College Cricket Tournament", description:"Five colleges compete in this annual cricket extravaganza. Come cheer your team to victory and experience the electric atmosphere!", date:"2026-04-05", category:"Sports", subcategory:"Cricket", requiredRoles:["Player","Umpire","Scorer"], poster:"https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=380&fit=crop", contact:"sports@campus.edu", club:"Sports Council" },
  { id:"4", title:"Model United Nations 2026", description:"Represent world nations, debate global issues, and draft resolutions in our flagship MUN conference. Open to all years.", date:"2026-04-12", category:"Academic", subcategory:"MUN", requiredRoles:["Delegate","Chair","Press Corps"], poster:"https://images.unsplash.com/photo-1526958097901-5e6d742d3371?w=600&h=380&fit=crop", contact:"mun@campus.edu", club:"Debate Society" },
  { id:"5", title:"Cultural Food Festival", description:"Explore cuisines from around the world prepared by international students. Live music and cultural performances all evening!", date:"2026-04-20", category:"Social", subcategory:"Food Festival", requiredRoles:["Stall Manager","Performer","Volunteer"], poster:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=380&fit=crop", contact:"cultural@campus.edu", club:"International Students Club" },
  { id:"6", title:"Web Dev Workshop Series", description:"Learn React, TypeScript, and modern web development in this 4-session intensive workshop led by senior developers.", date:"2026-03-28", category:"Tech", subcategory:"Workshop", requiredRoles:["Participant","Teaching Assistant"], poster:"https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&h=380&fit=crop", contact:"webdev@campus.edu", club:"Coding Club" },
];

// ═══════════════════════════════════════════════════
//   HELPERS
// ═══════════════════════════════════════════════════
export const getStatus = (roles: string[]): EventStatus => {
  if (!roles.length)   return { dot:"#ef4444", label:"Full",       desc:"No open spots" };
  if (roles.length<=2) return { dot:"#f59e0b", label:"Few Spots",  desc:"Last few spots!" };
  return                      { dot:"#22c55e", label:"Open",       desc:"Actively recruiting" };
};

export const fmt  = (d: string) =>
  new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});

export const fmtL = (d: string) =>
  new Date(d).toLocaleDateString("en-US",{weekday:"short",month:"long",day:"numeric",year:"numeric"});