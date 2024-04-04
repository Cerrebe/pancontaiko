"use client";
import { useEffect } from "react";
import { useRef } from "react";

export default function Background_music(props) {
  //Creditos a Jonathan de stack overflow que hizo este tremendo código y yo me lo robé y lo modifiqué
  const audioRef = useRef(null);
  useEffect(() => {
    if (props.play) {
      playAudio();
    } else {
      stopAudio();
    }
  }, [props.play]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleAudioEnded = () => {
    // Call the callback function when the audio ends
    if (props.onFinish) {
      if (props.onFinish == "loop") {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        props.onFinish();
      }
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        controls
        className="hidden"
        onEnded={handleAudioEnded}
      >
        <source src={props.src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
