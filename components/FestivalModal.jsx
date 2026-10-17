'use client';

import Image from 'next/image';

export default function FestivalModal({ festival, onClose, onBook }) {
    if (!festival) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-[#1a2b1f] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 dark:border-[#2d4a35]"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative h-64 sm:h-72 w-full">
                    <Image
                        src={festival.image}
                        alt={festival.fullName}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 700px"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        className="rounded-t-[32px]"
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
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] bg-[#1B3022]/80 backdrop-blur-md px-3 py-1 rounded-full mb-2 inline-block">
                            {festival.dates}
                        </span>
                        <h2 className="text-3xl font-serif text-white">{festival.fullName}</h2>
                    </div>
                </div>

                <div className="p-8">
                    <div className="text-slate-600 dark:text-[#c8d8cc] leading-relaxed mb-6 space-y-3 text-sm">
                        {festival.description.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>

                    <div className="bg-stone-50 dark:bg-[#162318] rounded-2xl p-6 mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                            Package Includes
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            {festival.inclusions.map((inc, i) => (
                                <div key={i} className="inclusion-item">
                                    <i className={`fas fa-${inc.icon}`}></i> {inc.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            onClose();
                            onBook(festival.fullName);
                        }}
                        className="w-full btn-gold py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg"
                    >
                        Book This Festival Experience
                    </button>
                </div>
            </div>
        </div>
    );
}

