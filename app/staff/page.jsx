'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const SESSION_KEY = 'staff_auth';
const TIMEOUT_MS = 15 * 60 * 1000;
const WARN_MS = 2 * 60 * 1000;

export default function StaffPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [staffEmail, setStaffEmail] = useState('');
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [currentFilter, setCurrentFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState('all');

    // Inactivity warning banner
    const [showWarnBanner, setShowWarnBanner] = useState(false);

    // Message modal state
    const [messageModal, setMessageModal] = useState(null);

    const inactivityTimer = useRef(null);
    const warnTimer = useRef(null);

    const handleLogout = useCallback(() => {
        clearTimeout(inactivityTimer.current);
        clearTimeout(warnTimer.current);
        setShowWarnBanner(false);
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem('staff_email');
        sessionStorage.removeItem('staff_token');
        setIsLoggedIn(false);
        setLoginForm(prev => ({ ...prev, password: '' }));
    }, []);

    const resetInactivityTimer = useCallback(() => {
        clearTimeout(inactivityTimer.current);
        clearTimeout(warnTimer.current);
        setShowWarnBanner(false);

        if (sessionStorage.getItem(SESSION_KEY) !== 'true') return;

        warnTimer.current = setTimeout(() => {
            setShowWarnBanner(true);
        }, TIMEOUT_MS - WARN_MS);

        inactivityTimer.current = setTimeout(() => {
            handleLogout();
            setLoginError('You were logged out due to 15 minutes of inactivity.');
        }, TIMEOUT_MS);
    }, [handleLogout]);

    const loadBookings = useCallback(async () => {
        setLoadingBookings(true);
        try {
            const token = sessionStorage.getItem('staff_token') || '';
            const res = await fetch('/api/bookings', {
                headers: { 'X-Staff-Token': token },
            });
            const data = await res.json();
            if (Array.isArray(data)) {
                setBookings(data);
            } else {
                setBookings([]);
            }
        } catch (err) {
            console.error('Failed to load bookings:', err);
            setBookings([]);
        } finally {
            setLoadingBookings(false);
        }
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem(SESSION_KEY) === 'true') {
            setIsLoggedIn(true);
            setStaffEmail(sessionStorage.getItem('staff_email') || '');
            loadBookings();
            resetInactivityTimer();
        }
    }, [loadBookings, resetInactivityTimer]);

    useEffect(() => {
        const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
        const handleActivity = () => resetInactivityTimer();
        events.forEach(evt => window.addEventListener(evt, handleActivity, { passive: true }));
        return () => {
            events.forEach(evt => window.removeEventListener(evt, handleActivity));
            clearTimeout(inactivityTimer.current);
            clearTimeout(warnTimer.current);
        };
    }, [resetInactivityTimer]);

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        const { email, password } = loginForm;
        if (!email.trim() || !password) {
            setLoginError('Please enter both email and password.');
            return;
        }

        setLoginLoading(true);
        setLoginError('');

        try {
            const res = await fetch('/api/staff-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Invalid credentials.');

            sessionStorage.setItem(SESSION_KEY, 'true');
            sessionStorage.setItem('staff_email', email.trim());
            sessionStorage.setItem('staff_token', password);

            setIsLoggedIn(true);
            setStaffEmail(email.trim());
            loadBookings();
            resetInactivityTimer();
        } catch (err) {
            setLoginError(err.message);
        } finally {
            setLoginLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const token = sessionStorage.getItem('staff_token') || '';
            const res = await fetch('/api/update-booking', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Staff-Token': token,
                },
                body: JSON.stringify({ id, status }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || data.message || 'Update failed');
            loadBookings();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    const openMessageModal = (trip) => {
        const isConfirmed = trip.status === 'confirmed';
        const subject = isConfirmed
            ? `Your Iconic Ethiopia Tours Booking is Confirmed — ${trip.package || 'Custom Tour'}`
            : `Update on Your Iconic Ethiopia Tours Booking — ${trip.package || 'Custom Tour'}`;
        const body = isConfirmed
            ? `Dear ${trip.customerName || 'Traveler'},\n\nWe are delighted to confirm your booking for ${trip.package || 'your expedition'}.\n\nOur team will be in touch shortly with full itinerary details and next steps.\n\nWarm regards,\nIconic Ethiopia Tours Team`
            : `Dear ${trip.customerName || 'Traveler'},\n\nThank you for your interest in ${trip.package || 'traveling with Iconic Ethiopia Tours'}.\n\nWe wanted to reach out regarding your booking request.\n\n\n\nWarm regards,\nIconic Ethiopia Tours Team`;

        setMessageModal({
            to: trip.customerEmail,
            subject,
            body,
        });
    };

    const handleSendMessage = () => {
        if (!messageModal) return;
        const to = messageModal.to;
        const subject = encodeURIComponent(messageModal.subject);
        const body = encodeURIComponent(messageModal.body);
        window.open(`mailto:${to}?subject=${subject}&body=${body}`);
        setMessageModal(null);
    };

    const exportToCSV = () => {
        if (!filteredBookings || filteredBookings.length === 0) {
            alert('No bookings match the current filter to export.');
            return;
        }
        const headers = ['ID', 'Customer Name', 'Email', 'Phone', 'Package', 'Travelers', 'Travel Date', 'Status', 'Created At'];
        const rows = filteredBookings.map(b => [
            `"${b._id || ''}"`,
            `"${(b.customerName || '').replace(/"/g, '""')}"`,
            `"${(b.customerEmail || '').replace(/"/g, '""')}"`,
            `"${(b.customerPhone || '').replace(/"/g, '""')}"`,
            `"${(b.package || '').replace(/"/g, '""')}"`,
            `"${b.travelerCount || ''}"`,
            `"${b.travelDate || ''}"`,
            `"${b.status || 'pending'}"`,
            `"${b.createdAt ? new Date(b.createdAt).toISOString() : ''}"`
        ]);
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `iconic_ethiopia_bookings_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredBookings = bookings.filter(b => {
        if (currentFilter !== 'all' && b.status !== currentFilter) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const name = (b.customerName || '').toLowerCase();
            const email = (b.customerEmail || '').toLowerCase();
            const pkg = (b.package || '').toLowerCase();
            const phone = (b.customerPhone || '').toLowerCase();
            if (!name.includes(q) && !email.includes(q) && !pkg.includes(q) && !phone.includes(q)) {
                return false;
            }
        }
        if (dateFilter === 'upcoming') {
            if (!b.travelDate) return false;
            const tDate = new Date(b.travelDate).getTime();
            const today = new Date().setHours(0, 0, 0, 0);
            if (tDate < today) return false;
        } else if (dateFilter === 'past') {
            if (!b.travelDate) return false;
            const tDate = new Date(b.travelDate).getTime();
            const today = new Date().setHours(0, 0, 0, 0);
            if (tDate >= today) return false;
        }
        return true;
    });

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };

    return (
        <div className="bg-stone-50 min-h-screen text-slate-800">
            {/* Inactivity Warning Banner */}
            {showWarnBanner && (
                <div className="fixed top-0 left-0 right-0 z-[999] bg-yellow-500 text-white text-sm font-bold text-center py-3 px-4 flex items-center justify-center gap-4">
                    <i className="fas fa-clock"></i>
                    <span>You will be logged out in 2 minutes due to inactivity.</span>
                    <button onClick={resetInactivityTimer} className="underline hover:no-underline ml-2">
                        Stay logged in
                    </button>
                </div>
            )}

            {!isLoggedIn ? (
                /* Login Screen */
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="bg-white rounded-[32px] shadow-sm border border-stone-200 p-10 w-full max-w-md">
                        <div className="text-center mb-8">
                            <Link href="/#landing" className="inline-block text-center">
                                <img src="/Logoo.png" alt="Iconic Ethiopia Tours" className="h-20 w-auto object-contain mx-auto mb-2" />
                                <span className="font-serif text-lg font-bold text-[#1B3022] block">Iconic Ethiopia Tours</span>
                            </Link>
                            <p className="text-slate-500 text-sm mt-1 font-semibold">Staff Portal</p>
                        </div>

                        {loginError && (
                            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                                {loginError}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="staff@rohatours.com"
                                    value={loginForm.email}
                                    onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#C5A059] text-sm"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={loginForm.password}
                                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#C5A059] text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full bg-[#1B3022] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[#2a4a34] transition flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                <span>{loginLoading ? 'Signing in...' : 'Sign In'}</span>
                                {loginLoading && (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                /* Dashboard Screen */
                <div>
                    <nav className="bg-[#1B3022] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                        <span className="flex items-center gap-3">
                            <Link href="/#landing" className="flex items-center gap-2">
                                <img src="/Logoo.png" alt="Iconic Ethiopia Tours" className="h-12 w-auto object-contain brightness-0 invert" />
                                <span className="font-serif text-base font-bold text-white hidden sm:inline">Iconic Ethiopia Tours</span>
                            </Link>
                            <span className="text-sm font-sans font-normal text-slate-400">| Staff Dashboard</span>
                        </span>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-slate-400 hidden md:block">{staffEmail}</span>
                            <button
                                onClick={loadBookings}
                                className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#C5A059] transition"
                            >
                                <i className="fas fa-sync-alt mr-1"></i> Refresh
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-xs font-bold uppercase tracking-widest text-[#C5A059] hover:text-white transition"
                            >
                                <i className="fas fa-sign-out-alt mr-1"></i> Logout
                            </button>
                        </div>
                    </nav>

                    <div className="max-w-7xl mx-auto px-4 py-10">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <div className="bg-white rounded-2xl border border-stone-200 p-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Total</p>
                                <p className="text-3xl font-serif text-[#1B3022]">{stats.total}</p>
                            </div>
                            <div className="bg-white rounded-2xl border border-stone-200 p-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Pending</p>
                                <p className="text-3xl font-serif text-yellow-600">{stats.pending}</p>
                            </div>
                            <div className="bg-white rounded-2xl border border-stone-200 p-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Confirmed</p>
                                <p className="text-3xl font-serif text-green-600">{stats.confirmed}</p>
                            </div>
                            <div className="bg-white rounded-2xl border border-stone-200 p-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Cancelled</p>
                                <p className="text-3xl font-serif text-red-500">{stats.cancelled}</p>
                            </div>
                        </div>

                        {/* Filter & Search Bar */}
                        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                            {/* Filter Tabs & Date Filter */}
                            <div className="flex gap-2 flex-wrap items-center">
                                {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setCurrentFilter(f)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border transition ${
                                            currentFilter === f
                                                ? 'bg-[#1B3022] text-white border-[#1B3022]'
                                                : 'bg-white text-slate-600 border-stone-200 hover:bg-stone-50'
                                        }`}
                                    >
                                        {f.charAt(0).toUpperCase() + f.slice(1)}
                                    </button>
                                ))}

                                <span className="h-4 w-px bg-stone-200 mx-1 hidden sm:inline-block"></span>

                                {/* Date filter select */}
                                <select
                                    value={dateFilter}
                                    onChange={e => setDateFilter(e.target.value)}
                                    className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-stone-200 bg-white text-slate-600 outline-none cursor-pointer hover:bg-stone-50"
                                >
                                    <option value="all">All Dates</option>
                                    <option value="upcoming">Upcoming Tours</option>
                                    <option value="past">Past Tours</option>
                                </select>
                            </div>

                            {/* Search & Export */}
                            <div className="flex gap-3 items-center">
                                <div className="relative flex-1 md:w-64">
                                    <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                    <input
                                        type="text"
                                        placeholder="Search customer, package..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-8 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#C5A059]"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={exportToCSV}
                                    title="Export to CSV"
                                    className="px-4 py-2 bg-[#C5A059] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#b08d48] transition flex items-center gap-2 whitespace-nowrap shadow-sm"
                                >
                                    <i className="fas fa-download"></i>
                                    <span className="hidden sm:inline">Export CSV</span>
                                </button>
                            </div>
                        </div>

                        {/* Bookings Grid */}
                        {loadingBookings ? (
                            <div className="text-center py-16 text-slate-400 text-sm">Loading bookings...</div>
                        ) : filteredBookings.length === 0 ? (
                            <div className="text-center py-16 text-slate-400 text-sm">
                                No {currentFilter === 'all' ? '' : currentFilter} bookings found.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredBookings.map((b) => {
                                    const statusColor = b.status === 'confirmed'
                                        ? 'bg-green-100 text-green-800'
                                        : b.status === 'cancelled'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800';
                                    const date = b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '—';

                                    return (
                                        <div key={b._id} className="bg-white rounded-[24px] border border-stone-200 p-6 flex flex-col justify-between gap-4">
                                            <div>
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h3 className="font-serif text-lg text-[#1B3022]">{b.customerName || '—'}</h3>
                                                        <p className="text-xs text-slate-400">{b.customerEmail}</p>
                                                        {b.customerPhone && <p className="text-xs text-slate-400">{b.customerPhone}</p>}
                                                    </div>
                                                    <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${statusColor}`}>
                                                        {b.status || 'pending'}
                                                    </span>
                                                </div>

                                                <div className="bg-stone-50 rounded-xl p-4 text-sm space-y-1">
                                                    <p><span className="text-xs font-bold uppercase text-slate-400">Package</span><br />{b.package || '—'}</p>
                                                    <p><span className="text-xs font-bold uppercase text-slate-400">Travelers</span> {b.travelerCount || '—'}</p>
                                                    <p><span className="text-xs font-bold uppercase text-slate-400">Travel Date</span> {b.travelDate || '—'}</p>
                                                    <p><span className="text-xs font-bold uppercase text-slate-400">Booked On</span> {date}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 flex-wrap">
                                                {b.status !== 'confirmed' && (
                                                    <button
                                                        onClick={() => updateStatus(b._id, 'confirmed')}
                                                        className="flex-1 bg-green-600 text-white py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-green-700 transition"
                                                    >
                                                        <i className="fas fa-check mr-1"></i> Approve
                                                    </button>
                                                )}
                                                {b.status !== 'cancelled' && (
                                                    <button
                                                        onClick={() => updateStatus(b._id, 'cancelled')}
                                                        className="flex-1 bg-red-50 text-red-600 border border-red-200 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition"
                                                    >
                                                        <i className="fas fa-times mr-1"></i> Cancel
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => openMessageModal(b)}
                                                    className="flex-1 bg-stone-100 text-[#1B3022] py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-200 transition"
                                                >
                                                    <i className="fas fa-envelope mr-1"></i> Message
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Message Modal */}
            {messageModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={() => setMessageModal(null)}>
                    <div className="bg-white rounded-[32px] p-8 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-serif text-xl text-[#1B3022]">Send Message</h3>
                            <button onClick={() => setMessageModal(null)} className="text-slate-400 hover:text-slate-700 text-xl">&times;</button>
                        </div>
                        <div className="mb-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">To</label>
                            <input
                                type="text"
                                readOnly
                                value={messageModal.to}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm text-slate-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">Subject</label>
                            <input
                                type="text"
                                value={messageModal.subject}
                                onChange={e => setMessageModal({ ...messageModal, subject: e.target.value })}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#C5A059]"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">Message</label>
                            <textarea
                                rows={5}
                                value={messageModal.body}
                                onChange={e => setMessageModal({ ...messageModal, body: e.target.value })}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#C5A059] resize-none"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleSendMessage}
                                className="flex-1 bg-[#1B3022] text-white py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#2a4a34] transition"
                            >
                                <i className="fas fa-envelope mr-2"></i> Open in Email
                            </button>
                            <button
                                onClick={() => setMessageModal(null)}
                                className="px-6 py-3 rounded-xl border border-stone-200 font-bold text-sm hover:bg-stone-50 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

