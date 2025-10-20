import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export class FirebaseListService {
  constructor() {
    const lists = collection(db, "lists");
  }

  async getLists() {}

  async getList() {}

  async updateList() {}

  async addList() {}

  async deleteList() {}
}
