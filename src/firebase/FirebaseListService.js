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

  async updateList() {}

  async addList() {}

  async deleteList() {}
}
