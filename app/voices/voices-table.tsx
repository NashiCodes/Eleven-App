import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState
} from "@tanstack/table-core";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Voice} from "@/app/voices/voices-data";
import TextToSpeech from "@/app/voices/text-to-speech";


interface VoicesTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export default function VoicesTable<TData, TValue>({columns, data}: VoicesTableProps<TData, TValue>) {

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0, pageSize: 5,
    })
    const [sorting, setSorting] = useState<SortingState>([])

    const tableProps = {
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            pagination, sorting,
        },
    }

    const [table, setTable] = useState(useReactTable(tableProps))

    const [text, setText] = useState(String)

    function textHandler(e: any) {

        const column = table.getAllColumns().find((column) => column.columnDef.header === "Falar")
        if (column)
            column.columnDef.cell = (cell) => {
                const id = (cell.row.original as Voice).voice_id


                return (<TextToSpeech text={e.target.value} id={id}/>)

            }

        setText(e.target.value)
    }


    return (<>
            <div className="rounded-md border">
                <Textarea placeholder={"Digite aqui sua fala"} value={text} onChange={textHandler} className="
                    w-full
                    p-4
                    rounded-t-md
                    resize-none
                "/>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (<TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (<TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>)
                            })}
                        </TableRow>))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (<TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => {
                                return (<TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>)
                            })}
                        </TableRow>))) : (<TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </>

    )
}