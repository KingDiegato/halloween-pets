const { default: supabase } = require("./supabase");

async function seed(table) {
  const { error } = await supabase.from(table).insert([
    {
      content:
        "Etiam a arcu quis turpis vulputate dignissim scelerisque ut est. Morbi scelerisque lectus nec odio luctus, eget mollis ipsum aliquam. Mauris non odio facilisis, tincidunt lectus a, blandit erat. Nullam mollis lorem nec dui molestie fringilla. ",
      image: "public/images/seed.jpg",
      picture: "public/images/seed.jpg",
    },
  ]);
  if (error) {
    console.log(error);
  }
}

export default seed;
