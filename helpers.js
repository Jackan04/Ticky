// Format date for task details modal
export const formatDate = (d) => {
  if (!d && d !== 0) return "";
  if (typeof d === "string") return d;
  if (d instanceof Date) return d.toLocaleDateString();
  if (d && typeof d.toDate === "function") {
    try {
      return d.toDate().toLocaleDateString();
    } catch (e) {}
  }
  if (d && typeof d.seconds === "number") {
    try {
      return new Date(d.seconds * 1000).toLocaleDateString();
    } catch (e) {}
  }
  return String(d);
};

// Each task contains a reference to a list document (listId)
// To retrieve the list's id, the reference must be normalized first
export const normalizeListId = (listId) => {
  if (listId == null) return null;
  if (typeof listId === "string") return listId;
  if (typeof listId === "object") {
    if ("id" in listId && listId.id) return listId.id; 
    if ("path" in listId && typeof listId.path === "string") {
      const parts = listId.path.split("/");
      return parts[parts.length - 1]; 
    }
  }
  return String(listId);
};
