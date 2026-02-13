export async function requireAuth (req, res, next) {
    // if user is authenticated proceed
    if (req.isAuthenticated()) return next();
    // if not sent 401
    return res.status(401).json({
        error: "Not authenticated"
    });
}

export function requireGuest(req, res, next) {
    if (!req.isAuthenticated()) return next();
    return res.status(409).json({ error: "Already authenticated" });
}

