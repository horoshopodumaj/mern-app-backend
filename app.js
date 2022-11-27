const express = require("express");
//const config = require("config");
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

// if (process.env.NODE_ENV === "production") {
//     app.use("/", express.static(path.join(__dirname, "build")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "build", "index.html"));
//     });
// }

// app.use(express.static(path.join(__dirname, "build")));

// app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
});

const PORT = process.env.PORT || 5000;
// function start() {
//     try {
//         mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
//     } catch (error) {
//         console.log("Server error", error.message);
//         process.exit(1);
//     }
// }

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

//start();
