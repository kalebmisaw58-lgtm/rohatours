import './globals.css';

export const metadata = {
    title: 'RohaTours | Private Expeditions & Authentic Ethiopia Travel',
    description: 'Discover Ethiopia with RohaTours. Expert-led private expeditions to Lalibela, Gondar, Axum, Danakil, Omo Valley and beyond. Book your journey today.',
    authors: [{ name: 'RohaTours' }],
    metadataBase: new URL('https://rohatours.vercel.app'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        url: 'https://rohatours.vercel.app/',
        title: 'RohaTours | Private Expeditions & Authentic Ethiopia Travel',
        description: 'Expert-led private expeditions to Lalibela, Gondar, Axum, Danakil and beyond. Discover the soul of Ethiopia.',
        images: ['/Timkat Festival.jpg'],
        siteName: 'RohaTours',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@rohatours',
        title: 'RohaTours | Private Expeditions & Authentic Ethiopia Travel',
        description: 'Expert-led private expeditions to Lalibela, Gondar, Axum, Danakil and beyond. Discover the soul of Ethiopia.',
        images: ['/Timkat Festival.jpg'],
    },
    icons: {
        icon: '/Logoo.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                    rel="stylesheet"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function() {
                            try {
                                if (localStorage.getItem('theme') === 'dark') {
                                    document.documentElement.classList.add('dark');
                                    document.body?.classList.add('dark');
                                }
                            } catch(e) {}
                        })();`,
                    }}
                />
            </head>
            <body className="text-slate-800 transition-colors duration-200">
                {children}
            </body>
        </html>
    );
}

