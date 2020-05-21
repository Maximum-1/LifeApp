
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- User table is needed for the person to login
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR(500) NOT NULL
);

-- Tree Table is needed for the person to create Trees for the HBX process
CREATE TABLE "tree" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"name" VARCHAR(120) UNIQUE NOT NULL,
	"date_created" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"date_finished" DATE,
	"status" BOOLEAN DEFAULT 'false'
);

-- There are 6 phases in the HBX process
CREATE TABLE "phase" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(120) NOT NULL,
	"number_of_steps" INT
);

-- There are 20 steps in the HBX process
CREATE TABLE "step" (
	"id" SERIAL PRIMARY KEY,
	"tree_id" INT REFERENCES "tree",
	"phase_id" INT REFERENCES "phase",
	"step_number" INT,
	"content" TEXT,
	"status" BOOLEAN DEFAULT 'false'
);

-- Run to create the phases of the HBX Process
INSERT INTO "phase" ("name", "number_of_steps") VALUES 
('Identifying Dissonance', 4),
('Virtual Reality', 4),
('Going Deeper', 4),
('Remove the Barrier', 1),
('Blaze A New Trail', 4),
('Get Predictive', 3);

--Post for the creation of the tree and returns the id to use in the step table
INSERT INTO "tree" ("user_id", "name")
VALUES (1, 'help')
RETURNING id;


--Post of the steps upon tree create
INSERT INTO "step" ("tree_id", "phase_id", "step_number") VALUES
-- Phase 1
(1,1,1),
(1,1,2),
(1,1,3),
(1,1,4),
--Phase 2
(1,2,1),
(1,2,2),
(1,2,3),
(1,2,4),
-- Phase 3
(1,3,1),
(1,3,2),
(1,3,3),
(1,3,4),
-- Phase 4
(1,4,1),
--Phase 5
(1,5,1),
(1,5,2),
(1,5,3),
(1,5,4),
-- Phase 6
(1,6,1),
(1,6,2),
(1,6,3);

