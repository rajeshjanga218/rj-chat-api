import * as service from "./service.js";

export async function signUp(req, res) {
  try {
    const data = await service.signUp(req.body, res);
    res.status(201).json({ data });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function logIn(req, res) {
  try {
    const data = await service.logIn();
    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
}
