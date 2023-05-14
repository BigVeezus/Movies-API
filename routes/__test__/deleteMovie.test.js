const request = require("supertest");
const app = require("../../app");

it("returns a 404 if the movie is not found", async () => {
  const id = "36749480838hhfj733";
  //   console.log(id);
  await request(app).delete(`/api/movies/${id}`).send().expect(404);
});

it("deletes the movie and sends status 200 if the movie is found", async () => {
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
    .delete(`/api/movies/${response.body.id}`)
    .expect(200)
    .expect({
      success: true,
      message: "Movie deleted successfully",
    });

  expect(movieResponse.body.title).toBeUndefined();
});
