const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const outsourcingRoutes = require("./routes/apiRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://george:grg@cluster0.4t4uabs.mongodb.net/outsourcingDb?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// API Routes
app.use("/api/outsourcing", outsourcingRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
