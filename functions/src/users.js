import { FieldValue } from "firebase-admin/firestore";
import { db } from "./dbConnect.js";

const collection = db.collection("users");

export async function signup(req, res) {
  console.log("?????")
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Email & password are both required." });
    return;
  }
  // todo: check if email is already in use
  const newUser = {
    email: email.toLowerCase(),
    password,
    createdAt: FieldValue.serverTimestamp(),
  };
  await collection.add(newUser);
  login(req,res)
  // once user is added, log them in
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Email & password are both required." });
    return;
  }
  const users = await collection.where("email", "==", email.toLowerCase()) // search params
  .where("password","==",password)
  .get()

  let user = users.docs.map(doc=> ({...doc.data(),id:doc.id}))[0]
  if (!user){
    res.status(400).send({message: "Invalid email and/or password."})
  }
  delete user.password
  res.send(user)

}
