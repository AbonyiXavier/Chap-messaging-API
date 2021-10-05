
const config = {
    db: {
        url: process.env.MONGODB_URI || "mongodb://localhost/groupchat",
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || "development",
    }
}

export default config