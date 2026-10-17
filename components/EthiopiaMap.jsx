'use client';

import { useState } from 'react';
import Image from 'next/image';
import { destinationData } from '@/lib/data';

export default function EthiopiaMap({ onSelectDestination }) {
    const [activeKey, setActiveKey] = useState('Lalibela Churches');
    const activeData = destinationData[activeKey];

    const pins = Object.entries(destinationData).map(([key, data]) => ({
        key,
        name: key,
        x: data.mapCoords?.x || 50,
        y: data.mapCoords?.y || 50,
        region: data.region,
        duration: data.duration,
        image: data.image,
        difficulty: data.difficulty,
        shortDesc: data.shortDesc,
    }));

    return (
        <section className="py-20 border-b overflow-hidden" style={{ backgroundColor: 'var(--stone)' }}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="section-label block mb-3">Interactive Explorer</span>
                    <h2 className="text-4xl font-serif mb-3" style={{ color: 'var(--green-deep)' }}>
                        Route Across Ethiopia
                    </h2>
                    <div className="gold-divider"></div>
                    <p className="text-slate-500 mt-4 max-w-xl mx-auto">
                        Click any destination pin on the map to explore the geography, route highlights, and terrain across the Land of Origins.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* SVG Map Canvas */}
                    <div className="lg:col-span-7 bg-white dark:bg-[#162318] p-6 md:p-8 rounded-[36px] border border-stone-200 dark:border-[#2d4a35] shadow-sm relative">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1B3022]/5 to-[#C5A059]/10 dark:from-[#0a1209] dark:to-[#162318]">
                            {/* Stylized Ethiopia Contour & Topography */}
                            <svg
                                viewBox="0 0 100 100"
                                className="w-full h-full drop-shadow"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <defs>
                                    <linearGradient id="ethiopiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#2D5238" stopOpacity="0.25" />
                                        <stop offset="50%" stopColor="#C5A059" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#1B3022" stopOpacity="0.30" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Approximate geometric silhouette of Ethiopia */}
                                <path
                                    d="M 38 12 
                                       C 45 10, 56 12, 62 18 
                                       C 68 24, 76 26, 80 34 
                                       C 84 42, 92 48, 90 56 
                                       C 87 64, 78 72, 70 76 
                                       C 60 80, 52 86, 44 86 
                                       C 36 86, 28 80, 24 74 
                                       C 20 66, 18 56, 22 46 
                                       C 26 36, 28 24, 34 16 Z"
                                    fill="url(#ethiopiaGradient)"
                                    stroke="var(--gold)"
                                    strokeWidth="0.8"
                                    strokeDasharray="2 1"
                                    className="transition-all duration-700"
                                />

                                {/* Internal Geographic River/Rift Valley Flow lines */}
                                <path
                                    d="M 32 80 Q 48 55 68 25"
                                    fill="none"
                                    stroke="#C5A059"
                                    strokeWidth="0.5"
                                    strokeOpacity="0.4"
                                    strokeDasharray="1.5 1.5"
                                />

                                {/* Pins */}
                                {pins.map((pin) => {
                                    const isSelected = pin.key === activeKey;
                                    return (
                                        <g
                                            key={pin.key}
                                            className="cursor-pointer transition-transform duration-300"
                                            onClick={() => setActiveKey(pin.key)}
                                            style={{ transformOrigin: `${pin.x}% ${pin.y}%` }}
                                        >
                                            {/* Ripple ring for active pin */}
                                            {isSelected && (
                                                <circle
                                                    cx={pin.x}
                                                    cy={pin.y}
                                                    r="4.5"
                                                    fill="none"
                                                    stroke="#C5A059"
                                                    strokeWidth="0.6"
                                                    className="animate-ping"
                                                    style={{ transformOrigin: `${pin.x}px ${pin.y}px` }}
                                                />
                                            )}
                                            {/* Base outer pin circle */}
                                            <circle
                                                cx={pin.x}
                                                cy={pin.y}
                                                r={isSelected ? '2.8' : '1.8'}
                                                fill={isSelected ? '#C5A059' : '#1B3022'}
                                                stroke="#FFFFFF"
                                                strokeWidth="0.6"
                                                filter="url(#glow)"
                                            />
                                            {/* Center dot */}
                                            <circle
                                                cx={pin.x}
                                                cy={pin.y}
                                                r="0.8"
                                                fill="#FDFAF4"
                                            />
                                            {/* City text tag */}
                                            <text
                                                x={pin.x}
                                                y={pin.y - 3.5}
                                                textAnchor="middle"
                                                fill={isSelected ? '#C5A059' : '#1B3022'}
                                                fontSize="2.4"
                                                fontWeight={isSelected ? 'bold' : '600'}
                                                className="select-none pointer-events-none drop-shadow-sm font-sans"
                                                style={{ letterSpacing: '0.05em' }}
                                            >
                                                {pin.name.replace(' Churches', '').replace(' Castles', '').replace(' Monuments', '').replace(' Adventure', '').replace(' Tribes', '').replace(' Mountains', '')}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                        <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
                            <span><i className="fas fa-map-pin text-[#C5A059] mr-1"></i> Interactive destination markers</span>
                            <span className="hidden sm:inline">Federal Democratic Republic of Ethiopia</span>
                        </div>
                    </div>

                    {/* Preview Card for Active Pin */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        {activeData && (
                            <div className="bg-white dark:bg-[#1a2b1f] rounded-[32px] p-8 border border-stone-200 dark:border-[#2d4a35] shadow-xl relative animate-fade-in">
                                <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                                    <Image
                                        src={activeData.image}
                                        alt={activeKey}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 500px"
                                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                                        className="transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-[#1B3022]/90 backdrop-blur-md text-[#C5A059] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#C5A059]/30">
                                        {activeData.region}
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                        {activeData.difficulty}
                                    </div>
                                </div>

                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
                                    {activeData.duration}
                                </span>
                                <h3 className="text-3xl font-serif text-[#1B3022] dark:text-[#f0e8d8] mb-3">
                                    {activeKey}
                                </h3>
                                <p className="text-slate-600 dark:text-[#c8d8cc] text-sm leading-relaxed mb-6">
                                    {activeData.shortDesc || activeData.description[0]}
                                </p>

                                <div className="bg-stone-50 dark:bg-[#162318] p-4 rounded-xl mb-6">
                                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#8aaa94]">
                                        <span><strong>Best Season:</strong> {activeData.bestSeason.split('(')[0]}</span>
                                        <span><strong>Days:</strong> {activeData.itinerary?.length || 2}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => onSelectDestination && onSelectDestination(activeKey)}
                                        className="flex-1 btn-gold py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs shadow-md"
                                    >
                                        View Full Itinerary
                                    </button>
                                    <a
                                        href="#booking"
                                        onClick={() => {
                                            window._pendingPackage = activeKey;
                                        }}
                                        className="flex-1 bg-[#1B3022] hover:bg-[#2a4a34] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs text-center transition flex items-center justify-center"
                                    >
                                        Book This Route
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

