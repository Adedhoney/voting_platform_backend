const express = require("express")
const cors = require("cors")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http, { cors: { origin: "*" } })
//const socketConnections = require("./apiroute/socketConnections")(io)

const db = require("./models")
const PORT = 4000
const userRoutes = require("./apiRoutes/userRoutes/userRoutes")
// const adminRoutes = require("./apiroute/adminRoutes")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get("/", (req, res) => res.json("Testing the endpoint"))
app.use("/user", userRoutes)
// app.use("/admin", adminRoutes)

db.sequelize.sync().then(() => {
    http.listen(PORT, () => console.log(`This server is on port ${PORT}`))
})
