export const stringInitials = (str: string) =>
  str
    .split(" ")
    .reduce((prev, val) => `${prev[0]}${val[0]}`)
    .toUpperCase()
    .substr(0, 2);

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
