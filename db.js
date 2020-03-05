const pg = require("pg");
const fs = require("fs");

const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/magic_eight_db"
);

client.connect();

const sync = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  DROP TABLE IF EXISTS answers;
  DROP TABLE IF EXISTS questions;

  CREATE TABLE answers(
      id UUID PRIMARY KEY default uuid_generate_v4(),
      name VARCHAR(100) NOT NULL
      );

  CREATE TABLE questions(
    id UUID PRIMARY KEY default uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    CHECK (char_length(name)>0)
    );
    INSERT INTO questions (name) VALUES ('Will I Get Dinner?');


      INSERT INTO answers (name) VALUES ('It is certain');
      INSERT INTO answers (name) VALUES ('It is decidedly so');
      INSERT INTO answers (name) VALUES ('Without a doubt');
      INSERT INTO answers (name) VALUES ('Yes - definitely');
      INSERT INTO answers (name) VALUES ('You may rely on it');

      INSERT INTO answers (name) VALUES ('As I see it, yes');
      INSERT INTO answers (name) VALUES ('Most likely');
      INSERT INTO answers (name) VALUES ('Outlook good');
      INSERT INTO answers (name) VALUES ('Signs point to yes');
      INSERT INTO answers (name) VALUES ('Yes');

      INSERT INTO answers (name) VALUES ('Reply hazy, try again');
      INSERT INTO answers (name) VALUES ('Ask again later');
      INSERT INTO answers (name) VALUES ('Better not tell you now');
      INSERT INTO answers (name) VALUES ('Cannot predict now');
      INSERT INTO answers (name) VALUES ('Concentrate and ask again');

      INSERT INTO answers (name) VALUES ('Dont count on it');
      INSERT INTO answers (name) VALUES ('My reply is no');
      INSERT INTO answers (name) VALUES ('My sources say no');
      INSERT INTO answers (name) VALUES ('Outlook not so good');
      INSERT INTO answers (name) VALUES ('Very doubtful');
  `;

  await client.query(SQL);
};

const readAnswers = async () => {
  return (await client.query("SELECT * FROM answers")).rows;
};

const create = async ({ name }) => {
  return (
    await client.query("INSERT INTO answers(name) VALUES ($1) returning *", [
      name
    ])
  ).rows[0];
};
const deleteAnswer = async id => {
  const SQL = "DELETE FROM answers WHERE id = $1";
  await client.query(SQL, [id]);
};

module.exports = {
  sync,
  readAnswers,
  create,
  deleteAnswer
};
