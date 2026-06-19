const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const pokemonRoutes = require("./routes/pokemonRoutes");

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        message: "Muitas requisições. Tente novamente em alguns minutos."
    }
});

app.use(limiter);

app.use(helmet());

app.use(compression());

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/pokemons", pokemonRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});