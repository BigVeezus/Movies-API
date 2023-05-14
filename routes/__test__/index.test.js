const request = require("supertest");
const app = require("../../app");

const addMovie = () => {
  return request(app).post("/api/movies/new").send({
    title: "gngnrj",
    description: "bad movie",
    year: 1998,
    score: 3,
  });
};

it("can fetch a list of tickets", async () => {
  await addMovie();
  await addMovie();
  await addMovie();

  const response = await request(app).get("/api/movies").send().expect(200);

  expect(response.body.length).toEqual(3);
});
