const icons = {
  arrowRight: 'M5 12h14m-6-6 6 6-6 6', arrowLeft: 'M19 12H5m6 6-6-6 6-6', check: 'm5 12 4 4L19 6',
  menu: 'M4 7h16M4 12h16M4 17h16', close: 'M6 6l12 12M18 6 6 18', search: 'M21 21l-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0',
  send: 'm22 2-7 20-4-9-9-4 20-7ZM11 13 22 2', home: 'M3 11 12 3l9 8v10h-6v-6H9v6H3Z', users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m3-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  person: 'M18 20a6 6 0 0 0-12 0m6-8a4 4 0 1 0 0-8 4 4 0 0 0 0 8', chat: 'M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A8 8 0 1 1 21 15Z',
  book: 'M2 4h6a4 4 0 0 1 4 4v13a4 4 0 0 0-4-4H2Zm20 0h-6a4 4 0 0 0-4 4v13a4 4 0 0 1 4-4h6Z', play: 'm8 5 11 7-11 7Z',
  star: 'm12 2 3 6 7 .9-5 4.8 1.2 6.8-6.2-3.2-6.2 3.2 1.2-6.8-5-4.8L9 8Z', sparkle: 'm12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3Zm6 11 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8Z',
  sun: 'M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7 1.4-1.4M4.9 19.1l1.4-1.4m11.4 0 1.4 1.4M4.9 4.9l1.4 1.4M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0', moon: 'M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5',
  pin: 'M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13Zm0-9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z'
};
const icon = (name, size = 20, fill = 'none') => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[name]}"></path></svg>`;
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
const guides = [
  { name: 'Sora', role: 'Mindfulness guide', tone: 'Clarity & calm', color: '#c96e4d', symbol: 'sun' },
  { name: 'Elio', role: 'Creative mentor', tone: 'Curiosity & courage', color: '#d69a42', symbol: 'sparkle' },
  { name: 'Mira', role: 'Rest & reflection', tone: 'Stillness & care', color: '#657797', symbol: 'moon' }
];
const practices = [
  { title: 'Morning grounding', meta: '5 min • Sora', text: 'Begin your day rooted, present, and clear.', color: '#d87e59', symbol: 'sun' },
  { title: 'Unlock your spark', meta: '8 min • Elio', text: 'A playful invitation to move beyond the blank page.', color: '#daa250', symbol: 'sparkle' },
  { title: 'Evening release', meta: '7 min • Mira', text: 'Set down the day and soften into rest.', color: '#7082a3', symbol: 'moon' }
];
const state = { tab: 'home', query: '', completed: JSON.parse(localStorage.getItem('luminary-completed') || '[]'), messages: [{ from: 'sora', text: 'I’m here. What feels most present for you right now?' }], leadsLocation: '', leadsRadius: 8, leadsResults: [], leadsLoading: false, leadsError: null };
const app = document.querySelector('#root');

function shell(content) {
  return `<div class="app-shell"><header><button class="icon-btn menu" data-action="menu" aria-label="Open menu">${icon('menu')}</button><button class="brand" data-tab="home"><span class="brand-mark">${icon('sparkle',17)}</span>Luminary</button><nav>${['home','companions','leads','journal'].map(x => `<button class="${state.tab === x ? 'active' : ''}" data-tab="${x}">${x[0].toUpperCase()+x.slice(1)}</button>`).join('')}</nav><button class="profile" aria-label="Profile">${icon('person',18)}<span>Amara</span></button></header><main>${content}</main><div class="mobile-nav">${[['home','home'],['companions','users'],['leads','pin'],['journal','book']].map(([x,i])=>`<button class="${state.tab===x?'active':''}" data-tab="${x}">${icon(i,19)}<span>${x}</span></button>`).join('')}<button data-action="chat">${icon('chat',19)}<span>Talk</span></button></div></div>`;
}
function home() {
  return `<section class="hero"><div class="hero-copy"><div class="eyebrow"><span></span> YOUR SPACE TO GROW</div><h1>Come home to<br><em>yourself.</em></h1><p>Gentle guidance for a more intentional life. Meet companions who listen, practices that ground you, and space to simply be.</p><div class="hero-actions"><button class="primary" data-tab="companions">Meet your companions ${icon('arrowRight',17)}</button><button class="text-btn" data-action="scroll-practices">${icon('play',14,'currentColor')} Begin today's practice</button></div><div class="trust"><div class="faces"><span>S</span><span>E</span><span>M</span></div><div><b>4.9 ${icon('star',12,'currentColor')}</b><small>Trusted by 12,000+ seekers</small></div></div></div><div class="hero-art" aria-label="Abstract sunrise over hills"><div class="sun-glow"></div><div class="sun-core">${icon('sparkle',25)}</div><div class="orbit one"><span></span></div><div class="orbit two"><span></span></div><div class="hill back"></div><div class="hill front"></div><div class="quote-card">${icon('sparkle',16)}<p>“The quieter you become, the more you are able to hear.”</p><span>— RUMI</span></div></div></section>
  <section class="today"><div class="section-heading"><div><div class="eyebrow"><span></span> A MOMENT FOR YOU</div><h2>Today's gentle practices</h2></div><p>Small moments, meaningful change.</p></div><div class="practice-grid">${practices.map((p,i)=>`<article class="practice"><div class="practice-visual" style="--tone:${p.color}">${icon(p.symbol,30)}<span>0${i+1}</span></div><div class="practice-body"><small>${p.meta}</small><h3>${p.title}</h3><p>${p.text}</p><button class="${state.completed.includes(p.title)?'done':''}" data-practice="${p.title}">${state.completed.includes(p.title)?`${icon('check',15)} Completed`:`Begin practice ${icon('arrowRight',15)}`}</button></div></article>`).join('')}</div></section>
  <section class="companion-callout"><div><div class="eyebrow light"><span></span> YOU DON'T HAVE TO WALK ALONE</div><h2>A companion for every season.</h2><p>Each Luminary brings a different kind of wisdom. Choose the energy you need today.</p><button data-tab="companions">Explore all companions ${icon('arrowRight',16)}</button></div><div class="constellation">${guides.map(g=>`<span style="--tone:${g.color}">${icon(g.symbol)}</span>`).join('')}</div></section>`;
}
function companions() {
  const found = guides.filter(g => `${g.name} ${g.role} ${g.tone}`.toLowerCase().includes(state.query.toLowerCase()));
  return `<section class="page companions-page"><button class="back" data-tab="home">${icon('arrowLeft',16)} Back home</button><div class="eyebrow"><span></span> MEET YOUR GUIDES</div><h1>Someone to walk<br><em>beside you.</em></h1><p class="lead">Choose the kind of presence you need today. Every conversation is private, thoughtful, and yours.</p><label class="search">${icon('search',18)}<input id="companion-search" value="${state.query}" placeholder="Search companions..."></label><div class="guide-grid">${found.map(g=>`<article class="guide-card" style="--tone:${g.color}"><div class="guide-avatar">${icon(g.symbol,34)}</div><small>${g.tone}</small><h2>${g.name}</h2><p>${g.role}</p><button data-action="chat">Start a conversation ${icon('chat',16)}</button></article>`).join('') || '<p>No companions found. Try another search.</p>'}</div></section>`;
}
function journal() {
  return `<section class="page journal-page"><div class="eyebrow"><span></span> YOUR INNER LANDSCAPE</div><h1>A quiet place<br><em>to notice.</em></h1><p class="lead">What is asking for your attention today?</p><textarea id="journal" placeholder="Begin wherever you are...">${escapeHtml(localStorage.getItem('luminary-journal') || '')}</textarea><div class="journal-actions"><span>Only you can see this entry</span><button data-action="save-journal">Save reflection ${icon('check',16)}</button></div><div class="prompt">${icon('book')}<div><small>GENTLE PROMPT</small><p>What would feel like kindness toward yourself today?</p></div></div></section>`;
}
const LEAD_CATEGORIES = [
  { match: t => t.amenity === 'doctors' || t.healthcare === 'doctor' || t.amenity === 'clinic', label: 'GP surgery / healthcare practice', weight: 92, angle: 'Offer a social-prescribing referral pathway for isolated or recently-bereaved patients.' },
  { match: t => t.amenity === 'social_facility' || t.amenity === 'community_centre' || t.office === 'charity', label: 'Community & social care organisation', weight: 95, angle: 'Propose a referral partnership for clients who need regular in-home companionship.' },
  { match: t => t.amenity === 'nursing_home', label: 'Care home / retirement community', weight: 80, angle: 'Position as a complementary companionship service for residents’ families and pre-admission clients.' },
  { match: t => t.office === 'lawyer', label: 'Solicitor / legal practice', weight: 75, angle: 'Introduce as a trusted referral for clients handling wills, power of attorney, or probate.' },
  { match: t => t.office === 'financial_advisor' || t.office === 'financial' || t.office === 'insurance', label: 'Financial adviser / insurance office', weight: 75, angle: 'Offer as a value-add referral for clients planning later-life care costs.' },
  { match: t => t.office === 'company' || t.office === 'it' || t.office === 'consulting', label: 'Local employer (corporate EAP prospect)', weight: 70, angle: 'Pitch a corporate eldercare benefit package for staff with caregiving responsibilities.' },
  { match: t => t.amenity === 'pharmacy', label: 'Pharmacy', weight: 65, angle: 'Leave leaflets or cards — high foot traffic from elderly customers and their families.' },
  { match: t => t.amenity === 'place_of_worship', label: 'Place of worship', weight: 60, angle: 'Ask to speak with the pastoral care team about isolated older members.' },
  { match: t => t.amenity === 'library', label: 'Library / community hub', weight: 55, angle: 'Propose a noticeboard flyer or a talk for the seniors’ reading group.' }
];
function haversineKm(lat1, lon1, lat2, lon2) { const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLon = (lon2-lon1)*Math.PI/180; const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2; return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); }
function buildAddress(tags) { const parts = [tags['addr:housenumber'] && tags['addr:street'] ? `${tags['addr:housenumber']} ${tags['addr:street']}` : tags['addr:street'], tags['addr:city'], tags['addr:postcode']].filter(Boolean); return parts.length ? parts.join(', ') : 'Address not listed'; }
function buildOverpassQuery(lat, lon, radius) {
  const clauses = ['["amenity"="doctors"]','["healthcare"="doctor"]','["amenity"="clinic"]','["amenity"="social_facility"]','["amenity"="community_centre"]','["office"="charity"]','["amenity"="nursing_home"]','["office"="lawyer"]','["office"="financial_advisor"]','["office"="financial"]','["office"="insurance"]','["office"="company"]','["amenity"="pharmacy"]','["amenity"="place_of_worship"]','["amenity"="library"]'];
  return `[out:json][timeout:25];(${clauses.map(c => `nwr${c}(around:${radius},${lat},${lon});`).join('')});out center tags 80;`;
}
function scoreAndRank(elements, lat, lon) {
  const seen = new Set();
  return elements.map(el => {
    const tags = el.tags || {};
    if (!tags.name) return null;
    const category = LEAD_CATEGORIES.find(c => c.match(tags));
    if (!category) return null;
    const elLat = el.lat ?? el.center?.lat, elLon = el.lon ?? el.center?.lon;
    if (elLat == null || elLon == null) return null;
    const key = `${tags.name.toLowerCase()}|${elLat.toFixed(3)}|${elLon.toFixed(3)}`;
    if (seen.has(key)) return null;
    seen.add(key);
    const distance = haversineKm(lat, lon, elLat, elLon);
    const phone = tags.phone || tags['contact:phone'] || null, website = tags.website || tags['contact:website'] || null;
    let score = category.weight - distance * 4 + (phone ? 6 : 0) + (website ? 6 : 0);
    score = Math.max(5, Math.min(100, Math.round(score)));
    return { name: tags.name, category: category.label, angle: category.angle, address: buildAddress(tags), distance, phone, website, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 40);
}
async function findLeads() {
  const location = state.leadsLocation.trim();
  if (!location) { toast('Enter a location to search'); return; }
  state.leadsLoading = true; state.leadsError = null; state.leadsResults = []; render();
  try {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(location)}`);
    if (!geoRes.ok) throw new Error('Could not reach the location lookup service. Please try again.');
    const geo = await geoRes.json();
    if (!geo.length) throw new Error('Location not found — try a more specific town, postcode, or area.');
    const lat = parseFloat(geo[0].lat), lon = parseFloat(geo[0].lon);
    const radiusM = Math.round(state.leadsRadius * 1000);
    const overpassRes = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: buildOverpassQuery(lat, lon, radiusM) });
    if (!overpassRes.ok) throw new Error('Could not reach the leads database. Please try again shortly.');
    const data = await overpassRes.json();
    state.leadsResults = scoreAndRank(data.elements || [], lat, lon);
    if (!state.leadsResults.length) state.leadsError = 'No potential leads found nearby. Try a larger radius or a different location.';
  } catch (err) {
    state.leadsError = err.message || 'Something went wrong finding leads. Please try again.';
  }
  state.leadsLoading = false; render();
}
function exportLeadsCsv() {
  const rows = [['Rank','Name','Category','Score','Distance (km)','Address','Phone','Website'], ...state.leadsResults.map((l,i) => [i+1, l.name, l.category, l.score, l.distance.toFixed(1), l.address, l.phone||'', l.website||''])];
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'luminary-leads.csv'; a.click();
  URL.revokeObjectURL(url);
  toast('Leads exported as CSV');
}
function leads() {
  return `<section class="page leads-page"><button class="back" data-tab="home">${icon('arrowLeft',16)} Back home</button><div class="eyebrow"><span></span> COLD OUTREACH</div><h1>Find your next<br><em>referral partner.</em></h1><p class="lead">Enter a town, postcode, or area. We surface nearby GP surgeries, community organisations, care homes, and other referral partners — ranked by fit for companionship outreach.</p>
  <form id="leads-form" class="leads-form"><label class="search leads-search">${icon('search',18)}<input id="leads-location" value="${escapeHtml(state.leadsLocation)}" placeholder="e.g. Didsbury, Manchester" autocomplete="off"></label><select id="leads-radius">${[3,5,8,15,25].map(km=>`<option value="${km}" ${state.leadsRadius===km?'selected':''}>${km} km radius</option>`).join('')}</select><button class="primary" type="submit" ${state.leadsLoading?'disabled':''}>${state.leadsLoading?'Searching…':'Find leads'} ${icon('arrowRight',15)}</button></form>
  ${state.leadsError ? `<p class="leads-error">${escapeHtml(state.leadsError)}</p>` : ''}
  ${state.leadsResults.length ? `<div class="leads-toolbar"><span>${state.leadsResults.length} potential leads, ranked by fit</span><button class="text-btn" data-action="export-leads">${icon('book',14)} Export CSV</button></div><div class="leads-list">${state.leadsResults.map((l,i)=>`<article class="lead-card"><div class="lead-rank">#${i+1}</div><div class="lead-body"><div class="lead-top"><h3>${escapeHtml(l.name)}</h3><div class="lead-score" style="--score:${l.score}"><span>${l.score}</span></div></div><small>${escapeHtml(l.category)}</small><p class="lead-address">${escapeHtml(l.address)} • ${l.distance.toFixed(1)} km away</p><p class="lead-angle">${escapeHtml(l.angle)}</p><div class="lead-contact">${l.phone?`<a href="tel:${escapeHtml(l.phone)}">${icon('chat',13)} ${escapeHtml(l.phone)}</a>`:''}${l.website?`<a href="${escapeHtml(l.website)}" target="_blank" rel="noopener">${icon('arrowRight',13)} Website</a>`:''}</div></div></article>`).join('')}</div>` : (!state.leadsLoading && !state.leadsError ? '<p class="leads-empty">Search a location above to see ranked leads here.</p>' : '')}
  </section>`;
}
function leadsInputRender() { const el = document.querySelector('#leads-location'); const pos = el.selectionStart; const val = state.leadsLocation; render(); const input = document.querySelector('#leads-location'); input.focus(); input.value = val; input.setSelectionRange(pos, pos); }
function render() { app.innerHTML = shell(state.tab === 'home' ? home() : state.tab === 'companions' ? companions() : state.tab === 'leads' ? leads() : journal()); }
function toast(text) { document.querySelector('.toast')?.remove(); document.body.insertAdjacentHTML('beforeend', `<div class="toast">${icon('check',16)}${text}</div>`); setTimeout(()=>document.querySelector('.toast')?.remove(),2300); }
function openChat() { document.body.insertAdjacentHTML('beforeend', `<div class="chat-panel"><div class="chat-head"><div class="mini-avatar">${icon('sun',19)}</div><div><b>Sora</b><small>Here with you</small></div><button data-action="close-chat">${icon('close')}</button></div><div class="messages">${state.messages.map(m=>`<div class="bubble ${m.from}">${escapeHtml(m.text)}</div>`).join('')}</div><form id="chat-form"><input id="chat-input" placeholder="Share what's on your mind..." autocomplete="off"><button aria-label="Send">${icon('send',18)}</button></form></div>`); document.querySelector('#chat-input').focus(); }
function openMenu() { document.body.insertAdjacentHTML('beforeend', `<div class="drawer-backdrop"><aside><button class="close" data-action="close-menu">${icon('close')}</button><div class="brand"><span class="brand-mark">${icon('sparkle',17)}</span>Luminary</div><p>Your space to pause, listen, and grow.</p>${['home','companions','leads','journal'].map(x=>`<button data-tab="${x}">${x}${icon('arrowRight')}</button>`).join('')}</aside></div>`); }

document.addEventListener('click', e => {
  const tab = e.target.closest('[data-tab]')?.dataset.tab; const action = e.target.closest('[data-action]')?.dataset.action;
  if (tab) { state.tab = tab; document.querySelector('.drawer-backdrop')?.remove(); render(); scrollTo(0,0); }
  if (action === 'menu') openMenu(); if (action === 'close-menu') document.querySelector('.drawer-backdrop')?.remove();
  if (action === 'chat') openChat(); if (action === 'close-chat') document.querySelector('.chat-panel')?.remove();
  if (action === 'scroll-practices') document.querySelector('.today').scrollIntoView({behavior:'smooth'});
  if (action === 'export-leads') exportLeadsCsv();
  if (action === 'save-journal') { localStorage.setItem('luminary-journal', document.querySelector('#journal').value); toast('Your reflection is safely saved'); }
  const practice = e.target.closest('[data-practice]')?.dataset.practice;
  if (practice) { const had = state.completed.includes(practice); state.completed = had ? state.completed.filter(x=>x!==practice) : [...state.completed,practice]; localStorage.setItem('luminary-completed',JSON.stringify(state.completed)); render(); toast(had?'Practice reopened':'Beautiful work — practice complete'); }
});
document.addEventListener('input', e => { if (e.target.id === 'companion-search') { state.query=e.target.value; companionsSearchRender(); } if (e.target.id === 'leads-location') { state.leadsLocation = e.target.value; leadsInputRender(); } });
function companionsSearchRender(){ const selectionStart=document.querySelector('#companion-search').selectionStart; const value=state.query; app.innerHTML=shell(companions()); const input=document.querySelector('#companion-search'); input.focus(); input.value=value; input.setSelectionRange(selectionStart,selectionStart); }
document.addEventListener('submit', e => {
  if (e.target.id === 'leads-form') { e.preventDefault(); const radiusEl = document.querySelector('#leads-radius'); if (radiusEl) state.leadsRadius = Number(radiusEl.value); findLeads(); return; }
  if(e.target.id !== 'chat-form') return; e.preventDefault(); const input=document.querySelector('#chat-input'); if(!input.value.trim()) return; state.messages.push({from:'you',text:input.value.trim()},{from:'sora',text:'Thank you for sharing that. Let’s take one slow breath together, then notice what you need most.'}); document.querySelector('.chat-panel').remove(); openChat(); });
render();
