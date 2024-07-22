// utils/dateUtils.js
export const formatDate = (dateString) => {
  if (!dateString) {
    return 'N/A';
  }

  const date = new Date(dateString);

  // Handle invalid dates (e.g., from incorrect data in the database)
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
