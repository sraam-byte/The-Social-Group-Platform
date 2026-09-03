import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type BrandKey = string;
export type Occasion = string;

export type MenuItem = {
  name: string;
  description: string;
  price: string;
};

export type MenuLink = {
  label: string;
  url: string;
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
  bookingUrl?: string;
  orderingUrl?: string;
  mapsUrl?: string;
};

export type BrandDetail = {
  eyebrow: string;
  title: string;
  text: string;
  colour: string;
  image: string;
  fact: string;
  officialUrl: string;
  instagramUrl: string;
  menuLinks: MenuLink[];
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
    downloadUrl: string;
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
  version: 3,
  brands: {
    'The Social': {
      eyebrow: 'Good food. Good people. Good times.',
      title: 'The table is always bigger than you think.',
      text: 'Established since 2001, The Social is a neighbourhood bar with more than 240 labels, sourdough pizzas from the wood-fired oven, local and international flavours, and warm service for lunches, happy hours, family dinners and late game nights.',
      colour: '#e15d3b',
      image: '/images/hero-table.jpg',
      fact: '240+ labels behind the bar',
      officialUrl: 'https://thesocial.com.my/',
      instagramUrl: 'https://www.instagram.com/thesocial.my',
      menuLinks: [
        { label: 'À la carte', url: 'https://thesocial.com.my/alacarte-menu/' },
        { label: 'Sourdough pizzas', url: 'https://thesocial.com.my/pizza-menu' },
        { label: 'Weekday lunch', url: 'https://thesocial.com.my/set-lunch-menu' },
        { label: 'STIKS', url: 'https://thesocial.com.my/stiks-menu' },
        { label: 'Beverage', url: 'https://thesocial.com.my/beverage-menu' },
      ],
      menuPdf: { name: '', url: '' },
    },
    'Lisette’s Café & Bakery': {
      eyebrow: 'Baked slowly. Lived fully.',
      title: 'A softer start to the day.',
      text: 'Lisette’s is in pursuit of the heart of good food, sourcing natural and organic ingredients wherever possible without compromising on deliciousness. From seasonal beautiful buffets to everyday menus, everyone belongs at the same table.',
      colour: '#839a7a',
      image: '/images/lisettes-bakery.jpg',
      fact: 'Bread, pastries & all-day brunch',
      officialUrl: 'https://lisettes.com.my/',
      instagramUrl: 'https://www.instagram.com/lisettes.my/',
      menuLinks: [
        { label: 'À la carte', url: 'https://lisettes.com.my/alacarte-menu/' },
        { label: 'Breakfast', url: 'https://lisettes.com.my/breakfast-menu' },
        { label: 'Cakes & bakes', url: 'https://lisettes.com.my/bakes-menu' },
        { label: 'Beverages', url: 'https://lisettes.com.my/beverage-menu' },
      ],
      menuPdf: { name: '', url: '' },
    },
    'Cafe Deli by El Mesón': {
      eyebrow: 'A little Spain, all day long.',
      title: 'Pull up a chair, stay for another.',
      text: 'Cafe Deli by El Mesón brings the best of Spain through authentic and traditional fare, with an all-day Spanish dining experience, family-friendly setting, and favourite porky selections matched to the local palate.',
      colour: '#31566b',
      image: '/images/cafe-deli.jpg',
      fact: 'Spanish plates & proper coffee',
      officialUrl: 'https://cafedeli.com.my/',
      instagramUrl: 'https://www.instagram.com/cafedeli.my',
      menuLinks: [
        { label: 'Breakfast', url: 'https://cafedeli.com.my/breakfast-menu' },
        { label: 'À la carte', url: 'https://cafedeli.com.my/alacarte-menu' },
        { label: 'Weekday lunch', url: 'https://cafedeli.com.my/set-lunch' },
        { label: 'Beverages', url: 'https://cafedeli.com.my/beverage-menu/' },
      ],
      menuPdf: { name: '', url: '' },
    },
  },
  outlets: [
    {
      id: 'social-bangsar',
      name: 'Bangsar',
      brand: 'The Social',
      area: 'Bangsar, Kuala Lumpur',
      type: 'Neighbourhood bar & kitchen',
      description: 'A neighbourhood bar for office lunches, happy hour, family dinners and late nights over food and drinks.',
      tags: ['Sourdough pizza', '240+ beers', 'Late nights'],
      occasions: ['Dinner', 'Drinks', 'A big celebration'],
      capacity: 'Up to 100 guests',
      hours: 'Open daily · 11:30am till midnight',
      accent: '#e15d3b',
      image: '/images/hero-table.jpg',
      menu: [
        { name: 'The Social Sourdough', description: 'Tomato, fior di latte, basil, chilli oil', price: 'RM 32' },
        { name: 'Crispy Chicken Burger', description: 'Pickles, slaw, house sauce, fries', price: 'RM 34' },
        { name: 'Passionfruit Spritz', description: 'Aperitif, passionfruit, bubbles, lime', price: 'RM 28' },
      ],
      bookingUrl: 'https://letsumai.com/partner/widget/the-social',
      orderingUrl: 'https://eats.thesocialgroup.com.my/#/1/home',
      mapsUrl: 'https://www.google.com/maps/place/The+Social+@+Bangsar/@3.130534,101.670946,15z',
    },
    {
      id: 'social-publika',
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
      bookingUrl: 'https://letsumai.com/partner/widget/the-social',
      orderingUrl: 'https://eats.thesocialgroup.com.my/#/1/home',
      mapsUrl: 'https://www.google.com/maps/place/The+Social+@+Publika/@3.1711577,101.6669759,15z',
    },
    {
      id: 'social-empire',
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
      bookingUrl: 'https://letsumai.com/partner/widget/the-social',
      orderingUrl: 'https://eats.thesocialgroup.com.my/#/1/home',
      mapsUrl: 'https://www.google.com/maps/place/The+Social+@+Empire+Subang/@3.081759,101.5829859,15z',
    },
    {
      id: 'social-desapark',
      name: 'Desa ParkCity',
      brand: 'The Social',
      area: 'Desa ParkCity, Kuala Lumpur',
      type: 'Neighbourhood bar & kitchen',
      description: 'The Social’s Desa ParkCity room for neighbourhood gatherings, shared plates, drinks and easy-going nights.',
      tags: ['Neighbourhood bar', 'Happy hour', 'Family friendly'],
      occasions: ['Dinner', 'Drinks', 'Family time'],
      capacity: 'Up to 140 guests',
      hours: 'Open daily · 11:30am till midnight',
      accent: '#e15d3b',
      image: '/images/hero-table.jpg',
      menu: [
        { name: 'Sourdough pizza', description: 'Wood-fired pizza and generous toppings', price: 'See menu' },
        { name: 'Shared plates', description: 'Local and international flavours for the table', price: 'See menu' },
        { name: 'Cold beer', description: 'A wide range of labels behind the bar', price: 'See menu' },
      ],
      bookingUrl: 'https://letsumai.com/partner/widget/the-social',
      orderingUrl: 'https://eats.thesocialgroup.com.my/#/1/home',
      mapsUrl: 'https://www.google.com/maps/place/The+Social+@+Desa+ParkCity/@3.1869825,101.6281771,15z',
    },
    {
      id: 'social-163',
      name: '163 Retail Park',
      brand: 'The Social',
      area: '163 Retail Park, Mont Kiara, Kuala Lumpur',
      type: 'Neighbourhood bar & kitchen',
      description: 'The Social’s 163 Retail Park room for easy lunches, drinks, shared plates and a good reason to stay longer.',
      tags: ['Neighbourhood bar', 'Happy hour', 'Big tables'],
      occasions: ['Dinner', 'Drinks', 'Family time'],
      capacity: 'Up to 120 guests',
      hours: 'Open daily · 11:30am till midnight',
      accent: '#e15d3b',
      image: '/images/hero-table.jpg',
      menu: [
        { name: 'Sourdough pizza', description: 'Wood-fired pizza and generous toppings', price: 'See menu' },
        { name: 'Social plates', description: 'Local and international flavours for sharing', price: 'See menu' },
        { name: 'Cold beer', description: 'A wide range of labels behind the bar', price: 'See menu' },
      ],
      bookingUrl: 'https://letsumai.com/partner/widget/the-social',
      orderingUrl: 'https://eats.thesocialgroup.com.my/#/1/home',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Social+163+Retail+Park',
    },
    {
      id: 'lisettes-bangsar',
      name: 'Bangsar',
      brand: 'Lisette’s Café & Bakery',
      area: '8, Jalan Kemuja, Bangsar, 59000 Kuala Lumpur',
      type: 'Café & bakery',
      description: 'Fresh brewed coffee, beautiful brunch, delectable bakes and a bright, leafy place to find laughter and joy.',
      tags: ['Fresh bakes', 'Brunch', 'Natural ingredients'],
      occasions: ['Brunch', 'Family time'],
      capacity: 'Add capacity',
      hours: 'Open daily · 8:00am till 7:00pm',
      accent: '#839a7a',
      image: '/images/lisettes-bakery.jpg',
      menu: [
        { name: 'All-day brunch', description: 'Seasonal plates made for lingering', price: 'See menu' },
        { name: 'Cakes & bakes', description: 'Fresh pastries and beautiful bakes', price: 'See menu' },
        { name: 'Fresh brewed coffee', description: 'A proper pause in the day', price: 'See menu' },
      ],
      bookingUrl: 'https://letsumai.com/partner/widget/lisette-s',
      orderingUrl: 'https://eats.thesocialgroup.com.my/#/3/home',
      mapsUrl: 'https://www.google.com/maps/place/Lisette%27s+Caf%C3%A9+%26+Bakery+@+Bangsar/@3.1296548,101.6798452,15z',
    },
    {
      id: 'lisettes-163',
      name: '163 Retail Park',
      brand: 'Lisette’s Café & Bakery',
      area: 'GF-18, Ground Floor 163 Retail Park, 8, Jalan Kiara, Mont Kiara, 50480 Kuala Lumpur',
      type: 'Café & bakery',
      description: 'A bright, airy café surrounded by nature for coffee, brunch, cakes, bakes and a little afternoon indulgence.',
      tags: ['Fresh bakes', 'All-day brunch', 'Afternoon tea'],
      occasions: ['Brunch', 'Family time'],
      capacity: 'Add capacity',
      hours: 'Open daily · 8:00am till 9:00pm',
      accent: '#839a7a',
      image: '/images/lisettes-bakery.jpg',
      menu: [
        { name: 'Beautiful brunch', description: 'Seasonal plates and everyday favourites', price: 'See menu' },
        { name: 'Cakes & bakes', description: 'Delectable bakes for every occasion', price: 'See menu' },
        { name: 'Tea for two', description: 'A little afternoon indulgence', price: 'See menu' },
      ],
      bookingUrl: 'https://letsumai.com/widget/lisette-s-cafe-bakery-163',
      orderingUrl: 'https://eats.thesocialgroup.com.my/#/3/home',
      mapsUrl: 'https://www.google.com/maps/place/Lisette%27s+Caf%C3%A9+%26+Bakery+@+163+Retail+Park/@3.1664854,101.652322,15z',
    },
    {
      id: 'cafe-deli-163',
      name: '163 Retail Park',
      brand: 'Cafe Deli by El Mesón',
      area: 'GF-16, Ground Floor, 163 Retail Park, No 8, Jalan Kiara, Mont Kiara, 50480 Kuala Lumpur',
      type: 'Spanish café deli',
      description: 'All-day Spanish dining, from bright early breakfasts to long tapas dinners, with warm Spanish hospitality.',
      tags: ['Spanish plates', 'Porky favourites', 'All-day dining'],
      occasions: ['Brunch', 'Dinner', 'Family time'],
      capacity: 'Add capacity',
      hours: 'Open daily · 9:00am till 10:00pm',
      accent: '#31566b',
      image: '/images/cafe-deli.jpg',
      menu: [
        { name: 'Pan con tomate', description: 'A simple taste of Spain', price: 'See menu' },
        { name: 'Spanish porky favourites', description: 'Traditional fare with a local palate in mind', price: 'See menu' },
        { name: 'Boozy concoctions', description: 'Drinks for an al fresco afternoon or evening', price: 'See menu' },
      ],
      bookingUrl: 'https://letsumai.com/partner/widget/cafe-deli-by-el-meson',
      orderingUrl: 'https://eats.thesocialgroup.com.my/#/4/home',
      mapsUrl: 'https://www.google.com/maps/place/Caf%C3%A9+Deli+by+El+Mes%C3%B3n+@+163+Retail+Park/@3.1669226,101.6522001,15z',
    },
    {
      id: 'cafe-deli-desapark',
      name: 'Desa ParkCity',
      brand: 'Cafe Deli by El Mesón',
      area: 'Desa ParkCity, Kuala Lumpur',
      type: 'Spanish café deli',
      description: 'A family-friendly Spanish café deli for breakfast by the park, porky brunches and warm hospitality.',
      tags: ['Spanish plates', 'Family friendly', 'Breakfast'],
      occasions: ['Brunch', 'Dinner', 'Family time'],
      capacity: 'Add capacity',
      hours: 'Open daily · 9:00am till 10:00pm',
      accent: '#31566b',
      image: '/images/cafe-deli.jpg',
      menu: [
        { name: 'Breakfast by the park', description: 'A bright start with Spanish flavour', price: 'See menu' },
        { name: 'Porky brunches', description: 'Cafe Deli favourites for a long lunch', price: 'See menu' },
        { name: 'Pan & paellas', description: 'Fresh catch and traditional Spanish fare', price: 'See menu' },
      ],
      bookingUrl: 'https://letsumai.com/partner/widget/cafe-deli-by-el-meson',
      orderingUrl: 'https://eats.thesocialgroup.com.my/#/4/home',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cafe+Deli+by+El+Meson+Desa+ParkCity',
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
  awards: [
    { id: 'social-hapa-bars', year: '2023–2024', title: 'Best Bars — The Social @ Desa ParkCity', organisation: 'HAPA Awards', note: 'Recognition stated on The Social official website.' },
    { id: 'social-top-30-bars', year: '2022', title: 'Malaysia’s Top 30 Bars', organisation: 'Malaysia’s Top 30 Bars', note: 'Recognition stated on The Social official website.' },
    { id: 'social-heineken-beer-bar', year: '2022', title: 'Top Beer Bar of the Year', organisation: 'Heineken', note: 'Recognition stated on The Social official website.' },
    { id: 'lisettes-plant-based-chef', year: '2023 & 2024', title: 'Plant-based Cuisine Chef of the Year', organisation: 'HAPA Awards', note: 'Recognition stated on Lisette’s official website.' },
    { id: 'lisettes-best-cafes', year: '2023 & 2024', title: 'Best Cafes — Lisette’s Café at 163 Retail Park', organisation: 'HAPA Awards', note: 'Recognition stated on Lisette’s official website.' },
  ],
  site: {
    logo: { name: '', url: '' },
    app: {
      eyebrow: 'Social Rewards',
      title: 'Good things, in your pocket.',
      copy: 'Earn high-value points, access exclusive member daily rewards, birthday rewards, stamp cards and promotions. Use the Social Rewards app for membership, table bookings, delivery and take away.',
      downloadUrl: 'https://thesocial.tsunago.asia/mobile/download',
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
  const currentVersion = stored.version === initialContent.version;
  const storedBrands = currentVersion ? (stored.brands ?? {}) : {};
  const brands = Object.fromEntries(
    Object.entries({ ...initialContent.brands, ...storedBrands }).map(([name, detail]) => [
      name,
      { ...initialContent.brands[name], ...detail, menuPdf: { ...initialContent.brands[name]?.menuPdf, ...(detail as BrandDetail).menuPdf } },
    ]),
  ) as Record<BrandKey, BrandDetail>;
  const storedEvents = currentVersion && Array.isArray(stored.events) ? stored.events : [];
  const events = currentVersion ? storedEvents : initialContent.events;
  return {
    ...initialContent,
    ...stored,
    version: 2,
    brands,
    outlets: currentVersion && Array.isArray(stored.outlets) ? stored.outlets : initialContent.outlets,
    offers: currentVersion && Array.isArray(stored.offers) ? stored.offers : initialContent.offers,
    events,
    about: { ...initialContent.about, ...(stored.about ?? {}), profiles: Array.isArray(stored.about?.profiles) ? stored.about.profiles : initialContent.about.profiles },
    journal: currentVersion && Array.isArray(stored.journal) ? stored.journal : initialContent.journal,
    awards: currentVersion && Array.isArray(stored.awards) ? stored.awards : initialContent.awards,
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