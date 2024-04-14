const Card = require("../models/cardModel");

exports.getCards = async (req, res) => {
	try {
		const cards = await Card.find();
		res.json(cards);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateCards = async (req, res) => {
    try {
      const updatedCards = req.body;
  
      // Loop through the array and update each card in the database
      for (const updatedCard of updatedCards) {
        const { cardId, permissions } = updatedCard;
  
        const card = await Card.findById(cardId);
        if (!card) {
          return res.status(404).json({ message: "Card not found!" });
        }
  
        card.permissions = permissions;
        await card.save();
      }
  
      res.json({ message: "Cards Updated Successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
