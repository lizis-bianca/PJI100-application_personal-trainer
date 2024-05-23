import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Button } from "@/components/ui/button";

export default function TimerRecord() {
  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
    reset,
  } = useStopwatch();

  return (
    <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: "100px" }}>
      <span>{hours}</span>:<span>{String("00" + minutes).slice(-2)}</span>:<span>{String("00" + seconds).slice(-2)}</span>
    </div>
    <div style={{ textAlign: "center", display: "inline-flex"}} className='gap-2'>
        <Button onClick={start}>Iniciar</Button>
        <Button onClick={pause}>Pausar</Button>
        <Button onClick={() => reset}>Resetar</Button>
    </div>
  </div>
  );
}