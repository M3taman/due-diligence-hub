
CREATE OR REPLACE FUNCTION public.pg_backend_version() RETURNS text AS $$
BEGIN
    RETURN version();
END;
$$ LANGUAGE plpgsql STABLE;