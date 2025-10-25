import { formatDate, normalizeListId } from "../../helpers";

export default function mapFirebaseTask(doc) {
  const data = doc.data();

  const task = {
    id: data.id,
    title: data.title,
    completed: data.completed,
    notes: data.notes,
    dueDate: formatDate(data.dueDate),
    createdAt: data.createdAt,
    listId: normalizeListId(data.listId),
  };

  return task;
}
