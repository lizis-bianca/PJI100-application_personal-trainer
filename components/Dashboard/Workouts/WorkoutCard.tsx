import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import GlowingCard from "@/components/ui/glowingCard";
import { cn } from "@/lib/utils";
import { DBWorkout } from "@/types/Workout";
import { Edit, MoreVertical, Trash } from "lucide-react";
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "@/components/ui/table";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useTimestampConverter } from "@/lib/hooks/useTimestampConvert";
import WorkoutCardTimer from "./WorkoutCardTimer";

type WorkourtPageProps = {
    params: {
        slug: string;
    };
};

export default function WorkoutCard({
    workout,
    className
}: {
    workout: DBWorkout;
    className?: string;
}) {
    const { toast } = useToast();

    async function deleteWorkout({ params }: WorkourtPageProps) {
        const workout = await axios.delete(`/api/workouts/${params.slug}`);
        if (workout.status === 200){
            toast({
                variant: "success",
                title: `Treino ${params.slug} deletado com sucesso!`,
                description: `Você não irá mais visualizá-lo na sua página de treinos.`,
            });
        }
        window.location.reload();
    }

    return (
        <>
        <GlowingCard
            className={cn(
                "dark:hover:bg-card relative group w-full h-[30rem] bg-card space-y-1 p-6",
                className
            )}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size={"icon"}
                        className='absolute right-0 mr-6 bg-card'
                        variant={"outline"}
                    >
                        <MoreVertical className='' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex items-center gap-2'>
                        <Edit className='scale-75' />
                        Reordenar{" "}
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex items-center gap-2 text-destructive' onClick={() => deleteWorkout({ params: { slug: workout.id } })}>
                        <Trash className='scale-75' />
                        Deletar{" "}
                    </DropdownMenuItem>
                </DropdownMenuContent>{" "}
            </DropdownMenu>{" "}
            <h2 className='font-semibold text-lg max-w-[270px] -translate-y-1 overflow-clip'>
                {workout.workout.title}
            </h2>
            <span className='flex gap-2 w-full flex-wrap  -translate-y-1'>
                {workout.workout.muscle_group.map((muscle) => (
                    <Badge key={muscle} variant={"secondary"} className='rounded-md'>
                        {muscle}
                    </Badge>
                ))}
            </span>
            <div className='flex items-start space-x-4 pt-2'>
                <div className='space-y-1'>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                        {useTimestampConverter(workout.created_at)}
                    </p>
                </div>
            </div>
            <section className=' overflow-clip relative'>
                <h3 className='font-semibold mt-4'>Exercícios:</h3>
                <div className=' mb-1 min-h-[2.5rem] flex items-center overflow-hidden '>
                    <Table className='w-full font-sm mt-2 overflow-hidden'>
                        <TableHeader>
                            <TableRow className=''>
                                <TableHead className='text-xs'>Nome</TableHead>
                                <TableHead className='text-xs'>Séries</TableHead>
                                <TableHead className='text-xs'>Nível</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='relative'>
                            <div className='absolute w-full h-full bg-gradient-to-b from-transparent to-card z-[1]'></div>
                            {workout.workout.exercises.slice(0, 3).map((exercise, index) => (
                                <>
                                    <TableRow key={index}>
                                        <TableCell className='text-xs'>{exercise.name}</TableCell>
                                        <TableCell className='text-xs'>
                                            <Badge variant={"secondary"}>
                                                {exercise.muscles[0]}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='text-xs'>
                                            <Badge variant={exercise.level[0] as any}>
                                                {exercise.level[0]}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
            <WorkoutCardTimer workout={workout}/>
        </GlowingCard>
       </>
    );
}
