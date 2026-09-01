import { useState, type ChangeEvent, type ReactNode } from 'react';
import { ArrowLeft, Check, Plus, RotateCcw, Save, Trash2, Upload, X } from 'lucide-react';
import { Link } from 'wouter';
import { useContent, type AwardEntry, type BrandDetail, type EventItem, type JournalEntry, type MenuItem, type Offer, type Outlet, type ProfileSlot } from '@/content';

type StudioSection = 'brands' | 'outlets' | 'offers' | 'events' | 'site' | 'about' | 'journal' | 'awards';

const shell = 'mx-auto w-full max-w-[1440px] px-5 md:px-10';
const inputClass = 'mt-2 h-12 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 text-sm outline-none transition focus:border-[hsl(var(--primary))]';
const textareaClass = 'mt-2 min-h-28 w-full resize-y rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4 text-sm leading-relaxed outline-none transition focus:border-[hsl(var(--primary))]';

function Field({ label, value, onChange, type = 'text', placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string }) {
  return <label className="block"><span className="text-xs font-bold">{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={inputClass} /></label>;
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="block"><span className="text-xs font-bold">{label}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={textareaClass} /></label>;
}

function UploadField({ label, accept, onFile, hint }: { label: string; accept: string; onFile: (file: File) => void; hint: string }) {
  return <label className="flex min-h-24 cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--muted)/.35)] p-4 transition hover:border-[hsl(var(--primary))]">
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[hsl(var(--card))] text-[hsl(var(--primary))]"><Upload size={17} /></span>
    <span><span className="block text-xs font-bold">{label}</span><span className="mt-1 block text-[11px] leading-relaxed text-[hsl(var(--muted-foreground))]">{hint}</span></span>
    <input type="file" accept={accept} className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) onFile(file); event.target.value = ''; }} data-testid={`input-upload-${label.toLowerCase().replaceAll(' ', '-')}`} />
  </label>;
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="block"><span className="text-xs font-bold">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className={inputClass}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function StudioHeader({ onReset }: { onReset: () => void }) {
  return <header className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card)/.9)]">
    <div className={`${shell} flex min-h-20 items-center justify-between gap-5`}>
      <div className="flex items-center gap-4">
        <Link href="/" className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--accent))]" data-testid="link-studio-home"><ArrowLeft size={18} /></Link>
        <div><p className="mono text-[10px] uppercase tracking-[.18em] text-[hsl(var(--primary))]">The Social Group</p><h1 className="display mt-1 text-3xl leading-none md:text-4xl">Content Studio</h1></div>
      </div>
      <button onClick={onReset} className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] px-4 py-2.5 text-xs font-bold transition hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]" data-testid="button-studio-reset"><RotateCcw size={14} /> Reset content</button>
    </div>
  </header>;
}

function ItemList({ items, selectedId, onSelect, onAdd, onDelete, label, getTitle }: { items: { id: string }[]; selectedId: string; onSelect: (id: string) => void; onAdd: () => void; onDelete: () => void; label: string; getTitle: (item: { id: string }) => string }) {
  return <aside className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3">
    <div className="flex items-center justify-between px-3 py-2"><p className="mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">{label}</p><button onClick={onAdd} className="grid h-8 w-8 place-items-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]" aria-label={`Add ${label.toLowerCase()}`} data-testid={`button-add-${label.toLowerCase()}`}><Plus size={15} /></button></div>
    <div className="mt-2 space-y-1">{items.map((item) => <button key={item.id} onClick={() => onSelect(item.id)} className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${selectedId === item.id ? 'bg-[hsl(var(--primary)/.1)] font-bold text-[hsl(var(--primary))]' : 'hover:bg-[hsl(var(--muted))]'}`} data-testid={`button-select-${item.id}`}><span className="truncate">{getTitle(item)}</span>{selectedId === item.id && <Check size={15} />}</button>)}</div>
    <button onClick={onDelete} disabled={!selectedId || items.length < 2} className="mt-4 inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--destructive))] disabled:cursor-not-allowed disabled:opacity-40" data-testid={`button-delete-${label.toLowerCase()}`}><Trash2 size={14} /> Delete selected</button>
  </aside>;
}

function EditorCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <section className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-sm)] md:p-9"><div className="border-b border-[hsl(var(--border))] pb-6"><p className="mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary))]">Edit content</p><h2 className="display mt-2 text-4xl leading-none">{title}</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{description}</p></div><div className="mt-7">{children}</div></section>;
}

function BrandsEditor() {
  const { content, setContent } = useContent();
  const brandNames = Object.keys(content.brands);
  const [selectedBrand, setSelectedBrand] = useState(brandNames[0] ?? '');
  const detail = content.brands[selectedBrand];
  const update = (field: keyof BrandDetail, value: BrandDetail[typeof field]) => {
    if (!detail) return;
    setContent({ ...content, brands: { ...content.brands, [selectedBrand]: { ...detail, [field]: value } } });
  };
  const add = () => {
    const name = `New brand ${brandNames.length + 1}`;
    setContent({ ...content, brands: { ...content.brands, [name]: { eyebrow: 'A new good place.', title: 'Make it yours.', text: 'Tell the story of this brand here.', colour: '#d7a62c', image: '/images/hero-table.jpg', fact: 'Add a memorable detail', menuPdf: { name: '', url: '' } } } });
    setSelectedBrand(name);
  };
  const remove = () => {
    if (!detail || brandNames.length < 2) return;
    const next = { ...content.brands };
    delete next[selectedBrand];
    setContent({ ...content, brands: next, outlets: content.outlets.map((outlet) => outlet.brand === selectedBrand ? { ...outlet, brand: Object.keys(next)[0] } : outlet) });
    setSelectedBrand(Object.keys(next)[0]);
  };
  const readMenu = (file: File) => { if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) { const reader = new FileReader(); reader.onload = () => update('menuPdf', { name: file.name, url: String(reader.result ?? '') }); reader.readAsDataURL(file); } };
  const menuPdf = detail?.menuPdf ?? { name: '', url: '' };
  return <div className="grid gap-6 lg:grid-cols-[260px_1fr]"><ItemList items={brandNames.map((id) => ({ id }))} selectedId={selectedBrand} onSelect={setSelectedBrand} onAdd={add} onDelete={remove} label="Brands" getTitle={(item) => item.id} />{detail ? <EditorCard title={selectedBrand} description="Shape how this brand appears in the family story and across its location cards. Each brand has its own guest-facing menu PDF.">
    <div className="grid gap-6 md:grid-cols-2"><Field label="Eyebrow" value={detail.eyebrow} onChange={(value) => update('eyebrow', value)} /><Field label="Short fact" value={detail.fact} onChange={(value) => update('fact', value)} /><TextField label="Headline" value={detail.title} onChange={(value) => update('title', value)} /><TextField label="Brand description" value={detail.text} onChange={(value) => update('text', value)} /><Field label="Image path" value={detail.image} onChange={(value) => update('image', value)} placeholder="/images/brand.jpg" /><label className="block"><span className="text-xs font-bold">Accent colour</span><div className="mt-2 flex gap-3"><input type="color" value={detail.colour} onChange={(event) => update('colour', event.target.value)} className="h-12 w-14 cursor-pointer rounded-xl border border-[hsl(var(--border))] bg-transparent p-1" /><input value={detail.colour} onChange={(event) => update('colour', event.target.value)} className={inputClass.replace('mt-2 ', '')} /></div></label></div>
    <div className="mt-8 border-t border-[hsl(var(--border))] pt-7"><p className="mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary))]">Separate brand menu</p><h3 className="display mt-2 text-3xl">Menu PDF</h3><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Upload a PDF from this browser, or paste an editable path/URL below. It will appear on the public brand story.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><UploadField label="Upload menu PDF" accept="application/pdf,.pdf" onFile={readMenu} hint={menuPdf.name || 'PDF only · stored locally in this browser'} /><div><Field label="Menu PDF path / URL" value={menuPdf.url} onChange={(value) => update('menuPdf', { ...menuPdf, url: value })} placeholder="/menus/the-social.pdf" />{menuPdf.name && <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">Current file: {menuPdf.name}</p>}{menuPdf.url && <button type="button" onClick={() => update('menuPdf', { name: '', url: '' })} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[hsl(var(--destructive))]" data-testid="button-clear-brand-menu"><X size={13} /> Clear menu PDF</button>}</div></div></div>
  </EditorCard> : <EmptyEditor label="Add your first brand to start editing." />}</div>;
}

function OutletMenuEditor({ outlet, update }: { outlet: Outlet; update: (next: Outlet) => void }) {
  const updateMenu = (index: number, field: keyof MenuItem, value: string) => update({ ...outlet, menu: outlet.menu.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item) });
  const addMenuItem = () => update({ ...outlet, menu: [...outlet.menu, { name: 'New menu item', description: 'Describe the dish.', price: 'RM 0' }] });
  const removeMenuItem = (index: number) => update({ ...outlet, menu: outlet.menu.filter((_, itemIndex) => itemIndex !== index) });
  return <div className="mt-8 border-t border-[hsl(var(--border))] pt-7"><div className="flex items-end justify-between gap-4"><div><p className="mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary))]">Structured menu</p><h3 className="display mt-2 text-3xl">What’s on the table</h3></div><button onClick={addMenuItem} className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] px-4 py-2 text-xs font-bold hover:border-[hsl(var(--primary))]" data-testid="button-add-menu-item"><Plus size={14} /> Add item</button></div><div className="mt-5 space-y-4">{outlet.menu.map((item, index) => <div key={`${item.name}-${index}`} className="rounded-2xl bg-[hsl(var(--muted)/.5)] p-4"><div className="grid gap-4 md:grid-cols-[1fr_1fr_110px_auto]"><Field label="Dish name" value={item.name} onChange={(value) => updateMenu(index, 'name', value)} /><Field label="Description" value={item.description} onChange={(value) => updateMenu(index, 'description', value)} /><Field label="Price" value={item.price} onChange={(value) => updateMenu(index, 'price', value)} /><button onClick={() => removeMenuItem(index)} className="mt-6 grid h-12 w-12 place-items-center rounded-xl text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] hover:text-[hsl(var(--destructive))] disabled:opacity-40" disabled={outlet.menu.length < 2} aria-label={`Delete ${item.name}`} data-testid={`button-delete-menu-${index}`}><Trash2 size={15} /></button></div></div>)}</div></div>;
}

function OutletsEditor() {
  const { content, setContent } = useContent();
  const [selectedOutlet, setSelectedOutlet] = useState(content.outlets[0]?.id ?? '');
  const outlet = content.outlets.find((item) => item.id === selectedOutlet);
  const update = (next: Outlet) => setContent({ ...content, outlets: content.outlets.map((item) => item.id === next.id ? next : item) });
  const updateField = (field: keyof Outlet, value: string | string[]) => { if (outlet) update({ ...outlet, [field]: value }); };
  const add = () => {
    const id = `new-outlet-${content.outlets.length + 1}`;
    const brand = Object.keys(content.brands)[0] ?? 'The Social';
    const next: Outlet = { id, name: 'New outlet', brand, area: 'Add address', type: 'Restaurant & café', description: 'Tell guests what makes this place special.', tags: ['Add a tag'], occasions: ['Dinner'], capacity: 'Up to 50 guests', hours: 'Add opening hours', accent: '#d7a62c', image: '/images/hero-table.jpg', menu: [{ name: 'New menu item', description: 'Describe the dish.', price: 'RM 0' }] };
    setContent({ ...content, outlets: [...content.outlets, next] });
    setSelectedOutlet(id);
  };
  const remove = () => { if (content.outlets.length < 2) return; const index = content.outlets.findIndex((item) => item.id === selectedOutlet); const nextOutlets = content.outlets.filter((item) => item.id !== selectedOutlet); setContent({ ...content, outlets: nextOutlets }); setSelectedOutlet(nextOutlets[Math.max(0, index - 1)]?.id ?? ''); };
  return <div className="grid gap-6 lg:grid-cols-[260px_1fr]"><ItemList items={content.outlets} selectedId={selectedOutlet} onSelect={setSelectedOutlet} onAdd={add} onDelete={remove} label="Outlets" getTitle={(item) => (item as Outlet).name} />{outlet ? <EditorCard title={outlet.name} description="Keep each location, its local details, and its structured menu ready for guests."><div className="grid gap-6 md:grid-cols-2"><Field label="Outlet name" value={outlet.name} onChange={(value) => updateField('name', value)} /><SelectField label="Brand" value={outlet.brand} options={Object.keys(content.brands)} onChange={(value) => updateField('brand', value)} /><Field label="Address / area" value={outlet.area} onChange={(value) => updateField('area', value)} /><Field label="Place type" value={outlet.type} onChange={(value) => updateField('type', value)} /><Field label="Opening hours" value={outlet.hours} onChange={(value) => updateField('hours', value)} /><Field label="Capacity" value={outlet.capacity} onChange={(value) => updateField('capacity', value)} /><Field label="Image path" value={outlet.image} onChange={(value) => updateField('image', value)} /><Field label="Tags, separated by commas" value={outlet.tags.join(', ')} onChange={(value) => updateField('tags', value.split(',').map((tag) => tag.trim()).filter(Boolean))} /><TextField label="Description" value={outlet.description} onChange={(value) => updateField('description', value)} /><TextField label="Occasions, separated by commas" value={outlet.occasions.join(', ')} onChange={(value) => updateField('occasions', value.split(',').map((occasion) => occasion.trim()).filter(Boolean))} /></div><OutletMenuEditor outlet={outlet} update={update} /></EditorCard> : <EmptyEditor label="Add your first outlet to start editing." />}</div>;
}

function CollectionEditor({ kind, title, description }: { kind: 'offers' | 'events'; title: string; description: string }) {
  const { content, setContent } = useContent();
  const items = content[kind];
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? '');
  const item = items.find((entry) => entry.id === selectedId);
  const update = (next: Offer | EventItem) => setContent({ ...content, [kind]: items.map((entry) => entry.id === next.id ? next : entry) });
  const add = () => {
    const id = `new-${kind.slice(0, -1)}-${items.length + 1}`;
    const next = kind === 'offers'
      ? { id, eyebrow: 'New member moment', title: 'A new good reason.', description: 'Tell guests what is happening.', cta: 'Find out more' } as Offer
      : { id, date: 'Coming soon', title: 'A new reason to gather.', description: 'Tell guests what is happening.', outlet: 'Across the group', cta: 'Plan yours' } as EventItem;
    setContent({ ...content, [kind]: [...items, next] });
    setSelectedId(id);
  };
  const remove = () => { if (items.length < 2) return; const index = items.findIndex((entry) => entry.id === selectedId); const nextItems = items.filter((entry) => entry.id !== selectedId); setContent({ ...content, [kind]: nextItems }); setSelectedId(nextItems[Math.max(0, index - 1)]?.id ?? ''); };
  return <div className="grid gap-6 lg:grid-cols-[260px_1fr]"><ItemList items={items} selectedId={selectedId} onSelect={setSelectedId} onAdd={add} onDelete={remove} label={kind === 'offers' ? 'Offers' : 'Events'} getTitle={(entry) => (entry as Offer | EventItem).title} />{item ? <EditorCard title={item.title} description={description}>{kind === 'offers' ? <div className="grid gap-6 md:grid-cols-2"><Field label="Eyebrow" value={(item as Offer).eyebrow} onChange={(value) => update({ ...(item as Offer), eyebrow: value })} /><Field label="Button label" value={(item as Offer).cta} onChange={(value) => update({ ...(item as Offer), cta: value })} /><TextField label="Title" value={(item as Offer).title} onChange={(value) => update({ ...(item as Offer), title: value })} /><TextField label="Description" value={(item as Offer).description} onChange={(value) => update({ ...(item as Offer), description: value })} /></div> : <div className="grid gap-6 md:grid-cols-2"><Field label="Date / label" value={(item as EventItem).date} onChange={(value) => update({ ...(item as EventItem), date: value })} /><Field label="Location label" value={(item as EventItem).outlet} onChange={(value) => update({ ...(item as EventItem), outlet: value })} /><Field label="Button label" value={(item as EventItem).cta} onChange={(value) => update({ ...(item as EventItem), cta: value })} /><TextField label="Title" value={(item as EventItem).title} onChange={(value) => update({ ...(item as EventItem), title: value })} /><TextField label="Description" value={(item as EventItem).description} onChange={(value) => update({ ...(item as EventItem), description: value })} /></div>}</EditorCard> : <EmptyEditor label={`Add your first ${kind.slice(0, -1)} to start editing.`} />}</div>;
}

function SiteEditor() {
  const { content, setContent } = useContent();
  const updateSite = (field: 'eyebrow' | 'title' | 'copy' | 'appStoreUrl' | 'googlePlayUrl', value: string) => setContent({ ...content, site: { ...content.site, app: { ...content.site.app, [field]: value } } });
  const updateLogo = (value: { name: string; url: string }) => setContent({ ...content, site: { ...content.site, logo: value } });
  const readLogo = (file: File) => { if (file.type.startsWith('image/')) { const reader = new FileReader(); reader.onload = () => updateLogo({ name: file.name, url: String(reader.result ?? '') }); reader.readAsDataURL(file); } };
  return <EditorCard title="Site identity & Social Rewards" description="Set the optional logo and the safe, editable links shown in the Social Rewards download panel.">
    <div className="grid gap-6 md:grid-cols-2"><div><p className="mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary))]">Header identity</p><h3 className="display mt-2 text-3xl">Logo upload</h3><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">If no logo is uploaded, the public header keeps its circular S mark.</p><div className="mt-4"><UploadField label="Upload logo image" accept="image/*" onFile={readLogo} hint={content.site.logo.name || 'PNG, JPG or SVG · stored locally in this browser'} /></div>{content.site.logo.url && <div className="mt-4 flex items-center gap-3"><img src={content.site.logo.url} alt={content.site.logo.name || 'Uploaded logo'} className="h-14 w-14 rounded-xl object-contain bg-[hsl(var(--muted))] p-2" /><button type="button" onClick={() => updateLogo({ name: '', url: '' })} className="inline-flex items-center gap-1 text-xs font-bold text-[hsl(var(--destructive))]" data-testid="button-clear-logo"><X size={13} /> Remove logo</button></div>}</div>
      <div className="space-y-5"><p className="mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary))]">App download panel</p><Field label="Eyebrow" value={content.site.app.eyebrow} onChange={(value) => updateSite('eyebrow', value)} /><TextField label="Title" value={content.site.app.title} onChange={(value) => updateSite('title', value)} /><TextField label="Copy" value={content.site.app.copy} onChange={(value) => updateSite('copy', value)} /><Field label="App Store link (optional)" value={content.site.app.appStoreUrl} onChange={(value) => updateSite('appStoreUrl', value)} placeholder="Add link when ready" /><Field label="Google Play link (optional)" value={content.site.app.googlePlayUrl} onChange={(value) => updateSite('googlePlayUrl', value)} placeholder="Add link when ready" /></div>
    </div>
  </EditorCard>;
}

function AboutEditor() {
  const { content, setContent } = useContent();
  const update = (field: 'eyebrow' | 'title' | 'intro' | 'story' | 'food' | 'inspiration', value: string) => setContent({ ...content, about: { ...content.about, [field]: value } });
  const updateProfile = (id: string, field: keyof ProfileSlot, value: string) => setContent({ ...content, about: { ...content.about, profiles: content.about.profiles.map((profile) => profile.id === id ? { ...profile, [field]: value } : profile) } });
  const addProfile = () => setContent({ ...content, about: { ...content.about, profiles: [...content.about.profiles, { id: `profile-${content.about.profiles.length + 1}`, role: 'Add role', name: 'Add profile', bio: 'Add a profile story here.', image: '' }] } });
  return <EditorCard title="About page" description="Keep the company story honest and current. Add names only when the team is ready to publish them.">
    <div className="grid gap-6 md:grid-cols-2"><Field label="Eyebrow" value={content.about.eyebrow} onChange={(value) => update('eyebrow', value)} /><TextField label="Headline" value={content.about.title} onChange={(value) => update('title', value)} /><TextField label="Intro" value={content.about.intro} onChange={(value) => update('intro', value)} /><TextField label="The story" value={content.about.story} onChange={(value) => update('story', value)} /><TextField label="Food" value={content.about.food} onChange={(value) => update('food', value)} /><TextField label="Inspiration" value={content.about.inspiration} onChange={(value) => update('inspiration', value)} /></div>
    <div className="mt-8 border-t border-[hsl(var(--border))] pt-7"><div className="flex items-end justify-between gap-4"><div><p className="mono text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary))]">Editable profile slots</p><h3 className="display mt-2 text-3xl">People behind the places</h3></div><button type="button" onClick={addProfile} className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] px-4 py-2 text-xs font-bold hover:border-[hsl(var(--primary))]" data-testid="button-add-profile"><Plus size={14} /> Add profile</button></div><div className="mt-5 space-y-4">{content.about.profiles.map((profile) => <div key={profile.id} className="rounded-2xl bg-[hsl(var(--muted)/.5)] p-4"><div className="grid gap-4 md:grid-cols-2"><Field label="Role" value={profile.role} onChange={(value) => updateProfile(profile.id, 'role', value)} /><Field label="Name" value={profile.name} onChange={(value) => updateProfile(profile.id, 'name', value)} /><TextField label="Bio" value={profile.bio} onChange={(value) => updateProfile(profile.id, 'bio', value)} /><Field label="Image path (optional)" value={profile.image} onChange={(value) => updateProfile(profile.id, 'image', value)} /></div></div>)}</div></div>
  </EditorCard>;
}

function JournalEditor() {
  const { content, setContent } = useContent();
  const items = content.journal;
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? '');
  const item = items.find((entry) => entry.id === selectedId);
  const update = (next: JournalEntry) => setContent({ ...content, journal: items.map((entry) => entry.id === next.id ? next : entry) });
  const add = () => { const next = { id: `journal-${items.length + 1}`, label: 'Editable journal entry', title: 'A new story from the group', excerpt: 'Add a short introduction.', body: 'Add the full journal story here.', image: '/images/hero-table.jpg' }; setContent({ ...content, journal: [...items, next] }); setSelectedId(next.id); };
  const remove = () => { if (items.length < 2 || !item) return; const next = items.filter((entry) => entry.id !== item.id); setContent({ ...content, journal: next }); setSelectedId(next[0]?.id ?? ''); };
  return <div className="grid gap-6 lg:grid-cols-[260px_1fr]"><ItemList items={items} selectedId={selectedId} onSelect={setSelectedId} onAdd={add} onDelete={remove} label="Journal" getTitle={(entry) => (entry as JournalEntry).title} />{item ? <EditorCard title={item.title} description="Publish journal notes and success stories without changing the page."><div className="grid gap-6 md:grid-cols-2"><Field label="Label" value={item.label} onChange={(value) => update({ ...item, label: value })} /><Field label="Image path" value={item.image} onChange={(value) => update({ ...item, image: value })} /><TextField label="Title" value={item.title} onChange={(value) => update({ ...item, title: value })} /><TextField label="Excerpt" value={item.excerpt} onChange={(value) => update({ ...item, excerpt: value })} /><div className="md:col-span-2"><TextField label="Story body" value={item.body} onChange={(value) => update({ ...item, body: value })} /></div></div></EditorCard> : <EmptyEditor label="Add a journal entry to start editing." />}</div>;
}

function AwardsEditor() {
  const { content, setContent } = useContent();
  const items = content.awards;
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? '');
  const item = items.find((entry) => entry.id === selectedId);
  const update = (next: AwardEntry) => setContent({ ...content, awards: items.map((entry) => entry.id === next.id ? next : entry) });
  const add = () => { const next = { id: `award-${items.length + 1}`, year: 'Year / label', title: 'Add award or recognition', organisation: 'Add organisation', note: 'Add a verified note before publishing.' }; setContent({ ...content, awards: [...items, next] }); setSelectedId(next.id); };
  const remove = () => { if (!item) return; const next = items.filter((entry) => entry.id !== item.id); setContent({ ...content, awards: next }); setSelectedId(next[0]?.id ?? ''); };
  return <div className="grid gap-6 lg:grid-cols-[260px_1fr]"><ItemList items={items} selectedId={selectedId} onSelect={setSelectedId} onAdd={add} onDelete={remove} label="Awards" getTitle={(entry) => (entry as AwardEntry).title} />{item ? <EditorCard title={item.title} description="Add only verified awards or recognitions. Entries appear on the public collection page."><div className="grid gap-6 md:grid-cols-2"><Field label="Year / label" value={item.year} onChange={(value) => update({ ...item, year: value })} /><Field label="Organisation" value={item.organisation} onChange={(value) => update({ ...item, organisation: value })} /><TextField label="Award title" value={item.title} onChange={(value) => update({ ...item, title: value })} /><TextField label="Verified note" value={item.note} onChange={(value) => update({ ...item, note: value })} /></div></EditorCard> : <EmptyEditor label="No awards added yet. Add a verified recognition when ready." />}</div>;
}

function EmptyEditor({ label }: { label: string }) {
  return <div className="grid min-h-60 place-items-center rounded-3xl border border-dashed border-[hsl(var(--border))] p-8 text-center text-sm text-[hsl(var(--muted-foreground))]">{label}</div>;
}

export default function Studio() {
  const { resetContent } = useContent();
  const [section, setSection] = useState<StudioSection>('brands');
  const [resetRequested, setResetRequested] = useState(false);
  const nav: { id: StudioSection; label: string; description: string }[] = [
    { id: 'brands', label: 'Brands', description: 'Stories, visuals & PDFs' },
    { id: 'outlets', label: 'Outlets & menus', description: 'Locations and dishes' },
    { id: 'events', label: 'Events', description: 'What’s happening next' },
    { id: 'site', label: 'Site & app', description: 'Logo and download links' },
    { id: 'about', label: 'About', description: 'Story and profiles' },
    { id: 'journal', label: 'Journal', description: 'Stories and updates' },
    { id: 'awards', label: 'Awards', description: 'Verified recognition' },
    { id: 'offers', label: 'Offers', description: 'Member moments and promos' },
  ];
  const confirmReset = () => {
    if (!resetRequested) {
      setResetRequested(true);
      return;
    }
    resetContent();
    setResetRequested(false);
  };
  return <div className="min-h-[100dvh] bg-[hsl(var(--background))]"><StudioHeader onReset={confirmReset} /><main className={`${shell} py-10 md:py-14`}><div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mono text-[10px] uppercase tracking-[.18em] text-[hsl(var(--primary))]">No-code publishing space</p><h2 className="display mt-3 max-w-2xl text-5xl leading-[.9] md:text-7xl">Keep the good stuff current.</h2><p className="mt-5 max-w-xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Edit the content your guests see. Changes save automatically in this browser and appear across the public pages immediately.</p></div><div className="flex items-center gap-2 rounded-full bg-[hsl(var(--muted))] px-4 py-2.5 text-xs font-semibold text-[hsl(var(--muted-foreground))]"><Save size={14} className="text-[hsl(var(--primary))]" /> Saved automatically</div></div>{resetRequested && <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-[hsl(var(--accent))] bg-[hsl(var(--accent)/.18)] p-4 text-sm md:flex-row md:items-center"><span>This will remove your local edits and restore the starter content.</span><div className="flex gap-2"><button onClick={() => setResetRequested(false)} className="rounded-full border border-[hsl(var(--border))] px-4 py-2 text-xs font-bold" data-testid="button-cancel-reset">Keep edits</button><button onClick={confirmReset} className="rounded-full bg-[hsl(var(--primary))] px-4 py-2 text-xs font-bold text-[hsl(var(--primary-foreground))]" data-testid="button-confirm-reset">Restore starter content</button></div></div>}<div className="mb-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{nav.map((item) => <button key={item.id} onClick={() => setSection(item.id)} className={`rounded-2xl border p-4 text-left transition ${section === item.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/.08)]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--primary)/.5)]'}`} data-testid={`button-studio-${item.id}`}><span className="text-sm font-bold">{item.label}</span><span className="mt-1 block text-xs text-[hsl(var(--muted-foreground))]">{item.description}</span></button>)}</div>{section === 'brands' && <BrandsEditor />}{section === 'outlets' && <OutletsEditor />}{section === 'offers' && <CollectionEditor kind="offers" title="Offers & member moments" description="Give guests a current reason to visit, join, or come back." />}{section === 'events' && <CollectionEditor kind="events" title="Events & occasions" description="Keep the calendar fresh with group-friendly reasons to drop by." />}{section === 'site' && <SiteEditor />}{section === 'about' && <AboutEditor />}{section === 'journal' && <JournalEditor />}{section === 'awards' && <AwardsEditor />}</main><footer className={`${shell} border-t border-[hsl(var(--border))] py-8 text-xs text-[hsl(var(--muted-foreground))]`}>Content Studio is a browser-based first release. Connect a shared CMS when multiple editors need the same workspace.</footer></div>;
}