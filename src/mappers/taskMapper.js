import { formatDate, normalizeListId } from "../../helpers";

export default function mapFirebaseTask(doc) {
  const data = doc.data();

  const task = {
    id: doc.id,
    title: data.title,
    completed: data.completed ?? false,
    notes: data.notes ?? "",
    dueDate: formatDate(data.dueDate) ?? null,
    createdAt: data.createdAt ?? Date.now(),
    // Normalize listId so UI always gets a plain string id regardless of how
    // the value is stored in Firestore (DocumentReference or string).
    listId: normalizeListId(data.listId),
  };

  return task;
}
