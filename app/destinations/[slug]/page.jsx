import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { destinationData, getDestinationBySlug } from '@/lib/data';

export async function generateStaticParams() {
    return Object.values(destinationData).map(dest => ({
        slug: dest.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const destination = getDestinationBySlug(slug);
    if (!destination) return { title: 'Destination Not Found' };

    return {
        title: `${destination.name} Expedition | RohaTours Ethiopia`,
        description: destination.shortDesc || destination.description[0],
        alternates: {
            canonical: `/destinations/${destination.slug}`,
        },
        openGraph: {
            title: `${destination.name} | RohaTours Private Ethiopia Tours`,
            description: destination.shortDesc,
            images: [destination.image],
            type: 'article',
        },
    };
}

export default async function DestinationDetailPage({ params }) {
    const { slug } = await params;
    const dest = getDestinationBySlug(slug);

    if (!dest) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#FDFAF4] dark:bg-[#0f1a13] text-slate-800 dark:text-[#e8e0d0]">
            {/* Top Back Nav */}
            <div className="max-w-5xl mx-auto px-4 mb-6">
                <Link
                    href="/#destinations"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] hover:underline"
                >
                    <i className="fas fa-arrow-left"></i> All Destinations
                </Link>
            </div>

            {/* Hero Image & Title */}
            <div className="max-w-5xl mx-auto px-4 mb-12">
                <div className="relative h-80 sm:h-96 md:h-[450px] rounded-[36px] overflow-hidden shadow-2xl">
                    <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        priority
                        sizes="(max-width: 1200px) 100vw, 1100px"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] bg-[#1B3022]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C5A059]/40">
                                {dest.duration}
                            </span>
                            {dest.difficulty && (
                                <span className="text-xs font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full">
                                    Difficulty: {dest.difficulty}
                                </span>
                            )}
                            {dest.region && (
                                <span className="text-xs font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full">
                                    {dest.region}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-serif text-white mb-2">{dest.name}</h1>
                        <p className="text-slate-300 max-w-2xl text-sm sm:text-base">{dest.shortDesc}</p>
                    </div>
                </div>
            </div>

            {/* Details Content */}
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Itinerary & Description */}
                <div className="lg:col-span-8 space-y-12">
                    {/* About Expedition */}
                    <div className="bg-white dark:bg-[#1a2b1f] p-8 rounded-[32px] border border-stone-200 dark:border-[#2d4a35] shadow-sm">
                        <span className="section-label block mb-2">Expedition Summary</span>
                        <h2 className="text-3xl font-serif text-[#1B3022] dark:text-[#f0e8d8] mb-6">About The Journey</h2>
                        <div className="space-y-4 text-slate-600 dark:text-[#c8d8cc] leading-relaxed text-sm sm:text-base">
                            {dest.description.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>
                    </div>

                    {/* Day-by-Day Itinerary */}
                    {dest.itinerary && (
                        <div className="bg-white dark:bg-[#1a2b1f] p-8 rounded-[32px] border border-stone-200 dark:border-[#2d4a35] shadow-sm">
                            <span className="section-label block mb-2">Detailed Route</span>
                            <h2 className="text-3xl font-serif text-[#1B3022] dark:text-[#f0e8d8] mb-8">Day-by-Day Itinerary</h2>
                            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#C5A059]/40">
                                {dest.itinerary.map((dayItem, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#C5A059] border-2 border-white dark:border-[#1a2b1f]"></div>
                                        <div className="bg-stone-50 dark:bg-[#162318] p-6 rounded-2xl border border-stone-200 dark:border-[#2d4a35]">
                                            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
                                                {dayItem.day}
                                            </span>
                                            <h3 className="font-serif text-lg text-[#1B3022] dark:text-[#f0e8d8] font-bold mb-2">
                                                {dayItem.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-[#c8d8cc] text-sm leading-relaxed">
                                                {dayItem.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Packing Tips */}
                    {dest.whatToPack && (
                        <div className="bg-white dark:bg-[#1a2b1f] p-8 rounded-[32px] border border-stone-200 dark:border-[#2d4a35] shadow-sm">
                            <span className="section-label block mb-2">Preparation</span>
                            <h2 className="text-3xl font-serif text-[#1B3022] dark:text-[#f0e8d8] mb-6">What to Pack &amp; Know</h2>
                            <ul className="space-y-3">
                                {dest.whatToPack.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-[#c8d8cc]">
                                        <i className="fas fa-check-circle text-[#C5A059] mt-1 flex-shrink-0"></i>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right Column: Inclusions & CTA Card */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="sticky top-28 bg-white dark:bg-[#1a2b1f] p-8 rounded-[32px] border border-stone-200 dark:border-[#2d4a35] shadow-xl">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block mb-2">
                            Private Expedition
                        </span>
                        <h3 className="text-2xl font-serif text-[#1B3022] dark:text-[#f0e8d8] mb-2">{dest.name}</h3>
                        <p className="text-xs text-slate-500 mb-6">Fully guided private journey tailored to your interests and pace.</p>

                        <div className="space-y-3 border-t border-b border-stone-100 dark:border-[#2d4a35] py-4 mb-6 text-xs text-slate-600 dark:text-[#c8d8cc]">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Duration:</span>
                                <span className="font-bold">{dest.duration}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Difficulty:</span>
                                <span className="font-bold">{dest.difficulty}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Best Season:</span>
                                <span className="font-bold">{dest.bestSeason.split('(')[0]}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-3">
                                Package Inclusions
                            </h4>
                            <div className="space-y-2">
                                {dest.inclusions.map((inc, i) => (
                                    <div key={i} className="inclusion-item">
                                        <i className={`fas fa-${inc.icon}`}></i> {inc.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/#booking"
                            className="w-full btn-gold py-4 rounded-xl font-bold uppercase tracking-widest text-xs text-center block shadow-lg hover:shadow-xl transition"
                        >
                            Book This Expedition
                        </Link>
                        <a
                            href="https://wa.me/251963575717"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full mt-3 bg-stone-100 dark:bg-[#162318] text-[#1B3022] dark:text-[#f0e8d8] py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs text-center block hover:bg-stone-200 transition"
                        >
                            <i className="fab fa-whatsapp text-green-500 mr-1.5"></i> Ask on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

