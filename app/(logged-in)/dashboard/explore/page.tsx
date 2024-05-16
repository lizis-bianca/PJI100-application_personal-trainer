"use client";
import { GithubIcon } from "lucide-react";
import { HowItWorks } from "@/components/Dashboard/Explore/HowItWork";
import { useSession } from "@/lib/supabase/useSession";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Explore() {
  const session = useSession();

    const { data } = useQuery({
        queryKey: ["explore"], //key and params to define the query
        queryFn: () => {
            return axios.get(`/api/users/${session?.user.id}`).then((res) => res.data);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    console.log('aa-> ',data)

    return (
      <>
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Game Gymn
            </span>{" "}
            irá
          </h1>{" "}
          te{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#ab61fb] via-[#4563b3] to-[#9706f0] text-transparent bg-clip-text">
              Transformar!
            </span>{" "}
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Construa uma vida mais saudável da maneira mais fácil possível.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <a
            rel="noreferrer noopener"
            href="https://github.com/lizis-bianca/PJI100-application_personal-trainer"
            target="_blank"
            className='w-full md:w-1/3'
          >
            <GithubIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="shadow"></div>
    </section>
    <br/>
    <HowItWorks/>
    </>
    );
}

