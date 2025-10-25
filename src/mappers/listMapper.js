export default function mapFirebaseList(doc) {
  const data = doc.data();

  const list = {
    id: doc.id,
    name: data.name,
    taskCount: typeof data.taskCount === "number" ? data.taskCount : 0,
  };

  return list;
}
