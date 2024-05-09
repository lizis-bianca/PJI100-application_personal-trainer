import Hero from "@/components/Home/Hero";
import Preview from "@/components/Home/Preview";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between '>
            <Hero />
        </main>
    );
}
