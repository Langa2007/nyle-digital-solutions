--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

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

--
-- Name: enum_blog_posts_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_blog_posts_status AS ENUM (
    'draft',
    'published',
    'archived'
);


ALTER TYPE public.enum_blog_posts_status OWNER TO postgres;

--
-- Name: enum_contacts_budget; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_contacts_budget AS ENUM (
    '1k-5k',
    '5k-20k',
    '20k-50k',
    '50k+',
    'undecided'
);


ALTER TYPE public.enum_contacts_budget OWNER TO postgres;

--
-- Name: enum_contacts_serviceType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_contacts_serviceType" AS ENUM (
    'custom_software',
    'web_apps',
    'mobile_apps',
    'desktop_apps',
    'saas',
    'cloud_infra',
    'digital_transformation',
    'consulting',
    'other'
);


ALTER TYPE public."enum_contacts_serviceType" OWNER TO postgres;

--
-- Name: enum_contacts_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_contacts_status AS ENUM (
    'new',
    'contacted',
    'in_progress',
    'converted',
    'archived'
);


ALTER TYPE public.enum_contacts_status OWNER TO postgres;

--
-- Name: enum_contacts_timeline; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_contacts_timeline AS ENUM (
    'urgent',
    '1-3months',
    '3-6months',
    '6months+'
);


ALTER TYPE public.enum_contacts_timeline OWNER TO postgres;

--
-- Name: enum_hosting_plans_billingCycle; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_hosting_plans_billingCycle" AS ENUM (
    'monthly',
    'yearly',
    'quarterly'
);


ALTER TYPE public."enum_hosting_plans_billingCycle" OWNER TO postgres;

--
-- Name: enum_hosting_plans_supportLevel; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_hosting_plans_supportLevel" AS ENUM (
    'basic',
    'standard',
    'premium',
    'enterprise'
);


ALTER TYPE public."enum_hosting_plans_supportLevel" OWNER TO postgres;

--
-- Name: enum_job_applications_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_job_applications_status AS ENUM (
    'pending',
    'reviewed',
    'shortlisted',
    'rejected',
    'hired'
);


ALTER TYPE public.enum_job_applications_status OWNER TO postgres;

--
-- Name: enum_portfolio_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_portfolio_status AS ENUM (
    'draft',
    'published',
    'archived'
);


ALTER TYPE public.enum_portfolio_status OWNER TO postgres;

--
-- Name: enum_services_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_services_category AS ENUM (
    'development',
    'design',
    'consulting',
    'infrastructure',
    'support'
);


ALTER TYPE public.enum_services_category OWNER TO postgres;

--
-- Name: enum_services_pricingModel; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_services_pricingModel" AS ENUM (
    'hourly',
    'fixed',
    'subscription',
    'custom'
);


ALTER TYPE public."enum_services_pricingModel" OWNER TO postgres;

--
-- Name: enum_subscriptions_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_subscriptions_status AS ENUM (
    'active',
    'past_due',
    'canceled',
    'unpaid',
    'trialing'
);


ALTER TYPE public.enum_subscriptions_status OWNER TO postgres;

--
-- Name: enum_testimonials_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_testimonials_status AS ENUM (
    'pending',
    'approved',
    'archived'
);


ALTER TYPE public.enum_testimonials_status OWNER TO postgres;

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'staff',
    'client'
);


ALTER TYPE public.enum_users_role OWNER TO postgres;

--
-- Name: enum_users_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_status AS ENUM (
    'active',
    'inactive',
    'suspended'
);


ALTER TYPE public.enum_users_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog_posts (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    excerpt text,
    content text NOT NULL,
    author character varying(255) NOT NULL,
    "authorId" uuid,
    category character varying(255),
    tags character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "featuredImage" character varying(255),
    "readTime" integer,
    status public.enum_blog_posts_status DEFAULT 'published'::public.enum_blog_posts_status,
    views integer DEFAULT 0,
    likes integer DEFAULT 0,
    "publishedAt" timestamp with time zone,
    "metaTitle" character varying(255),
    "metaDescription" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.blog_posts OWNER TO postgres;

--
-- Name: COLUMN blog_posts."readTime"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.blog_posts."readTime" IS 'Reading time in minutes';


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(255),
    company character varying(255),
    subject character varying(255) NOT NULL,
    message text NOT NULL,
    "serviceType" public."enum_contacts_serviceType" DEFAULT 'other'::public."enum_contacts_serviceType",
    budget public.enum_contacts_budget DEFAULT 'undecided'::public.enum_contacts_budget,
    timeline public.enum_contacts_timeline DEFAULT '3-6months'::public.enum_contacts_timeline,
    status public.enum_contacts_status DEFAULT 'new'::public.enum_contacts_status,
    "assignedTo" uuid,
    source character varying(255) DEFAULT 'website'::character varying,
    "ipAddress" character varying(255),
    "userAgent" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" uuid
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- Name: hosting_plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hosting_plans (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    "billingCycle" public."enum_hosting_plans_billingCycle" DEFAULT 'monthly'::public."enum_hosting_plans_billingCycle",
    features jsonb DEFAULT '{}'::jsonb,
    specs jsonb DEFAULT '{}'::jsonb,
    "stripePriceId" character varying(255),
    "stripeProductId" character varying(255),
    popular boolean DEFAULT false,
    active boolean DEFAULT true,
    "order" integer DEFAULT 0,
    "discountPercentage" integer DEFAULT 0,
    "maxUsers" integer,
    "maxProjects" integer,
    "supportLevel" public."enum_hosting_plans_supportLevel" DEFAULT 'standard'::public."enum_hosting_plans_supportLevel",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.hosting_plans OWNER TO postgres;

--
-- Name: COLUMN hosting_plans.specs; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.hosting_plans.specs IS 'Technical specifications like RAM, CPU, Storage';


--
-- Name: job_applications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_applications (
    id uuid NOT NULL,
    "jobId" character varying(255) NOT NULL,
    "fullName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    resume character varying(255) NOT NULL,
    "coverLetter" text,
    experience integer,
    "currentCompany" character varying(255),
    "portfolioUrl" character varying(255),
    "githubUrl" character varying(255),
    "linkedinUrl" character varying(255),
    status public.enum_job_applications_status DEFAULT 'pending'::public.enum_job_applications_status,
    notes text,
    "appliedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.job_applications OWNER TO postgres;

--
-- Name: COLUMN job_applications.experience; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.job_applications.experience IS 'Years of experience';


--
-- Name: portfolio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.portfolio (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    description text NOT NULL,
    "detailedDescription" text,
    category character varying(255) NOT NULL,
    client character varying(255),
    location character varying(255),
    year integer,
    duration character varying(255),
    "teamSize" integer,
    technologies character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "featuredImage" character varying(255) NOT NULL,
    images character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "videoUrl" character varying(255),
    "liveUrl" character varying(255),
    "githubUrl" character varying(255),
    challenges text,
    solutions text,
    results text,
    metrics jsonb DEFAULT '{}'::jsonb,
    status public.enum_portfolio_status DEFAULT 'published'::public.enum_portfolio_status,
    featured boolean DEFAULT false,
    "order" integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.portfolio OWNER TO postgres;

--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    description text NOT NULL,
    "detailedDescription" text,
    icon character varying(255),
    features character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    technologies character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "pricingModel" public."enum_services_pricingModel" DEFAULT 'custom'::public."enum_services_pricingModel",
    "startingPrice" numeric(10,2),
    "deliveryTime" character varying(255),
    category public.enum_services_category DEFAULT 'development'::public.enum_services_category,
    "order" integer DEFAULT 0,
    active boolean DEFAULT true,
    "metaTitle" character varying(255),
    "metaDescription" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    "planId" uuid NOT NULL,
    "stripeSubscriptionId" character varying(255),
    "stripeCustomerId" character varying(255),
    status public.enum_subscriptions_status DEFAULT 'active'::public.enum_subscriptions_status,
    "currentPeriodStart" timestamp with time zone,
    "currentPeriodEnd" timestamp with time zone,
    "canceledAt" timestamp with time zone,
    "cancelAtPeriodEnd" boolean DEFAULT false,
    "trialStart" timestamp with time zone,
    "trialEnd" timestamp with time zone,
    amount numeric(10,2),
    currency character varying(255) DEFAULT 'usd'::character varying,
    "interval" character varying(255),
    "billingCycleAnchor" timestamp with time zone,
    metadata jsonb DEFAULT '{}'::jsonb,
    "paymentMethodId" character varying(255),
    invoices jsonb DEFAULT '[]'::jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- Name: COLUMN subscriptions.amount; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subscriptions.amount IS 'Amount in smallest currency unit';


--
-- Name: COLUMN subscriptions."interval"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subscriptions."interval" IS 'month, year, etc.';


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testimonials (
    id uuid NOT NULL,
    "clientName" character varying(255) NOT NULL,
    "clientCompany" character varying(255),
    "clientRole" character varying(255),
    "clientAvatar" character varying(255),
    content text NOT NULL,
    rating integer,
    project character varying(255),
    "projectType" character varying(255),
    featured boolean DEFAULT false,
    status public.enum_testimonials_status DEFAULT 'pending'::public.enum_testimonials_status,
    "publishedAt" timestamp with time zone,
    "socialProof" jsonb DEFAULT '{}'::jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.testimonials OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    role public.enum_users_role DEFAULT 'client'::public.enum_users_role,
    company character varying(255),
    phone character varying(255),
    avatar character varying(255),
    "isEmailVerified" boolean DEFAULT false,
    "lastLogin" timestamp with time zone,
    status public.enum_users_status DEFAULT 'active'::public.enum_users_status,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blog_posts (id, title, slug, excerpt, content, author, "authorId", category, tags, "featuredImage", "readTime", status, views, likes, "publishedAt", "metaTitle", "metaDescription", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts (id, name, email, phone, company, subject, message, "serviceType", budget, timeline, status, "assignedTo", source, "ipAddress", "userAgent", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: hosting_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hosting_plans (id, name, slug, description, price, "billingCycle", features, specs, "stripePriceId", "stripeProductId", popular, active, "order", "discountPercentage", "maxUsers", "maxProjects", "supportLevel", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: job_applications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_applications (id, "jobId", "fullName", email, phone, resume, "coverLetter", experience, "currentCompany", "portfolioUrl", "githubUrl", "linkedinUrl", status, notes, "appliedAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: portfolio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.portfolio (id, title, slug, description, "detailedDescription", category, client, location, year, duration, "teamSize", technologies, "featuredImage", images, "videoUrl", "liveUrl", "githubUrl", challenges, solutions, results, metrics, status, featured, "order", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, title, slug, description, "detailedDescription", icon, features, technologies, "pricingModel", "startingPrice", "deliveryTime", category, "order", active, "metaTitle", "metaDescription", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (id, "userId", "planId", "stripeSubscriptionId", "stripeCustomerId", status, "currentPeriodStart", "currentPeriodEnd", "canceledAt", "cancelAtPeriodEnd", "trialStart", "trialEnd", amount, currency, "interval", "billingCycleAnchor", metadata, "paymentMethodId", invoices, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testimonials (id, "clientName", "clientCompany", "clientRole", "clientAvatar", content, rating, project, "projectType", featured, status, "publishedAt", "socialProof", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, "firstName", "lastName", role, company, phone, avatar, "isEmailVerified", "lastLogin", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);


--
-- Name: blog_posts blog_posts_slug_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_key1 UNIQUE (slug);


--
-- Name: blog_posts blog_posts_slug_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_key2 UNIQUE (slug);


--
-- Name: blog_posts blog_posts_slug_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_key3 UNIQUE (slug);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: hosting_plans hosting_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hosting_plans
    ADD CONSTRAINT hosting_plans_pkey PRIMARY KEY (id);


--
-- Name: hosting_plans hosting_plans_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hosting_plans
    ADD CONSTRAINT hosting_plans_slug_key UNIQUE (slug);


--
-- Name: hosting_plans hosting_plans_slug_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hosting_plans
    ADD CONSTRAINT hosting_plans_slug_key1 UNIQUE (slug);


--
-- Name: hosting_plans hosting_plans_slug_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hosting_plans
    ADD CONSTRAINT hosting_plans_slug_key2 UNIQUE (slug);


--
-- Name: hosting_plans hosting_plans_slug_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hosting_plans
    ADD CONSTRAINT hosting_plans_slug_key3 UNIQUE (slug);


--
-- Name: job_applications job_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_pkey PRIMARY KEY (id);


--
-- Name: portfolio portfolio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT portfolio_pkey PRIMARY KEY (id);


--
-- Name: portfolio portfolio_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT portfolio_slug_key UNIQUE (slug);


--
-- Name: portfolio portfolio_slug_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT portfolio_slug_key1 UNIQUE (slug);


--
-- Name: portfolio portfolio_slug_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT portfolio_slug_key2 UNIQUE (slug);


--
-- Name: portfolio portfolio_slug_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT portfolio_slug_key3 UNIQUE (slug);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: services services_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_slug_key UNIQUE (slug);


--
-- Name: services services_slug_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_slug_key1 UNIQUE (slug);


--
-- Name: services services_slug_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_slug_key2 UNIQUE (slug);


--
-- Name: services services_slug_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_slug_key3 UNIQUE (slug);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_stripeSubscriptionId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "subscriptions_stripeSubscriptionId_key" UNIQUE ("stripeSubscriptionId");


--
-- Name: subscriptions subscriptions_stripeSubscriptionId_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "subscriptions_stripeSubscriptionId_key1" UNIQUE ("stripeSubscriptionId");


--
-- Name: subscriptions subscriptions_stripeSubscriptionId_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "subscriptions_stripeSubscriptionId_key2" UNIQUE ("stripeSubscriptionId");


--
-- Name: subscriptions subscriptions_stripeSubscriptionId_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "subscriptions_stripeSubscriptionId_key3" UNIQUE ("stripeSubscriptionId");


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: blog_posts_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX blog_posts_category ON public.blog_posts USING btree (category);


--
-- Name: blog_posts_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX blog_posts_created_at ON public.blog_posts USING btree ("createdAt");


--
-- Name: blog_posts_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX blog_posts_slug ON public.blog_posts USING btree (slug);


--
-- Name: blog_posts_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX blog_posts_status ON public.blog_posts USING btree (status);


--
-- Name: contacts_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_created_at ON public.contacts USING btree ("createdAt");


--
-- Name: contacts_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_email ON public.contacts USING btree (email);


--
-- Name: contacts_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_status ON public.contacts USING btree (status);


--
-- Name: hosting_plans_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX hosting_plans_active ON public.hosting_plans USING btree (active);


--
-- Name: hosting_plans_popular; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX hosting_plans_popular ON public.hosting_plans USING btree (popular);


--
-- Name: hosting_plans_price; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX hosting_plans_price ON public.hosting_plans USING btree (price);


--
-- Name: hosting_plans_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX hosting_plans_slug ON public.hosting_plans USING btree (slug);


--
-- Name: job_applications_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX job_applications_email ON public.job_applications USING btree (email);


--
-- Name: job_applications_job_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX job_applications_job_id ON public.job_applications USING btree ("jobId");


--
-- Name: job_applications_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX job_applications_status ON public.job_applications USING btree (status);


--
-- Name: portfolio_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX portfolio_category ON public.portfolio USING btree (category);


--
-- Name: portfolio_featured; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX portfolio_featured ON public.portfolio USING btree (featured);


--
-- Name: portfolio_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX portfolio_slug ON public.portfolio USING btree (slug);


--
-- Name: portfolio_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX portfolio_status ON public.portfolio USING btree (status);


--
-- Name: services_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX services_active ON public.services USING btree (active);


--
-- Name: services_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX services_category ON public.services USING btree (category);


--
-- Name: services_order; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX services_order ON public.services USING btree ("order");


--
-- Name: services_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX services_slug ON public.services USING btree (slug);


--
-- Name: subscriptions_current_period_end; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX subscriptions_current_period_end ON public.subscriptions USING btree ("currentPeriodEnd");


--
-- Name: subscriptions_plan_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX subscriptions_plan_id ON public.subscriptions USING btree ("planId");


--
-- Name: subscriptions_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX subscriptions_status ON public.subscriptions USING btree (status);


--
-- Name: subscriptions_stripe_subscription_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX subscriptions_stripe_subscription_id ON public.subscriptions USING btree ("stripeSubscriptionId");


--
-- Name: subscriptions_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX subscriptions_user_id ON public.subscriptions USING btree ("userId");


--
-- Name: testimonials_client_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX testimonials_client_name ON public.testimonials USING btree ("clientName");


--
-- Name: testimonials_featured; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX testimonials_featured ON public.testimonials USING btree (featured);


--
-- Name: testimonials_rating; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX testimonials_rating ON public.testimonials USING btree (rating);


--
-- Name: testimonials_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX testimonials_status ON public.testimonials USING btree (status);


--
-- Name: blog_posts blog_posts_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT "blog_posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: contacts contacts_assignedTo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT "contacts_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: contacts contacts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: subscriptions subscriptions_planId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES public.hosting_plans(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: subscriptions subscriptions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

