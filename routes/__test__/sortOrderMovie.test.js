const request = require("supertest");
const app = require("../../app");

const addMovie = (title, year, score) => {
  return request(app)
    .post("/api/movies/new")
    .send({
      title: title,
      description: "bad movie",
      genre: ["action"],
      year: year,
      score: score,
    });
};

it("ranks movie years in an ascending order", async () => {
  await addMovie("1st Movie", 2002, 3);
  await addMovie("2nd Movie", 2003, 3);
  await addMovie("3rd Movie", 2001, 8);
  await addMovie("4th Movie", 2000, 5);

  const response = await request(app)
    .get("/api/movies/sort/year-ascending")
    .send()
    .expect(200);

  expect(response.body.length).toEqual(4);
  //   console.log(response);
  expect(response.body[0].year).toEqual(2000);
  expect(response.body[1].year).toEqual(2001);
  expect(response.body[2].year).toEqual(2002);
  expect(response.body[3].year).toEqual(2003);
});

it("ranks movie years in an descending order", async () => {
  await addMovie("1st Movie", 2002, 3);
  await addMovie("2nd Movie", 2003, 3);
  await addMovie("3rd Movie", 2001, 3);
  await addMovie("4th Movie", 2000, 7);

  const response = await request(app)
    .get("/api/movies/sort/year-descending")
    .send()
    .expect(200);

  expect(response.body.length).toEqual(4);
  //   console.log(response);
  expect(response.body[0].year).toEqual(2003);
  expect(response.body[1].year).toEqual(2002);
  expect(response.body[2].year).toEqual(2001);
  expect(response.body[3].year).toEqual(2000);
});

it("ranks movie scores in an ascending order", async () => {
  await addMovie("1st Movie", 2002, 5);
  await addMovie("2nd Movie", 2003, 10);
  await addMovie("3rd Movie", 2001, 1);
  await addMovie("4th Movie", 2000, 4);

  const response = await request(app)
    .get("/api/movies/sort/score-ascending")
    .send()
    .expect(200);

  //   console.log(response);
  expect(response.body[0].score).toEqual(1);
  expect(response.body[1].score).toEqual(4);
  expect(response.body[2].score).toEqual(5);
  expect(response.body[3].score).toEqual(10);
});

it("ranks movie scores in a descending order", async () => {
  await addMovie("1st Movie", 2002, 2);
  await addMovie("2nd Movie", 2003, 10);
  await addMovie("3rd Movie", 2001, 6);
  await addMovie("4th Movie", 2000, 3);

  const response = await request(app)
    .get("/api/movies/sort/score-descending")
    .send()
    .expect(200);
  //   console.log(response);
  expect(response.body[0].score).toEqual(10);
  expect(response.body[1].score).toEqual(6);
  expect(response.body[2].score).toEqual(3);
  expect(response.body[3].score).toEqual(2);
});
