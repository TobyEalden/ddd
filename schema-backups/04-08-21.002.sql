--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

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

DROP EVENT TRIGGER issue_pg_cron_access;
DROP EVENT TRIGGER api_restart;
DROP PUBLICATION supabase_realtime;
DROP POLICY "User key access" ON public.actor_key;
DROP POLICY "Owners can update" ON public.claim;
DROP POLICY "Owners can update" ON public.actor;
DROP POLICY "Owners can insert" ON public.claim;
DROP POLICY "Owners can insert" ON public.actor;
DROP POLICY "Owners can delete" ON public.claim;
DROP POLICY "Owners can delete" ON public.actor;
DROP POLICY "Enable users to update their own keys" ON public.actor_key;
DROP POLICY "Enable users to add their own keys" ON public.actor_key;
DROP POLICY "Authenticated can select" ON public.claim;
DROP POLICY "Authenticated can select" ON public.actor;
ALTER TABLE ONLY storage.objects DROP CONSTRAINT objects_owner_fkey;
ALTER TABLE ONLY storage.objects DROP CONSTRAINT "objects_bucketId_fkey";
ALTER TABLE ONLY storage.buckets DROP CONSTRAINT buckets_owner_fkey;
ALTER TABLE ONLY public.device DROP CONSTRAINT device_device_type_fkey;
ALTER TABLE ONLY public.claim DROP CONSTRAINT claim_subject_id_fkey;
ALTER TABLE ONLY public.claim DROP CONSTRAINT claim_issuer_id_fkey;
ALTER TABLE ONLY public.claim DROP CONSTRAINT claim_definition_id_fkey;
ALTER TABLE ONLY public.actor DROP CONSTRAINT actor_profile_id_fkey;
ALTER TABLE ONLY public.actor_key DROP CONSTRAINT actor_key_profile_id_fkey;
ALTER TABLE ONLY public.actor DROP CONSTRAINT actor_issuer_fingerprint_fkey;
ALTER TABLE ONLY public.actor DROP CONSTRAINT actor_actor_type_fkey;
DROP INDEX storage.name_prefix_search;
DROP INDEX storage.bucketid_objname;
DROP INDEX storage.bname;
DROP INDEX auth.users_instance_id_idx;
DROP INDEX auth.users_instance_id_email_idx;
DROP INDEX auth.refresh_tokens_token_idx;
DROP INDEX auth.refresh_tokens_instance_id_user_id_idx;
DROP INDEX auth.refresh_tokens_instance_id_idx;
DROP INDEX auth.audit_logs_instance_id_idx;
ALTER TABLE ONLY storage.objects DROP CONSTRAINT objects_pkey;
ALTER TABLE ONLY storage.migrations DROP CONSTRAINT migrations_pkey;
ALTER TABLE ONLY storage.migrations DROP CONSTRAINT migrations_name_key;
ALTER TABLE ONLY storage.buckets DROP CONSTRAINT buckets_pkey;
ALTER TABLE ONLY public.profile DROP CONSTRAINT profile_pkey;
ALTER TABLE ONLY public.organisation DROP CONSTRAINT organisation_pkey;
ALTER TABLE ONLY public.actor_key DROP CONSTRAINT entitykey_pkey;
ALTER TABLE ONLY public.device_type DROP CONSTRAINT device_type_pkey;
ALTER TABLE ONLY public.device DROP CONSTRAINT device_pkey;
ALTER TABLE ONLY public.claim DROP CONSTRAINT claim_pkey;
ALTER TABLE ONLY public.claim_definition DROP CONSTRAINT claim_definition_pkey;
ALTER TABLE ONLY public.assertion_type DROP CONSTRAINT assertion_type_pkey;
ALTER TABLE ONLY public.actor_type DROP CONSTRAINT actor_type_pkey;
ALTER TABLE ONLY public.actor DROP CONSTRAINT actor_pkey;
ALTER TABLE ONLY auth.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY auth.users DROP CONSTRAINT users_phone_key;
ALTER TABLE ONLY auth.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY auth.schema_migrations DROP CONSTRAINT schema_migrations_pkey;
ALTER TABLE ONLY auth.refresh_tokens DROP CONSTRAINT refresh_tokens_pkey;
ALTER TABLE ONLY auth.instances DROP CONSTRAINT instances_pkey;
ALTER TABLE ONLY auth.audit_log_entries DROP CONSTRAINT audit_log_entries_pkey;
ALTER TABLE auth.refresh_tokens ALTER COLUMN id DROP DEFAULT;
DROP TABLE storage.objects;
DROP TABLE storage.migrations;
DROP TABLE storage.buckets;
DROP TABLE public.profile;
DROP TABLE public.organisation;
DROP TABLE public.device_type;
DROP TABLE public.device;
DROP TABLE public.claim_definition;
DROP TABLE public.claim;
DROP TABLE public.assertion_type;
DROP TABLE public.actor_type;
DROP VIEW public.actor_key_public;
DROP TABLE public.actor_key;
DROP TABLE public.actor;
DROP TABLE auth.users;
DROP TABLE auth.schema_migrations;
DROP SEQUENCE auth.refresh_tokens_id_seq;
DROP TABLE auth.refresh_tokens;
DROP TABLE auth.instances;
DROP TABLE auth.audit_log_entries;
DROP FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer);
DROP FUNCTION storage.get_size_by_bucket();
DROP FUNCTION storage.foldername(name text);
DROP FUNCTION storage.filename(name text);
DROP FUNCTION storage.extension(name text);
DROP FUNCTION pgbouncer.get_auth(p_usename text);
DROP FUNCTION extensions.notify_api_restart();
DROP FUNCTION extensions.grant_pg_cron_access();
DROP FUNCTION auth.uid();
DROP FUNCTION auth.role();
DROP FUNCTION auth.email();
DROP EXTENSION "uuid-ossp";
DROP EXTENSION pgjwt;
DROP EXTENSION pgcrypto;
DROP EXTENSION pg_stat_statements;
DROP SCHEMA storage;
DROP SCHEMA pgbouncer;
DROP SCHEMA internal;
DROP SCHEMA extensions;
DROP SCHEMA auth;
--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: internal; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA internal;


ALTER SCHEMA internal OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: postgres
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select nullif(current_setting('request.jwt.claim.email', true), '')::text;
$$;


ALTER FUNCTION auth.email() OWNER TO postgres;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: postgres
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select nullif(current_setting('request.jwt.claim.role', true), '')::text;
$$;


ALTER FUNCTION auth.role() OWNER TO postgres;

--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: postgres
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;


ALTER FUNCTION auth.uid() OWNER TO postgres;

--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  schema_is_cron bool;
BEGIN
  schema_is_cron = (
    SELECT n.nspname = 'cron'
    FROM pg_event_trigger_ddl_commands() AS ev
    LEFT JOIN pg_catalog.pg_namespace AS n
      ON ev.objid = n.oid
  );

  IF schema_is_cron
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option; 

  END IF;

END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: notify_api_restart(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.notify_api_restart() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NOTIFY ddl_command_end;
END;
$$;


ALTER FUNCTION extensions.notify_api_restart() OWNER TO postgres;

--
-- Name: FUNCTION notify_api_restart(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.notify_api_restart() IS 'Sends a notification to the API to restart. If your database schema has changed, this is required so that Supabase can rebuild the relationships.';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: postgres
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RAISE WARNING 'PgBouncer auth request: %', p_usename;

    RETURN QUERY
    SELECT usename::TEXT, passwd::TEXT FROM pg_catalog.pg_shadow
    WHERE usename = p_usename;
END;
$$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO postgres;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return split_part(_filename, '.', 2);
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
BEGIN
	return query 
		with files_folders as (
			select path_tokens[levels] as folder
			from storage.objects
			where objects.name ilike prefix || '%'
			and bucket_id = bucketname
			GROUP by folder
			limit limits
			offset offsets
		) 
		select files_folders.folder as name, objects.id, objects.updated_at, objects.created_at, objects.last_accessed_at, objects.metadata from files_folders 
		left join storage.objects
		on prefix || files_folders.folder = objects.name
        where objects.id is null or objects.bucket_id=bucketname;
END
$$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer) OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone character varying(15) DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change character varying(15) DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: actor; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.actor (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    actor_type uuid NOT NULL,
    status smallint DEFAULT '0'::smallint NOT NULL,
    description character varying,
    issuer_fingerprint character varying NOT NULL,
    profile_id uuid
);


ALTER TABLE public.actor OWNER TO supabase_admin;

--
-- Name: actor_key; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.actor_key (
    fingerprint character varying NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    public_key character varying NOT NULL,
    private_key text,
    name character varying NOT NULL,
    description text,
    status smallint NOT NULL,
    profile_id uuid NOT NULL
);


ALTER TABLE public.actor_key OWNER TO supabase_admin;

--
-- Name: COLUMN actor_key.name; Type: COMMENT; Schema: public; Owner: supabase_admin
--

COMMENT ON COLUMN public.actor_key.name IS 'The key name';


--
-- Name: COLUMN actor_key.status; Type: COMMENT; Schema: public; Owner: supabase_admin
--

COMMENT ON COLUMN public.actor_key.status IS 'Key status, 99 implies deleted';


--
-- Name: actor_key_public; Type: VIEW; Schema: public; Owner: supabase_admin
--

CREATE VIEW public.actor_key_public AS
 SELECT actor_key.fingerprint,
    actor_key.updated_at,
    actor_key.public_key,
    actor_key.name,
    actor_key.description,
    actor_key.status,
    actor_key.profile_id
   FROM public.actor_key;


ALTER TABLE public.actor_key_public OWNER TO supabase_admin;

--
-- Name: actor_type; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.actor_type (
    name character varying NOT NULL,
    description character varying,
    status smallint DEFAULT '0'::smallint NOT NULL,
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.actor_type OWNER TO supabase_admin;

--
-- Name: COLUMN actor_type.status; Type: COMMENT; Schema: public; Owner: supabase_admin
--

COMMENT ON COLUMN public.actor_type.status IS 'Entity type status, 99 is deleted.';


--
-- Name: assertion_type; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.assertion_type (
    id bigint NOT NULL,
    name character varying NOT NULL,
    description character varying
);


ALTER TABLE public.assertion_type OWNER TO supabase_admin;

--
-- Name: assertion_type_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.assertion_type ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.assertion_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: claim; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.claim (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    definition_id uuid NOT NULL,
    number_value double precision,
    text_value character varying,
    status smallint DEFAULT '0'::smallint NOT NULL,
    subject_id uuid NOT NULL,
    issuer_id uuid NOT NULL
);


ALTER TABLE public.claim OWNER TO supabase_admin;

--
-- Name: claim_definition; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.claim_definition (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    data_type character varying NOT NULL,
    name character varying NOT NULL,
    description character varying,
    status smallint DEFAULT '0'::smallint NOT NULL
);


ALTER TABLE public.claim_definition OWNER TO supabase_admin;

--
-- Name: device; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.device (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying,
    device_type uuid NOT NULL,
    status smallint DEFAULT '0'::smallint NOT NULL
);


ALTER TABLE public.device OWNER TO supabase_admin;

--
-- Name: device_type; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.device_type (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying,
    status smallint DEFAULT '0'::smallint NOT NULL
);


ALTER TABLE public.device_type OWNER TO supabase_admin;

--
-- Name: organisation; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.organisation (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    domain character varying NOT NULL,
    status smallint DEFAULT '0'::smallint NOT NULL
);


ALTER TABLE public.organisation OWNER TO supabase_admin;

--
-- Name: profile; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.profile (
    email character varying,
    name character varying NOT NULL,
    bio text,
    status smallint DEFAULT '0'::smallint NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.profile OWNER TO supabase_admin;

--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: actor actor_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT actor_pkey PRIMARY KEY (id);


--
-- Name: actor_type actor_type_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.actor_type
    ADD CONSTRAINT actor_type_pkey PRIMARY KEY (id);


--
-- Name: assertion_type assertion_type_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.assertion_type
    ADD CONSTRAINT assertion_type_pkey PRIMARY KEY (id);


--
-- Name: claim_definition claim_definition_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.claim_definition
    ADD CONSTRAINT claim_definition_pkey PRIMARY KEY (id);


--
-- Name: claim claim_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.claim
    ADD CONSTRAINT claim_pkey PRIMARY KEY (id);


--
-- Name: device device_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_pkey PRIMARY KEY (id);


--
-- Name: device_type device_type_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_type
    ADD CONSTRAINT device_type_pkey PRIMARY KEY (id);


--
-- Name: actor_key entitykey_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.actor_key
    ADD CONSTRAINT entitykey_pkey PRIMARY KEY (fingerprint);


--
-- Name: organisation organisation_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.organisation
    ADD CONSTRAINT organisation_pkey PRIMARY KEY (id);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (user_id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_token_idx ON auth.refresh_tokens USING btree (token);


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, email);


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: actor actor_actor_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT actor_actor_type_fkey FOREIGN KEY (actor_type) REFERENCES public.actor_type(id);


--
-- Name: actor actor_issuer_fingerprint_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT actor_issuer_fingerprint_fkey FOREIGN KEY (issuer_fingerprint) REFERENCES public.actor_key(fingerprint);


--
-- Name: actor_key actor_key_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.actor_key
    ADD CONSTRAINT actor_key_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(user_id);


--
-- Name: actor actor_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT actor_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(user_id);


--
-- Name: claim claim_definition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.claim
    ADD CONSTRAINT claim_definition_id_fkey FOREIGN KEY (definition_id) REFERENCES public.claim_definition(id);


--
-- Name: claim claim_issuer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.claim
    ADD CONSTRAINT claim_issuer_id_fkey FOREIGN KEY (issuer_id) REFERENCES public.profile(user_id);


--
-- Name: claim claim_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.claim
    ADD CONSTRAINT claim_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.actor(id);


--
-- Name: device device_device_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_device_type_fkey FOREIGN KEY (device_type) REFERENCES public.device_type(id);


--
-- Name: buckets buckets_owner_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_owner_fkey FOREIGN KEY (owner) REFERENCES auth.users(id);


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: objects objects_owner_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_owner_fkey FOREIGN KEY (owner) REFERENCES auth.users(id);


--
-- Name: actor Authenticated can select; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Authenticated can select" ON public.actor FOR SELECT USING (true);


--
-- Name: claim Authenticated can select; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Authenticated can select" ON public.claim FOR SELECT USING (true);


--
-- Name: actor_key Enable users to add their own keys; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable users to add their own keys" ON public.actor_key FOR INSERT WITH CHECK ((auth.uid() = profile_id));


--
-- Name: actor_key Enable users to update their own keys; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable users to update their own keys" ON public.actor_key FOR UPDATE USING ((auth.uid() = profile_id)) WITH CHECK ((auth.uid() = profile_id));


--
-- Name: actor Owners can delete; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Owners can delete" ON public.actor FOR DELETE USING ((auth.uid() = profile_id));


--
-- Name: claim Owners can delete; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Owners can delete" ON public.claim FOR DELETE USING ((auth.uid() = issuer_id));


--
-- Name: actor Owners can insert; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Owners can insert" ON public.actor FOR INSERT WITH CHECK ((auth.uid() = profile_id));


--
-- Name: claim Owners can insert; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Owners can insert" ON public.claim FOR INSERT WITH CHECK ((auth.uid() = issuer_id));


--
-- Name: actor Owners can update; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Owners can update" ON public.actor FOR UPDATE USING ((auth.uid() = profile_id)) WITH CHECK ((auth.uid() = profile_id));


--
-- Name: claim Owners can update; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Owners can update" ON public.claim FOR UPDATE USING ((auth.uid() = issuer_id)) WITH CHECK ((auth.uid() = issuer_id));


--
-- Name: actor_key User key access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "User key access" ON public.actor_key FOR SELECT USING ((auth.uid() = profile_id));


--
-- Name: actor; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.actor ENABLE ROW LEVEL SECURITY;

--
-- Name: actor_key; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.actor_key ENABLE ROW LEVEL SECURITY;

--
-- Name: claim; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.claim ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: supabase_realtime actor_key; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.actor_key;


--
-- Name: supabase_realtime actor_type; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.actor_type;


--
-- Name: supabase_realtime claim; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.claim;


--
-- Name: supabase_realtime claim_definition; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.claim_definition;


--
-- Name: supabase_realtime profile; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.profile;


--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT ALL ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT ALL ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: postgres
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- Name: FUNCTION extension(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.extension(name text) TO anon;
GRANT ALL ON FUNCTION storage.extension(name text) TO authenticated;
GRANT ALL ON FUNCTION storage.extension(name text) TO service_role;


--
-- Name: FUNCTION filename(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.filename(name text) TO anon;
GRANT ALL ON FUNCTION storage.filename(name text) TO authenticated;
GRANT ALL ON FUNCTION storage.filename(name text) TO service_role;


--
-- Name: FUNCTION foldername(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.foldername(name text) TO anon;
GRANT ALL ON FUNCTION storage.foldername(name text) TO authenticated;
GRANT ALL ON FUNCTION storage.foldername(name text) TO service_role;


--
-- Name: FUNCTION search(prefix text, bucketname text, limits integer, levels integer, offsets integer); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer) TO anon;
GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer) TO authenticated;
GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT ALL ON TABLE auth.audit_log_entries TO postgres;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT ALL ON TABLE auth.instances TO postgres;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT ALL ON TABLE auth.refresh_tokens TO postgres;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.schema_migrations TO dashboard_user;
GRANT ALL ON TABLE auth.schema_migrations TO postgres;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT ALL ON TABLE auth.users TO postgres;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE actor; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.actor TO postgres;
GRANT ALL ON TABLE public.actor TO anon;
GRANT ALL ON TABLE public.actor TO authenticated;
GRANT ALL ON TABLE public.actor TO service_role;


--
-- Name: TABLE actor_key; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.actor_key TO postgres;
GRANT ALL ON TABLE public.actor_key TO anon;
GRANT ALL ON TABLE public.actor_key TO authenticated;
GRANT ALL ON TABLE public.actor_key TO service_role;


--
-- Name: TABLE actor_key_public; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.actor_key_public TO postgres;
GRANT ALL ON TABLE public.actor_key_public TO anon;
GRANT ALL ON TABLE public.actor_key_public TO authenticated;
GRANT ALL ON TABLE public.actor_key_public TO service_role;


--
-- Name: TABLE actor_type; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.actor_type TO postgres;
GRANT ALL ON TABLE public.actor_type TO anon;
GRANT ALL ON TABLE public.actor_type TO authenticated;
GRANT ALL ON TABLE public.actor_type TO service_role;


--
-- Name: TABLE assertion_type; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.assertion_type TO postgres;
GRANT ALL ON TABLE public.assertion_type TO anon;
GRANT ALL ON TABLE public.assertion_type TO authenticated;
GRANT ALL ON TABLE public.assertion_type TO service_role;


--
-- Name: SEQUENCE assertion_type_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.assertion_type_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.assertion_type_id_seq TO anon;
GRANT ALL ON SEQUENCE public.assertion_type_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.assertion_type_id_seq TO service_role;


--
-- Name: TABLE claim; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.claim TO postgres;
GRANT ALL ON TABLE public.claim TO anon;
GRANT ALL ON TABLE public.claim TO authenticated;
GRANT ALL ON TABLE public.claim TO service_role;


--
-- Name: TABLE claim_definition; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.claim_definition TO postgres;
GRANT ALL ON TABLE public.claim_definition TO anon;
GRANT ALL ON TABLE public.claim_definition TO authenticated;
GRANT ALL ON TABLE public.claim_definition TO service_role;


--
-- Name: TABLE device; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.device TO postgres;
GRANT ALL ON TABLE public.device TO anon;
GRANT ALL ON TABLE public.device TO authenticated;
GRANT ALL ON TABLE public.device TO service_role;


--
-- Name: TABLE device_type; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.device_type TO postgres;
GRANT ALL ON TABLE public.device_type TO anon;
GRANT ALL ON TABLE public.device_type TO authenticated;
GRANT ALL ON TABLE public.device_type TO service_role;


--
-- Name: TABLE organisation; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.organisation TO postgres;
GRANT ALL ON TABLE public.organisation TO anon;
GRANT ALL ON TABLE public.organisation TO authenticated;
GRANT ALL ON TABLE public.organisation TO service_role;


--
-- Name: TABLE profile; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.profile TO postgres;
GRANT ALL ON TABLE public.profile TO anon;
GRANT ALL ON TABLE public.profile TO authenticated;
GRANT ALL ON TABLE public.profile TO service_role;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres;


--
-- Name: TABLE migrations; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.migrations TO anon;
GRANT ALL ON TABLE storage.migrations TO authenticated;
GRANT ALL ON TABLE storage.migrations TO service_role;
GRANT ALL ON TABLE storage.migrations TO postgres;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public REVOKE ALL ON SEQUENCES  FROM supabase_admin;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM supabase_admin;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public REVOKE ALL ON TABLES  FROM supabase_admin;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO service_role;


--
-- Name: api_restart; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER api_restart ON ddl_command_end
   EXECUTE FUNCTION extensions.notify_api_restart();


ALTER EVENT TRIGGER api_restart OWNER TO postgres;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE SCHEMA')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO postgres;

--
-- PostgreSQL database dump complete
--

