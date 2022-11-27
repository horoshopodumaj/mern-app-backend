const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json({ extended: true }));
app.use(
    cors({
        credentials: true,
        origin: "*",
    })
);
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));

app.use("/", express.static(path.join(__dirname, "client", "public")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
});

app.use("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
