const request = require("supertest");
const app = require("../../app");
const Movie = require("../../model/movie");

it("returns an error if an invalid field is provided or missing", async () => {
  await request(app)
    .post("/api/movies/new")
    .send({
      title: "",
      description: "kfkngk",
      year: 1990,
      score: 9,
    })
    .expect(400)
    .expect({
      errors: [{ message: "Title is required" }],
    });
});

it("returns an error if an invalid year is provided", async () => {
  await request(app)
    .post("/api/movies/new")
    .send({
      title: "asldkjf",
      description: "kfkngk",
      year: 190,
      score: 9,
    })
    .expect(400)
    .expect({
      errors: [{ message: "Year must be greater than 1900" }],
    });

  await request(app)
    .post("/api/movies/new")
    .send({
      title: "laskdfj",
      description: "kfkngk",
      score: 9,
    })
    .expect(400)
    .expect({
      errors: [{ message: "Year must be greater than 1900" }],
    });
});

it("returns an error if description field is not provided or missing", async () => {
  await request(app)
    .post("/api/movies/new")
    .send({
      title: "kfkgjg",
      description: "",
      year: 1990,
      score: 9,
    })
    .expect(400)
    .expect({
      errors: [{ message: "Description is required" }],
    });
});

it("returns an error if score field is less than 0 or more than 10", async () => {
  await request(app)
    .post("/api/movies/new")
    .send({
      title: "kfkgjg",
      description: "djkjfjkf",
      year: 1990,
      score: 11,
    })
    .expect(400)
    .expect({
      errors: [{ message: "Score must be between 0 to 10" }],
    });
});

it("returns an error if score field is missing", async () => {
  await request(app)
    .post("/api/movies/new")
    .send({
      title: "kfkgjg",
      description: "djkjfjkf",
      year: 1990,
      score: "",
    })
    .expect(400)
    .expect({
      errors: [
        { message: "Invalid value" },
        { message: "Score must be between 0 to 10" },
      ],
    });
});

it("creates a movie with valid inputs", async () => {
  let movies = await Movie.find({});

  expect(movies.length).toEqual(0);

  const title = "asldkfj";
  const description = "Great film";
  const year = 2003;
  const genre = ["action"];
  const score = 10;

  await request(app)
    .post("/api/movies/new")
    .send({
      title,
      description,
      genre,
      year,
      score,
    })
    .expect(200);

  movies = await Movie.find({});
  expect(movies.length).toEqual(1);
  expect(movies[0].year).toEqual(2003);
  expect(movies[0].title).toEqual(title);
});

it("creates a movie and defaults genre to Drama if genre field empty", async () => {
  let movies = await Movie.find({});

  expect(movies.length).toEqual(0);

  const title = "asldkfj";
  const description = "Great film";
  const year = 2003;
  const score = 10;

  await request(app)
    .post("/api/movies/new")
    .send({
      title,
      description,
      year,
      score,
    })
    .expect(200);

  movies = await Movie.find({});
  expect(movies.length).toEqual(1);
  expect(movies[0].year).toEqual(2003);
  expect(movies[0].title).toEqual(title);
  expect(movies[0].genre).toEqual(["drama"]);
});
