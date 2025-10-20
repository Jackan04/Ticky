import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export class FirebaseTaskService {
  constructor() {
    const tasks = collection(db, "tasks");
  }
  
  async getTasks() {}
  
  async getTask() {}

  async updateTask() {}

  async addTask() {}

  async deleteTask() {}
}
