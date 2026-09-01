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
};

export type ContentState = {
  brands: Record<BrandKey, BrandDetail>;
  outlets: Outlet[];
  offers: Offer[];
  events: EventItem[];
};

export const initialContent: ContentState = {
  brands: {
    'The Social': {
      eyebrow: 'Good food. Good people. Good times.',
      title: 'The table is always bigger than you think.',
      text: 'The Social is an urban neighbourhood kitchen and bar for the everyday celebrations: office lunches, cold beers, sourdough pizza, family dinners and nights that accidentally become late ones.',
      colour: '#e15d3b',
      image: '/images/hero-table.jpg',
      fact: '240+ labels behind the bar',
    },
    'Lisette’s Café & Bakery': {
      eyebrow: 'Baked slowly. Lived fully.',
      title: 'A softer start to the day.',
      text: 'Lisette’s is about good bread, seasonal plates and taking the long way through your morning. A wholesome neighbourhood bakery café with a little French ease and a lot of local warmth.',
      colour: '#839a7a',
      image: '/images/lisettes-bakery.jpg',
      fact: 'Bread, pastries & all-day brunch',
    },
    'Cafe Deli by El Mesón': {
      eyebrow: 'A little Spain, all day long.',
      title: 'Pull up a chair, stay for another.',
      text: 'Cafe Deli brings the warmth of an old-school Spanish deli to the neighbourhood: generous plates, great coffee, and food that makes a quick stop feel like a proper pause.',
      colour: '#31566b',
      image: '/images/cafe-deli.jpg',
      fact: 'Spanish plates & proper coffee',
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
      id: 'long-table',
      date: 'Made for groups',
      title: 'The long-table season.',
      description: 'Birthday dinners, team nights, the annual dinner that actually gets people excited.',
      outlet: 'Across the group',
      cta: 'Plan yours',
    },
  ],
};

const storageKey = 'social-group-content-v1';

function isContentState(value: unknown): value is ContentState {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<ContentState>;
  return Boolean(candidate.brands && candidate.outlets && candidate.offers && candidate.events);
}

export function loadContent(): ContentState {
  if (typeof window === 'undefined') return initialContent;
  try {
    const stored = window.localStorage.getItem(storageKey);
    const parsed: unknown = stored ? JSON.parse(stored) : null;
    return isContentState(parsed) ? parsed : initialContent;
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