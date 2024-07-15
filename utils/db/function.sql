CREATE 
OR REPLACE FUNCTION public.create_profile() RETURNS TRIGGER AS $$ BEGIN INSERT INTO public.profiles (id, email) 
VALUES 
  (
    NEW.id,
    NEW.email
  );
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;