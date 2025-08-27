import aj from "../config/arcjet.js";

const arcjetMiddleware = async(req, res, next) => {
    try {
        const decision = await aj.protect(req , { requested: 1 })
        console.log(decision.isDenied());
        if(decision.isDenied()) {
            console.log("Arcjet denial reason:", decision.reason);
            if(decision.reason.isRateLimit()) {
                return res.status(429).send("Rate limit exceeded")
            }
            if(decision.reason.isBot()) {
                return res.status(403).send("Bots are not allowed")
            }
            return res.status(403).send("Access denied")
        }
        next()
    } catch (error) {
        console.error("ArcJet middleware error:", error)
        next(error)
    }
}

export default arcjetMiddleware