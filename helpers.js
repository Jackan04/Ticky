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
