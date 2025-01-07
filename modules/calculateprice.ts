function calculateprice(x: number, y: number): string {
  const multiplicate = x * y * 100 / 100;
  console.log(multiplicate, 'answer of calculateModule');
  return multiplicate.toFixed(1);  // Retourne une chaîne avec 1 chiffre après la virgule
}

export { calculateprice };