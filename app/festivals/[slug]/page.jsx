import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { festivalData, getFestivalBySlug } from '@/lib/data';

export async function generateStaticParams() {
    return Object.values(festivalData).map(fest => ({
        slug: fest.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const festival = getFestivalBySlug(slug);
    if (!festival) return { title: 'Festival Not Found | Iconic Ethiopia Tours' };

    return {
        title: `${festival.fullName} Tour | Iconic Ethiopia Tours`,
        description: festival.highlight || festival.description[0],
        alternates: {
            canonical: `/festivals/${festival.slug}`,
        },
        openGraph: {
            title: `${festival.fullName} Cultural Experience | Iconic Ethiopia Tours`,
            description: festival.highlight,
            images: [festival.image],
            type: 'article',
        },
    };
}

export default async function FestivalDetailPage({ params }) {
    const { slug } = await params;
    const fest = getFestivalBySlug(slug);

    if (!fest) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#FDFAF4] dark:bg-[#0f1a13] text-slate-800 dark:text-[#e8e0d0]">
            {/* Top Back Nav */}
            <div className="max-w-5xl mx-auto px-4 mb-6">
                <Link
                    href="/#festivals"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] hover:underline"
                >
                    <i className="fas fa-arrow-left"></i> All Ethiopian Festivals
                </Link>
            </div>

            {/* Hero Image & Title */}
            <div className="max-w-5xl mx-auto px-4 mb-12">
                <div className="relative h-80 sm:h-96 md:h-[450px] rounded-[36px] overflow-hidden shadow-2xl">
                    <Image
                        src={fest.image}
                        alt={fest.fullName}
                        fill
                        priority
                        sizes="(max-width: 1200px) 100vw, 1100px"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
                        <span className="inline-block px-3 py-1 bg-[#C5A059] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                            <i className="far fa-calendar-alt mr-1"></i> {fest.dates}
                        </span>
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
                            {fest.fullName}
                        </h1>
                        <p className="text-white/90 text-sm sm:text-base max-w-2xl font-light">
                            {fest.highlight}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content & Sidebar */}
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left/Main Column: Cultural Background */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-[#15231a] rounded-3xl p-6 sm:p-8 border border-amber-900/10 dark:border-white/10 shadow-sm">
                        <h2 className="font-serif text-2xl font-bold text-[#1B3022] dark:text-[#E8F0EA] mb-6 flex items-center gap-3">
                            <i className="fas fa-landmark text-[#C5A059]"></i>
                            Cultural History & Sacred Tradition
                        </h2>
                        <div className="space-y-4 text-slate-700 dark:text-[#b8c8be] leading-relaxed">
                            {fest.description.map((paragraph, i) => (
                                <p key={i} className="text-sm sm:text-base">{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    {/* What is Included */}
                    {fest.inclusions && fest.inclusions.length > 0 && (
                        <div className="bg-white dark:bg-[#15231a] rounded-3xl p-6 sm:p-8 border border-amber-900/10 dark:border-white/10 shadow-sm">
                            <h3 className="font-serif text-xl font-bold text-[#1B3022] dark:text-[#E8F0EA] mb-4 flex items-center gap-3">
                                <i className="fas fa-check-circle text-[#C5A059]"></i>
                                Private Expedition Inclusions
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {fest.inclusions.map((inc, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-amber-500/5 dark:bg-white/5 border border-amber-500/10 text-center">
                                        <div className="w-10 h-10 rounded-full bg-[#1B3022] text-[#C5A059] flex items-center justify-center mx-auto mb-2 text-base">
                                            <i className={`fas fa-${inc.icon}`}></i>
                                        </div>
                                        <div className="text-xs font-semibold text-slate-800 dark:text-white">
                                            {inc.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: CTA & Key Details */}
                <div className="space-y-6">
                    <div className="sticky top-28 bg-[#1B3022] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#C5A059]/30">
                        <div className="text-xs uppercase tracking-widest text-[#C5A059] font-bold mb-2">
                            Exclusive Cultural Access
                        </div>
                        <h3 className="font-serif text-2xl font-bold mb-3">
                            Join the {fest.fullName.split('—')[0].trim()} Celebration
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm mb-6 leading-relaxed">
                            Festival departures fill up months in advance due to strict regional lodge capacities and ceremonial permits. Reserve your private guide early.
                        </p>

                        <div className="space-y-3 mb-6 pb-6 border-b border-white/10 text-xs">
                            <div className="flex justify-between py-1">
                                <span className="text-white/60">Duration:</span>
                                <span className="font-medium text-white">{fest.dates.split('•')[0].trim()}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-white/60">Best Time:</span>
                                <span className="font-medium text-white">{fest.dates.split('•')[1]?.trim() || fest.dates}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-white/60">Format:</span>
                                <span className="font-medium text-white">Private Tailored Tour</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-white/60">Pricing:</span>
                                <span className="font-medium text-[#C5A059]">On Request</span>
                            </div>
                        </div>

                        <Link
                            href={`/#booking?pkg=${encodeURIComponent(fest.fullName)}`}
                            className="w-full py-4 px-6 bg-gradient-to-r from-[#C5A059] to-[#d6b56f] text-[#1B3022] font-bold text-center block rounded-2xl hover:brightness-110 transition shadow-lg text-sm uppercase tracking-wider"
                        >
                            Request Custom Itinerary
                        </Link>

                        <p className="text-center text-[11px] text-white/50 mt-3">
                            <i className="fas fa-lock mr-1"></i> No upfront commitment • 24hr response
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

