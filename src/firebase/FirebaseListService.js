import { db } from "./FirebaseConfig";
import mapFirebaseList from "../mappers/listMapper";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default class FirebaseListService {
  constructor() {
    this.listsRef = collection(db, "lists");
  }

  async getAllLists() {
    try {
      const result = await getDocs(this.listsRef);
      const lists = result.docs.map((doc) => mapFirebaseList(doc));
      return lists;
    } catch (error) {
      console.error("Error getting lists:", error);
      throw error;
    }
  }

  async getList() {}

  async updateList(list) {
    try {
      const listsDocRef = doc(db, "lists", list.id);
      const updatedList = { name: list.name, createdAt: Date.now() };
      await updateDoc(listsDocRef, updatedList);
      console.log("Updated list: ", updatedList);
    } catch (error) {
      console.error("Error updating list:", error);
    }
  }

  async addList(list) {
    try {
      const newList = { name: list.name, createdAt: Date.now() };

      await addDoc(this.listsRef, newList);
      console.log("New list added: ", newList);
    } catch (error) {
      console.error("Error adding list:", error);
    }
  }

  async deleteList(list) {
    try {
      await deleteDoc(doc(this.listsRef, list.id));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  }
}
