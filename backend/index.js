import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5555",
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: ["Content-Type"],
//   }),
// );

const todoSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Todo = mongoose.model("Todo", todoSchema);

app.post("/", async (req, res) => {
  try {
    if (!req.body.content) {
      return res.status(400).send({ message: "Please write a content" });
    }
    const maxOrderTodo = await Todo.findOne({}, {}, { sort: { order: -1 } });
    const maxOrder = maxOrderTodo ? maxOrderTodo.order : 0;

    const newTodo = {
      content: req.body.content,
      order: maxOrder + 1,
    };
    const todo = await Todo.create(newTodo);
    return res.status(201).send(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.put("/reorder", async (req, res) => {
  try {
    const { newOrder } = req.body;
    await Promise.all(
      newOrder.map(async (todo, index) => {
        await Todo.findByIdAndUpdate(todo._id, { order: index });
      }),
    );
    res.status(200).json({ message: "Todos reordered successfully" });
  } catch (error) {
    console.error("Error reordering todos:", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ order: 1 });
    return res.status(200).json({
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      completed: completed,
    });

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.delete("/completed", async (req, res) => {
  try {
    const result = await Todo.deleteMany({ completed: true });
    return res
      .status(200)
      .json({ message: "Completed todos deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Error deleting completed todos" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
