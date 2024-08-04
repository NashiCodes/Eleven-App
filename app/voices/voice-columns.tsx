"use client"

import {ColumnDef} from "@tanstack/table-core";
import {Voice} from "@/app/voices/voices-data";
import {Badge, badgeVariants} from "@/components/ui/badge";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import AudioButton from "@/components/audio-button";

export const voiceColumns: ColumnDef<Voice>[] =
    [{
        accessorKey: "preview_url", header: "Prévia", cell: (cell) => {
            return <AudioButton Url={cell.row.original.preview_url}/>
        },
    }, {
        accessorKey: "name", header: ({column}) => {
            return (<Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nome
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>)
        },
    }, {
        accessorKey: "category", header: "Categoria",
    }, {
        accessorKey: "labels", header: ({column}) => {
            return (<Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tipos
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>)
        }, cell: (cell) => {
            return (<div className="
                    flex
                    items-center
                    space-x-2
                ">
                <Badge className="hover:cursor-pointer">{cell.row.original.labels.use_case}</Badge>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <a className={`${badgeVariants({variant: "secondary"})} hover:cursor-pointer `}>Mais
                                4</a>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{cell.row.original.labels.accent}</p>
                            <p>{cell.row.original.labels.description}</p>
                            <p>{cell.row.original.labels.gender}</p>
                            <p>{cell.row.original.labels.age}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>)
        },
    }, {
        accessorKey: "voice_id", header: "Falar",
        cell: () => {
            return <></>
        }
    },
    ]