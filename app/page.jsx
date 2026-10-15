'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { destinationData, festivalData, pageMeta } from '@/lib/data';

const SLIDE_IMAGES = [
    { src: '/IMG-20241225-WA0003.jpg', alt: 'Travelers exploring Ethiopia with RohaTours, Christmas 2024' },
    { src: '/IMG-20241225-WA0008.jpg', alt: 'RohaTours group at an Ethiopian landmark, December 2024' },
    { src: '/IMG-20241225-WA0010.jpg', alt: 'Private tour experience in Ethiopia, December 2024' },
    { src: '/IMG-20241225-WA0011.jpg', alt: 'Travelers on a RohaTours expedition, December 2024' },
    { src: '/IMG-20250103-WA0001.jpg', alt: 'RohaTours cultural experience, January 2025' },
    { src: '/IMG-20250127-WA0009.jpg', alt: 'Travelers discovering Ethiopia with RohaTours, January 2025' },
    { src: '/IMG-20250127-WA0011.jpg', alt: 'Private expedition in Ethiopia, January 2025' },
    { src: '/IMG-20250127-WA0012.jpg', alt: 'RohaTours guided tour moment, January 2025' },
    { src: '/IMG-20250214-WA0002.jpg', alt: 'Travelers at an Ethiopian heritage site, February 2025' },
    { src: '/IMG-20250214-WA0011.jpg', alt: 'RohaTours authentic Ethiopia experience, February 2025' },
    { src: '/IMG-20251007-WA0006.jpg', alt: 'RohaTours expedition in the Ethiopian highlands, October 2025' },
    { src: '/IMG-20251129-WA0000.jpg', alt: 'Travelers on a private RohaTours journey, November 2025' },
    { src: '/IMG-20251129-WA0004.jpg', alt: 'Cultural immersion tour with RohaTours, November 2025' },
    { src: '/IMG-20251129-WA0005.jpg', alt: 'RohaTours group exploring Ethiopia, November 2025' },
    { src: '/1740917821723.jpg', alt: 'RohaTours private expedition in Ethiopia' },
    { src: '/IMG-20230128-WA0014.jpg', alt: 'Early RohaTours expedition, January 2023' },
];

const DESTINATION_LIST = [
    { key: 'Lalibela Churches', tag: '3 Days • Spiritual Marvel', icon: '⛪' },
    { key: 'Gondar Castles', tag: '2 Days • Royal History', icon: '🏰' },
    { key: 'Danakil Adventure', tag: '4 Days • Geological Wonder', icon: '🌋' },
    { key: 'Axum Monuments', tag: '2 Days • Ancient Civilization', icon: '🗿' },
    { key: 'Omo Valley Tribes', tag: '5 Days • Cultural Immersion', icon: '🪘' },
    { key: 'Simien Mountains', tag: '4 Days • Highland Trek', icon: '🏔️' },
    { key: 'Lake Langano', tag: '2 Days • Lakeside Retreat', icon: '🏖️' },
    { key: 'Hawassa', tag: '2 Days • Lakeside City', icon: '🐟' },
    { key: 'Bale Mountains', tag: '3 Days • Wildlife Safari', icon: '🐺' },
    { key: 'Entoto Park', tag: 'Half Day • Nature Escape', icon: '🌲' },
    { key: 'Addis Ababa City Tour', tag: '1 Day • Urban Discovery', icon: '🏙️' },
    { key: 'Lake Tana & Tis Abay Fall', tag: '2 Days • Sacred Waters', icon: '💧' },
    { key: 'Debre Libanos Monastery', tag: '1 Day • Spiritual Journey', icon: '⛪' },
];

const FESTIVAL_LIST = [
    { key: 'Timkat', date: 'Jan 19–20', emoji: '✝️', fullName: 'Timkat — Epiphany' },
    { key: 'Genna', date: 'Jan 7', emoji: '⛪', fullName: 'Genna (Ethiopian Christmas)' },
    { key: 'Meskel', date: 'Sep 27', emoji: '🔥', fullName: 'Meskel Festival' },
    { key: 'Irreecha', date: 'Oct (1st Sun)', emoji: '🌿', fullName: 'Irreecha Festival' },
    { key: 'Ashenda', date: 'August', emoji: '💃', fullName: 'Ashenda Festival' },
];

export default function HomePage() {
    const [currentPage, setCurrentPage] = useState('landing');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [destinationModal, setDestinationModal] = useState(null);
    const [festivalModal, setFestivalModal] = useState(null);
    const [lightboxSrc, setLightboxSrc] = useState(null);

    // Experience slider state
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(3);
    const sliderIntervalRef = useRef(null);

    // Booking form state
    const [selectedPackage, setSelectedPackage] = useState('');
    const [bookingForm, setBookingForm] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        count: 1,
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // My Trips dashboard state
    const [tripsEmail, setTripsEmail] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [trips, setTrips] = useState(null);
    const [tripsLoading, setTripsLoading] = useState(false);

    // Contact form state
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [contactLoading, setContactLoading] = useState(false);
    const [contactSuccess, setContactSuccess] = useState(false);

    // Theme initialization
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark');
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const nextDark = !isDarkMode;
        setIsDarkMode(nextDark);
        if (nextDark) {
            document.body.classList.add('dark');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Hash routing handling
    useEffect(() => {
        const updateRoute = () => {
            const hash = window.location.hash.substring(1) || 'landing';
            setMobileMenuOpen(false);

            if (hash === 'gallery-section') {
                setCurrentPage('landing');
                setTimeout(() => {
                    const el = document.getElementById('gallery-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
                return;
            }

            const validPages = ['landing', 'about', 'destinations', 'festivals', 'dashboard', 'booking', 'privacy', 'terms'];
            const target = validPages.includes(hash) ? hash : 'landing';
            setCurrentPage(target);
            window.scrollTo({ top: 0, behavior: 'smooth' });

            const meta = pageMeta[target] || pageMeta.landing;
            document.title = meta.title;

            // When navigating to booking, check pending package
            if (target === 'booking' && window._pendingPackage) {
                setSelectedPackage(window._pendingPackage);
                window._pendingPackage = null;
                setBookingSuccess(false);
            }

            // When navigating to dashboard, load stored trips if present
            if (target === 'dashboard') {
                const storedEmail = sessionStorage.getItem('bookedEmail');
                if (storedEmail) {
                    setTripsEmail(storedEmail);
                    fetchTrips(storedEmail);
                }
            }
        };

        window.addEventListener('hashchange', updateRoute);
        updateRoute();
        return () => window.removeEventListener('hashchange', updateRoute);
    }, []);

    // Responsive slider visible count
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setVisibleSlides(3);
            else if (window.innerWidth >= 768) setVisibleSlides(2);
            else setVisibleSlides(1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-advance slider
    const totalSlides = SLIDE_IMAGES.length;
    const maxSlide = Math.max(0, totalSlides - visibleSlides);

    const resetAutoSlider = () => {
        if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
        sliderIntervalRef.current = setInterval(() => {
            setCurrentSlide(prev => (prev >= maxSlide ? 0 : prev + 1));
        }, 4000);
    };

    useEffect(() => {
        resetAutoSlider();
        return () => {
            if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
        };
    }, [maxSlide]);

    const handleSliderMove = (dir) => {
        resetAutoSlider();
        setCurrentSlide(prev => Math.max(0, Math.min(prev + dir, maxSlide)));
    };

    // Keyboard escape listener for modals
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setDestinationModal(null);
                setFestivalModal(null);
                setLightboxSrc(null);
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Open Destination Modal
    const openDestination = (name) => {
        const data = destinationData[name];
        if (data) setDestinationModal({ name, ...data });
    };

    // Open Festival Modal
    const openFestival = (name) => {
        const data = festivalData[name];
        if (data) setFestivalModal({ name, ...data });
    };

    // Pre-select package and go to booking
    const navigateToBookingWithPackage = (pkgName) => {
        setSelectedPackage(pkgName);
        window._pendingPackage = pkgName;
        window.location.hash = 'booking';
    };

    // Submit Booking
    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, date, count } = bookingForm;

        if (!name.trim()) return alert('Please enter your full name.');
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Please enter a valid email address.');
        if (!selectedPackage) return alert('Please select a destination or festival.');
        if (parseInt(count) < 1 || isNaN(parseInt(count))) return alert('Traveler count must be at least 1.');

        setBookingLoading(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: name.trim(),
                    customerEmail: email.toLowerCase().trim(),
                    customerPhone: phone.trim(),
                    travelDate: date,
                    package: selectedPackage,
                    travelerCount: parseInt(count),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || data.error || 'Failed to submit booking');

            sessionStorage.setItem('bookedEmail', email.toLowerCase().trim());
            setBookingSuccess(true);
            setBookingForm({ name: '', email: '', phone: '', date: '', count: 1 });
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setBookingLoading(false);
        }
    };

    // Fetch user's trips
    const fetchTrips = async (email) => {
        setTripsLoading(true);
        try {
            const res = await fetch(`/api/bookings?email=${encodeURIComponent(email)}`);
            const data = await res.json();
            setTrips(Array.isArray(data) ? data : []);
        } catch {
            setTrips([]);
        } finally {
            setTripsLoading(false);
        }
    };

    const handleLookupTrips = (e) => {
        e.preventDefault();
        const trimmed = emailInput.trim();
        if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            return alert('Please enter a valid email address.');
        }
        sessionStorage.setItem('bookedEmail', trimmed);
        setTripsEmail(trimmed);
        fetchTrips(trimmed);
    };

    // Contact Form Submit
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, subject, message } = contactForm;

        if (!name.trim()) return alert('Please enter your name.');
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Please enter a valid email address.');
        if (!message.trim()) return alert('Please enter a message.');

        setContactLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactForm),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || data.error || 'Failed to send message');
            setContactSuccess(true);
            setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setContactLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            {
                                '@type': 'TravelAgency',
                                '@id': 'https://rohatours.vercel.app/#organization',
                                'name': 'RohaTours',
                                'description': 'Expert-led private expeditions across Ethiopia. Lalibela, Gondar, Danakil, Omo Valley and beyond.',
                                'url': 'https://rohatours.vercel.app/',
                                'logo': 'https://rohatours.vercel.app/Logoo.png',
                                'image': 'https://rohatours.vercel.app/Timkat Festival.jpg',
                                'telephone': '+251963575717',
                                'email': 'expeditions@rohatours.com',
                                'address': {
                                    '@type': 'PostalAddress',
                                    'addressLocality': 'Addis Ababa',
                                    'addressCountry': 'ET'
                                },
                                'sameAs': ['https://www.instagram.com/mekuanintasnake'],
                                'priceRange': '$$$$',
                                'areaServed': {
                                    '@type': 'Country',
                                    'name': 'Ethiopia'
                                }
                            }
                        ]
                    })
                }}
            />

            {/* Navigation Header */}
            <nav className="fixed w-full z-50 glass-nav border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
                    <a href="#landing" className="cursor-pointer">
                        <img src="/Logoo.png" alt="RohaTours" className="h-20 w-auto object-contain" />
                    </a>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#landing" className={`nav-link text-sm font-semibold hover:text-[#C5A059] ${currentPage === 'landing' ? 'active' : ''}`}>Home</a>
                        <a href="#destinations" className={`nav-link text-sm font-semibold hover:text-[#C5A059] ${currentPage === 'destinations' ? 'active' : ''}`}>Destinations</a>
                        <a href="#festivals" className={`nav-link text-sm font-semibold hover:text-[#C5A059] ${currentPage === 'festivals' ? 'active' : ''}`}>Festivals</a>
                        <a href="#about" className={`nav-link text-sm font-semibold hover:text-[#C5A059] ${currentPage === 'about' ? 'active' : ''}`}>About Us</a>
                        <a href="#dashboard" className={`nav-link text-sm font-semibold hover:text-[#C5A059] flex items-center gap-2 ${currentPage === 'dashboard' ? 'active' : ''}`}>
                            <i className="far fa-user-circle"></i> My Trips
                        </a>
                        <a href="#booking" className="btn-gold px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest">Book Now</a>
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            title="Toggle dark mode"
                            aria-label="Toggle dark mode"
                        />
                    </div>
                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            title="Toggle dark mode"
                            aria-label="Toggle dark mode"
                        />
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2"
                            aria-label="Open menu"
                            id="menuBtn"
                        >
                            <i className="fas fa-bars text-xl" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div id="mobile-menu" className="fixed inset-0 bg-white z-[60] p-8 flex flex-col">
                    <div className="flex justify-between items-center mb-12">
                        <img src="/Logoo.png" alt="RohaTours" className="h-20 w-auto object-contain" />
                        <button onClick={() => setMobileMenuOpen(false)} className="text-3xl" aria-label="Close menu">&times;</button>
                    </div>
                    <div className="flex flex-col space-y-6 text-xl font-serif">
                        <a href="#landing" onClick={() => setMobileMenuOpen(false)}>Home</a>
                        <a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a>
                        <a href="#destinations" onClick={() => setMobileMenuOpen(false)}>Destinations</a>
                        <a href="#festivals" onClick={() => setMobileMenuOpen(false)}>Festivals</a>
                        <a href="#dashboard" onClick={() => setMobileMenuOpen(false)}>My Trips</a>
                        <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="btn-gold py-4 rounded-xl text-center text-sm font-bold font-sans uppercase">Book Now</a>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT VIEWS */}
            <main className="flex-grow">
                {/* 1. LANDING PAGE */}
                <div id="landing-page" className={currentPage === 'landing' ? 'block' : 'hidden'}>
                    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
                        <div className="hero-video-wrap hidden md:block">
                            <video autoPlay muted loop playsInline poster="/Timkat Festival.jpg">
                                <source src="https://videos.pexels.com/video-files/13240700/13240700-uhd_2560_1440_24fps.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div
                            className="absolute inset-0 z-0"
                            style={{
                                background: "linear-gradient(160deg, rgba(27,48,34,0.85) 0%, rgba(0,0,0,0.90) 100%), url('/Timkat Festival.jpg') center/cover no-repeat"
                            }}
                        />
                        <div className="hero-content text-center px-4 max-w-4xl">
                            <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Est. in the Land of Origins</span>
                            <h1 className="text-5xl md:text-8xl mb-6 leading-tight">Ethiopia, <br /><i className="font-serif italic text-[#C5A059]">Revealed.</i></h1>
                            <p className="text-lg md:text-2xl mb-10 font-light opacity-90 max-w-2xl mx-auto leading-relaxed">We don&apos;t just show you the landmarks; we invite you into the living history of our ancestors.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="#destinations" className="btn-gold px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest">Explore Destinations</a>
                                <a href="#gallery-section" className="bg-white/10 backdrop-blur-md border border-white/20 px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#1B3022] transition">View Gallery</a>
                            </div>
                        </div>
                    </section>

                    {/* Gallery Section */}
                    <section id="gallery-section" className="py-24 border-b" style={{ backgroundColor: 'var(--stone)' }}>
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-16">
                                <span className="section-label block mb-3">Our World</span>
                                <h2 className="text-4xl font-serif mb-3" style={{ color: 'var(--green-deep)' }}>Ethiopia in Frames</h2>
                                <div className="gold-divider"></div>
                                <p className="text-slate-500 mt-4">A glimpse into the soul of the Land of Origins.</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { src: '/Lalibela Churches.jpg', alt: 'Lalibela rock-hewn churches, Ethiopia' },
                                    { src: '/Gondar Castles.jpg', alt: 'Gondar Royal Enclosure, Ethiopia' },
                                    { src: '/Danakil Adventure.jpg', alt: 'Danakil Depression, Ethiopia' },
                                    { src: '/Omo Valley Tribes.jpg', alt: 'Omo Valley tribes, Ethiopia' },
                                    { src: '/Simien Mountains.jpg', alt: 'Simien Mountains, Ethiopia' },
                                    { src: '/Axum Monuments.jpg', alt: 'Axum obelisks, Ethiopia' },
                                    { src: '/Timkat Festival.jpg', alt: 'Timkat festival, Ethiopia' },
                                    { src: '/Meskel Festival.jpg', alt: 'Meskel festival bonfire, Ethiopia' },
                                ].map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="aspect-square rounded-3xl gallery-item shadow-sm group overflow-hidden cursor-pointer"
                                        onClick={() => setLightboxSrc(img.src)}
                                    >
                                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Traveler Stories / Moments in the Field */}
                    <section className="py-24" style={{ backgroundColor: 'var(--green-deep)' }}>
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-16">
                                <span className="section-label block mb-3" style={{ color: 'var(--gold-light)' }}>Real Experiences</span>
                                <h2 className="text-4xl font-serif mb-3 text-white">Moments in the Field</h2>
                                <div className="gold-divider"></div>
                                <p className="text-slate-400 mt-4 max-w-xl mx-auto">Authentic moments captured with our travelers across Ethiopia.</p>
                            </div>

                            <div
                                className="relative"
                                id="experienceSlider"
                                onMouseEnter={() => clearInterval(sliderIntervalRef.current)}
                                onMouseLeave={resetAutoSlider}
                            >
                                <div className="overflow-hidden rounded-3xl">
                                    <div
                                        className="flex transition-transform duration-500 ease-in-out"
                                        style={{
                                            transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
                                            willChange: 'transform'
                                        }}
                                    >
                                        {SLIDE_IMAGES.map((img, i) => (
                                            <div
                                                key={i}
                                                className="flex-shrink-0 px-2"
                                                style={{ width: `${100 / visibleSlides}%` }}
                                            >
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    className="w-full h-80 object-cover rounded-2xl cursor-pointer hover:opacity-95 transition"
                                                    loading="lazy"
                                                    onClick={() => setLightboxSrc(img.src)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleSliderMove(-1)}
                                    aria-label="Previous"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition hover:scale-110 z-10"
                                    style={{ background: 'var(--gold)' }}
                                >
                                    <i className="fas fa-chevron-left text-white"></i>
                                </button>
                                <button
                                    onClick={() => handleSliderMove(1)}
                                    aria-label="Next"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition hover:scale-110 z-10"
                                    style={{ background: 'var(--gold)' }}
                                >
                                    <i className="fas fa-chevron-right text-white"></i>
                                </button>

                                <div className="flex justify-center gap-2 mt-6">
                                    {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                resetAutoSlider();
                                                setCurrentSlide(i);
                                            }}
                                            className="h-2 rounded-full transition-all duration-300"
                                            style={{
                                                background: i === currentSlide ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                                                width: i === currentSlide ? '24px' : '8px'
                                            }}
                                            aria-label={`Go to slide ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="text-center mt-12">
                                <a href="#booking" className="btn-gold px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest inline-block">Start Your Journey</a>
                            </div>
                        </div>
                    </section>

                    {/* Why RohaTours Trust Strip */}
                    <section className="py-20 border-b" style={{ backgroundColor: 'var(--cream)' }}>
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-14">
                                <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-sm mb-3 block">Why Travel With Us</span>
                                <h2 className="text-4xl font-serif" style={{ color: 'var(--green-deep)' }}>The RohaTours Difference</h2>
                                <div className="gold-divider"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { icon: 'user-tie', title: 'Private & Exclusive', desc: 'Every expedition is tailored to you — no group tours, no compromises. Your pace, your interests.' },
                                    { icon: 'map-marked-alt', title: 'Local Expertise', desc: 'Born and raised in Ethiopia, our guides carry ancestral knowledge no guidebook can replicate.' },
                                    { icon: 'leaf', title: 'Sustainable Travel', desc: 'We travel responsibly — supporting local communities and preserving the environments we explore.' },
                                    { icon: 'headset', title: '24/7 Support', desc: "From first inquiry to final farewell, we're with you every step of the journey." },
                                ].map((item, idx) => (
                                    <div key={idx} className="text-center p-8 rounded-[28px] border border-stone-200 bg-white hover:border-[#C5A059] hover:shadow-lg transition-all duration-300">
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'rgba(197,160,89,0.12)' }}>
                                            <i className={`fas fa-${item.icon} text-2xl`} style={{ color: 'var(--gold)' }}></i>
                                        </div>
                                        <h3 className="font-serif text-xl mb-3" style={{ color: 'var(--green-deep)' }}>{item.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Destination Preview Strip */}
                    <section className="py-20 border-b" style={{ backgroundColor: 'var(--stone)' }}>
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-14">
                                <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-sm mb-3 block">Our Destinations</span>
                                <h2 className="text-4xl font-serif" style={{ color: 'var(--green-deep)' }}>Explore Ethiopia</h2>
                                <div className="gold-divider"></div>
                                <p className="text-slate-500 mt-4">From ancient wonders to natural beauty — discover all 13 destinations we offer.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {DESTINATION_LIST.map((item, idx) => {
                                    const data = destinationData[item.key];
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => openDestination(item.key)}
                                            role="button"
                                            tabIndex={0}
                                            className="group relative h-72 rounded-[28px] overflow-hidden shadow-sm cursor-pointer"
                                        >
                                            <img src={data?.image || '/Timkat Festival.jpg'} alt={item.key} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 p-6">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">{item.tag}</span>
                                                <h3 className="text-white font-serif text-2xl">{item.key}</h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Festival Preview Section */}
                    <section className="py-24 border-b" style={{ backgroundColor: 'var(--green-deep)' }}>
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-16">
                                <span className="font-bold uppercase tracking-[0.3em] text-sm mb-3 block" style={{ color: 'var(--gold-light)' }}>Cultural Calendar</span>
                                <h2 className="text-4xl font-serif mb-3 text-white">Ethiopian Festivals</h2>
                                <div className="gold-divider"></div>
                                <p className="text-slate-400 mt-4 max-w-xl mx-auto">Plan your journey around Ethiopia&apos;s most spectacular cultural and religious celebrations.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {FESTIVAL_LIST.map((item, idx) => {
                                    const data = festivalData[item.key];
                                    return (
                                        <div key={idx} className="festival-card rounded-[28px] border border-white/10 overflow-hidden flex flex-col" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                            <div className="relative h-52 overflow-hidden">
                                                <img src={data?.image || '/Timkat Festival.jpg'} alt={item.key} className="w-full h-full object-cover hover:scale-105 transition duration-700" loading="lazy" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                <div className="absolute top-4 left-4 bg-[#C5A059] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{item.date}</div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-2xl">{item.emoji}</span>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Cultural Celebration</span>
                                                </div>
                                                <h3 className="text-white font-serif text-xl mb-2">{item.key}</h3>
                                                <p className="text-slate-400 text-sm leading-relaxed flex-grow">{data?.description[0]}</p>
                                                <button
                                                    onClick={() => openFestival(item.key)}
                                                    className="mt-5 w-full py-3 rounded-xl border border-[#C5A059] text-[#C5A059] text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition"
                                                >
                                                    Learn More
                                                </button>
                                                <button
                                                    onClick={() => navigateToBookingWithPackage(item.fullName)}
                                                    className="mt-2 w-full py-3 rounded-xl bg-[#C5A059] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#9A7A3A] transition"
                                                >
                                                    Plan Your Visit
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Festival Calendar Strip */}
                            <div className="mt-14 rounded-[28px] border border-white/10 p-6" style={{ background: 'rgba(255,255,255,0.04)' }}>
                                <h4 className="text-white font-serif text-lg mb-5 text-center">Festival Calendar</h4>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 text-center">
                                    <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <p className="text-[#C5A059] font-bold text-xs uppercase tracking-widest mb-1">Jan</p>
                                        <p className="text-white text-[11px] leading-tight">Genna<br /><span className="text-slate-400">&amp; Timkat</span></p>
                                    </div>
                                    <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Feb–Jul</p>
                                        <p className="text-slate-500 text-[11px]">Off Season</p>
                                    </div>
                                    <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <p className="text-[#C5A059] font-bold text-xs uppercase tracking-widest mb-1">Aug</p>
                                        <p className="text-white text-[11px] leading-tight">Ashenda<br /><span className="text-slate-400">&amp; Buhe</span></p>
                                    </div>
                                    <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <p className="text-[#C5A059] font-bold text-xs uppercase tracking-widest mb-1">Sep</p>
                                        <p className="text-white text-[11px] leading-tight">Meskel</p>
                                    </div>
                                    <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <p className="text-[#C5A059] font-bold text-xs uppercase tracking-widest mb-1">Oct</p>
                                        <p className="text-white text-[11px] leading-tight">Irreecha</p>
                                    </div>
                                    <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Nov–Dec</p>
                                        <p className="text-slate-500 text-[11px]">Off Season</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Testimonials */}
                    <section className="py-20" style={{ backgroundColor: 'var(--cream)' }}>
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-14">
                                <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-sm mb-3 block">Real Voices</span>
                                <h2 className="text-4xl font-serif" style={{ color: 'var(--green-deep)' }}>What Our Travelers Say</h2>
                                <div className="gold-divider"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white p-8 rounded-[28px] border border-stone-200 shadow-sm flex flex-col">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className="fas fa-star text-[#C5A059] text-sm"></i>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 leading-relaxed italic flex-grow">&quot;Mekuanent&apos;s knowledge of Lalibela is unmatched. He took us through passages and stories that no guidebook mentions. Truly a once-in-a-lifetime experience.&quot;</p>
                                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-stone-100">
                                        <div className="w-10 h-10 rounded-full bg-[#1B3022] flex items-center justify-center text-white font-bold text-sm">S</div>
                                        <div>
                                            <span className="block text-sm font-bold text-[#1B3022]">Sarah M.</span>
                                            <span className="text-xs text-slate-400">United Kingdom • Lalibela Tour</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-[28px] border border-stone-200 shadow-sm flex flex-col">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className="fas fa-star text-[#C5A059] text-sm"></i>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 leading-relaxed italic flex-grow">&quot;The Danakil expedition was the most surreal thing I&apos;ve ever done. Everything was perfectly organized — logistics, safety, food. I felt completely taken care of in the most extreme landscape on Earth.&quot;</p>
                                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-stone-100">
                                        <div className="w-10 h-10 rounded-full bg-[#1B3022] flex items-center justify-center text-white font-bold text-sm">J</div>
                                        <div>
                                            <span className="block text-sm font-bold text-[#1B3022]">James R.</span>
                                            <span className="text-xs text-slate-400">United States • Danakil Adventure</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-[28px] border border-stone-200 shadow-sm flex flex-col">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className="fas fa-star text-[#C5A059] text-sm"></i>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 leading-relaxed italic flex-grow">&quot;We did the Omo Valley tribes tour and it changed our perspective on the world. RohaTours handled everything with such care and respect for the local communities. We&apos;ll be back.&quot;</p>
                                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-stone-100">
                                        <div className="w-10 h-10 rounded-full bg-[#1B3022] flex items-center justify-center text-white font-bold text-sm">A</div>
                                        <div>
                                            <span className="block text-sm font-bold text-[#1B3022]">Amelia K.</span>
                                            <span className="text-xs text-slate-400">Germany • Omo Valley Tribes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 2. ABOUT PAGE */}
                <div id="about-page" className={currentPage === 'about' ? 'block pt-32 pb-24' : 'hidden'} style={{ background: 'linear-gradient(180deg, white 0%, var(--stone) 100%)' }}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                            <div className="relative">
                                <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
                                    <img src="/IMG-20230128-WA0030.jpg" loading="lazy" alt="Lead Tour Guide" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-[#1B3022] p-8 rounded-3xl text-white shadow-xl hidden lg:block max-w-xs">
                                    <p className="font-serif italic text-lg mb-2">&quot;Ethiopia is not a destination you visit; it is a story you enter.&quot;</p>
                                    <span className="text-[#C5A059] font-bold text-xs uppercase tracking-widest">Mekuanent, Lead Explorer</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-[#C5A059] font-bold uppercase tracking-widest text-sm mb-4 block">Meet Your Host</span>
                                <h2 className="text-4xl md:text-5xl font-serif mb-8">Guided by Heritage</h2>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    <b>Mekuanent</b>, our lead guide and founder, has spent over 15 years navigating the rugged plateaus and ancient pathways of Ethiopia. Born in the shadows of Lalibela’s rock-hewn churches, his connection to this land is ancestral.
                                </p>
                                <p className="text-slate-600 leading-relaxed mb-8">
                                    With a deep background in archaeology and local history, Mekuanent specializes in creating private, low-impact journeys that bridge the gap between traveler and local culture.
                                </p>
                                <div className="flex gap-8">
                                    <div>
                                        <span className="block text-3xl font-serif text-[#1B3022]">15+</span>
                                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Years Experience</span>
                                    </div>
                                    <div>
                                        <span className="block text-3xl font-serif text-[#1B3022]">500+</span>
                                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Private Tours</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                            <div>
                                <span className="section-label block mb-3">Get In Touch</span>
                                <h2 className="text-4xl font-serif mb-3" style={{ color: 'var(--green-deep)' }}>Send Us a Message</h2>
                                <div className="gold-divider" style={{ margin: '0 0 1.5rem 0' }}></div>
                                <p className="text-slate-600 leading-relaxed mb-8">Have a question about a destination, want to plan a custom itinerary, or just want to say hello? We&apos;d love to hear from you.</p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-sm text-slate-600">
                                        <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(197,160,89,0.12)' }}>
                                            <i className="fas fa-envelope" style={{ color: 'var(--gold)' }}></i>
                                        </span>
                                        <a href="mailto:expeditions@rohatours.com" className="hover:text-[#C5A059] transition">expeditions@rohatours.com</a>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-slate-600">
                                        <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(197,160,89,0.12)' }}>
                                            <i className="fas fa-phone-alt" style={{ color: 'var(--gold)' }}></i>
                                        </span>
                                        <a href="tel:+251963575717" className="hover:text-[#C5A059] transition">+251 963 575 717</a>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-slate-600">
                                        <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(197,160,89,0.12)' }}>
                                            <i className="fas fa-map-marker-alt" style={{ color: 'var(--gold)' }}></i>
                                        </span>
                                        <span>Addis Ababa, Ethiopia</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-slate-600">
                                        <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(197,160,89,0.12)' }}>
                                            <i className="fab fa-instagram" style={{ color: 'var(--gold)' }}></i>
                                        </span>
                                        <a href="https://www.instagram.com/mekuanintasnake?igsh=MWwxc20zbno1NXpjOA==" target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A059] transition">@mekuanintasnake</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-stone-200">
                                {contactSuccess && (
                                    <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
                                        <i className="fas fa-check-circle text-green-500 text-2xl mb-2 block"></i>
                                        <p className="font-serif text-[#1B3022]">Message sent!</p>
                                        <p className="text-sm text-slate-500 mt-1">We&apos;ll get back to you within 24 hours.</p>
                                    </div>
                                )}
                                {!contactSuccess && (
                                    <form onSubmit={handleContactSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                value={contactForm.name}
                                                onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                                                className="form-input w-full rounded-xl p-4 text-sm"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={contactForm.email}
                                                onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                                                className="form-input w-full rounded-xl p-4 text-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <input
                                                type="tel"
                                                placeholder="Phone (optional)"
                                                value={contactForm.phone}
                                                onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                                                className="form-input w-full rounded-xl p-4 text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Subject"
                                                value={contactForm.subject}
                                                onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                                                className="form-input w-full rounded-xl p-4 text-sm"
                                            />
                                        </div>
                                        <textarea
                                            rows="4"
                                            placeholder="Your message..."
                                            value={contactForm.message}
                                            onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                                            className="form-input w-full rounded-xl p-4 text-sm mb-4 resize-none"
                                        />
                                        <button
                                            type="submit"
                                            disabled={contactLoading}
                                            className="w-full btn-gold py-4 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            <span>{contactLoading ? 'Sending...' : 'Send Message'}</span>
                                            {contactLoading && (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full loading-spinner"></div>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. DESTINATIONS PAGE */}
                <div id="destinations-page" className={currentPage === 'destinations' ? 'block pt-32 pb-24' : 'hidden'} style={{ backgroundColor: 'var(--cream)' }}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="mb-16 text-center">
                            <span className="section-label block mb-3">Explore Ethiopia</span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-3" style={{ color: 'var(--green-deep)' }}>Historical Masterpieces</h2>
                            <div className="gold-divider"></div>
                            <p className="text-slate-500 max-w-2xl mx-auto mt-4">Luxury private expeditions curated for the discerning traveler.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {DESTINATION_LIST.map((item, idx) => {
                                const data = destinationData[item.key];
                                return (
                                    <div key={idx} className="destination-card bg-white rounded-[32px] overflow-hidden shadow-sm border border-stone-200 flex flex-col">
                                        <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${data?.image}')` }}></div>
                                        <div className="p-8 flex-grow flex flex-col">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] mb-2 block">{item.tag}</span>
                                            <h3 className="text-2xl font-serif mb-2">{item.key}</h3>
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#1B3022] bg-[#C5A059]/10 px-3 py-1 rounded-full mb-4 w-fit">
                                                <i className="fas fa-tag text-[#C5A059]"></i> Pricing on Request
                                            </span>
                                            <p className="text-sm text-slate-500 mb-6 leading-relaxed flex-grow">{data?.description[0]}</p>

                                            <div className="bg-stone-50 rounded-2xl p-5 mb-6">
                                                <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.2em] mb-4">Package Includes</h4>
                                                <div className="grid grid-cols-2 gap-y-3">
                                                    {data?.inclusions.map((inc, i) => (
                                                        <div key={i} className="inclusion-item"><i className={`fas fa-${inc.icon}`}></i> {inc.text}</div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openDestination(item.key)}
                                                    className="flex-1 py-3 rounded-xl border border-stone-200 font-bold text-sm hover:bg-stone-50 transition"
                                                >
                                                    Learn More
                                                </button>
                                                <button
                                                    onClick={() => navigateToBookingWithPackage(item.key)}
                                                    className="flex-1 py-3 rounded-xl bg-[#1B3022] text-white font-bold text-sm hover:bg-[#C5A059] transition"
                                                >
                                                    Book
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 4. FESTIVALS PAGE */}
                <div id="festivals-page" className={currentPage === 'festivals' ? 'block pt-32 pb-24' : 'hidden'} style={{ backgroundColor: 'var(--cream)' }}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="mb-16 text-center">
                            <span className="section-label block mb-3">Celebrate Ethiopia</span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-3" style={{ color: 'var(--green-deep)' }}>Sacred Festivals</h2>
                            <div className="gold-divider"></div>
                            <p className="text-slate-500 max-w-2xl mx-auto mt-4">Witness Ethiopia&apos;s ancient living traditions — ceremonies unchanged for over a thousand years.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Object.entries(festivalData).map(([name, data], idx) => (
                                <div key={idx} className="destination-card bg-white rounded-[32px] overflow-hidden shadow-sm border border-stone-200 flex flex-col">
                                    <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${data.image}')` }}></div>
                                    <div className="p-8 flex-grow flex flex-col">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] mb-2 block">{data.dates}</span>
                                        <h3 className="text-2xl font-serif mb-2">{data.fullName}</h3>
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#1B3022] bg-[#C5A059]/10 px-3 py-1 rounded-full mb-4 w-fit">
                                            <i className="fas fa-tag text-[#C5A059]"></i> Pricing on Request
                                        </span>
                                        <p className="text-sm text-slate-500 mb-6 leading-relaxed flex-grow">{data.description[0]}</p>

                                        <div className="bg-stone-50 rounded-2xl p-5 mb-6">
                                            <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.2em] mb-4">Package Includes</h4>
                                            <div className="grid grid-cols-2 gap-y-3">
                                                {data.inclusions.map((inc, i) => (
                                                    <div key={i} className="inclusion-item"><i className={`fas fa-${inc.icon}`}></i> {inc.text}</div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => openFestival(name)}
                                                className="flex-1 py-3 rounded-xl border border-stone-200 font-bold text-sm hover:bg-stone-50 transition"
                                            >
                                                Learn More
                                            </button>
                                            <button
                                                onClick={() => navigateToBookingWithPackage(data.fullName)}
                                                className="flex-1 py-3 rounded-xl bg-[#1B3022] text-white font-bold text-sm hover:bg-[#C5A059] transition"
                                            >
                                                Book Festival
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. DASHBOARD PAGE (MY TRIPS) */}
                <div id="dashboard-page" className={currentPage === 'dashboard' ? 'block pt-32 pb-24 min-h-screen' : 'hidden'} style={{ backgroundColor: 'var(--stone)' }}>
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-serif mb-8">My Trips</h2>
                        <div className="grid grid-cols-1 gap-6" id="trips-container">
                            {!tripsEmail ? (
                                <div className="text-center py-12 bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
                                    <div className="mb-6">
                                        <i className="fas fa-suitcase-rolling text-4xl text-stone-300 mb-4 block"></i>
                                        <p className="text-slate-500 text-sm mb-4">Enter your email to look up your bookings.</p>
                                    </div>
                                    <form onSubmit={handleLookupTrips} className="flex gap-2 max-w-sm mx-auto">
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            value={emailInput}
                                            onChange={e => setEmailInput(e.target.value)}
                                            className="form-input flex-1 rounded-xl p-3 text-sm"
                                        />
                                        <button type="submit" className="btn-gold px-5 py-3 rounded-xl text-sm font-bold">Look Up</button>
                                    </form>
                                    <p className="text-slate-400 text-xs mt-4">Or <a href="#booking" className="text-[#C5A059] hover:underline">book a new trip</a></p>
                                </div>
                            ) : tripsLoading ? (
                                <div className="text-center py-12">
                                    <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full loading-spinner mx-auto"></div>
                                </div>
                            ) : trips && trips.length > 0 ? (
                                <div className="space-y-4">
                                    {trips.map((trip, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left border border-stone-200">
                                            <div>
                                                <h3 className="font-serif text-xl text-[#1B3022] mb-1">{trip.package || '—'}</h3>
                                                <p className="text-sm text-slate-500 mb-1">Name: {trip.customerName || '—'}</p>
                                                <p className="text-sm text-slate-500 mb-1">Email: {trip.customerEmail || '—'}</p>
                                                {trip.customerPhone && <p className="text-sm text-slate-500 mb-1">Phone: {trip.customerPhone}</p>}
                                                {trip.travelDate && <p className="text-sm text-slate-500 mb-1">Travel Date: {trip.travelDate}</p>}
                                                <p className="text-sm text-slate-500">Travelers: {trip.travelerCount || 1}</p>
                                            </div>
                                            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                                                trip.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                trip.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {trip.status || 'pending'}
                                            </span>
                                        </div>
                                    ))}
                                    <p className="text-center text-xs text-slate-400 mt-4">
                                        Showing trips for <strong>{tripsEmail}</strong>.{' '}
                                        <button
                                            onClick={() => {
                                                sessionStorage.removeItem('bookedEmail');
                                                setTripsEmail('');
                                                setTrips(null);
                                            }}
                                            className="text-[#C5A059] hover:underline"
                                        >
                                            Change email
                                        </button>
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
                                    <i className="fas fa-suitcase-rolling text-4xl text-stone-300 mb-4 block"></i>
                                    <p className="text-slate-500 text-sm mb-2">No trips found for <strong>{tripsEmail}</strong>.</p>
                                    <button
                                        onClick={() => {
                                            sessionStorage.removeItem('bookedEmail');
                                            setTripsEmail('');
                                            setTrips(null);
                                        }}
                                        className="text-xs text-[#C5A059] hover:underline mt-2 block mx-auto"
                                    >
                                        Try a different email
                                    </button>
                                    <a href="#booking" className="inline-block mt-4 btn-gold px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest">Book a Destination</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 6. BOOKING PAGE */}
                <div id="booking-page" className={currentPage === 'booking' ? 'block min-h-screen pt-32 pb-24' : 'hidden'} style={{ background: 'linear-gradient(135deg, var(--green-deep) 0%, var(--green-mid) 100%)' }}>
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/20">
                            <span className="section-label block mb-3">Start Your Journey</span>
                            <h2 className="text-3xl font-serif mb-2" style={{ color: 'var(--green-deep)' }}>Request Your Private Destination</h2>
                            <div className="gold-divider" style={{ margin: '0 0 2rem 0' }}></div>

                            {bookingSuccess ? (
                                <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                                    <i className="fas fa-check-circle text-green-500 text-3xl mb-3 block"></i>
                                    <h3 className="font-serif text-xl text-[#1B3022] mb-1">Request Received</h3>
                                    <p className="text-sm text-slate-500">We&apos;ll be in touch within 24 hours to confirm your expedition.</p>
                                    <a href="#dashboard" className="inline-block mt-4 btn-gold px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest">View My Trips</a>
                                </div>
                            ) : (
                                <form onSubmit={handleBookingSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={bookingForm.name}
                                            onChange={e => setBookingForm({ ...bookingForm, name: e.target.value })}
                                            className="form-input w-full rounded-xl p-4 text-sm"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={bookingForm.email}
                                            onChange={e => setBookingForm({ ...bookingForm, email: e.target.value })}
                                            className="form-input w-full rounded-xl p-4 text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <input
                                            type="tel"
                                            placeholder="Phone Number (e.g. +251 911 000 000)"
                                            value={bookingForm.phone}
                                            onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })}
                                            className="form-input w-full rounded-xl p-4 text-sm"
                                        />
                                        <div className="relative">
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1 ml-1">Travel Date</label>
                                            <input
                                                type="date"
                                                value={bookingForm.date}
                                                onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })}
                                                className="form-input w-full rounded-xl p-4 text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Destination Picker */}
                                    <div className="mb-6">
                                        <label className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: 'var(--green-deep)' }}>
                                            Choose Your Destination
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {DESTINATION_LIST.map((pkg, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setSelectedPackage(pkg.key)}
                                                    className={`pkg-btn flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition text-center ${
                                                        selectedPackage === pkg.key
                                                            ? 'selected-pkg border-[#C5A059] bg-[#C5A059]/10'
                                                            : 'border-stone-200 hover:border-[#C5A059] hover:bg-[#C5A059]/5'
                                                    }`}
                                                >
                                                    <span className="text-xl">{pkg.icon}</span>
                                                    <span className="text-xs font-bold text-[#1B3022] leading-tight">{pkg.key}</span>
                                                    <span className="text-[10px] text-slate-400">{pkg.tag.split('•')[0].trim()}</span>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Festivals Group */}
                                        <div className="mt-4 mb-2">
                                            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
                                                <i className="fas fa-star mr-1"></i> Festivals
                                            </p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {FESTIVAL_LIST.map((fest, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => setSelectedPackage(fest.fullName)}
                                                        className={`pkg-btn flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition text-center ${
                                                            selectedPackage === fest.fullName
                                                                ? 'selected-pkg border-[#C5A059] bg-[#C5A059]/10'
                                                                : 'border-stone-200 hover:border-[#C5A059] hover:bg-[#C5A059]/5'
                                                        }`}
                                                    >
                                                        <span className="text-xl">{fest.emoji}</span>
                                                        <span className="text-xs font-bold text-[#1B3022] leading-tight">{fest.key}</span>
                                                        <span className="text-[10px] text-slate-400">{fest.date}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--green-deep)' }}>Traveler Count</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={bookingForm.count}
                                            onChange={e => setBookingForm({ ...bookingForm, count: e.target.value })}
                                            className="form-input w-full rounded-xl p-4 text-sm"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={bookingLoading}
                                        className="w-full btn-gold py-5 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center space-x-3 disabled:opacity-50"
                                    >
                                        <span>{bookingLoading ? 'Requesting...' : 'Request Destination'}</span>
                                        {bookingLoading && (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full loading-spinner"></div>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* 7. PRIVACY POLICY PAGE */}
                <div id="privacy-page" className={currentPage === 'privacy' ? 'block pt-32 pb-24' : 'hidden'} style={{ backgroundColor: 'var(--cream)' }}>
                    <div className="max-w-3xl mx-auto px-4">
                        <span className="text-[#C5A059] font-bold uppercase tracking-widest text-sm mb-4 block">Legal</span>
                        <h2 className="text-4xl font-serif mb-3" style={{ color: 'var(--green-deep)' }}>Privacy Policy</h2>
                        <div className="gold-divider" style={{ margin: '0 0 2rem 0' }}></div>
                        <div className="prose text-slate-600 space-y-6 text-sm leading-relaxed">
                            <p><strong>Last updated:</strong> April 2026</p>
                            <p>RohaTours (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects personal information you provide when making a booking or sending a message — including your name, email address, phone number, and travel preferences. This information is used solely to process your booking and communicate with you about your trip.</p>
                            <p>We do not sell, trade, or share your personal data with third parties except as necessary to deliver our services (e.g., local guides, accommodation partners). All data is stored securely in our database and is accessible only to authorized RohaTours staff.</p>
                            <p>You may request deletion of your data at any time by contacting us at <a href="mailto:expeditions@rohatours.com" className="text-[#C5A059] hover:underline">expeditions@rohatours.com</a>.</p>
                            <p>By using this website, you consent to this privacy policy.</p>
                        </div>
                    </div>
                </div>

                {/* 8. TERMS & CONDITIONS PAGE */}
                <div id="terms-page" className={currentPage === 'terms' ? 'block pt-32 pb-24' : 'hidden'} style={{ backgroundColor: 'var(--cream)' }}>
                    <div className="max-w-3xl mx-auto px-4">
                        <span className="text-[#C5A059] font-bold uppercase tracking-widest text-sm mb-4 block">Legal</span>
                        <h2 className="text-4xl font-serif mb-3" style={{ color: 'var(--green-deep)' }}>Terms &amp; Conditions</h2>
                        <div className="gold-divider" style={{ margin: '0 0 2rem 0' }}></div>
                        <div className="text-slate-600 space-y-6 text-sm leading-relaxed">
                            <p><strong>Last updated:</strong> April 2026</p>
                            <p>By submitting a booking request through this website, you agree to be contacted by RohaTours regarding your inquiry. A booking is not confirmed until you receive written confirmation from our team.</p>
                            <p>All itineraries are subject to change due to weather, safety conditions, or circumstances beyond our control. RohaTours will make every effort to provide alternative arrangements of equal value.</p>
                            <p>Cancellations must be communicated in writing to <a href="mailto:expeditions@rohatours.com" className="text-[#C5A059] hover:underline">expeditions@rohatours.com</a>. Cancellation terms will be outlined in your booking confirmation.</p>
                            <p>RohaTours is not liable for any loss, injury, or damage sustained during a tour. Travelers are advised to obtain comprehensive travel insurance prior to departure.</p>
                            <p>These terms are governed by the laws of the Federal Democratic Republic of Ethiopia.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Destination Info Modal */}
            {destinationModal && (
                <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4" onClick={() => setDestinationModal(null)}>
                    <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="relative">
                            <button
                                onClick={() => setDestinationModal(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition flex items-center justify-center"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                            <img src={destinationModal.image} alt={destinationModal.name} className="w-full h-64 object-cover rounded-t-[32px]" />
                        </div>
                        <div className="p-8">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block mb-2">{destinationModal.duration}</span>
                            <h2 className="text-3xl font-serif mb-4 text-[#1B3022]">{destinationModal.name}</h2>
                            <div className="text-slate-600 leading-relaxed mb-6 space-y-3 text-sm">
                                {destinationModal.description.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                            <div className="bg-stone-50 rounded-2xl p-6 mb-6">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Package Includes</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {destinationModal.inclusions.map((inc, i) => (
                                        <div key={i} className="inclusion-item"><i className={`fas fa-${inc.icon}`}></i> {inc.text}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setDestinationModal(null);
                                        window.location.hash = 'destinations';
                                    }}
                                    className="flex-1 bg-[#1B3022] text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#2a4a34] transition"
                                >
                                    View Full Details
                                </button>
                                <button
                                    onClick={() => {
                                        setDestinationModal(null);
                                        navigateToBookingWithPackage(destinationModal.name);
                                    }}
                                    className="flex-1 btn-gold py-4 rounded-2xl font-bold text-sm uppercase tracking-widest"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Festival Info Modal */}
            {festivalModal && (
                <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4" onClick={() => setFestivalModal(null)}>
                    <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="relative">
                            <button
                                onClick={() => setFestivalModal(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition flex items-center justify-center"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                            <img src={festivalModal.image} alt={festivalModal.fullName} className="w-full h-64 object-cover rounded-t-[32px]" />
                        </div>
                        <div className="p-8">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block mb-2">{festivalModal.dates}</span>
                            <h2 className="text-3xl font-serif mb-4 text-[#1B3022]">{festivalModal.fullName}</h2>
                            <div className="text-slate-600 leading-relaxed mb-6 space-y-3 text-sm">
                                {festivalModal.description.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                            <div className="bg-stone-50 rounded-2xl p-6 mb-6">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Package Includes</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {festivalModal.inclusions.map((inc, i) => (
                                        <div key={i} className="inclusion-item"><i className={`fas fa-${inc.icon}`}></i> {inc.text}</div>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setFestivalModal(null);
                                    navigateToBookingWithPackage(festivalModal.fullName);
                                }}
                                className="w-full btn-gold py-4 rounded-2xl font-bold text-sm uppercase tracking-widest"
                            >
                                Book This Festival
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lightbox */}
            {lightboxSrc && (
                <div id="lightbox" className="open" onClick={() => setLightboxSrc(null)}>
                    <span id="lightbox-close" onClick={() => setLightboxSrc(null)}>&times;</span>
                    <img id="lightbox-img" src={lightboxSrc} alt="Traveler photo" onClick={e => e.stopPropagation()} />
                </div>
            )}

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/251963575717"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                style={{
                    position: 'fixed',
                    bottom: '28px',
                    right: '28px',
                    zIndex: 999,
                    width: '56px',
                    height: '56px',
                    background: '#25D366',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                className="hover:scale-110"
            >
                <i className="fab fa-whatsapp" style={{ color: 'white', fontSize: '1.75rem', lineHeight: 1 }}></i>
            </a>

            {/* Footer Section */}
            <footer className="bg-[#1B3022] text-white pt-12 pb-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                        {/* Brand & Mission */}
                        <div className="col-span-1 md:col-span-2">
                            <img src="/Logoo.png" alt="RohaTours" className="h-20 w-auto object-contain mb-4 brightness-0 invert" />
                            <p className="text-slate-400 max-w-sm text-sm leading-relaxed mb-5">
                                Pioneering luxury private destinations through the heart of Ethiopia. From the rock-hewn heights of Lalibela to the vibrant tribal cultures of the South, we reveal the soul of the Land of Origins.
                            </p>
                            <div className="flex space-x-4 text-lg mb-4">
                                <a href="https://www.instagram.com/mekuanintasnake?igsh=MWwxc20zbno1NXpjOA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-[#C5A059] transition"><i className="fab fa-instagram"></i></a>
                                <a href="https://wa.me/251963575717" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-slate-400 hover:text-[#C5A059] transition"><i className="fab fa-whatsapp"></i></a>
                            </div>
                            <p className="text-xs text-slate-500">We typically respond within a few hours.</p>
                        </div>

                        {/* Navigation Links */}
                        <div>
                            <h4 className="font-serif text-base mb-4 border-b border-[#C5A059]/30 pb-1 inline-block">Quick Links</h4>
                            <ul className="space-y-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                                <li><a href="#landing" className="hover:text-[#C5A059] transition">Home</a></li>
                                <li><a href="#about" className="hover:text-[#C5A059] transition">About Us</a></li>
                                <li><a href="#destinations" className="hover:text-[#C5A059] transition">Destinations</a></li>
                                <li><a href="#festivals" className="hover:text-[#C5A059] transition">Festivals</a></li>
                                <li><a href="#gallery-section" className="hover:text-[#C5A059] transition">Gallery</a></li>
                                <li><a href="#booking" className="hover:text-[#C5A059] transition">Book Now</a></li>
                                <li><a href="#dashboard" className="hover:text-[#C5A059] transition">My Trips</a></li>
                            </ul>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h4 className="font-serif text-base mb-4 border-b border-[#C5A059]/30 pb-1 inline-block">Connect</h4>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li className="flex items-start gap-2">
                                    <i className="fas fa-map-marker-alt text-[#C5A059] mt-1"></i>
                                    <span>Addis Ababa, Ethiopia</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <i className="fas fa-envelope text-[#C5A059]"></i>
                                    <a href="mailto:expeditions@rohatours.com" className="hover:text-white transition">expeditions@rohatours.com</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <i className="fas fa-phone-alt text-[#C5A059]"></i>
                                    <a href="tel:+251963575717" className="hover:text-white transition">+251 963 575 717</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <i className="fab fa-whatsapp text-[#C5A059]"></i>
                                    <a href="https://wa.me/251963575717" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">© {new Date().getFullYear()} RohaTours Private Ltd.</p>
                        <div className="flex gap-4 text-xs uppercase tracking-widest text-slate-500">
                            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
                            <a href="#terms" className="hover:text-white transition">Terms &amp; Conditions</a>
                            <Link href="/staff" className="hover:text-slate-400 transition text-slate-700">Staff</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

