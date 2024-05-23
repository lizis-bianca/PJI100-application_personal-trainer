"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ExerciseCard, { APIExercise } from "@/components/Dashboard/Exercises/ExerciseCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/supabase/useSession";
import { toast } from "@/components/ui/use-toast";

type ExercisePageProps = {
    params: {
        id: string;
    };
};

export default function ExercisePage({ params }: ExercisePageProps) {
    const session = useSession();
    const { data, isLoading } = useQuery({
        queryKey: ["exercise", params.id], //key and params to define the query
        queryFn: () => {
            //function called on querying
            return axios.get(`/api/exercises/exercise?id=${params.id}`).then((res) => res.data);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    async function deleteExercice({ params }: ExercisePageProps) {
          const exercise = await axios.delete(`/api/exercises/${params.id}`);
          if (exercise.status === 200){
              toast({
                  variant: "success",
                  title: `Exercício ${params.id} deletado com sucesso!`,
                  description: `Você não irá mais visualizá-lo em seu perfil e seus treinos.`,
              });
              router.back();
              
        }
    }

    const router = useRouter();

    return (
        <>
            <Button className='mb-4' onClick={() => router.back()} variant={"secondary"}>
                <ArrowLeft className='scale-75 w-auto' /> Voltar
            </Button>
            { data?.data?.map((exercise: APIExercise) => exercise.created_by === session?.user.id) && 
            (<Button className='mb-4 ml-2 text-red-500' onClick={() => deleteExercice({params})} variant={"secondary"}>
                <Trash className='scale-75 w-auto' /> Deletar
            </Button>)
            }
            {!isLoading ? (
                <>
                    {
                    data?.data?.map((exercise: APIExercise, index: number) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </>
            ) : (
                <Skeleton className='w-full h-[150px] md:h-[250px] lg:h-[300px] dark:opacity-50' />
            )}
        </>
    );
}
