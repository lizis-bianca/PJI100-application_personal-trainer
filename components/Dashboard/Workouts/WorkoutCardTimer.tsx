import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/DrawerOrVaul";
import { Button } from "@/components/ui/button";
import { useGetScreenWidth } from '@/lib/hooks/useGetScreenWidth';
import TimerRecord from './Timer/TimerRecord';
import { Dumbbell } from 'lucide-react';
import { DBWorkout } from '@/types/Workout';

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
        </DrawerContent>
    </Drawer>
  );
}