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

DROP EVENT TRIGGER issue_pg_net_access;
DROP EVENT TRIGGER issue_pg_cron_access;
DROP EVENT TRIGGER api_restart;
DROP PUBLICATION supabase_realtime;
DROP POLICY "User key access" ON public.profile_key;
DROP POLICY "Owners can update" ON public.claim;
DROP POLICY "Owners can update" ON public.actor;
DROP POLICY "Owners can insert" ON public.claim;
DROP POLICY "Owners can insert" ON public.actor;
DROP POLICY "Owners can delete" ON public.claim;
DROP POLICY "Owners can delete" ON public.actor;
DROP POLICY "Enable users to update their own keys" ON public.profile_key;
DROP POLICY "Enable users to add their own keys" ON public.profile_key;
DROP POLICY "Authenticated can select" ON public.claim;
DROP POLICY "Authenticated can select" ON public.actor;
ALTER TABLE ONLY storage.objects DROP CONSTRAINT objects_owner_fkey;
ALTER TABLE ONLY storage.objects DROP CONSTRAINT "objects_bucketId_fkey";
ALTER TABLE ONLY storage.buckets DROP CONSTRAINT buckets_owner_fkey;
ALTER TABLE ONLY public.site DROP CONSTRAINT site_owner_fkey;
ALTER TABLE ONLY public.profile DROP CONSTRAINT profile_organisation_id_fkey;
ALTER TABLE ONLY public.firmware_signature DROP CONSTRAINT firmware_signature_profile_key_id_fkey;
ALTER TABLE ONLY public.firmware_signature DROP CONSTRAINT firmware_signature_firmware_id_fkey;
ALTER TABLE ONLY public.firmware DROP CONSTRAINT firmware_organisation_id_fkey;
ALTER TABLE ONLY public.firmware_hierarchy DROP CONSTRAINT firmware_hierarchy_signed_by_fkey;
ALTER TABLE ONLY public.firmware_hierarchy DROP CONSTRAINT firmware_hierarchy_parent_id_fkey;
ALTER TABLE ONLY public.firmware_hierarchy DROP CONSTRAINT firmware_hierarchy_descendant_id_fkey;
ALTER TABLE ONLY public.firmware_hierarchy DROP CONSTRAINT firmware_hierarchy_ancestor_id_fkey;
ALTER TABLE ONLY public.firmware_binding DROP CONSTRAINT firmware_binding_profile_key_id_fkey;
ALTER TABLE ONLY public.firmware_binding DROP CONSTRAINT firmware_binding_firmware_id_fkey;
ALTER TABLE ONLY public.firmware_binding DROP CONSTRAINT firmware_binding_device_type_id_fkey;
ALTER TABLE ONLY public.device_type_signature DROP CONSTRAINT device_type_signatures_profile_key_id_fkey;
ALTER TABLE ONLY public.device_type_signature DROP CONSTRAINT device_type_signatures_device_type_id_fkey;
ALTER TABLE ONLY public.device_type DROP CONSTRAINT device_type_organisation_id_fkey;
ALTER TABLE ONLY public.device_type_hierarchy DROP CONSTRAINT device_type_hierarchy_signed_by_fkey;
ALTER TABLE ONLY public.device_type_hierarchy DROP CONSTRAINT device_type_hierarchy_parent_id_fkey;
ALTER TABLE ONLY public.device_type_hierarchy DROP CONSTRAINT device_type_hierarchy_descendant_id_fkey;
ALTER TABLE ONLY public.device_type_hierarchy DROP CONSTRAINT device_type_hierarchy_ancestor_id_fkey;
ALTER TABLE ONLY public.device_installation DROP CONSTRAINT device_installation_site_id_fkey;
ALTER TABLE ONLY public.device_installation DROP CONSTRAINT device_installation_device_type_id_fkey;
ALTER TABLE ONLY public.claim DROP CONSTRAINT claim_subject_id_fkey;
ALTER TABLE ONLY public.claim DROP CONSTRAINT claim_issuer_id_fkey;
ALTER TABLE ONLY public.claim DROP CONSTRAINT claim_definition_id_fkey;
ALTER TABLE ONLY public.actor DROP CONSTRAINT actor_profile_id_fkey;
ALTER TABLE ONLY public.actor DROP CONSTRAINT actor_organisation_id_fkey;
ALTER TABLE ONLY public.profile_key DROP CONSTRAINT actor_key_profile_id_fkey;
ALTER TABLE ONLY public.actor DROP CONSTRAINT actor_issuer_fingerprint_fkey;
ALTER TABLE ONLY public.actor DROP CONSTRAINT actor_actor_type_fkey;
DROP INDEX storage.name_prefix_search;
DROP INDEX storage.bucketid_objname;
DROP INDEX storage.bname;
ALTER TABLE ONLY storage.objects DROP CONSTRAINT objects_pkey;
ALTER TABLE ONLY storage.migrations DROP CONSTRAINT migrations_pkey;
ALTER TABLE ONLY storage.migrations DROP CONSTRAINT migrations_name_key;
ALTER TABLE ONLY storage.buckets DROP CONSTRAINT buckets_pkey;
ALTER TABLE ONLY public.site DROP CONSTRAINT site_pkey;
ALTER TABLE ONLY public.profile DROP CONSTRAINT profile_pkey;
ALTER TABLE ONLY public.organisation DROP CONSTRAINT organisation_pkey;
ALTER TABLE ONLY public.organisation DROP CONSTRAINT organisation_domain_key;
ALTER TABLE ONLY public.firmware_signature DROP CONSTRAINT firmware_signature_pkey;
ALTER TABLE ONLY public.firmware DROP CONSTRAINT firmware_pkey;
ALTER TABLE ONLY public.firmware_binding DROP CONSTRAINT firmware_binding_pkey;
ALTER TABLE ONLY public.profile_key DROP CONSTRAINT entitykey_pkey;
ALTER TABLE ONLY public.device_type_signature DROP CONSTRAINT device_type_signatures_pkey;
ALTER TABLE ONLY public.device_type DROP CONSTRAINT device_type_pkey;
ALTER TABLE ONLY public.device_installation DROP CONSTRAINT device_installation_pkey;
ALTER TABLE ONLY public.claim DROP CONSTRAINT claim_pkey;
ALTER TABLE ONLY public.claim_definition DROP CONSTRAINT claim_definition_pkey;
ALTER TABLE ONLY public.assertion_type DROP CONSTRAINT assertion_type_pkey;
ALTER TABLE ONLY public.actor_type DROP CONSTRAINT actor_type_pkey;
ALTER TABLE ONLY public.actor DROP CONSTRAINT actor_pkey;
DROP TABLE storage.objects;
DROP TABLE storage.migrations;
DROP TABLE storage.buckets;
DROP TABLE public.site;
DROP VIEW public.profile_key_public;
DROP TABLE public.profile_key;
DROP TABLE public.profile;
DROP TABLE public.organisation;
DROP VIEW public.inherited_firmware_binding;
DROP TABLE public.firmware_signature;
DROP TABLE public.firmware_hierarchy;
DROP TABLE public.firmware_binding;
DROP TABLE public.firmware;
DROP TABLE public.device_type_signature;
DROP TABLE public.device_type_hierarchy;
DROP TABLE public.device_type;
DROP TABLE public.device_installation;
DROP TABLE public.claim_definition;
DROP TABLE public.claim;
DROP TABLE public.assertion_type;
DROP TABLE public.actor_type;
DROP TABLE public.actor;
DROP FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer);
DROP FUNCTION storage.get_size_by_bucket();
DROP FUNCTION storage.foldername(name text);
DROP FUNCTION storage.filename(name text);
DROP FUNCTION storage.extension(name text);
DROP FUNCTION pgbouncer.get_auth(p_usename text);
DROP FUNCTION extensions.notify_api_restart();
DROP FUNCTION extensions.grant_pg_net_access();
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
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
    IF EXISTS (
        SELECT 1
        FROM pg_event_trigger_ddl_commands() AS ev
        JOIN pg_extension AS ext
        ON ev.objid = ext.oid
        WHERE ext.extname = 'pg_net'
    )
    THEN
        IF NOT EXISTS (
        SELECT 1
        FROM pg_roles
        WHERE rolname = 'supabase_functions_admin'
        )
        THEN
        CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
        END IF;

        GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

        ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
        ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
        ALTER function net.http_collect_response(request_id bigint, async boolean) SECURITY DEFINER;

        ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
        ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
        ALTER function net.http_collect_response(request_id bigint, async boolean) SET search_path = net;

        REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
        REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
        REVOKE ALL ON FUNCTION net.http_collect_response(request_id bigint, async boolean) FROM PUBLIC;

        GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
        GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
        GRANT EXECUTE ON FUNCTION net.http_collect_response(request_id bigint, async boolean) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
    END;
    $$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


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
-- Name: actor; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.actor (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    actor_type uuid NOT NULL,
    status smallint DEFAULT '0'::smallint NOT NULL,
    description character varying,
    issuer_fingerprint character varying NOT NULL,
    profile_id uuid,
    organisation_id uuid NOT NULL,
    model character varying
);


ALTER TABLE public.actor OWNER TO supabase_admin;

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
-- Name: device_installation; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.device_installation (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    inserted_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    site_id uuid NOT NULL,
    device_type_id uuid NOT NULL,
    install_date timestamp with time zone DEFAULT now() NOT NULL,
    serial_number text,
    serial_extra text,
    active_date timestamp with time zone DEFAULT now() NOT NULL,
    status integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.device_installation OWNER TO supabase_admin;

--
-- Name: device_type; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.device_type (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    model text NOT NULL,
    uri text,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    description text,
    organisation_id uuid NOT NULL
);


ALTER TABLE public.device_type OWNER TO supabase_admin;

--
-- Name: device_type_hierarchy; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.device_type_hierarchy (
    ancestor_id uuid,
    descendant_id uuid NOT NULL,
    parent_id uuid,
    depth integer DEFAULT 0 NOT NULL,
    signed_by text NOT NULL,
    ancestor_depth integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.device_type_hierarchy OWNER TO supabase_admin;

--
-- Name: device_type_signature; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.device_type_signature (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    device_type_id uuid NOT NULL,
    profile_key_id text NOT NULL,
    signed_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.device_type_signature OWNER TO supabase_admin;

--
-- Name: firmware; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.firmware (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    payload_number text,
    download_url text,
    version_number text,
    description text,
    status integer DEFAULT 0 NOT NULL,
    organisation_id uuid NOT NULL,
    inserted_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.firmware OWNER TO supabase_admin;

--
-- Name: firmware_binding; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.firmware_binding (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    firmware_id uuid NOT NULL,
    device_type_id uuid NOT NULL,
    profile_key_id text NOT NULL,
    signed_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.firmware_binding OWNER TO supabase_admin;

--
-- Name: firmware_hierarchy; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.firmware_hierarchy (
    ancestor_id uuid,
    descendant_id uuid NOT NULL,
    parent_id uuid,
    signed_by text NOT NULL,
    depth integer DEFAULT 0 NOT NULL,
    ancestor_depth integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.firmware_hierarchy OWNER TO supabase_admin;

--
-- Name: firmware_signature; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.firmware_signature (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    firmware_id uuid NOT NULL,
    profile_key_id text NOT NULL,
    signed_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.firmware_signature OWNER TO supabase_admin;

--
-- Name: inherited_firmware_binding; Type: VIEW; Schema: public; Owner: supabase_admin
--

CREATE VIEW public.inherited_firmware_binding AS
 SELECT firmware.id,
    firmware.name,
    firmware.payload_number,
    firmware.download_url,
    firmware.version_number,
    firmware.description,
    firmware.status,
    firmware.organisation_id,
    firmware.inserted_at,
    firmware.updated_at,
    firmware_binding.device_type_id,
    firmware_binding.profile_key_id,
    firmware_binding.signed_at,
    firmware_hierarchy.depth
   FROM ((public.firmware_binding
     JOIN public.firmware_hierarchy ON (((firmware_hierarchy.ancestor_id = firmware_binding.firmware_id) OR (firmware_hierarchy.descendant_id = firmware_binding.firmware_id))))
     JOIN public.firmware ON ((firmware.id = firmware_hierarchy.descendant_id)));


ALTER TABLE public.inherited_firmware_binding OWNER TO supabase_admin;

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
    user_id uuid NOT NULL,
    organisation_id uuid NOT NULL
);


ALTER TABLE public.profile OWNER TO supabase_admin;

--
-- Name: profile_key; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.profile_key (
    fingerprint character varying NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    public_key character varying NOT NULL,
    private_key text,
    name character varying NOT NULL,
    description text,
    status smallint NOT NULL,
    profile_id uuid NOT NULL
);


ALTER TABLE public.profile_key OWNER TO supabase_admin;

--
-- Name: COLUMN profile_key.name; Type: COMMENT; Schema: public; Owner: supabase_admin
--

COMMENT ON COLUMN public.profile_key.name IS 'The key name';


--
-- Name: COLUMN profile_key.status; Type: COMMENT; Schema: public; Owner: supabase_admin
--

COMMENT ON COLUMN public.profile_key.status IS 'Key status, 99 implies deleted';


--
-- Name: profile_key_public; Type: VIEW; Schema: public; Owner: supabase_admin
--

CREATE VIEW public.profile_key_public AS
 SELECT profile_key.fingerprint,
    profile_key.updated_at,
    profile_key.public_key,
    profile_key.name,
    profile_key.description,
    profile_key.status,
    profile_key.profile_id
   FROM public.profile_key;


ALTER TABLE public.profile_key_public OWNER TO supabase_admin;

--
-- Name: site; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.site (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    inserted_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    postcode text,
    owner uuid NOT NULL,
    site_type text NOT NULL,
    connection_type text NOT NULL,
    subnet text,
    ip text,
    status integer DEFAULT 0
);


ALTER TABLE public.site OWNER TO supabase_admin;

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
-- Name: device_installation device_installation_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_installation
    ADD CONSTRAINT device_installation_pkey PRIMARY KEY (id);


--
-- Name: device_type device_type_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_type
    ADD CONSTRAINT device_type_pkey PRIMARY KEY (id);


--
-- Name: device_type_signature device_type_signatures_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_type_signature
    ADD CONSTRAINT device_type_signatures_pkey PRIMARY KEY (id);


--
-- Name: profile_key entitykey_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.profile_key
    ADD CONSTRAINT entitykey_pkey PRIMARY KEY (fingerprint);


--
-- Name: firmware_binding firmware_binding_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware_binding
    ADD CONSTRAINT firmware_binding_pkey PRIMARY KEY (id);


--
-- Name: firmware firmware_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware
    ADD CONSTRAINT firmware_pkey PRIMARY KEY (id);


--
-- Name: firmware_signature firmware_signature_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware_signature
    ADD CONSTRAINT firmware_signature_pkey PRIMARY KEY (id);


--
-- Name: organisation organisation_domain_key; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.organisation
    ADD CONSTRAINT organisation_domain_key UNIQUE (domain);


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
-- Name: site site_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.site
    ADD CONSTRAINT site_pkey PRIMARY KEY (id);


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
    ADD CONSTRAINT actor_issuer_fingerprint_fkey FOREIGN KEY (issuer_fingerprint) REFERENCES public.profile_key(fingerprint);


--
-- Name: profile_key actor_key_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.profile_key
    ADD CONSTRAINT actor_key_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(user_id);


--
-- Name: actor actor_organisation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT actor_organisation_id_fkey FOREIGN KEY (organisation_id) REFERENCES public.organisation(id);


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
-- Name: device_installation device_installation_device_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_installation
    ADD CONSTRAINT device_installation_device_type_id_fkey FOREIGN KEY (device_type_id) REFERENCES public.device_type(id);


--
-- Name: device_installation device_installation_site_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_installation
    ADD CONSTRAINT device_installation_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.site(id);


--
-- Name: device_type_hierarchy device_type_hierarchy_ancestor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_type_hierarchy
    ADD CONSTRAINT device_type_hierarchy_ancestor_id_fkey FOREIGN KEY (ancestor_id) REFERENCES public.device_type(id);


--
-- Name: device_type_hierarchy device_type_hierarchy_descendant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_type_hierarchy
    ADD CONSTRAINT device_type_hierarchy_descendant_id_fkey FOREIGN KEY (descendant_id) REFERENCES public.device_type(id);


--
-- Name: device_type_hierarchy device_type_hierarchy_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_type_hierarchy
    ADD CONSTRAINT device_type_hierarchy_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.device_type(id);


--
-- Name: device_type_hierarchy device_type_hierarchy_signed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_type_hierarchy
    ADD CONSTRAINT device_type_hierarchy_signed_by_fkey FOREIGN KEY (signed_by) REFERENCES public.profile_key(fingerprint);


--
-- Name: device_type device_type_organisation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_type
    ADD CONSTRAINT device_type_organisation_id_fkey FOREIGN KEY (organisation_id) REFERENCES public.organisation(id);


--
-- Name: device_type_signature device_type_signatures_device_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_type_signature
    ADD CONSTRAINT device_type_signatures_device_type_id_fkey FOREIGN KEY (device_type_id) REFERENCES public.device_type(id);


--
-- Name: device_type_signature device_type_signatures_profile_key_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.device_type_signature
    ADD CONSTRAINT device_type_signatures_profile_key_id_fkey FOREIGN KEY (profile_key_id) REFERENCES public.profile_key(fingerprint);


--
-- Name: firmware_binding firmware_binding_device_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware_binding
    ADD CONSTRAINT firmware_binding_device_type_id_fkey FOREIGN KEY (device_type_id) REFERENCES public.device_type(id);


--
-- Name: firmware_binding firmware_binding_firmware_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware_binding
    ADD CONSTRAINT firmware_binding_firmware_id_fkey FOREIGN KEY (firmware_id) REFERENCES public.firmware(id);


--
-- Name: firmware_binding firmware_binding_profile_key_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware_binding
    ADD CONSTRAINT firmware_binding_profile_key_id_fkey FOREIGN KEY (profile_key_id) REFERENCES public.profile_key(fingerprint);


--
-- Name: firmware_hierarchy firmware_hierarchy_ancestor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware_hierarchy
    ADD CONSTRAINT firmware_hierarchy_ancestor_id_fkey FOREIGN KEY (ancestor_id) REFERENCES public.firmware(id);


--
-- Name: firmware_hierarchy firmware_hierarchy_descendant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware_hierarchy
    ADD CONSTRAINT firmware_hierarchy_descendant_id_fkey FOREIGN KEY (descendant_id) REFERENCES public.firmware(id);


--
-- Name: firmware_hierarchy firmware_hierarchy_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware_hierarchy
    ADD CONSTRAINT firmware_hierarchy_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.firmware(id);


--
-- Name: firmware_hierarchy firmware_hierarchy_signed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware_hierarchy
    ADD CONSTRAINT firmware_hierarchy_signed_by_fkey FOREIGN KEY (signed_by) REFERENCES public.profile_key(fingerprint);


--
-- Name: firmware firmware_organisation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware
    ADD CONSTRAINT firmware_organisation_id_fkey FOREIGN KEY (organisation_id) REFERENCES public.organisation(id);


--
-- Name: firmware_signature firmware_signature_firmware_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware_signature
    ADD CONSTRAINT firmware_signature_firmware_id_fkey FOREIGN KEY (firmware_id) REFERENCES public.firmware(id);


--
-- Name: firmware_signature firmware_signature_profile_key_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.firmware_signature
    ADD CONSTRAINT firmware_signature_profile_key_id_fkey FOREIGN KEY (profile_key_id) REFERENCES public.profile_key(fingerprint);


--
-- Name: profile profile_organisation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_organisation_id_fkey FOREIGN KEY (organisation_id) REFERENCES public.organisation(id);


--
-- Name: site site_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.site
    ADD CONSTRAINT site_owner_fkey FOREIGN KEY (owner) REFERENCES public.profile(user_id);


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
-- Name: profile_key Enable users to add their own keys; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable users to add their own keys" ON public.profile_key FOR INSERT WITH CHECK ((auth.uid() = profile_id));


--
-- Name: profile_key Enable users to update their own keys; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable users to update their own keys" ON public.profile_key FOR UPDATE USING ((auth.uid() = profile_id)) WITH CHECK ((auth.uid() = profile_id));


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
-- Name: profile_key User key access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "User key access" ON public.profile_key FOR SELECT USING ((auth.uid() = profile_id));


--
-- Name: actor; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.actor ENABLE ROW LEVEL SECURITY;

--
-- Name: claim; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.claim ENABLE ROW LEVEL SECURITY;

--
-- Name: profile_key; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.profile_key ENABLE ROW LEVEL SECURITY;

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

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

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
-- Name: supabase_realtime organisation; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.organisation;


--
-- Name: supabase_realtime profile; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.profile;


--
-- Name: supabase_realtime profile_key; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.profile_key;


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
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
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
-- Name: TABLE device_installation; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.device_installation TO postgres;
GRANT ALL ON TABLE public.device_installation TO anon;
GRANT ALL ON TABLE public.device_installation TO authenticated;
GRANT ALL ON TABLE public.device_installation TO service_role;


--
-- Name: TABLE device_type; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.device_type TO postgres;
GRANT ALL ON TABLE public.device_type TO anon;
GRANT ALL ON TABLE public.device_type TO authenticated;
GRANT ALL ON TABLE public.device_type TO service_role;


--
-- Name: TABLE device_type_hierarchy; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.device_type_hierarchy TO postgres;
GRANT ALL ON TABLE public.device_type_hierarchy TO anon;
GRANT ALL ON TABLE public.device_type_hierarchy TO authenticated;
GRANT ALL ON TABLE public.device_type_hierarchy TO service_role;


--
-- Name: TABLE device_type_signature; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.device_type_signature TO postgres;
GRANT ALL ON TABLE public.device_type_signature TO anon;
GRANT ALL ON TABLE public.device_type_signature TO authenticated;
GRANT ALL ON TABLE public.device_type_signature TO service_role;


--
-- Name: TABLE firmware; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.firmware TO postgres;
GRANT ALL ON TABLE public.firmware TO anon;
GRANT ALL ON TABLE public.firmware TO authenticated;
GRANT ALL ON TABLE public.firmware TO service_role;


--
-- Name: TABLE firmware_binding; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.firmware_binding TO postgres;
GRANT ALL ON TABLE public.firmware_binding TO anon;
GRANT ALL ON TABLE public.firmware_binding TO authenticated;
GRANT ALL ON TABLE public.firmware_binding TO service_role;


--
-- Name: TABLE firmware_hierarchy; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.firmware_hierarchy TO postgres;
GRANT ALL ON TABLE public.firmware_hierarchy TO anon;
GRANT ALL ON TABLE public.firmware_hierarchy TO authenticated;
GRANT ALL ON TABLE public.firmware_hierarchy TO service_role;


--
-- Name: TABLE firmware_signature; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.firmware_signature TO postgres;
GRANT ALL ON TABLE public.firmware_signature TO anon;
GRANT ALL ON TABLE public.firmware_signature TO authenticated;
GRANT ALL ON TABLE public.firmware_signature TO service_role;


--
-- Name: TABLE inherited_firmware_binding; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.inherited_firmware_binding TO postgres;
GRANT ALL ON TABLE public.inherited_firmware_binding TO anon;
GRANT ALL ON TABLE public.inherited_firmware_binding TO authenticated;
GRANT ALL ON TABLE public.inherited_firmware_binding TO service_role;


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
-- Name: TABLE profile_key; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.profile_key TO postgres;
GRANT ALL ON TABLE public.profile_key TO anon;
GRANT ALL ON TABLE public.profile_key TO authenticated;
GRANT ALL ON TABLE public.profile_key TO service_role;


--
-- Name: TABLE profile_key_public; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.profile_key_public TO postgres;
GRANT ALL ON TABLE public.profile_key_public TO anon;
GRANT ALL ON TABLE public.profile_key_public TO authenticated;
GRANT ALL ON TABLE public.profile_key_public TO service_role;


--
-- Name: TABLE site; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.site TO postgres;
GRANT ALL ON TABLE public.site TO anon;
GRANT ALL ON TABLE public.site TO authenticated;
GRANT ALL ON TABLE public.site TO service_role;


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

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON SEQUENCES  FROM postgres;
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
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM postgres;
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

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON TABLES  FROM postgres;
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

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage REVOKE ALL ON SEQUENCES  FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage REVOKE ALL ON FUNCTIONS  FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage REVOKE ALL ON TABLES  FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO service_role;


--
-- Name: api_restart; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER api_restart ON ddl_command_end
   EXECUTE FUNCTION extensions.notify_api_restart();


ALTER EVENT TRIGGER api_restart OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE SCHEMA')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

