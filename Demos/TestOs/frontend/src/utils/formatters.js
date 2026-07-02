export const formatCurrency = (amount) => {
  return `$${Number(amount || 0).toFixed(2)}`;
};

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
