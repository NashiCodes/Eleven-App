'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import VoicesTable from "@/app/voices/voices-table";
import {voiceColumns} from "@/app/voices/voice-columns";
import React from "react";
import {Voice} from "@/app/voices/voices-data";

interface MainTabProps {
    Data: Voice[]
}

export default function MainTab({Data}: MainTabProps) {
    return (
        <Tabs defaultValue={"voices"}>
            <div className="flex items-center justify-center">
                <TabsList className="grid w-fit ">
                    <TabsTrigger className="hover:cursor-default" value="voices">Vozes</TabsTrigger>
                </TabsList>
            </div>
            <div className="flex flex-col items-center
                ">
                <TabsContent value="voices">
                    <Card className=" min-w-fit max-h-fit">
                        <CardHeader>
                            <CardTitle>Vozes</CardTitle>
                            <CardDescription>
                                Ouça o Preview da voz e selecione a que mais lhe agradar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 min-w-max">
                            <VoicesTable columns={voiceColumns} data={Data}/>
                        </CardContent>
                    </Card>
                </TabsContent>
            </div>
        </Tabs>
    )
}