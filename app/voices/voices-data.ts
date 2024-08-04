export async function getVoices() {
    const key = process.env.XI_API_KEY
    if (!key) {
        throw new Error('API Key not found');
    }

    const options = {
        method: 'GET', headers: {'xi-api-key': key},
    };

    const data = await fetch('https://api.elevenlabs.io/v1/voices?show_legacy=true', options)

    if (!data.ok) {
        throw new Error('API Error');
    }

    const voices = await data.json() as Voices;

    return voices.voices;
}

type Voices = {
    "voices": Voice[]
}


export type Voice = {
    "voice_id": "<string>", "name": "<string>", "category": "<string>", "labels": {
        accent: "<string>", use_case: "<string>", description: "<string>", gender: "<string>", age: "<string>"
    }, "description": "<string>", "preview_url": "<string>",
}

export async function getAudio(text: string, id: string) {

    const key = process.env.elevenLabsKey
    if (!key) {
        throw new Error('API Key not found');
    }

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${id}`

    const body = {
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0,
            use_speaker_boost: true
        }
    }


    const options = {
        method: 'POST',
        headers: {
            'xi-api-key': key,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    const data = await fetch(url, options).then((res) => res.blob().then((audio) => saveAudioOnDisk(audio)))

    return data.getAll('file')[0];
}


async function saveAudioOnDisk(audio: Blob) {

    const audioId = URL.createObjectURL(audio);

    const audioFile = new File([audio], `${audioId}`, {
        type: "audio/mp3",
    });
    const formData = new FormData();
    formData.append("file", audioFile);


    return formData;
}

