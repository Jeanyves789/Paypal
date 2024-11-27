const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Stripe = require("stripe");

// Configurez votre clé API Stripe (remplacez par votre clé secrète)
const stripe = Stripe("sk_test_votre_clé_API_ici");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Route pour créer un paiement
app.post("/create-payment-intent", async (req, res) => {
    const { amount, currency } = req.body;

    try {
        // Créer un PaymentIntent avec l'API Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convertir en cents
            currency: currency,
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur le port ${PORT}`);
});
