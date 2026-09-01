import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type BrandKey = string;
export type Occasion = string;

export type MenuItem = {
  name: string;
  description: string;
  price: string;
};

export type Outlet = {
  id: string;
  name: string;
  brand: BrandKey;
  area: string;
  type: string;
  description: string;
  tags: string[];
  occasions: Occasion[];
  capacity: string;
  hours: string;
  accent: string;
  image: string;
  menu: MenuItem[];
};

export type BrandDetail = {
  eyebrow: string;
  title: string;
  text: string;
  colour: string;
  image: string;
  fact: string;
  menuPdf: {
    name: string;
    url: string;
  };
};

export type Offer = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
};

export type EventItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  outlet: string;
  cta: string;
  image?: string;
};

export type ProfileSlot = {
  id: string;
  role: string;
  name: string;
  bio: string;
  image: string;
};

export type JournalEntry = {
  id: string;
  label: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
};

export type AwardEntry = {
  id: string;
  year: string;
  title: string;
  organisation: string;
  note: string;
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  intro: string;
  story: string;
  food: string;
  inspiration: string;
  profiles: ProfileSlot[];
};

export type SiteContent = {
  logo: {
    name: string;
    url: string;
  };
  app: {
    eyebrow: string;
    title: string;
    copy: string;
    appStoreUrl: string;
    googlePlayUrl: string;
  };
};

export type ContentState = {
  version: number;
  brands: Record<BrandKey, BrandDetail>;
  outlets: Outlet[];
  offers: Offer[];
  events: EventItem[];
  about: AboutContent;
  journal: JournalEntry[];
  awards: AwardEntry[];
  site: SiteContent;
};

export const initialContent: ContentState = {
  version: 2,
  brands: {
    'The Social': {
      eyebrow: 'Good food. Good people. Good times.',
      title: 'The table is always bigger than you think.',
      text: 'The Social is an urban neighbourhood kitchen and bar for the everyday celebrations: office lunches, cold beers, sourdough pizza, family dinners and nights that accidentally become late ones.',
      colour: '#e15d3b',
      image: '/images/hero-table.jpg',
      fact: '240+ labels behind the bar',
      menuPdf: { name: '', url: '' },
    },
    'Lisette’s Café & Bakery': {
      eyebrow: 'Baked slowly. Lived fully.',
      title: 'A softer start to the day.',
      text: 'Lisette’s is about good bread, seasonal plates and taking the long way through your morning. A wholesome neighbourhood bakery café with a little French ease and a lot of local warmth.',
      colour: '#839a7a',
      image: '/images/lisettes-bakery.jpg',
      fact: 'Bread, pastries & all-day brunch',
      menuPdf: { name: '', url: '' },
    },
    'Cafe Deli by El Mesón': {
      eyebrow: 'A little Spain, all day long.',
      title: 'Pull up a chair, stay for another.',
      text: 'Cafe Deli brings the warmth of an old-school Spanish deli to the neighbourhood: generous plates, great coffee, and food that makes a quick stop feel like a proper pause.',
      colour: '#31566b',
      image: '/images/cafe-deli.jpg',
      fact: 'Spanish plates & proper coffee',
      menuPdf: { name: '', url: '' },
    },
  },
  outlets: [
    {
      id: 'bangsar',
      name: 'Bangsar',
      brand: 'The Social',
      area: 'Bangsar, Kuala Lumpur',
      type: 'Neighbourhood bar & kitchen',
      description: 'Your regular table, turned up a notch. Come for a long lunch, stay through happy hour and let the playlist take it from there.',
      tags: ['Sourdough pizza', '240+ beers', 'Late nights'],
      occasions: ['Dinner', 'Drinks', 'A big celebration'],
      capacity: 'Up to 100 guests',
      hours: '11:30am – 1:00am',
      accent: '#e15d3b',
      image: '/images/hero-table.jpg',
      menu: [
        { name: 'The Social Sourdough', description: 'Tomato, fior di latte, basil, chilli oil', price: 'RM 32' },
        { name: 'Crispy Chicken Burger', description: 'Pickles, slaw, house sauce, fries', price: 'RM 34' },
        { name: 'Passionfruit Spritz', description: 'Aperitif, passionfruit, bubbles, lime', price: 'RM 28' },
      ],
    },
    {
      id: 'publika',
      name: 'Publika',
      brand: 'The Social',
      area: 'Solaris Dutamas, Kuala Lumpur',
      type: 'Social dining room',
      description: 'A bright, easy-going room for after-work pints, office lunches and dinners that do not need an occasion.',
      tags: ['Office lunch', 'Happy hour', 'Big tables'],
      occasions: ['Dinner', 'Drinks', 'Family time'],
      capacity: 'Up to 120 guests',
      hours: '11:30am – 12:00am',
      accent: '#d7a62c',
      image: '/images/hero-table.jpg',
      menu: [
        { name: 'Buttermilk Fried Chicken', description: 'Hot honey, ranch, celery, herbs', price: 'RM 29' },
        { name: 'Mushroom Truffle Pizza', description: 'Roasted mushroom, mozzarella, truffle cream', price: 'RM 38' },
        { name: 'Social Lager', description: 'Cold, crisp, uncomplicated', price: 'RM 16' },
      ],
    },
    {
      id: 'empire',
      name: 'Empire Subang',
      brand: 'The Social',
      area: 'Empire Shopping Gallery, Subang Jaya',
      type: 'Family-friendly kitchen',
      description: 'A little more space for a lot more togetherness. Easy lunches, birthday dinners and a table for everyone.',
      tags: ['Family friendly', 'Weekend lunch', 'Dessert'],
      occasions: ['Brunch', 'Family time', 'A big celebration'],
      capacity: 'Up to 140 guests',
      hours: '11:30am – 12:00am',
      accent: '#43715b',
      image: '/images/hero-table.jpg',
      menu: [
        { name: 'Big Breakfast', description: 'Eggs, sourdough, sausage, beans, roasted tomato', price: 'RM 35' },
        { name: 'Mac & Cheese', description: 'Three cheese sauce, pangrattato, herbs', price: 'RM 25' },
        { name: 'Peanut Butter Stack', description: 'Banana, chocolate, toasted peanuts', price: 'RM 19' },
      ],
    },
    {
      id: 'desapark',
      name: 'Desa ParkCity',
      brand: 'Lisette’s Café & Bakery',
      area: 'The Waterfront, Desa ParkCity',
      type: 'Bakery café',
      description: 'Slow mornings, good bread and the kind of coffee break that makes the rest of the day behave.',
      tags: ['Fresh bakes', 'All-day brunch', 'Dog friendly'],
      occasions: ['Brunch', 'Family time'],
      capacity: 'Up to 65 guests',
      hours: '8:00am – 10:00pm',
      accent: '#839a7a',
      image: '/images/lisettes-bakery.jpg',
      menu: [
        { name: 'Lisette’s Sourdough Toast', description: 'Avocado, poached egg, dukkah, lemon', price: 'RM 24' },
        { name: 'Seasonal Danish', description: 'Market fruit, almond frangipane, glaze', price: 'RM 14' },
        { name: 'Iced Oat Latte', description: 'House espresso, oat milk, vanilla', price: 'RM 15' },
      ],
    },
    {
      id: '163',
      name: '163 Retail Park',
      brand: 'Cafe Deli by El Mesón',
      area: 'Mont Kiara, Kuala Lumpur',
      type: 'Spanish-influenced café deli',
      description: 'A warm all-day stop for a cortado, a plate of something savoury and one more conversation before heading home.',
      tags: ['All-day', 'Spanish plates', 'Takeaway'],
      occasions: ['Brunch', 'Dinner', 'Family time'],
      capacity: 'Up to 55 guests',
      hours: '9:00am – 10:00pm',
      accent: '#31566b',
      image: '/images/cafe-deli.jpg',
      menu: [
        { name: 'Pan Con Tomate', description: 'Grilled sourdough, ripe tomato, olive oil, sea salt', price: 'RM 16' },
        { name: 'Tortilla Española', description: 'Potato, onion, eggs, alioli', price: 'RM 22' },
        { name: 'El Mesón Cortado', description: 'Double espresso, silky steamed milk', price: 'RM 11' },
      ],
    },
  ],
  offers: [
    {
      id: 'first-pour',
      eyebrow: 'Social Club · member moment',
      title: 'Your next first pour.',
      description: 'Join the club and we’ll make your first visit feel like you’ve been coming for years.',
      cta: 'Join Social Club',
    },
  ],
  events: [
    {
      id: 'coffee-club-lisettes',
      date: 'Editable event label',
      title: 'Coffee Club at Lisette’s',
      description: 'A relaxed coffee gathering moment for good conversation, fresh bakes and a slower start.',
      outlet: 'Lisette’s Café & Bakery',
      cta: 'Keep me posted',
      image: '/images/lisettes-bakery.jpg',
    },
    {
      id: 'jazz-nights-social',
      date: 'Editable event label',
      title: 'Jazz Nights at The Social',
      description: 'An evening of live jazz energy, shared plates and another reason to stay awhile.',
      outlet: 'The Social',
      cta: 'Keep me posted',
      image: '/images/hero-table.jpg',
    },
    {
      id: 'group-gathering-moment',
      date: 'Editable event label',
      title: 'A group gathering moment',
      description: 'A good excuse to bring the wider Social Group community around one generous table.',
      outlet: 'Across the group',
      cta: 'Keep me posted',
      image: '/images/cafe-deli.jpg',
    },
  ],
  about: {
    eyebrow: 'A quarter century of gathering',
    title: '25 years in KL. Still making room.',
    intro: 'The Social Group of Restaurants has been part of Kuala Lumpur since 2001 — making places for good food, easy conversation and the everyday occasions that become the stories we keep.',
    story: 'Our story is still being written. Add the moments, people and turning points that matter most to the group here.',
    food: 'Food should give people a reason to linger. Tell guests about the flavours, kitchens and shared-table rituals that shape your restaurants.',
    inspiration: 'Inspired by the neighbourhoods around us, the people who fill our tables and the belief that hospitality can feel both generous and familiar.',
    profiles: [
      { id: 'founders', role: 'Founders', name: 'Add profile', bio: 'Add the founders’ story, names and point of view here.', image: '' },
      { id: 'team', role: 'The team', name: 'Add profile', bio: 'Add a team profile or the people behind the day-to-day here.', image: '' },
      { id: 'kitchen', role: 'Food & kitchens', name: 'Add profile', bio: 'Add a chef, kitchen or food story here when ready.', image: '' },
    ],
  },
  journal: [
    {
      id: 'journal-starter',
      label: 'Editable journal starter',
      title: 'A note from the table',
      excerpt: 'Add a story about the people, places and small decisions that make the group what it is.',
      body: 'This is an editable starter entry. Replace it with a success story, kitchen note, community moment or behind-the-scenes journal.',
      image: '/images/hero-table.jpg',
    },
  ],
  awards: [],
  site: {
    logo: { name: '', url: '' },
    app: {
      eyebrow: 'Social Rewards',
      title: 'Good things, in your pocket.',
      copy: 'Use the Social Rewards app for membership, table bookings, delivery and take away. Add your live app links in Content Studio when they are ready.',
      appStoreUrl: '',
      googlePlayUrl: '',
    },
  },
};

const storageKey = 'social-group-content-v1';

function isContentState(value: unknown): value is ContentState {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<ContentState>;
  return Boolean(candidate.brands && candidate.outlets && candidate.offers && candidate.events);
}

function mergeContent(stored: Partial<ContentState>): ContentState {
  const storedBrands = stored.brands ?? {};
  const brands = Object.fromEntries(
    Object.entries({ ...initialContent.brands, ...storedBrands }).map(([name, detail]) => [
      name,
      { ...initialContent.brands[name], ...detail, menuPdf: { ...initialContent.brands[name]?.menuPdf, ...(detail as BrandDetail).menuPdf } },
    ]),
  ) as Record<BrandKey, BrandDetail>;
  const storedEvents = Array.isArray(stored.events) ? stored.events : [];
  const events = stored.version === 2 ? storedEvents : [...initialContent.events, ...storedEvents.filter((event) => !initialContent.events.some((seed) => seed.id === event.id))];
  return {
    ...initialContent,
    ...stored,
    version: 2,
    brands,
    outlets: Array.isArray(stored.outlets) ? stored.outlets : initialContent.outlets,
    offers: Array.isArray(stored.offers) ? stored.offers : initialContent.offers,
    events,
    about: { ...initialContent.about, ...(stored.about ?? {}), profiles: Array.isArray(stored.about?.profiles) ? stored.about.profiles : initialContent.about.profiles },
    journal: Array.isArray(stored.journal) ? stored.journal : initialContent.journal,
    awards: Array.isArray(stored.awards) ? stored.awards : initialContent.awards,
    site: { ...initialContent.site, ...(stored.site ?? {}), logo: { ...initialContent.site.logo, ...(stored.site?.logo ?? {}) }, app: { ...initialContent.site.app, ...(stored.site?.app ?? {}) } },
  };
}

export function loadContent(): ContentState {
  if (typeof window === 'undefined') return initialContent;
  try {
    const stored = window.localStorage.getItem(storageKey);
    const parsed: unknown = stored ? JSON.parse(stored) : null;
    return parsed && typeof parsed === 'object' ? mergeContent(parsed as Partial<ContentState>) : initialContent;
  } catch {
    return initialContent;
  }
}

export function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

type ContentContextValue = {
  content: ContentState;
  setContent: (content: ContentState) => void;
  resetContent: () => void;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentState>(loadContent);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(content));
  }, [content]);

  const value = useMemo(() => ({
    content,
    setContent,
    resetContent: () => setContent(initialContent),
  }), [content]);

  return createElement(ContentContext.Provider, { value }, children);
}

export function useContent(): ContentContextValue {
  const value = useContext(ContentContext);
  if (!value) throw new Error('useContent must be used inside ContentProvider');
  return value;
}