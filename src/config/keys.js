
const config = {
    db: {
        url: "mongodb://localhost/groupchat",
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || "development",
    }
}

export default config