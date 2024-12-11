import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// pu = pickup, do = dropoff
export type Trip = {
    conf: string;
    po_client_ref: string | null;
    pu_date: string; // 2024-01-01 format
    pu_time: string; // 10:00 format
    do_time: string | null; // 10:00 format
    duration: number;
    company: string;
    status:
        | "Billable"
        | "Unbillable"
        | "Cancelled"
        | "Passenger On"
        | "Dropped";
    svc_type: "Point to Point" | "To Airport" | "From Airport" | "Other";
    note: string; // long text
    type: string; // 3 letters uppercase
    pu_location: string;
};

const data: Trip[] = [
    {
        conf: "42021",
        po_client_ref: "123456",
        pu_date: "2024-01-01",
        pu_time: "10:00",
        do_time: "11:20",
        duration: 80,
        company: "Limo Service Kft.",
        status: "Billable",
        svc_type: "Point to Point",
        note: "VIP client transfer",
        type: "INH",
        pu_location: "Budapest EK 11",
    },
    {
        conf: "42022",
        po_client_ref: "789012",
        pu_date: "2024-01-01",
        pu_time: "11:30",
        do_time: null,
        duration: 60,
        company: "Executive Cars Ltd.",
        status: "Cancelled",
        svc_type: "To Airport",
        note: "Client cancelled last minute",
        type: "APT",
        pu_location: "Hilton Hotel Budapest",
    },
    {
        conf: "42023",
        po_client_ref: "345678",
        pu_date: "2024-01-01",
        pu_time: "13:00",
        do_time: "14:15",
        duration: 75,
        company: "Premium Transfer Co.",
        status: "Billable",
        svc_type: "From Airport",
        note: "Flight landed on time",
        type: "APH",
        pu_location: "BUD Terminal 2B",
    },
    {
        conf: "42024",
        po_client_ref: null,
        pu_date: "2024-01-01",
        pu_time: "14:30",
        do_time: "15:45",
        duration: 75,
        company: "Limo Service Kft.",
        status: "Billable",
        svc_type: "Point to Point",
        note: "Service completed",
        type: "INH",
        pu_location: "Andrassy ut 25",
    },
    {
        conf: "42025",
        po_client_ref: "901234",
        pu_date: "2024-01-02",
        pu_time: "09:00",
        do_time: "10:30",
        duration: 90,
        company: "Executive Cars Ltd.",
        status: "Unbillable",
        svc_type: "Other",
        note: "Complimentary service",
        type: "EVT",
        pu_location: "Opera House",
    },
    {
        conf: "42026",
        po_client_ref: "567890",
        pu_date: "2024-01-02",
        pu_time: "10:45",
        do_time: "12:00",
        duration: 75,
        company: "Premium Transfer Co.",
        status: "Billable",
        svc_type: "To Airport",
        note: "Business client",
        type: "APT",
        pu_location: "Sofitel Budapest",
    },
    {
        conf: "42027",
        po_client_ref: "234567",
        pu_date: "2024-01-02",
        pu_time: "13:15",
        do_time: null,
        duration: 60,
        company: "Limo Service Kft.",
        status: "Cancelled",
        svc_type: "From Airport",
        note: "Flight delayed to next day",
        type: "APH",
        pu_location: "BUD Terminal 2A",
    },
    {
        conf: "42028",
        po_client_ref: "678901",
        pu_date: "2024-01-02",
        pu_time: "15:30",
        do_time: "16:45",
        duration: 75,
        company: "Executive Cars Ltd.",
        status: "Passenger On",
        svc_type: "Point to Point",
        note: "Hotel transfer",
        type: "INH",
        pu_location: "Kempinski Hotel",
    },
    {
        conf: "42029",
        po_client_ref: "123789",
        pu_date: "2024-01-03",
        pu_time: "08:00",
        do_time: "09:15",
        duration: 75,
        company: "Premium Transfer Co.",
        status: "Dropped",
        svc_type: "To Airport",
        note: "Early morning transfer",
        type: "APT",
        pu_location: "InterContinental Budapest",
    },
    {
        conf: "42030",
        po_client_ref: "456123",
        pu_date: "2024-01-03",
        pu_time: "09:30",
        do_time: "11:00",
        duration: 90,
        company: "Limo Service Kft.",
        status: "Passenger On",
        svc_type: "Other",
        note: "Corporate account service",
        type: "EVT",
        pu_location: "Budapest Congress Center",
    },
];

const getStatusColor = (status: Trip["status"]) => {
    switch (status) {
        case "Billable":
            return `bg-[hsl(var(--status-billable))] hover:bg-[hsl(var(--status-billable))]`;
        case "Unbillable":
            return `bg-[hsl(var(--status-unbillable))] hover:bg-[hsl(var(--status-unbillable))]`;
        case "Cancelled":
            return `bg-[hsl(var(--status-cancelled))] hover:bg-[hsl(var(--status-cancelled))]`;
        case "Passenger On":
            return `bg-[hsl(var(--status-passenger-on))] hover:bg-[hsl(var(--status-passenger-on))]`;
        case "Dropped":
            return `bg-[hsl(var(--status-dropped))] hover:bg-[hsl(var(--status-dropped))]`;
        default:
            return "";
    }
};

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<Trip>[] = [
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const trip = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(trip.conf)
                            }
                        >
                            Copy confirmation number
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                            View payment details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value: boolean) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="mr-4"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: boolean) =>
                    row.toggleSelected(!!value)
                }
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "conf",
        header: "Confirmation",
        cell: ({ row }) => <div>{row.getValue("conf")}</div>,
    },
    {
        accessorKey: "po_client_ref",
        header: () => <div className="whitespace-nowrap">PO/Client Ref</div>,
        cell: ({ row }) => (
            <div className="whitespace-nowrap">
                {row.getValue("po_client_ref")}
            </div>
        ),
    },
    {
        accessorKey: "pu_date",
        header: () => <div className="whitespace-nowrap">PU Date</div>,
        cell: ({ row }) => <div>{row.getValue("pu_date")}</div>,
    },
    {
        accessorKey: "pu_time",
        header: () => <div className="whitespace-nowrap">PU Time</div>,
        cell: ({ row }) => <div>{row.getValue("pu_time")}</div>,
    },
    {
        accessorKey: "do_time",
        header: () => <div className="whitespace-nowrap">DO Time</div>,
        cell: ({ row }) => <div>{row.getValue("do_time")}</div>,
    },
    {
        accessorKey: "duration",
        header: () => <div className="whitespace-nowrap">Dur (min)</div>,
        cell: ({ row }) => <div>{row.getValue("duration")}</div>,
    },
    {
        accessorKey: "company",
        header: () => <div className="whitespace-nowrap">Company</div>,
        cell: ({ row }) => <div>{row.getValue("company")}</div>,
    },
    {
        accessorKey: "status",
        header: () => <div className="whitespace-nowrap">Status</div>,
        cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
    {
        accessorKey: "svc_type",
        header: () => <div className="whitespace-nowrap">Service Type</div>,
        cell: ({ row }) => <div>{row.getValue("svc_type")}</div>,
    },
    {
        accessorKey: "note",
        header: () => <div className="whitespace-nowrap">Note</div>,
        cell: ({ row }) => (
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <div className="max-w-[200px] truncate flex items-center gap-2">
                            📝
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={10}>
                        <p>{row.getValue("note")}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ),
    },
    {
        accessorKey: "type",
        header: () => <div className="whitespace-nowrap">Type</div>,
        cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
        accessorKey: "pu_location",
        header: () => <div className="whitespace-nowrap">PU Location</div>,
        cell: ({ row }) => <div>{row.getValue("pu_location")}</div>,
    },
];

export function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={
                        (table
                            .getColumn("email")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("email")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className={getStatusColor(
                                        row.getValue("status")
                                    )}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
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
            </div>
        </div>
    );
}
