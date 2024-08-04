import React from 'react';
import {getVoices, Voice} from "@/app/voices/voices-data";
import MainTab from "@/app/voices/main-tab";


export default async function Home() {
    let voicesData: Voice[]

    try {
        voicesData = await getVoices()
    } catch (e: any) {
        return <div>{e.message}</div>
    }


    return (<>
        <div className="flex items-center justify-center h-screen w-auto">
            <MainTab Data={voicesData}/>
        </div>
    </>)
};