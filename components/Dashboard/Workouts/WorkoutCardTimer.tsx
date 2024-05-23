import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/DrawerOrVaul";
import { Button } from "@/components/ui/button";
import { useGetScreenWidth } from '@/lib/hooks/useGetScreenWidth';
import TimerRecord from './Timer/TimerRecord';
import { Dumbbell } from 'lucide-react';
import { DBWorkout } from '@/types/Workout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function WorkoutCardTimer({ workout }: { workout: DBWorkout }) {
    const { screenWidth } = useGetScreenWidth();
    const [TimerOpen, setTimerOpen] = useState(false);

  return (
    <Drawer
    screenWidth={screenWidth}
    open={TimerOpen}
    onOpenChange={setTimerOpen}>
        <DrawerTrigger screenWidth={screenWidth}>
                <Button className='w-[calc(100%-(2*1.5rem))] absolute z-[1] bottom-0 -translate-y-6'>
                    <Dumbbell className='scale-75 ml-2' /> Iniciar treino
                </Button>
        </DrawerTrigger>
        <DrawerContent
            asChild
            desktopClassname='sm:w-[calc(100%-20rem)] max-w-full'
            screenWidth={screenWidth}
            className=''>
            <div style={{ textAlign: "center" }}>
                <h1><b>Praticando : <span style={{ color: '#8a2be2' }}>{ workout.workout.title }</span></b></h1>
                <p>{ workout.workout.description }</p>
                <TimerRecord/>
            </div>
            <br/>
            <div className=' mb-1 min-h-[2.5rem] flex items-center overflow-hidden '>
                <Table className='w-full h-full font-sm mt-2 overflow-hidden'>
                    <TableHeader>
                        <TableRow className=''>
                            <TableHead className='text-xs'>Nome</TableHead>
                            <TableHead className='text-xs'>Séries</TableHead>
                            <TableHead className='text-xs'>Nível</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='relative'>
                        <div className='absolute w-full h-full bg-gradient-to-b from-transparent to-card z-[1]'></div>
                        {workout.workout.exercises.map((exercise, index) => (
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
        </DrawerContent>
    </Drawer>
  );
}