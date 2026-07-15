require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        service: process.env.APP_NAME,
        status: "Running"
    });

});

app.get("/api/dashboard", (req, res) => {

    res.json({

        success: true,

        dashboard: {

            totalUsers: 2000,

            totalOrders: 320,

            revenue: 850000,

            pendingOrders: 12,

            completedOrders: 308

        }

    });

});

const PORT = process.env.PORT;

app.listen(PORT, () => {

    console.log(`${process.env.APP_NAME} running on port ${PORT}`);

});