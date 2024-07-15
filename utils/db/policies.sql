
CREATE POLICY "Can only view own profile data."
  ON public.profiles
  FOR SELECT
  USING ( auth.uid() = id );

CREATE POLICY "Can only update own profile data."
  ON public.profiles
  FOR UPDATE
  USING ( auth.uid() = id );