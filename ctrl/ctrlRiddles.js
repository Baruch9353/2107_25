import { getAllRiddles, getRiddleById, addRiddle, updateRiddle, deleteRiddle } from '../DAL/riddlesDall.js';

// Handles GET /riddles - returns all riddles
export async function getAllRiddlesHandler(req, res) {
  const riddles = await getAllRiddles();
  res.json(riddles);
}

// Handles GET /riddles/:id - returns a specific riddle by ID (MongoDB _id string)
export async function getRiddleHandler(req, res) {
  const id = req.params.id; 
  const riddle = await getRiddleById(id);
  if (!riddle) return res.status(404).send('Riddle not found');
  res.json(riddle);
}

// Handles POST 
export async function createRiddleHandler(req, res) {
  const body = req.body;
  const newRiddle = await addRiddle({body});
  res.status(201).json(newRiddle);
}

// Handles PUT 
export async function updateRiddleHandler(req, res) {
  const id = req.params.id; 
  const body = req.body;
  const updated = await updateRiddle(id, { body});
  if (!updated) return res.status(404).send("Riddle not found");
  res.json(updated);
}

// Handles DELETE 
export async function deleteRiddleHandler(req, res) {
  const id = req.params.id; 
  const deleted = await deleteRiddle(id);
  if (!deleted) return res.status(404).send('Riddle not found');
  res.status(200).json({ deleted: true });
}
