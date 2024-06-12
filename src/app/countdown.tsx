import Image from "next/image";
import { useState, useEffect } from "react";

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds

  useEffect(() => {
    // Exit early when we reach 0
    if (!timeLeft) return;

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // Add timeLeft as a dependency to re-run the effect when we update it
  }, [timeLeft]);

  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    // Pad single digits with a leading zero
    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = seconds.toString().padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <div className="space-y-6">
      <span className="block">
        <Image className="w-[560px]" src="./bobu.gif" alt="bobu running" />
      </span>
      <div className="w-96 m-auto">
        <p>{formatTimeLeft()}</p>
      </div>
    </div>
  );
};
