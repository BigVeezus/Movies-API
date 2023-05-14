const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const Movie = require("../../model/movie");

it("returns a 404 if a provided id doesnt exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/movies/${id}`)
    .send({
      title: "vvfd",
      description: "kfkngk",
      year: 1990,
      score: 9,
    })
    .expect(404)
    .expect({
      errors: [{ message: "Movie not found" }],
    });
});

it("returns a 400 if a provided input is empty", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/movies/${id}`)
    .send({
      title: "",
      description: "kfkngk",
      year: 1990,
      score: 9,
    })
    .expect(400);
});

it("returns a 200 and updates the movie if all values are correct", async () => {
  const response = await request(app).post("/api/movies/new").send({
    title: "old title",
    description: "jfgnjkgkg",
    year: 1990,
    score: 2,
  });

  //   console.log(response.body);
  await request(app)
    .put(`/api/movies/${response.body.id}`)
    .send({
      title: "new title",
      description: "kfkngk",
      year: 2000,
      score: 9,
    })
    .expect(200)
    .expect({
      success: true,
      message: "Movie updated successfully",
    });

  const movieResponse = await request(app)
    .get(`/api/movies/${response.body.id}`)
    .send();

  expect(movieResponse.body.title).toEqual("new title");
  expect(movieResponse.body.score).toEqual(9);
});
