-- Adminer 4.8.1 PostgreSQL 15.1 (Debian 15.1-1.pgdg110+1) dump

\connect "salary";

CREATE SEQUENCE company_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."company" (
    "id" integer DEFAULT nextval('company_id_seq') NOT NULL,
    "name" character(256) NOT NULL,
    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "company" ("id", "name") VALUES
(1,	'Salary Hero                                                                                                                                                                                                                                                     ');

CREATE SEQUENCE role_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."role" (
    "id" integer DEFAULT nextval('role_id_seq') NOT NULL,
    "name" character(50) NOT NULL,
    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "role" ("id", "name") VALUES
(1,	'super-admin                                       '),
(2,	'admin                                             '),
(3,	'emplyee                                           ');

CREATE TABLE "public"."user" (
    "uuid" uuid NOT NULL,
    "user_name" character varying NOT NULL,
    "password" character varying NOT NULL,
    "email" character varying NOT NULL,
    "role_id" integer NOT NULL,
    "company_id" integer NOT NULL,
    CONSTRAINT "user_id" PRIMARY KEY ("uuid")
) WITH (oids = false);

INSERT INTO "user" ("uuid", "user_name", "password", "email", "role_id", "company_id") VALUES
('740b1e0e-925a-11ed-a1eb-0242ac120002',	'super_user',	'$2b$10$scWFhtqCf003mbD6/KF6iOswXN9ufBwemJ7UJi1LwSnzvb9JS652a',	'super_user@super-company.com',	1,	1);

-- 2023-01-12 13:37:18.07191+00