import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className=" bg-primary bg-opacity-20 py-24 md:py-48 w-full mx-auto px-2">
      <div className="max-w-7xl px-6 lg:px-8 w-full mx-auto">
        <div className="flex items-center flex-col gap-y-12 justify-between lg:flex-row-reverse">
          <Image
            src="/hero.png"
            alt="Hero"
            sizes="100vw"
            className="w-full h-auto rounded-2xl max-w-md"
            width={500}
            height={400}
          />
          <div>
            <h1 className="text-3xl md:text-6xl font-bold">MEGATUTORIAL 🚀</h1>
            <p className="py-6 text-xl md:text-3xl">
              It&apos;s time to code like a senior, with Next.js, React,
              Typescript and Supabase.
            </p>
            <Button asChild>
              <Link href="/#pricing">Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
