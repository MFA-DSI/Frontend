export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour une adresse e-mail simple
  return re.test(email);
};
