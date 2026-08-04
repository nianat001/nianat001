import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const paths = {
  ArrowLeft:'M19 12H5m6 6-6-6 6-6', ArrowRight:'M5 12h14m-6-6 6 6-6 6', ChevronRight:'m9 18 6-6-6-6',
  Menu:'M4 7h16M4 12h16M4 17h16', X:'M6 6l12 12M18 6 6 18', Check:'m5 12 4 4L19 6', Plus:'M12 5v14M5 12h14',
  Search:'M21 21l-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0', Send:'m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2',
  Home:'M3 11 12 3l9 8v10h-6v-6H9v6H3Z', Users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8m13 10v-2a4 4 0 0 0-3-3.87m-2-12a4 4 0 0 1 0 7.75',
  UserRound:'M18 20a6 6 0 0 0-12 0m6-8a4 4 0 1 0 0-8 4 4 0 0 0 0 8', MessageCircle:'M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A8 8 0 1 1 21 15Z',
  BookOpen:'M2 4h6a4 4 0 0 1 4 4v13a4 4 0 0 0-4-4H2Zm20 0h-6a4 4 0 0 0-4 4v13a4 4 0 0 1 4-4h6Z', Play:'m8 5 11 7-11 7Z',
  Star:'m12 2 3 6 7 .9-5 4.8 1.2 6.8-6.2-3.2-6.2 3.2 1.2-6.8-5-4.8L9 8Z',
  Sparkles:'m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3Zm6 11 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8Z',
  Sun:'M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7 1.4-1.4M4.9 19.1l1.4-1.4m11.4 0 1.4 1.4M4.9 4.9l1.4 1.4M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
  Moon:'M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5'
};
function Icon({name,size=24,fill='none',...props}){return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]}/></svg>}
const icons = Object.keys(paths).reduce((a,n)=>({...a,[n]:(p)=><Icon name={n} {...p}/>} ),{});
const {ArrowLeft,ArrowRight,BookOpen,Check,ChevronRight,Home,Menu,MessageCircle,Moon,Play,Search,Send,Sparkles,Star,Sun,UserRound,Users,X}=icons;

const guides = [
  { name: 'Sora', role: 'Mindfulness guide', tone: 'Clarity & calm', color: '#c96e4d', icon: Sun },
  { name: 'Elio', role: 'Creative mentor', tone: 'Curiosity & courage', color: '#d69a42', icon: Sparkles },
  { name: 'Mira', role: 'Rest & reflection', tone: 'Stillness & care', color: '#657797', icon: Moon },
];

const practices = [
  { title: 'Morning grounding', meta: '5 min • Sora', color: '#d87e59', icon: Sun },
  { title: 'Unlock your spark', meta: '8 min • Elio', color: '#daa250', icon: Sparkles },
  { title: 'Evening release', meta: '7 min • Mira', color: '#7082a3', icon: Moon },
];

function App() {
  const [tab, setTab] = useState('home');
  const [menu, setMenu] = useState(false);
  const [chat, setChat] = useState(false);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{ from: 'sora', text: 'I’m here. What feels most present for you right now?' }]);
  const [completed, setCompleted] = useState(() => JSON.parse(localStorage.getItem('luminary-completed') || '[]'));
  const [toast, setToast] = useState('');

  useEffect(() => localStorage.setItem('luminary-completed', JSON.stringify(completed)), [completed]);
  const filtered = guides.filter((g) => `${g.name} ${g.role} ${g.tone}`.toLowerCase().includes(query.toLowerCase()));
  const complete = (title) => {
    setCompleted((old) => old.includes(title) ? old.filter((x) => x !== title) : [...old, title]);
    setToast(completed.includes(title) ? 'Practice reopened' : 'Beautiful work — practice complete');
    setTimeout(() => setToast(''), 2300);
  };
  const send = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages((m) => [...m, { from: 'you', text: message.trim() }, { from: 'sora', text: 'Thank you for sharing that. Let’s take one slow breath together, then notice what you need most.' }]);
    setMessage('');
  };

  return <div className="app-shell">
    <header>
      <button className="icon-btn menu" aria-label="Open menu" onClick={() => setMenu(true)}><Menu size={20}/></button>
      <button className="brand" onClick={() => setTab('home')}><span className="brand-mark"><Sparkles size={17}/></span>Luminary</button>
      <nav>{['Home', 'Companions', 'Journal'].map(x => <button className={tab === x.toLowerCase() ? 'active' : ''} onClick={() => setTab(x.toLowerCase())} key={x}>{x}</button>)}</nav>
      <button className="profile" aria-label="Profile"><UserRound size={18}/><span>Amara</span></button>
    </header>

    <main>
      {tab === 'home' && <>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span></span> YOUR SPACE TO GROW</div>
            <h1>Come home to<br/><em>yourself.</em></h1>
            <p>Gentle guidance for a more intentional life. Meet companions who listen, practices that ground you, and space to simply be.</p>
            <div className="hero-actions"><button className="primary" onClick={() => setTab('companions')}>Meet your companions <ArrowRight size={17}/></button><button className="text-btn" onClick={() => document.querySelector('.today').scrollIntoView({behavior:'smooth'})}><Play size={14} fill="currentColor"/> Begin today's practice</button></div>
            <div className="trust"><div className="faces"><span>S</span><span>E</span><span>M</span></div><div><b>4.9 <Star size={12} fill="currentColor"/></b><small>Trusted by 12,000+ seekers</small></div></div>
          </div>
          <div className="hero-art" aria-label="Abstract sunrise over hills">
            <div className="sun-glow"></div><div className="sun-core"><Sparkles size={25}/></div><div className="orbit one"><span></span></div><div className="orbit two"><span></span></div>
            <div className="hill back"></div><div className="hill front"></div>
            <div className="quote-card"><Sparkles size={16}/><p>“The quieter you become, the more you are able to hear.”</p><span>— RUMI</span></div>
          </div>
        </section>

        <section className="today">
          <div className="section-heading"><div><div className="eyebrow"><span></span> A MOMENT FOR YOU</div><h2>Today's gentle practices</h2></div><p>Small moments, meaningful change.</p></div>
          <div className="practice-grid">{practices.map((p, i) => <article className="practice" key={p.title}>
            <div className="practice-visual" style={{'--tone': p.color}}><p.icon size={30}/><span>0{i+1}</span></div>
            <div className="practice-body"><small>{p.meta}</small><h3>{p.title}</h3><p>{i===0?'Begin your day rooted, present, and clear.':i===1?'A playful invitation to move beyond the blank page.':'Set down the day and soften into rest.'}</p><button className={completed.includes(p.title) ? 'done' : ''} onClick={() => complete(p.title)}>{completed.includes(p.title) ? <><Check size={15}/> Completed</> : <>Begin practice <ArrowRight size={15}/></>}</button></div>
          </article>)}</div>
        </section>

        <section className="companion-callout"><div><div className="eyebrow light"><span></span> YOU DON'T HAVE TO WALK ALONE</div><h2>A companion for every season.</h2><p>Each Luminary brings a different kind of wisdom. Choose the energy you need today.</p><button onClick={() => setTab('companions')}>Explore all companions <ArrowRight size={16}/></button></div><div className="constellation">{guides.map((g) => <span key={g.name} style={{'--tone':g.color}}><g.icon/></span>)}</div></section>
      </>}

      {tab === 'companions' && <section className="page companions-page"><button className="back" onClick={() => setTab('home')}><ArrowLeft size={16}/> Back home</button><div className="eyebrow"><span></span> MEET YOUR GUIDES</div><h1>Someone to walk<br/><em>beside you.</em></h1><p className="lead">Choose the kind of presence you need today. Every conversation is private, thoughtful, and yours.</p><label className="search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search companions..."/></label><div className="guide-grid">{filtered.map(g => <article className="guide-card" key={g.name} style={{'--tone':g.color}}><div className="guide-avatar"><g.icon size={34}/></div><small>{g.tone}</small><h2>{g.name}</h2><p>{g.role}</p><button onClick={() => setChat(true)}>Start a conversation <MessageCircle size={16}/></button></article>)}</div></section>}

      {tab === 'journal' && <section className="page journal-page"><div className="eyebrow"><span></span> YOUR INNER LANDSCAPE</div><h1>A quiet place<br/><em>to notice.</em></h1><p className="lead">What is asking for your attention today?</p><textarea placeholder="Begin wherever you are..."/><div className="journal-actions"><span>Only you can see this entry</span><button onClick={() => {setToast('Your reflection is safely saved');}}>Save reflection <Check size={16}/></button></div><div className="prompt"><BookOpen/><div><small>GENTLE PROMPT</small><p>What would feel like kindness toward yourself today?</p></div></div></section>}
    </main>

    <div className="mobile-nav">{[{id:'home',I:Home},{id:'companions',I:Users},{id:'journal',I:BookOpen}].map(({id,I})=><button className={tab===id?'active':''} onClick={()=>setTab(id)} key={id}><I size={19}/><span>{id}</span></button>)}<button onClick={()=>setChat(true)}><MessageCircle size={19}/><span>Talk</span></button></div>
    {menu && <div className="drawer-backdrop" onClick={() => setMenu(false)}><aside onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setMenu(false)}><X/></button><div className="brand"><span className="brand-mark"><Sparkles size={17}/></span>Luminary</div><p>Your space to pause, listen, and grow.</p>{['home','companions','journal'].map(x=><button key={x} onClick={()=>{setTab(x);setMenu(false)}}>{x}<ChevronRight/></button>)}</aside></div>}
    {chat && <div className="chat-panel"><div className="chat-head"><div className="mini-avatar"><Sun size={19}/></div><div><b>Sora</b><small>Here with you</small></div><button onClick={()=>setChat(false)}><X/></button></div><div className="messages">{messages.map((m,i)=><div className={`bubble ${m.from}`} key={i}>{m.text}</div>)}</div><form onSubmit={send}><input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Share what's on your mind..." autoFocus/><button aria-label="Send"><Send size={18}/></button></form></div>}
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
