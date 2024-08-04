"use client"

import {PauseIcon, PlayIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {Button} from "@/components/ui/button";

interface AudioButtonProps {
    Url: string
}


export default function AudioButton({Url}: AudioButtonProps) {

    const [audio] = useState<HTMLAudioElement | null>(typeof Audio !== 'undefined' ? new Audio(Url) : null)

    const [playing, setPlaying] = useState(false)

    const notSupportedMsg = "Your browser does not support the <code>audio</code> element.";


    const onplaying = () => {
        setPlaying(true)
    }

    const onpause = () => {
        setPlaying(false)
    }
    const onended = () => {
        setPlaying(false)
    }

    const play = () => {
        audio?.play().then(r => r)
        audio?.addEventListener('play', onplaying)
        audio?.addEventListener('pause', onpause)
        audio?.addEventListener('ended', onended)
    }

    const pause = () => {
        audio?.pause()
    }

    const startAudio = () => {
        play()
    }

    const buttonClass = "text-primary bg-secondary hover:text-secondary hover:bg-accent-foreground rounded-full p-3"
    if (typeof audio != "undefined") {

        return (<>
            {!playing && (
                <Button className={buttonClass} onClick={startAudio}><PlayIcon/></Button>
            )}
            {playing && <Button className={buttonClass} onClick={pause}><PauseIcon/></Button>}
            <audio>
                {notSupportedMsg}
            </audio>
        </>)
    }
}
