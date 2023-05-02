import { FieldValue } from "firebase-admin/firestore";
import { db } from "./dbConnect.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../secrets.js";

const collection = db.collection("shows");

export async function getShows(req, res) {
  const showsCollection = await collection.get();
  const shows = showsCollection.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  res.send(shows);
}

export async function addShow(req, res) {
  const token = req.headers.authorization
  const decoded = jwt.verify(token,secretKey)
  if (!token) {
    res.status(401).send({message: "Unauthorized. A valid token is required."})
    return
  }
  if (!decoded) {
    res.status(401).send({message: "Unauthorized. A valid token is required."})
    return
  }
  const { title, poster, seasons } = req.body;
  // const showsCollection = await collect
  if (!title || !poster || !seasons) {
    res.status(400).send({ message: req.body });
    return;
  }
  const newShow = {
    title,
    poster,
    seasons,
    createdAt: FieldValue.serverTimestamp(),
  };
  await collection.add(newShow);
  getShows(req, res);
}

// export async function deleteShow(req, res) {
//   const { title } = req.body;
//   // const showsCollection = await collect
//   if (!title) {
//     res.status(400).send({ message: "Show title is required." });
//     return;
//   }

//   const doc = await collection.get().where("title", "==", title).get();
//   if (doc) {
//   }
//   getShows(req, res);
// }
