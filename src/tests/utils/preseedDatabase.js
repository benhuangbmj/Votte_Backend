const { events } = require("../../db/schemas/schema");

const preseedDatabase = async (db) => {
  try {
    await db.insert(events).values({
      id: 5,
      title: "test",
      eventDate: new Date(),
    });
  } catch (err) {
    console.error("Something went wrong!", err);
  }
};

module.exports = preseedDatabase;
