import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { handleSubscribe } from "../action";
import { CoursesList } from "./_components/courses-list";

const LESSON_MAX_LIMIT = 1000;
const priceId = process.env.NEXT_PUBLIC_PRICE_ID;

export default async function CoursesPage() {
  const supabaseClient = createClient();
  const user = await supabaseClient.auth.getUser();
  const userEmail = user.data.user?.email;

  let hasActiveSub = false;
  if (userEmail) {
    const { error } = await supabaseClient
      .from("subscriptions")
      .select()
      .eq("email", userEmail)
      .eq("active", true)
      .single();

    if (!error) {
      hasActiveSub = true;
    }
  }

  const maxAvailableLessons = hasActiveSub ? LESSON_MAX_LIMIT : 1;

  const { data } = await supabaseClient
    .from("lessons")
    .select()
    .limit(maxAvailableLessons);

  if (!data) {
    return <div>Non ci sono lezioni!</div>;
  }

  return (
    <div className="p-16 bg-primary bg-opacity-10">
      <h1 className="text-4xl font-bold pb-8">Le mie videolezioni 🔥</h1>
      <CoursesList lessons={data} />
      {!hasActiveSub && (
        <form action={handleSubscribe}>
          <input hidden value={priceId} name="price" />
          <Button className="w-full mt-4" type="submit">
            Get access
          </Button>
        </form>
      )}
    </div>
  );
}
