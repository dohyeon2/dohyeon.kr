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
-- Name: Comment; Type: TABLE; Schema: public; Owner: judo_blog
--

CREATE TABLE public."Comment" (
    id text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "userId" text,
    "postId" text NOT NULL,
    "commentId" text,
    "parentId" text
);


ALTER TABLE public."Comment" OWNER TO judo_blog;

--
-- Name: CommentMeta; Type: TABLE; Schema: public; Owner: judo_blog
--

CREATE TABLE public."CommentMeta" (
    id text NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "commentId" text NOT NULL
);


ALTER TABLE public."CommentMeta" OWNER TO judo_blog;

--
-- Name: Post; Type: TABLE; Schema: public; Owner: judo_blog
--

CREATE TABLE public."Post" (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "userId" text NOT NULL
);


ALTER TABLE public."Post" OWNER TO judo_blog;

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
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: judo_blog
--

COPY public."Comment" (id, content, "createdAt", "updatedAt", "deletedAt", "userId", "postId", "commentId", "parentId") FROM stdin;
fa412b34-8d22-4278-8a65-d08c55b26b6a	테스트입니다.	2024-03-26 14:40:19.963	2024-03-26 14:40:19.963	\N	7831bf19-2492-47df-a94a-ef909a73acc1	8b639452-5bec-4b1a-8b11-55207e4f294c	\N	\N
3a6b2496-1774-49db-ab07-346022d0eb50	가나다라	2024-03-26 14:40:23.591	2024-03-26 14:40:23.591	\N	7831bf19-2492-47df-a94a-ef909a73acc1	8b639452-5bec-4b1a-8b11-55207e4f294c	\N	\N
93a7fc06-7ee1-4a54-8bf6-5ddf8f7991bd	댓글 테스트 입니다.	2024-03-26 14:43:12.036	2024-03-26 14:43:12.036	\N	7831bf19-2492-47df-a94a-ef909a73acc1	8b639452-5bec-4b1a-8b11-55207e4f294c	\N	\N
\.


--
-- Data for Name: CommentMeta; Type: TABLE DATA; Schema: public; Owner: judo_blog
--

COPY public."CommentMeta" (id, key, value, "createdAt", "updatedAt", "deletedAt", "commentId") FROM stdin;
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: judo_blog
--

COPY public."Post" (id, title, content, "createdAt", "updatedAt", "deletedAt", "userId") FROM stdin;
8b639452-5bec-4b1a-8b11-55207e4f294c	test33asdfasdf	# test2\n## tasdasdf\n### test3dddsdfasdasdfasdfasdffasdfsf	2024-03-26 14:20:59.963	2024-03-26 16:07:59.48	\N	7831bf19-2492-47df-a94a-ef909a73acc1
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
31ac0532-f061-470b-bbcb-7868865697fd	693b40e1ef7d6f83a78de1a0083df1be5b971468d01b411d11ecf01919c1ef42	2024-03-13 17:42:34.296629+00	20240312121811_post	\N	\N	2024-03-13 17:42:34.29139+00	1
bc52489e-f621-4de7-b2ec-22a16cf23f97	d044629590e142f801f14e45fdb522498c41389e55da47633d7b8673f45a744c	2024-03-18 17:27:09.146254+00	20240318172709_comment	\N	\N	2024-03-18 17:27:09.136984+00	1
69f68f14-3445-4a15-8ae2-f683717ef800	213570a607c579888eb2b0c1b070789eb2bfc9140dc75c84b46c2bba64882ebc	2024-03-18 17:35:38.503442+00	20240318173538_comment	\N	\N	2024-03-18 17:35:38.49998+00	1
fb3793f2-f7c6-4e1a-ba84-148420bf61f0	e7fb93f87916a3c892041779983ad920406a1a51a6d632adf398e9e8a22a79b1	2024-03-24 09:18:39.860583+00	20240324091839_comment	\N	\N	2024-03-24 09:18:39.856228+00	1
69af24c6-5889-41f3-8c10-123a2d9288fd	88fbae3136c4b22c913b906dc094775475abd03329ffbe3d16d197890dfe104b	2024-03-24 11:50:02.498971+00	20240324115002_comment	\N	\N	2024-03-24 11:50:02.495007+00	1
733af90b-2663-4f91-b65b-bc0ce722b3ca	0b57613c942f0719e9fbdd7046d3f0b98edb874d863bfe115ea53dbecff25b9a	2024-03-25 14:43:14.40105+00	20240325144314_comment	\N	\N	2024-03-25 14:43:14.395433+00	1
\.


--
-- Name: Auth Auth_pkey; Type: CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_pkey" PRIMARY KEY (id);


--
-- Name: CommentMeta CommentMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."CommentMeta"
    ADD CONSTRAINT "CommentMeta_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


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
-- Name: CommentMeta CommentMeta_commentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."CommentMeta"
    ADD CONSTRAINT "CommentMeta_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Post Post_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judo_blog
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

