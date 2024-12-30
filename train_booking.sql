--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2024-12-30 15:42:54

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 224 (class 1259 OID 16600)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    user_id integer,
    seat_id integer,
    booking_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16599)
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_id_seq OWNER TO postgres;

--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 223
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- TOC entry 222 (class 1259 OID 16578)
-- Name: reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    user_id integer,
    seat_id integer,
    reservation_date timestamp without time zone DEFAULT now()
);


ALTER TABLE public.reservations OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16577)
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservations_id_seq OWNER TO postgres;

--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 221
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- TOC entry 220 (class 1259 OID 16565)
-- Name: seats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seats (
    id integer NOT NULL,
    row_number integer NOT NULL,
    seat_number integer NOT NULL,
    is_reserved boolean DEFAULT false,
    reserved_by integer
);


ALTER TABLE public.seats OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16564)
-- Name: seats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.seats_id_seq OWNER TO postgres;

--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 219
-- Name: seats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.seats_id_seq OWNED BY public.seats.id;


--
-- TOC entry 218 (class 1259 OID 16554)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16553)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4715 (class 2604 OID 16603)
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- TOC entry 4713 (class 2604 OID 16581)
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- TOC entry 4711 (class 2604 OID 16568)
-- Name: seats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seats ALTER COLUMN id SET DEFAULT nextval('public.seats_id_seq'::regclass);


--
-- TOC entry 4710 (class 2604 OID 16557)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4886 (class 0 OID 16600)
-- Dependencies: 224
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, user_id, seat_id, booking_date) FROM stdin;
\.


--
-- TOC entry 4884 (class 0 OID 16578)
-- Dependencies: 222
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations (id, user_id, seat_id, reservation_date) FROM stdin;
\.


--
-- TOC entry 4882 (class 0 OID 16565)
-- Dependencies: 220
-- Data for Name: seats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seats (id, row_number, seat_number, is_reserved, reserved_by) FROM stdin;
15	3	1	f	\N
1	1	1	t	1
2	1	2	t	1
3	1	3	t	1
4	1	4	t	1
5	1	5	t	1
6	1	6	t	1
8	2	1	f	\N
9	2	2	f	\N
10	2	3	f	\N
11	2	4	f	\N
12	2	5	f	\N
13	2	6	f	\N
14	2	7	f	\N
7	1	7	f	\N
19	3	5	f	\N
18	3	4	f	\N
16	3	2	f	\N
17	3	3	f	\N
22	4	1	f	\N
23	4	2	f	\N
50	8	1	f	\N
51	8	2	f	\N
52	8	3	f	\N
53	8	4	f	\N
54	8	5	f	\N
57	9	1	f	\N
58	9	2	f	\N
59	9	3	f	\N
61	9	5	f	\N
62	9	6	f	\N
64	10	1	f	\N
65	10	2	f	\N
66	10	3	f	\N
67	10	4	f	\N
68	10	5	f	\N
71	11	1	f	\N
72	11	2	f	\N
73	11	3	f	\N
74	11	4	f	\N
75	11	5	f	\N
76	11	6	f	\N
60	9	4	t	4
77	11	7	f	\N
78	12	1	f	\N
79	12	2	f	\N
80	12	3	f	\N
20	3	6	f	\N
21	3	7	f	\N
27	4	6	f	\N
28	4	7	f	\N
34	5	6	f	\N
63	9	7	f	\N
69	10	6	f	\N
70	10	7	f	\N
24	4	3	f	\N
25	4	4	f	\N
26	4	5	f	\N
29	5	1	f	\N
30	5	2	f	\N
31	5	3	f	\N
32	5	4	f	\N
33	5	5	f	\N
36	6	1	f	\N
37	6	2	f	\N
38	6	3	f	\N
39	6	4	f	\N
40	6	5	f	\N
43	7	1	f	\N
44	7	2	f	\N
45	7	3	f	\N
46	7	4	f	\N
47	7	5	f	\N
35	5	7	f	\N
41	6	6	f	\N
42	6	7	f	\N
48	7	6	f	\N
49	7	7	f	\N
55	8	6	f	\N
56	8	7	f	\N
\.


--
-- TOC entry 4880 (class 0 OID 16554)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password) FROM stdin;
1	test1	test1@gmail.com	$2b$10$dPvrqxuZOb6ETZaEGxmZIeXKo/bDWa6j1FNR0hgTE1rY8CvqT1H2q
3	t44et3erww	tests1@gmail.com	$2b$10$pAS40nukPdLbNAgXYdk4mOyd5yjqa6OF8OHDdqDpqUu5OPFFg9/cq
4	iwughiuewrh	test2@gmail.com	$2b$10$ybwMFzpkvRgKup8p3hhcU.ULxaff27BLaCX8Egu45CP8OhyPsMZ9a
5	dg	dg@gmail.com	$2b$10$l1oDA/wCmuJVwCSvswwb0utErYrCGqu7kE.B7k6qq/thYgNPgDk6m
16	dff	test676@gmail.com	$2b$10$xyFxguxkN.ILwNQm3BCvG.Hw4l3NO0NBxEBlsXqEMvwTP3QinUmeO
\.


--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 223
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_id_seq', 1, false);


--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 221
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_id_seq', 1, false);


--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 219
-- Name: seats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seats_id_seq', 80, true);


--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- TOC entry 4728 (class 2606 OID 16606)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- TOC entry 4726 (class 2606 OID 16584)
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- TOC entry 4724 (class 2606 OID 16571)
-- Name: seats seats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT seats_pkey PRIMARY KEY (id);


--
-- TOC entry 4718 (class 2606 OID 16563)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4720 (class 2606 OID 16559)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4722 (class 2606 OID 16561)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4732 (class 2606 OID 16612)
-- Name: bookings bookings_seat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_seat_id_fkey FOREIGN KEY (seat_id) REFERENCES public.seats(id) ON DELETE CASCADE;


--
-- TOC entry 4733 (class 2606 OID 16607)
-- Name: bookings bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4730 (class 2606 OID 16590)
-- Name: reservations reservations_seat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_seat_id_fkey FOREIGN KEY (seat_id) REFERENCES public.seats(id);


--
-- TOC entry 4731 (class 2606 OID 16585)
-- Name: reservations reservations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4729 (class 2606 OID 16572)
-- Name: seats seats_reserved_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT seats_reserved_by_fkey FOREIGN KEY (reserved_by) REFERENCES public.users(id);


-- Completed on 2024-12-30 15:42:55

--
-- PostgreSQL database dump complete
--

