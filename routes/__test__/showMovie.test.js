const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

it("returns a 404 if the movie is not found", async () => {
  const id = "36749480838hhfj733";
  //   console.log(id);
  await request(app).get(`/api/movies/${id}`).send().expect(404);
});

it("returns status 200 and the movie if the movie is found", async () => {
  const title = "asldkfj";
  const description = "Great film";
  const year = 2003;
  const score = 10;

  const response = await request(app)
    .post("/api/movies/new")
    .send({
      title,
      description,
      year,
      score,
    })
    .expect(200);

  const movieResponse = await request(app)
    .get(`/api/movies/${response.body.id}`)
    .send()
    .expect(200);

  expect(movieResponse.body.title).toEqual(title);
  expect(movieResponse.body.year).toEqual(year);
});
