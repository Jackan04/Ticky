import { db } from "./FirebaseConfig";
import mapFirebaseTask from "../mappers/taskMapper";
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
    this.tasksRef = collection(db, "tasks");
  }

  async getAllTasks() {
    try {
      const results = await getDocs(this.tasksRef);
      const tasks = results.docs.map((doc) => mapFirebaseTask(doc));
      return tasks;
    } catch (error) {
      console.error("Error getting tasks:", error);
      throw error;
    }
  }

  async getTask() {}

  async updateTask() {}

  async addTask(task) {
    try {
      const taskRef = await addDoc(this.tasksRef, task);
      console.log("Document written: ", taskRef);
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  }

  async deleteTask(task) {
    try {
       await deleteDoc(doc(this.tasksRef, task.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
}
