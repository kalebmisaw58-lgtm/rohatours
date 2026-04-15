export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

    const { email, password } = req.body || {};

    const validEmail = process.env.STAFF_EMAIL;
    const validPassword = process.env.STAFF_PASSWORD;

    if (!validEmail || !validPassword) {
        return res.status(500).json({ success: false, message: 'Server auth not configured.' });
    }

    if (email === validEmail && password === validPassword) {
        return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
}
