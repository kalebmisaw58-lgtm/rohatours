'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function DestinationModal({ destination, onClose, onBook }) {
    const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'itinerary' | 'packing'

    if (!destination) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-[#1a2b1f] rounded-[32px] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 dark:border-[#2d4a35] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header Image */}
                <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-cover rounded-t-[32px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition flex items-center justify-center"
                        aria-label="Close modal"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                    <div className="absolute bottom-4 left-6 right-6">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] bg-[#1B3022]/80 backdrop-blur-md px-3 py-1 rounded-full">
                                {destination.duration}
                            </span>
                            {destination.difficulty && (
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                    {destination.difficulty}
                                </span>
                            )}
                            {destination.region && (
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                    {destination.region}
                                </span>
                            )}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-serif text-white">{destination.name}</h2>
                    </div>
                </div>

                {/* Tabs Bar */}
                <div className="flex border-b border-stone-200 dark:border-[#2d4a35] px-8 pt-4 gap-6 bg-stone-50/50 dark:bg-[#162318]/50 text-sm font-semibold">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`pb-3 transition relative ${
                            activeTab === 'overview'
                                ? 'text-[#C5A059] border-b-2 border-[#C5A059]'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                        }`}
                    >
                        Overview &amp; Includes
                    </button>
                    {destination.itinerary && (
                        <button
                            onClick={() => setActiveTab('itinerary')}
                            className={`pb-3 transition relative flex items-center gap-1.5 ${
                                activeTab === 'itinerary'
                                    ? 'text-[#C5A059] border-b-2 border-[#C5A059]'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                            }`}
                        >
                            <span>Day-by-Day Itinerary</span>
                            <span className="text-[10px] bg-[#C5A059]/20 text-[#C5A059] px-2 py-0.5 rounded-full font-bold">
                                {destination.itinerary.length} Days
                            </span>
                        </button>
                    )}
                    {destination.whatToPack && (
                        <button
                            onClick={() => setActiveTab('packing')}
                            className={`pb-3 transition relative ${
                                activeTab === 'packing'
                                    ? 'text-[#C5A059] border-b-2 border-[#C5A059]'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                            }`}
                        >
                            What to Pack &amp; Tips
                        </button>
                    )}
                </div>

                {/* Tab Content */}
                <div className="p-8 flex-grow">
                    {/* TAB 1: OVERVIEW */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="text-slate-600 dark:text-[#c8d8cc] leading-relaxed space-y-3 text-sm">
                                {destination.description.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>

                            {destination.bestSeason && (
                                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4 flex items-center gap-3 text-amber-900 dark:text-amber-200 text-sm">
                                    <i className="fas fa-calendar-alt text-[#C5A059] text-xl"></i>
                                    <div>
                                        <p className="font-bold text-xs uppercase tracking-wider">Recommended Season</p>
                                        <p className="text-xs">{destination.bestSeason}</p>
                                    </div>
                                </div>
                            )}

                            <div className="bg-stone-50 dark:bg-[#162318] rounded-2xl p-6">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                                    Package Inclusions
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {destination.inclusions.map((inc, i) => (
                                        <div key={i} className="inclusion-item">
                                            <i className={`fas fa-${inc.icon}`}></i> {inc.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: DAY-BY-DAY ITINERARY */}
                    {activeTab === 'itinerary' && destination.itinerary && (
                        <div className="space-y-6">
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                                Comprehensive Daily Schedule
                            </p>
                            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#C5A059]/40">
                                {destination.itinerary.map((dayItem, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#C5A059] border-2 border-white dark:border-[#1a2b1f]"></div>
                                        <div className="bg-stone-50 dark:bg-[#162318] p-5 rounded-2xl border border-stone-200 dark:border-[#2d4a35]">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                                                    {dayItem.day}
                                                </span>
                                                <span className="text-slate-300">•</span>
                                                <h4 className="font-serif text-base text-[#1B3022] dark:text-[#f0e8d8] font-bold">
                                                    {dayItem.title}
                                                </h4>
                                            </div>
                                            <p className="text-slate-600 dark:text-[#c8d8cc] text-xs sm:text-sm leading-relaxed mt-2">
                                                {dayItem.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB 3: PACKING & TIPS */}
                    {activeTab === 'packing' && destination.whatToPack && (
                        <div className="space-y-6">
                            <div className="bg-stone-50 dark:bg-[#162318] p-6 rounded-2xl border border-stone-200 dark:border-[#2d4a35]">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-4 flex items-center gap-2">
                                    <i className="fas fa-suitcase"></i> Recommended Packing Checklist
                                </h4>
                                <ul className="space-y-3">
                                    {destination.whatToPack.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-[#c8d8cc]">
                                            <i className="fas fa-check-circle text-[#C5A059] mt-1 flex-shrink-0"></i>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-4 rounded-2xl border border-stone-200 dark:border-[#2d4a35] text-xs text-slate-500 dark:text-[#8aaa94] space-y-2">
                                <p><strong>Private Vehicle &amp; Guide:</strong> Every tour includes a dedicated English-speaking local master guide and modern air-conditioned 4x4 Toyota Land Cruiser.</p>
                                <p><strong>Customization:</strong> Itineraries can be lengthened, shortened, or combined with festivals to fit your travel schedule.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="p-6 border-t border-stone-200 dark:border-[#2d4a35] bg-stone-50/50 dark:bg-[#162318]/50 flex gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-4 rounded-2xl border border-stone-300 dark:border-[#2d4a35] font-bold text-xs uppercase tracking-widest hover:bg-stone-100 dark:hover:bg-[#2d4a35] transition"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            onBook(destination.name);
                        }}
                        className="flex-1 btn-gold py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-center shadow-lg"
                    >
                        Request This Expedition
                    </button>
                </div>
            </div>
        </div>
    );
}

