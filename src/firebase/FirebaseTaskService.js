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

  async updateTask(task) {
    const tasksDocRef = doc(db, "tasks", task.id);
    try {
      const updatedTask = await updateDoc(tasksDocRef, {
        title: task.title,
        dueDate: task.dueDate,
        notes: task.notes,
        completed: task.completed,
        listId: task.listId,
        createdAt: Date.now(),
      });
      console.log("Document updated: ", updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async toggleTaskCompleted(task) {
    const tasksDocRef = doc(db, "tasks", task.id);
    try {
      await updateDoc(tasksDocRef, {
        completed: !task.completed,
      });
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  }

  async addTask(task) {
    try {
      const newTask = await addDoc(this.tasksRef, task);
      console.log("Document written: ", newTask);
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
