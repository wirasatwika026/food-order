import ThemeSwitch from "@/components/ThemeSwitch";
import Timer from "@/components/Timer";
import { createClient } from "@/utils/supabase/server";
import { ISOStringToMilliseconds } from "@/utils/utils";

export default async function Home() {

  const supabase = await createClient();

  const { data, error } = await supabase.from("countdown").select("countdown").limit(1);

  if (error) {
    console.error("Error fetching countdown data:", error);
    return <div>Error loading countdown</div>;
  }

  const targetTime = ISOStringToMilliseconds(data[0].countdown);

  const currentTime = Date.now();

  const duration = targetTime - currentTime;

  return (
    <div className="h-screen p-6 bg-white dark:bg-black">
      <nav className="absolute top-0 right-0 p-4">
        <ThemeSwitch />
      </nav>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-8xl uppercase dark:text-white text-black">Coming soon</h1>

        <div className="text-4xl dark:text-white text-black">
          <Timer duration={duration} />
        </div>
      </div>
    </div>
  );
}
