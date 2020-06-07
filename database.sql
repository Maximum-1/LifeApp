-- User table is needed for the person to login
CREATE TABLE "user"
(
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"email" VARCHAR(500) NOT NULL,
	"first_time" BOOLEAN DEFAULT 'TRUE'
);

-- Tree Table is needed for the person to create Trees for the HBX process
--Logic for steps_completed gets updated
--if the tree_step is completed don't update count else update count
--don't want user to click on a tree and then next step button and continue to update if the step was already completed
--also don't want a user to complete a step like trigger over and over again and update the count
CREATE TABLE "tree"
(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"name" VARCHAR(120) NOT NULL,
	"date_created" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"date_finished" DATE,
	"steps_completed" INT DEFAULT 0,
	"status" BOOLEAN DEFAULT 'false'
);

-- There are 6 phases in the HBX process
CREATE TABLE "phase"
(
	"id" SERIAL PRIMARY KEY,
	"phase_number" INT,
	"name" VARCHAR(120) NOT NULL,
	"number_of_steps" INT
);

-- There are 20 steps in the HBX process
CREATE TABLE "step"
(
	"id" SERIAL PRIMARY KEY,
	"phase_id" INT REFERENCES "phase",
	"name" VARCHAR(80) NOT NULL,
	"description" TEXT NOT NULL,
	"optional_hint" TEXT NOT NULL,
	"step_number" INT
);

-- This table holds the content of what the user will enter 
-- while going through the HBX process
CREATE TABLE "tree_step"
(
	"id" SERIAL PRIMARY KEY,
	"tree_id" INT REFERENCES "tree",
	"step_id" INT REFERENCES "step",
	"content" TEXT,
	"status" BOOLEAN DEFAULT 'FALSE',
	"locked" BOOLEAN DEFAULT 'TRUE',
	"step_number" INT
);


CREATE TABLE "first_rating"
(
	"id" SERIAL PRIMARY KEY,
	"tree_id" INT REFERENCES "tree",
	"user_id" INT REFERENCES "user",
	"recurrence"INT,
	"day_week_month" TEXT,
	"duration_days" INT,
	"intensity" INT
);

CREATE TABLE "last_rating"
(
	"id" SERIAL PRIMARY KEY,
	"tree_id" INT REFERENCES "tree",
	"user_id" INT REFERENCES "user",
	"recurrence"INT,
	"day_week_month" TEXT,
	"duration_days" INT,
	"intensity" INT,
	"transparency" INT
);


--DATA INSERTS MUST CREATE USER FIRST
-- Run to create the phases of the HBX Process
INSERT INTO "phase"
	("phase_number", "name", "number_of_steps")
VALUES
	(1, 'Identifying Stress', 5),
	(2, 'Virtual Reality', 4),
	(3, 'Going Deeper', 4),
	(4, 'Remove the Barrier', 1),
	(5, 'Create a New Legacy', 4),
	(6, 'Get Predictive', 3);

--Creates all the steps with names, description, optional hints and the step number to populated the step page
--Phase 1 Step 1
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(1 , 'Trigger' , 'An event or circumstance "pushing" you out of your window of tolerance into fight, flight, freeze, or submit ' ,
		'_____ keeps me from listening to my spouse.
_____ pushes me to act foolishly or thoughtlessly.
_____ leads me away from my values.
_____ causes me to avoid relationships or act in ways harmful to getting positive results.
_____ causes me anxiety, rage, anger, feelings of hopelessness, etc.
_____ keeps me from being productive at work.',
		1);

--Phase 1 Step 2
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(1 , 'Protect Yourself' , 'Boundaries or safeguards you use to prevent harm ' ,
		'Hint: Look at your trigger. What can you do to limit how much you come into contact with it? Some things we can avoid, other things, we can’t. 
Reducing stress is often external and internal. For example, if you’re addicted to an unwanted behavior, certain triggers might “push” you to act out. 
You may need to avoid certain activities, locations, people, etc. to keep from needlessly creating pressure. 
If losing your temper during conflict is common, then you may need to create a very specific process for handling disagreements so you don’t lose control 
(e.g., asking for time to cool down, counting to ten, etc.). List things in your control you can change to reduce stress.',
		2);

--Phase 1 Step 3
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(1 , 'Thought' , 'My conscious thought about the trigger' ,
		'Hint: Don’t sugarcoat it; brutal honesty is important. If there’s obscenity, violent, or even gross language, use it. Code or abbreviate to honor your convictions.',
		3);
--Phase 1 Step 4
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(1, 'Feelings', 'Specific emotions that arise from the trigger', 'Feelings', 4);
--Phase 1 Step 5
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(1, 'Behaviors', 'What you do when you feel certain emotions ', 'Hint: For instance, if you feel anger when you experience a trigger, say what you do as a result of that anger—even if there’s more than one behavior. Honesty is important. Go through each emotion, and be thorough.', 5);

--Phase 2 Step 1
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(2, 'Virtual Insight', 'What your behaviors are telling you', 'When I look at my behaviors together, they say _____. 

Hint: Actions reveal more than words. Virtual means being such in essence or effect though not formally recognized or admitted (Merriam-Webster). ', 1);

--Phase 2 Step 2
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(2, 'Virtual Behaviors', 'Behaviors driven by subconscious thought', 'If “_____” (virtual insight) is my dominant thought, I will _____ (actions).

Hint: Make a list. There is likely more than one behavior. ', 2);

--Phase 2 Step 3
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(2, 'My Virtual Self', 'My true state of mind; my inner self ', 'Hint: Combine and simplify virtual behaviors into one phrase describing your true emotions.', 3);

--Phase 2 Step 4
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(2, 'Associated Events', 'Past, current, or future events (real or perceived) which remind us of our virtual selves', 'Hint: Pain or trauma can leave a mental mark.', 4);

--Phase 3 Step 1
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(3, 'Root Affirmation', 'Taken together, what associated events tell you', 'Hint: Use one phrase. Typically reflects a basic human need (Nurture, Acceptance, Security, Competence, Independence, Impact)', 1);

--Phase 3 Step 2
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(3, 'Root Belief', 'Your root affirmation broken down into a simple phrase', 'Hint: It’s your root affirmation “in other words.” This is the dominant thought that affects your circumstance. ', 2);

--Phase 3 Step 3
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(3, 'Root Assessment', 'What you’ve learned about what’s really happening', 'Hint: If you’ve gone through each phase honestly and thoroughly, you should come up with this section quite easily. It’s your current legacy.', 3);

--Phase 3 Step 4
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(3, 'Root Behaviors', 'If your root belief was your dominant thought, these behaviors would result', 'Hint: These are unproductive behaviors mostly. List as many as you can! We may find them protective or justifiable, but others may find them repulsive or abusive. ', 4);

--Phase 4 Step 1
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(4, 'Inner Consciousness', 'What your root behaviors reveal about your inner conscience', 'Hint: Use one simple phrase. Be honest. This will determine your ability to establish new more productive mental models!', 1);

--Phase 5 Step 1
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(5, 'The Beaten Path', 'A reflective summary of what you’ve learned, in a paragraph or two, about what’s really affecting your life in a negative way', 'Hint: This can be hard, but freeing for those courageous enough to see their hurt for what it truly is!', 1);

--Phase 5 Step 2
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(5, 'Victory Road', 'The knowledge and self-discovery path we take to disrupt negative mental models ', 'Hint: Now that you know what your inner conscience is saying (“Inner Consciousness” section), get data to counter that belief. Create productive behavior by changing your mind! Some people use motivational sayings, quotes from the bible, etc. Just make sure it works!', 2);

--Phase 5 Step 3
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(5, 'W.H.O.L.E. Affirmations™', 'Powerful truth statements learned on Victory Road that confront and heal your inner consciousness and restore your true self', 'Hint: W.H.O.L.E. Affirmations™ follow a predictable pattern. 1) Write What you learned/discovered. 2) Write How it applies to you/why you. 3) Observe the application/what single step you must now take. 4) Write the Legacy that happens/your outcome, and 5) How you Evolve/your new character/experience. 

Examples: 
I’m a valuable person (What), so I can stop chasing approval from others (How), and I celebrate who I am (Observe) and I’m happy (Legacy); I change my life (Evolve). 
Humility is very positive (What), so I value it (How), and I stop showing off (Observe) and earn trust (Legacy); I influence (Evolve).', 3);

--Phase 5 Step 4
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(5, 'New Root Belief', 'W.H.O.L.E. Affirmations™ combined into one statement to form a powerful new conscience', 'Hint: W.H.O.L.E. Affirmations™ can be summarized by reading your New Root Belief aloud. ', 4);

--Phase 6 Step 1
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(6, 'New Root Behaviors', 'Behavior stemming from a new more productive conscience', 'Hint: If your New Root Belief was your dominant thought, these behaviors would result. ', 1);

--Phase 6 Step 2
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(6, 'New Legacy', 'The result (in the world) of carrying out new root behaviors over time', 'Hint: This describes what your new life will be. Have fun with this.', 2);

--Phase 6 Step 3
INSERT INTO "step"
	("phase_id" ,"name" ,"description" ,"optional_hint", "step_number")
VALUES
	(6, 'Status', 'Where you are currently in the process', 'Hint: “In-process,” “Growing,” “Showing evidence,” etc.', 3);

--Post for the creation of the tree and returns the id to use in the tree_step table to create all the steps in a tree
INSERT INTO "tree"
	("user_id", "name")
VALUES
	(1, 'help')
RETURNING id;

--Ask how to bling this on the post
INSERT INTO "tree_step"
	("tree_id", "step_id")
VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5),
	(1, 6),
	(1, 7),
	(1, 8),
	(1, 9),
	(1, 10),
	(1, 11),
	(1, 12),
	(1, 13),
	(1, 14),
	(1, 15),
	(1, 16),
	(1, 17),
	(1, 18),
	(1, 19),
	(1, 20),
	(1, 21);

