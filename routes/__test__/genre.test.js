const request = require("supertest");
const app = require("../../app");

const addMovie = (title) => {
  return request(app)
    .post("/api/movies/new")
    .send({
      title: title,
      description: "bad movie",
      genre: ["action"],
      year: 1998,
      score: 3,
    });
};

it("can fetch a list of movies from a genre", async () => {
  await addMovie("1st Movie");
  await addMovie("2nd Movie");
  await addMovie("3rd Movie");

  const response = await request(app).get("/api/movies").send().expect(200);

  expect(response.body.length).toEqual(3);
  //   console.log(response);
  expect(response.body[0].genre).toEqual(["action"]);
  expect(response.body[1].genre).toEqual(["action"]);
  expect(response.body[2].genre).toEqual(["action"]);
});
