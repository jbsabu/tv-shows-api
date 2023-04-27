import { FieldValue } from "firebase-admin/firestore";
import { db } from "./dbConnect.js";

const collection = db.collection("shows");

export async function getShows(req, res) {
  const showsCollection = await collection.get()
  const shows = showsCollection.docs.map(doc => ({...doc.data(),id: doc.id}))
  res.send(shows) 
}


export async function addShow(req,res){
  const {title,poster,seasons } = req.body
  // const showsCollection = await collect
  if (!title||!poster||!seasons){
    res.status(400).send({message: "Show title is required."})
    return
  }
  const newShow = {
    title, 
    poster,
    seasons,
    createdAt: FieldValue.serverTimestamp()
  }
  await collection.add(newShow)
  getShows(req,res) 
}

export async function deleteShow(req,res){
  const {title} = req.body
  // const showsCollection = await collect
  if (!title){
    res.status(400).send({message: "Show title is required."})
    return
  }

  await collection.get().where("title","==",title).then()
  getShows(req,res) 
}