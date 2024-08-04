import {Button} from "@/components/ui/button";
import {PlayIcon} from "@radix-ui/react-icons";
import {useEffect, useState} from "react";
import {Spinner} from "@/components/ui/spinner";
import {getAudio} from "@/app/voices/voices-data";

interface TranscProps {
    text: string
    id: string
}


export default function TextToSpeech({text, id}: TranscProps) {

    const [isloading, setIsloading] = useState(false)

    useEffect(() => {
        if (isloading) {
            getAudio(text, id).then((formdata) => {
                console.log(formdata)

                const audio = new Blob([formdata], {type: 'audio/mp3'})
                const audioId = URL.createObjectURL(audio)
                new File([audio], `${audioId}`, {
                    type: "audio/mp3",
                });
                const audioEl = new Audio(audioId)

                audioEl.play()

                setIsloading(false)
            })
        }
    }, [id, isloading, text])


    const handleClick = () => {
        setIsloading(true)
    }

    return (<>
            {text.length > 0 &&
                !isloading && <Button variant="ghost" onClick={handleClick}> <PlayIcon className="h-6 w-6"/> </Button>
            }
            {isloading && <Button variant="ghost" disabled> <Spinner size="small"/> </Button>}
        </>
    )
}