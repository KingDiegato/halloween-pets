export function getRandomFullName(names, surnames) {
  const randomNameIndex = Math.floor(Math.random() * names.length);
  const randomSurnameIndex = Math.floor(Math.random() * surnames.length);
  return `${names[randomNameIndex]} ${surnames[randomSurnameIndex]}`;
}

export function getRandomPicture(pictures) {
  const randomIndex = Math.floor(Math.random() * pictures.length);
  return pictures[randomIndex];
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

export const pictures = [
  "https://res.cloudinary.com/diegato/image/upload/v1729569499/pictures/Leonardo_Phoenix_a_highly_stylized_vibrant_and_cinematic_portr_1_z6pu2z.webp",
  "https://res.cloudinary.com/diegato/image/upload/v1729569495/pictures/Leonardo_Phoenix_a_highly_stylized_vibrant_and_cinematic_portr_0_lmjrt0.webp",
  "https://res.cloudinary.com/diegato/image/upload/v1729569488/pictures/Leonardo_Phoenix_a_surreal_and_vibrant_cinematic_photograph_fe_2_jqmlsw.webp",
  "https://res.cloudinary.com/diegato/image/upload/v1729569483/pictures/Leonardo_Phoenix_a_surreal_and_vibrant_cinematic_photograph_fe_1_u6d9hz.webp",
  "https://res.cloudinary.com/diegato/image/upload/v1729569475/pictures/Leonardo_Phoenix_Vibrant_bold_and_playful_pop_art_portrait_of_0_x8qzkv.webp",
  "https://res.cloudinary.com/diegato/image/upload/v1729569469/pictures/Leonardo_Phoenix_Vibrant_bold_and_playful_pop_art_portrait_of_3_rw0ly1.webp",
  "https://res.cloudinary.com/diegato/image/upload/v1729648420/pictures/pfp_ytrhrg.jpg",
  "https://res.cloudinary.com/diegato/image/upload/v1729648493/pictures/lion_pierhe.jpg",
  "https://res.cloudinary.com/diegato/image/upload/v1729648534/pictures/jirafa_do43rr.jpg",
  "https://res.cloudinary.com/diegato/image/upload/v1729648569/pictures/bul_co0mfs.jpg",
  "https://res.cloudinary.com/diegato/image/upload/v1729648622/pictures/cowsita_utaqvk.jpg",
];
