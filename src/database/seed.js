const { faker } = require("@faker-js/faker");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const seedProjects = async (entires) => {
  try {
    const users = [];

    for (let i = 0; i < entires; i++) {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        dob: faker.date.birthdate(),
        address: faker.location.streetAddress(),
      };
      users.push(user);
    }
    const { error } = await supabase.from("users").insert(users);
    console.log("🚀 ~ seedProjects ~ error:", error);
  } catch (err) {
    console.error(err);
  }
};

seedProjects(50)
  .then(() => console.log("done"))
  .catch((err) => console.error(err));
