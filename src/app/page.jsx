import ThemeSwitch from "@/components/ThemeSwitch";

export default async function Home() {

  return (
    <div className="h-screen p-6 bg-white dark:bg-black">
      <nav className="absolute top-0 right-0 p-4">
        <ThemeSwitch />
      </nav>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-8xl uppercase dark:text-white text-black">Coming soon</h1>

        <div className="text-4xl dark:text-white text-black">
        </div>
      </div>
    </div>
  );
}
