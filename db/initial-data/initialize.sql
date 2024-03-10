yarn run v1.22.19
$ docker exec judo-blog-db pg_dump -U judo_blog judo_blog
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Auth; Type: TABLE; Schema: public; Owner: judo_blog
--

CREATE TABLE public."Auth" (
    id text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "userId" text NOT NULL
);


ALTER TABLE public."Auth" OWNER TO judo_blog;

--
-- Name: User; Type: TABLE; Schema: public; Owner: judo_blog
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."User" OWNER TO judo_blog;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: judo_blog
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO judo_blog;

--
-- Data for Name: Auth; Type: TABLE DATA; Schema: public; Owner: judo_blog
--

COPY public."Auth" (id, username, password, "createdAt", "updatedAt", "deletedAt", "userId") FROM stdin;
c1404d76-5d2d-401e-9985-c26187bac94c	syate	$2a$12$8WCIMSSDielAX8gvysuK7uPWEM./aTEcNjjPQKzcrfK9qn4WJLLtG	2024-03-10 15:54:35.258	2024-03-10 15:53:57.144	\N	7831bf19-2492-47df-a94a-ef909a73acc1
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: judo_blog
--

COPY public."User" (id, name, "createdAt", "updatedAt", "deletedAt") FROM stdin;
7831bf19-2492-47df-a94a-ef909a73acc1	Judo	2024-03-10 15:54:29.377	2024-03-10 15:54:21.12	\N
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: judo_blog
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
cf22b412-363a-4297-9f0e-5706f4924181	bf74a809c064856caf19d5f8e9fa5d18b16a3bae6ca4d3e9951441c2ab910394	2024-03-10 15:51:43.136523+00	20240310155143_auth	\N	\N	2024-03-10 15:51:43.129025+00	1
\.


--
-- Name: Auth Auth_pkey; Type: CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Auth_username_key; Type: INDEX; Schema: public; Owner: judo_blog
--

CREATE UNIQUE INDEX "Auth_username_key" ON public."Auth" USING btree (username);


--
-- Name: Auth Auth_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

Done in 0.18s.
