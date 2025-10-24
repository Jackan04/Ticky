import { db } from "./FirebaseConfig";
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
      const lists = result.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(lists);
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
