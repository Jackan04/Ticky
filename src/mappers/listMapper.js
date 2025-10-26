export default function mapFirebaseList(doc) {
  const data = doc.data();

  const list = {
    id: doc.id,
    name: data.name,
  };

  return list;
}
