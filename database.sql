
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
/*CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);*/

--Database Name: "workflow-management"

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"email" varchar not null,
	"password" varchar not null,
	"first_name" varchar not null,
	"last_name" varchar,
	"picture" varchar,
	"title" varchar,
	"linkedin" varchar,
	"phone_number" varchar,
	"company_id" int references "company",
	"authorization_employee" int
);

CREATE TABLE "company" (
	"id" SERIAL PRIMARY KEY,
	"company_name" varchar,
	"partner_level" int,
	"docs" varchar,
	"logo" varchar
);

CREATE TABLE "project" (
	"id" SERIAL PRIMARY KEY,
	"title" varchar,
	"description" varchar,
	"progression" int,
	"due_time" timestamp,
	"completed" boolean default false,
	"completed_time" timestamp 
);

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
    "project_id" int references project,
	"title" varchar(255),
	"description" varchar,
	"parent_task" int, -- self referencing 
	"due_time" timestamp,
	"completed_by" int references "user",
	"completed_time" timestamp
);

CREATE TABLE "project_employee" (
	"id" SERIAL PRIMARY KEY,
	"project_id" int references project,
	"employee_id" int references "user"
);

CREATE TABLE "company_project" (
	"id" SERIAL PRIMARY KEY,
	"company_id" int references company,
	"project_id" int references project
);

--these 2 get mostly the same information, the second one bypasses the company, 
--maybe if someone is working on a project outside their company 
select * from tasks -- get everything on the way to for a user
join project on tasks.project_id = project.id
join company_project on project.id = company_project.project_id
join company on company_project.company_id = company.id
join "user" on company.id = "user".company_id
where "user".id = 1;

select * from tasks -- get everything on the way to tasks for a user, NO COMPANY INFO
join project on tasks.project_id = project.id
join project_employee on project.id = project_employee.project_id
join "user" on project_employee.employee_id = "user".id
where "user".id = 1;