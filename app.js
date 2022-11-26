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
        origin: ["https://mern-task-four-client.onrender.com"],
    })
);
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));

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
