import { useState, useEffect, useRef } from 'react'
import {
  Sparkles, Shield, Clock, Star, ChevronDown, ChevronUp, Phone, Mail, MapPin,
  Check, ArrowRight, Menu, X, Award, Users, Leaf, CreditCard, Calendar,
  Home, Building2, Paintbrush, Wind, Package, Heart, MessageCircle, Repeat
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  { icon: Home, title: 'Standard Clean', desc: 'Kitchen, bathrooms, floors, dusting, and surface wipe-down. Everything you need on a regular basis.', time: '2–3 hrs', from: '$150' },
  { icon: Sparkles, title: 'Deep Clean', desc: 'Inside appliances, baseboards, grout scrubbing, window sills — the full treatment, corner to corner.', time: '4–6 hrs', from: '$280' },
  { icon: Package, title: 'Move In / Move Out', desc: 'Every surface, cabinet, and closet cleaned to security-deposit-saving standards.', time: '5–8 hrs', from: '$380' },
  { icon: Leaf, title: 'Eco-Friendly Clean', desc: 'Plant-based, non-toxic products throughout. Same thoroughness, zero harsh chemicals. Great for kids and pets.', time: '2–3 hrs', from: '$170' },
  { icon: Wind, title: 'Airbnb Turnover', desc: 'Fast turnaround between guests — linens, restock checklist, and spotless for your next review.', time: '2–3 hrs', from: '$160' },
]

const PRICING_TIERS = [
  {
    name: 'Standard Clean', price: 150, unit: 'visit', badge: 'Most Booked', highlight: false,
    desc: 'The essentials, done thoroughly.',
    features: ['Kitchen & bathroom scrub', 'Vacuuming & mopping all floors', 'Surface dusting & wipe-down', 'Trash & recycling taken out', 'Bed making & tidying'],
    recurring: '$135/visit with a recurring plan',
  },
  {
    name: 'Deep Clean', price: 280, unit: 'visit', badge: null, highlight: true,
    desc: 'When your apartment needs the full treatment.',
    features: ['Everything in Standard', 'Inside oven & refrigerator', 'Baseboards & door frames', 'Window sill & track detailing', 'Cabinet fronts & light fixtures', 'Grout & tile scrubbing'],
    recurring: '$250/visit with a recurring plan',
  },
]

const REVIEWS = [
  { name: 'Sarah M.', loc: 'Upper West Side', stars: 5, text: 'I\'ve had the same cleaner for over a year now. She knows exactly how I like things and I never have to explain twice. That consistency is priceless in NYC.', date: '2 weeks ago' },
  { name: 'James K.', loc: 'Williamsburg', stars: 5, text: 'Booked a deep clean before my parents visited. She spent 5 hours and got into every corner. My mom was genuinely impressed — and that never happens.', date: '1 month ago' },
  { name: 'Diana R.', loc: 'Bay Ridge', stars: 5, text: 'The move-out clean saved my security deposit. Every cabinet, every shelf, behind the fridge — thorough doesn\'t even begin to cover it.', date: '3 weeks ago' },
  { name: 'Michael T.', loc: 'East Village', stars: 5, text: 'What I appreciate most is the communication. If she\'s running 10 minutes late, I get a text. If something needs a special product, she asks. Total pro.', date: '1 week ago' },
  { name: 'Priya S.', loc: 'Astoria', stars: 5, text: 'I host on Airbnb and she handles turnovers for me. Guests always comment on cleanliness in their reviews. She\'s been a huge part of my Superhost status.', date: '5 days ago' },
  { name: 'Alex W.', loc: 'Park Slope', stars: 5, text: 'We switched when our baby arrived and needed non-toxic products. No chemical smell, everything spotless, and I can let my daughter crawl freely. She\'s part of the family now.', date: '2 months ago' },
]

const WHY_CLIENTS_STAY = [
  { icon: Users, title: 'Same Person, Every Time', desc: 'No random rotation. You get to know your cleaner, and she gets to know your apartment, your preferences, and your routine.' },
  { icon: Shield, title: 'Personal Accountability', desc: 'This isn\'t a faceless company — it\'s one person\'s reputation. Every clean has her name on it, and she takes that seriously.' },
  { icon: MessageCircle, title: 'Real Communication', desc: 'Need to move your appointment? Have a special request? Just text. No call centers, no ticket numbers.' },
  { icon: Repeat, title: 'Consistency You Can Count On', desc: 'She already knows where you keep the vacuum, which counter to leave the keys on, and that you like the pillows fluffed a certain way.' },
]

const FAQS = [
  { q: 'Do I need to be home during the cleaning?', a: 'Not at all. Most of my clients leave a key with the doorman, use a lockbox, or share a door code. I\'m fully insured and happy to provide references.' },
  { q: 'What about bigger apartments — can you handle a 3 or 4 bedroom?', a: 'Absolutely. For larger apartments or bigger jobs, my husband or mom joins me. We\'ve been doing this together for years and work as a tight team.' },
  { q: 'Do you bring your own supplies?', a: 'Yes — I bring professional-grade, eco-friendly products and all equipment. If you have specific products you prefer, just let me know and I\'ll use those instead.' },
  { q: 'What if I need to reschedule?', a: 'Life happens! Just text me at least 24 hours ahead and we\'ll find a new time. I try to be as flexible as possible.' },
  { q: 'What if I\'m not satisfied?', a: 'I\'ll come back and re-do it for free, no questions asked. My guarantee is simple: you should love walking into your apartment after I\'ve been there. If you don\'t, I\'ll make it right.' },
  { q: 'Do you serve all five boroughs?', a: 'Yes — Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. I organize my schedule by area so I can serve clients across the city efficiently.' },
  { q: 'How do recurring plans work?', a: 'We agree on a day and frequency (weekly, biweekly, or monthly). You get a discounted rate, and I hold your time slot. Most of my clients are recurring — it\'s the best way to keep your apartment consistently clean.' },
  { q: 'Can I request specific things?', a: 'Of course. Want me to skip a room? Focus extra on the kitchen? Use a particular product? Just tell me. The whole point is that I learn what you care about and deliver exactly that.' },
]

const BOROUGHS = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']
const APT_SIZES = ['Studio', '1 BR', '2 BR', '3 BR', '4+ BR']
const FREQUENCIES = [
  { label: 'Weekly', discount: '15% off', value: 'weekly' },
  { label: 'Biweekly', discount: '10% off', value: 'biweekly' },
  { label: 'Monthly', discount: '5% off', value: 'monthly' },
  { label: 'One-Time', discount: null, value: 'once' },
]

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ─── Small Components ────────────────────────────────────────────────────────

function StarRating({ count = 5 }) {
  return <div className="flex gap-0.5">{Array.from({ length: count }, (_, i) => <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />)}</div>
}

function SectionHeading({ tag, title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      {tag && <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-600 text-sm font-semibold tracking-wide uppercase mb-4">{tag}</span>}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-800 mb-4">{title}</h2>
      {subtitle && <p className="text-gray-500 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

function CTAButton({ children, variant = 'primary', size = 'lg', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer'
  const sizes = { sm: 'px-5 py-2.5 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  const variants = {
    primary: 'bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 hover:-translate-y-0.5',
    secondary: 'bg-white hover:bg-gray-50 text-primary-700 border-2 border-primary-200 hover:border-primary-300',
    dark: 'bg-primary-700 hover:bg-primary-800 text-white shadow-lg hover:-translate-y-0.5',
  }
  return <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>{children}</button>
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2">
            <Sparkles className={`w-7 h-7 ${scrolled ? 'text-accent-500' : 'text-white'}`} />
            <span className={`font-heading text-xl font-bold ${scrolled ? 'text-primary-800' : 'text-white'}`}>Pristine<span className="text-accent-400">NYC</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors hover:text-accent-500 ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>{l.label}</a>
            ))}
            <a href="#booking" className="ml-2">
              <CTAButton size="sm">Request a Booking</CTAButton>
            </a>
          </div>
          <button onClick={() => setOpen(!open)} className={`md:hidden p-2 ${scrolled ? 'text-primary-800' : 'text-white'}`} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-gray-700 font-medium py-2 hover:text-accent-500">{l.label}</a>
            ))}
            <a href="#booking" onClick={() => setOpen(false)}>
              <CTAButton size="md" className="w-full mt-2">Request a Booking</CTAButton>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-500" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
              <span className="text-white/90 text-sm font-medium">5.0 stars across 60+ reviews on Google & Yelp</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6">
              One Cleaner.
              <span className="block text-accent-400">Your Cleaner.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              I'm Eldia — I personally clean every apartment I book. No rotating strangers, no call centers. Just one person who learns your home and takes pride in it.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
              <CTAButton onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1">
                Request a Booking <ArrowRight className="w-5 h-5" />
              </CTAButton>
              <CTAButton variant="secondary" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 !border-white/30 !text-white hover:!bg-white/10">
                My Story
              </CTAButton>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mt-6 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-accent-400" /> All 5 boroughs</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-accent-400" /> Insured & bonded</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-accent-400" /> Eco-friendly products</span>
            </div>
          </div>

          {/* Right side — personal photo placeholder */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-full aspect-[4/5] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 overflow-hidden flex items-end justify-center">
                <div className="text-center pb-12 px-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-accent-400/20 flex items-center justify-center border-4 border-accent-400/30">
                    <span className="font-heading text-4xl font-bold text-accent-400">E</span>
                  </div>
                  <p className="text-white/60 text-sm">[Photo of Eldia — friendly, professional, in a clean NYC apartment]</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-primary-800 text-lg">5.0 / 5.0</p>
                  <p className="text-gray-500 text-sm">Google & Yelp</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-accent-500 text-white rounded-xl shadow-xl px-4 py-3 text-sm font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4" /> Family-Operated
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full"><path d="M0 40L48 36C96 32 192 24 288 28C384 32 480 48 576 52C672 56 768 48 864 40C960 32 1056 24 1152 28C1248 32 1344 48 1392 56L1440 64V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z" fill="white"/></svg>
      </div>
    </section>
  )
}

function TrustBar() {
  const [ref, visible] = useInView()
  const stats = [
    { value: '5.0', label: 'Google & Yelp Rating' },
    { value: '60+', label: 'Five-Star Reviews' },
    { value: '6+', label: 'Years in NYC' },
    { value: '100%', label: 'Satisfaction Guarantee' },
  ]
  return (
    <section ref={ref} className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl md:text-4xl font-bold text-primary-700">{s.value}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        {/* Real review platforms */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['Google', 'Yelp', 'Thumbtack'].map(p => (
              <div key={p} className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                <span className="text-sm font-semibold text-gray-500">{p}</span>
                <span className="text-xs text-gray-400">5.0</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const [ref, visible] = useInView()
  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Photo placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-primary-100 to-accent-500/10 flex items-center justify-center border border-primary-200/50">
              <div className="text-center px-8">
                <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <span className="font-heading text-4xl font-bold text-primary-700">E</span>
                </div>
                <p className="text-gray-400 text-sm">[Photo: Eldia in a client's apartment, smiling, cleaning supplies in hand]</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <p className="font-heading text-2xl font-bold text-primary-800">6+ years</p>
              <p className="text-gray-500 text-sm">cleaning NYC apartments</p>
            </div>
          </div>

          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-600 text-sm font-semibold tracking-wide uppercase mb-4">Meet Eldia</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-800 mb-6">Your Apartment Is in Good Hands</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I started cleaning apartments in New York six years ago, and I haven't stopped because I genuinely love it. There's something satisfying about walking into a cluttered, dusty apartment and leaving it spotless.
              </p>
              <p>
                I work alone for most jobs — that's how I keep quality consistent. For bigger apartments (3+ bedrooms) or deep cleans, my husband Carlos and my mom join me. We've worked together for years and run like a tight crew.
              </p>
              <p>
                I serve all five boroughs and organize my week by area so I'm not crisscrossing the city. Most of my clients are recurring — I hold their time slot, learn their apartment, and they never have to explain anything twice.
              </p>
              <p className="font-medium text-primary-800">
                When you book with me, you get me. Not a random employee, not a subcontractor — me. And my name is on every clean.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 rounded-full text-sm text-primary-700"><Shield className="w-3.5 h-3.5" /> Fully insured</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 rounded-full text-sm text-primary-700"><Leaf className="w-3.5 h-3.5" /> Eco-friendly products</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 rounded-full text-sm text-primary-700"><MapPin className="w-3.5 h-3.5" /> All 5 boroughs</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 rounded-full text-sm text-primary-700"><Award className="w-3.5 h-3.5" /> Background checked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyClientsStay() {
  const [ref, visible] = useInView()
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="Why Clients Stay" title="The Difference Is Personal" subtitle="Big cleaning companies rotate staff. I build relationships." />
        <div ref={ref} className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {WHY_CLIENTS_STAY.map((item, i) => (
            <div key={item.title} className="text-center" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-500/10 flex items-center justify-center mb-5">
                <item.icon className="w-8 h-8 text-accent-500" />
              </div>
              <h3 className="font-heading text-lg font-bold text-primary-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const [ref, visible] = useInView()
  return (
    <section id="services" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="Services" title="What I Offer" subtitle="Five services that cover everything a NYC apartment needs. Special requests? Just ask." />
        <div ref={ref} className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors">
                <s.icon className="w-6 h-6 text-accent-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading text-lg font-bold text-primary-800 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.time}</span>
                <span className="font-semibold text-accent-600">From {s.from}</span>
              </div>
            </div>
          ))}
          {/* Special requests card */}
          <div className="bg-gradient-to-br from-primary-700 to-primary-800 rounded-2xl p-6 text-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-accent-400" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">Something Else?</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">Need a specific focus area, special products, or a service not listed? Just ask — I'm flexible and happy to customize.</p>
            </div>
            <CTAButton size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const [ref, visible] = useInView()
  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="Pricing" title="Simple, Honest Pricing" subtitle="Two options. No hidden fees. Recurring clients save 5–15%." />
        <div ref={ref} className={`grid md:grid-cols-2 gap-8 max-w-3xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {PRICING_TIERS.map((tier, i) => (
            <div key={tier.name} className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${tier.highlight ? 'bg-primary-700 text-white shadow-2xl ring-4 ring-accent-400/30' : 'bg-gray-50 border border-gray-200 shadow-sm hover:shadow-lg'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              {tier.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-accent-400 text-primary-900">{tier.badge}</span>
              )}
              <h3 className={`font-heading text-xl font-bold mb-1 ${tier.highlight ? 'text-white' : 'text-primary-800'}`}>{tier.name}</h3>
              <p className={`text-sm mb-4 ${tier.highlight ? 'text-white/60' : 'text-gray-400'}`}>{tier.desc}</p>
              <div className="mb-6">
                <span className={`font-heading text-5xl font-extrabold ${tier.highlight ? 'text-white' : 'text-primary-700'}`}>${tier.price}</span>
                <span className={`text-sm ml-1 ${tier.highlight ? 'text-white/60' : 'text-gray-400'}`}>/{tier.unit}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {tier.features.map(f => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${tier.highlight ? 'text-white/90' : 'text-gray-600'}`}>
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-accent-400' : 'text-accent-500'}`} /> {f}
                  </li>
                ))}
              </ul>
              <div className={`text-sm mb-6 px-3 py-2 rounded-lg ${tier.highlight ? 'bg-white/10 text-accent-400' : 'bg-accent-500/5 text-accent-600'}`}>
                <Repeat className="w-3.5 h-3.5 inline mr-1.5" />
                {tier.recurring}
              </div>
              <CTAButton variant={tier.highlight ? 'primary' : 'secondary'} size="md" className="w-full" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                Request This Clean <ArrowRight className="w-4 h-4" />
              </CTAButton>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-8">Prices shown for a standard 1-bedroom. Larger apartments quoted at booking. No surprise charges — ever.</p>
      </div>
    </section>
  )
}

function BookingSection() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    service: 'Standard Clean', size: '1 BR', borough: '', frequency: 'biweekly',
    date: '', time: '9:00 AM',
    name: '', email: '', phone: '', notes: '',
  })
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM']

  return (
    <section id="booking" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="Book" title="Request a Booking" subtitle="Tell me about your apartment and when works best. I personally confirm every request within 2 hours." />
        <div className="max-w-3xl mx-auto">
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {['Your Apartment', 'Date & Time', 'Your Info'].map((label, idx) => {
              const s = idx + 1
              return (
                <div key={s} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <button onClick={() => s < step && setStep(s)} className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${step >= s ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/25' : 'bg-gray-200 text-gray-500'}`}>{s}</button>
                    <span className="text-xs text-gray-400 hidden sm:block">{label}</span>
                  </div>
                  {s < 3 && <div className={`w-12 md:w-20 h-0.5 rounded mb-5 sm:mb-0 ${step > s ? 'bg-accent-500' : 'bg-gray-200'}`} />}
                </div>
              )
            })}
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-bold text-primary-800">Tell Me About Your Apartment</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What type of clean?</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICES.map(s => (
                      <button key={s.title} onClick={() => upd('service', s.title)}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${form.service === s.title ? 'border-accent-500 bg-accent-500/5 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                        <div className="flex items-center gap-3">
                          <s.icon className={`w-5 h-5 flex-shrink-0 ${form.service === s.title ? 'text-accent-500' : 'text-gray-400'}`} />
                          <div>
                            <p className="font-semibold text-primary-800 text-sm">{s.title}</p>
                            <p className="text-xs text-gray-400">{s.from} &middot; {s.time}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apartment size</label>
                    <div className="flex flex-wrap gap-2">
                      {APT_SIZES.map(b => (
                        <button key={b} onClick={() => upd('size', b)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${form.size === b ? 'bg-accent-500 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{b}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Borough</label>
                    <div className="flex flex-wrap gap-2">
                      {BOROUGHS.map(b => (
                        <button key={b} onClick={() => upd('borough', b)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${form.borough === b ? 'bg-accent-500 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{b}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">How often?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {FREQUENCIES.map(f => (
                      <button key={f.value} onClick={() => upd('frequency', f.value)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${form.frequency === f.value ? 'border-accent-500 bg-accent-500/5 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                        <p className={`font-semibold text-sm ${form.frequency === f.value ? 'text-accent-600' : 'text-primary-800'}`}>{f.label}</p>
                        {f.discount && <p className="text-xs text-accent-500 font-medium mt-0.5">{f.discount}</p>}
                      </button>
                    ))}
                  </div>
                </div>

                <CTAButton onClick={() => setStep(2)} className="w-full">Continue <ArrowRight className="w-5 h-5" /></CTAButton>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-bold text-primary-800">When Works Best?</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred date</label>
                  <input type="date" value={form.date} onChange={e => upd('date', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred time</label>
                  <div className="grid grid-cols-4 gap-2">
                    {times.map(t => (
                      <button key={t} onClick={() => upd('time', t)}
                        className={`py-2.5 rounded-lg text-sm font-medium transition-all ${form.time === t ? 'bg-accent-500 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-400 flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /> I'll confirm your exact time within 2 hours</p>
                <div className="flex gap-3">
                  <CTAButton variant="secondary" onClick={() => setStep(1)} className="flex-1">Back</CTAButton>
                  <CTAButton onClick={() => setStep(3)} className="flex-1">Continue <ArrowRight className="w-5 h-5" /></CTAButton>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-bold text-primary-800">Your Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" value={form.name} onChange={e => upd('name', e.target.value)} placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 placeholder:text-gray-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => upd('phone', e.target.value)} placeholder="(212) 555-0123"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 placeholder:text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={e => upd('email', e.target.value)} placeholder="jane@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 placeholder:text-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Anything I should know? (optional)</label>
                  <textarea value={form.notes} onChange={e => upd('notes', e.target.value)} rows={3} placeholder="Doorman building, pets at home, focus on kitchen, preferred products..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 placeholder:text-gray-400 resize-none" />
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-primary-800 text-sm mb-3">Request Summary</h4>
                  <div className="space-y-1.5 text-sm text-gray-600">
                    <p><span className="text-gray-400">Service:</span> {form.service}</p>
                    <p><span className="text-gray-400">Size:</span> {form.size}</p>
                    <p><span className="text-gray-400">Borough:</span> {form.borough || 'Not selected'}</p>
                    <p><span className="text-gray-400">Frequency:</span> {FREQUENCIES.find(f => f.value === form.frequency)?.label}</p>
                    <p><span className="text-gray-400">Date:</span> {form.date || 'Not selected'}</p>
                    <p><span className="text-gray-400">Time:</span> {form.time}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CTAButton variant="secondary" onClick={() => setStep(2)} className="flex-1">Back</CTAButton>
                  <CTAButton className="flex-1" onClick={() => alert('Demo request submitted! Eldia will confirm within 2 hours.')}>
                    Send Request <ArrowRight className="w-5 h-5" />
                  </CTAButton>
                </div>
                <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1"><CreditCard className="w-3 h-3" /> No payment until after your clean. No commitment until I confirm.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewsSection() {
  const [ref, visible] = useInView()
  return (
    <section id="reviews" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="Reviews" title="What My Clients Say" subtitle="Real reviews from real New Yorkers. These are the people who keep booking." />
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-heading text-5xl font-extrabold text-primary-800">5.0</span>
            <div>
              <StarRating />
              <p className="text-gray-500 text-sm mt-0.5">60+ verified reviews</p>
            </div>
          </div>
          <div className="flex gap-6 mt-3">
            {['Google', 'Yelp', 'Thumbtack'].map(p => (
              <span key={p} className="text-sm text-gray-400 font-medium flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" /> {p}
              </span>
            ))}
          </div>
        </div>
        <div ref={ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300" style={{ transitionDelay: `${i * 80}ms` }}>
              <StarRating />
              <p className="text-gray-600 mt-3 mb-4 text-sm leading-relaxed">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">{r.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <p className="text-sm font-semibold text-primary-800">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.loc}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GuaranteeSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-primary-700 to-primary-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(45,212,191,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(45,212,191,0.2) 0%, transparent 50%)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-400/20 text-accent-400 text-sm font-semibold tracking-wide uppercase mb-6">My Promise</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">If You're Not Happy, I'll Make It Right</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              If anything isn't up to your standards, text me and I'll come back to re-do it — free. No questions, no forms, no runaround.
              I've been offering this guarantee for six years because I almost never have to use it. When your name is on the work, you don't cut corners.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Shield, text: 'Fully insured & bonded' },
                { icon: Users, text: 'Family-operated, not staffed' },
                { icon: Leaf, text: 'Eco-friendly products' },
                { icon: MessageCircle, text: 'Direct line — text anytime' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
                  <item.icon className="w-5 h-5 text-accent-400 flex-shrink-0" />
                  <span className="text-white/90 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-accent-400/10 flex items-center justify-center border-4 border-accent-400/20">
              <div className="text-center">
                <Shield className="w-20 h-20 text-accent-400 mx-auto mb-4" />
                <p className="font-heading text-4xl font-extrabold text-white">100%</p>
                <p className="text-accent-400 font-semibold mt-1">Satisfaction Guarantee</p>
                <p className="text-white/50 text-sm mt-1">Re-clean free, no questions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section id="faq" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="FAQ" title="Questions? I've Got Answers" />
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-primary-800 text-sm md:text-base pr-4">{faq.q}</span>
                {openIdx === i ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
              </button>
              {openIdx === i && (
                <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="Contact" title="Get In Touch" subtitle="Have a question, need a custom quote, or just want to say hi? I'd love to hear from you." />
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <div className="space-y-6">
              {[
                { icon: Phone, label: '(347) 555-0199', sub: 'Call or text — I reply fast' },
                { icon: Mail, label: 'eldia@pristinenyc.com', sub: 'I respond within a few hours' },
                { icon: MapPin, label: 'All 5 NYC Boroughs', sub: 'Manhattan, Brooklyn, Queens, Bronx, Staten Island' },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-800">{c.label}</p>
                    <p className="text-sm text-gray-500">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h4 className="font-semibold text-primary-800 mb-3">Typical Availability</h4>
              <div className="space-y-2 text-sm">
                {[
                  ['Monday – Friday', '8:00 AM – 5:00 PM'],
                  ['Saturday', '9:00 AM – 3:00 PM'],
                  ['Sunday', 'By request'],
                ].map(([day, hrs]) => (
                  <div key={day} className="flex justify-between text-gray-600">
                    <span>{day}</span>
                    <span className="font-medium">{hrs}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Referral nudge */}
            <div className="mt-6 p-5 bg-accent-500/5 rounded-2xl border border-accent-500/20">
              <p className="text-sm text-primary-800 font-medium flex items-start gap-2">
                <Heart className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                Know someone who needs a great cleaner? I'm always grateful for referrals — and your friend gets 10% off their first clean.
              </p>
            </div>
          </div>
          <form onSubmit={e => { e.preventDefault(); alert('Message sent! Eldia will respond within a few hours.') }} className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" required placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 placeholder:text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What can I help with?</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400">
                <option>General question</option>
                <option>Custom quote</option>
                <option>Recurring plan inquiry</option>
                <option>Referral</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea required rows={4} placeholder="Tell me about your apartment, what you're looking for, or any questions you have..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 placeholder:text-gray-400 resize-none" />
            </div>
            <CTAButton size="md" className="w-full">Send Message <ArrowRight className="w-4 h-4" /></CTAButton>
          </form>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-accent-500 to-accent-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M20 20.5V18H0v-2h20v-2l2 3.3-2 3.2zM0 0h40v2H0V0z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">Ready for an Apartment You Love Coming Home To?</h2>
        <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
          Send a booking request and I'll confirm within 2 hours. No commitment, no payment upfront — just a clean apartment and someone who takes pride in it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton variant="dark" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
            Request a Booking <ArrowRight className="w-5 h-5" />
          </CTAButton>
          <CTAButton variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Ask a Question
          </CTAButton>
        </div>
        <p className="mt-6 text-white/70 text-sm">Satisfaction guaranteed &middot; No contracts &middot; Cancel anytime</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-primary-900 text-white/70 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent-400" />
              <span className="font-heading text-lg font-bold text-white">Pristine<span className="text-accent-400">NYC</span></span>
            </div>
            <p className="text-sm leading-relaxed">Family-operated apartment cleaning across all five NYC boroughs. One cleaner, one standard — yours.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {SERVICES.map(s => (
                <li key={s.title}><a href="#services" className="hover:text-accent-400 transition-colors">{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['About Eldia', 'Pricing', 'Reviews', 'FAQ', 'Contact'].map(s => (
                <li key={s}><a href={`#${s.toLowerCase().replace(' ', '-')}`} className="hover:text-accent-400 transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Areas Served</h4>
            <ul className="space-y-2 text-sm">
              {BOROUGHS.map(b => (
                <li key={b}><a href="#booking" className="hover:text-accent-400 transition-colors">{b}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Pristine NYC. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-accent-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-sans text-gray-700 bg-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <AboutSection />
      <WhyClientsStay />
      <ServicesSection />
      <PricingSection />
      <BookingSection />
      <ReviewsSection />
      <GuaranteeSection />
      <FAQSection />
      <ContactSection />
      <FinalCTA />
      <Footer />
    </div>
  )
}
