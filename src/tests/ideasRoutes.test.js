jest.setTimeout(100000);
const request = require("supertest");
const express = require("express");
const ideasRoutes = require("../routes/ideasRoutes");

const app = express();
app.use(express.json());
app.use(ideasRoutes);

test("first test", async () => {
  const ideaSubmission = {
    email: "user@example.com",
    idea: "Innovative Project Idea",
    description: "Detailed description of the project",
    technologies: ["React", "Node.js", "MongoDB"].join(" "),
    event_id: "12345",
  };
  const response = await request(app).post("/submitIdea").send(ideaSubmission);
  expect(response.status).toBe(400);
  expect(response.body.message).toBe("Invalid event ID");
});
test("second test", async () => {
  for (let i = 0; i < 3; i++) {
    console.log(`Round ${i + 1}.`);
    const submitIdeas = Array.from(
      Array(10),
      (_, i) =>
        new Promise((resolve) => {
          const ideaSubmission = {
            email: `user${i + Math.floor(Math.random() * 1000000)}@example.com`,
            idea: "Innovative Project Idea",
            description: "Detailed description of the project",
            technologies: ["React", "Node.js", "MongoDB"].join(" "),
            event_id: "5",
          };
          setTimeout(async () => {
            const response = await request(app)
              .post("/submitIdea")
              .send(ideaSubmission);
            expect(response.status).toBe(201);
            resolve();
          }, Math.random() * 100);
        })
    );
    await Promise.all(submitIdeas);
  }
  const ideaSubmission = {
    email: `user${Math.floor(Math.random() * 1000000)}@example.com`,
    idea: "Innovative Project Idea",
    description: "Detailed description of the project",
    technologies: ["React", "Node.js", "MongoDB"].join(" "),
    event_id: "5",
  };
  const response = await request(app).post("/submitIdea").send(ideaSubmission);
  expect(response.status).toBe(201);
});
