export function getRandomFullName(names, surnames) {
  const randomNameIndex = Math.floor(Math.random() * names.length);
  const randomSurnameIndex = Math.floor(Math.random() * surnames.length);
  return `${names[randomNameIndex]} ${surnames[randomSurnameIndex]}`;
}

export const names = [
  "Calabaza",
  "Diente",
  "Elefante",
  "Flor",
  "Iguana",
  "Juguete",
  "País",
  "Pétalo",
  "Pez",
  "Plátano",
  "Reloj",
  "Rosa",
  "Sapo",
  "Serpiente",
  "Tigre",
  "Toro",
  "Tortuga",
  "Vaca",
  "Zorro",
];

export const surnames = [
  "Afable",
  "Audaz",
  "Azul",
  "Brillante",
  "Caliente",
  "Comun",
  "Dulce",
  "Elegante",
  "Grande",
  "Inteligente",
  "Impaciente",
  "Interesante",
  "Lúgubre",
  "Púrpura",
  "Peculiar",
  "Reboloteante",
  "Sagáz",
  "Fluorecente",
  "Valiente",
  "Verde",
  "Volante",
];
