const { json } = require("body-parser");
const { Card } = require("../Module/Card.Module");
const SubTask = require("../Module/Subtask.Module");

    class CardController {
  async createCard(req, res) {
    try {
      const newCard = new Card(req.body);
      await newCard.save();
      console.log(newCard);
      return res.status(200).json(newCard);
    } catch (error) {
      console.error("Error creating card:", error);
      return res.status(500).json({ error: "Error creating card" });
    }
  }

  async getCardById(req, res) {
    try {
      const card = await Card.findById(req.params.id);
      //  console.log(req.params.id);
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      return card;
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getall(req, res) {
    try {
      const result = await Card.find();
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching cards:", error);
      return res.status(500).json({ error: "Error fetching cards" });
    }
  }

  async deleteall(req, res) {
    try {
      const result = await Card.deleteMany();
      return res.status(200).json({ message: "Deleted successfully", result });
    } catch (error) {
      console.error("Error in Deleting cards:", error);
      return res.status(500).json({ error: "Error deleting cards" });
    }
  }

  //   async createSubtask(req, res) {
  //     try {
  //       const cardId = req.params.cardid;
  //       //   const subtask = {
  //       //     title: req.body.title,
  //       //   };

  //       // Find the card by its ID
  //       const card = await Card.findById(cardId);
  //       console.log(cardId);

  //       if (!card) {
  //         return res.status(404).json({ error: "Card not found" });
  //       }
  //       console.log("New subtask created");

  //       // Create a new subtask document
  //       const newSubtask = new SubTask(req.body.title);

  //       // Save the subtask document
  //       await newSubtask.save();

  //       // Push the new subtask's ID to the card's subtasks array
  //       card.subtasks.push(newSubtask._id);

  //       // Save the updated card document
  //       await card.save();

  //       // Return a success response
  //       return res.status(200).json({ message: "Subtask created successfully" });
  //     } catch (error) {
  //       console.error("Error creating subtask:", error);
  //       return res.status(500).json({ error: "Error creating subtask" });
  //     }
  //   }
  async createSubtask(req, res) {
    try {
      const cardId = req.params.cardid;

      // Find the card by its ID
      const card = await Card.findById(cardId);
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }

      // Create a new subtask document
      const newSubtask = new SubTask({
        title: req.body.title,
      });
      console.log("Subtask created");

      // Save the subtask document
      await newSubtask.save();

      // Push the new subtask's ID to the card's subtasks array
      card.subtasks.push(newSubtask._id);

      // Save the updated card document
      await card.save();

      // Return a success response
      return res.status(200).json({ message: "Subtask created successfully" });
    } catch (error) {
      console.error("Error creating subtask:", error);
      return res.status(500).json({ error: "Error creating subtask" });
    }
  }

  async deleteCardById(req, res) {
    const { id } = req.params; // Assuming the ID is provided in the request params

    try {
      const deletedCard = await Card.findByIdAndDelete(id);

      if (!deletedCard) {
        return res.status(404).json({ error: "Card not found" });
      }

      return res
        .status(200)
        .json({ message: "Card deleted successfully", deletedCard });
    } catch (error) {
      console.error("Error deleting card:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new CardController();
