import { GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid/models";
import { GridColDef } from "@mui/x-data-grid";
import { Chip, Avatar, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

type UpdateRowType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: Object) => void;

export function getProductGridCols(update: UpdateRowType): GridColDef[] {
    return [
        {
            field: "id",
            headerName: "Product Id",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1.5,
            minWidth: 100,
            editable: true,
        },
        {
            field: "thumbnail",
            headerName: "Image Thumbnail",
            sortable: false,
            filterable: false,
            editable: false,
            minWidth: 100,
            flex: 1,
            disableColumnMenu: true,
            align: "center",
            renderCell({ row }: GridRenderCellParams) {
                return (
                    <Avatar
                        variant="rounded"
                        src={row.thumbnail}
                        alt={row.name + " product thumbnail"}
                        sx={{ width: "40px", height: "40px" }}
                    />
                );
            },
        },
        { field: "category", headerName: "Category", flex: 1.5, minWidth: 100 },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
            editable: true,

            renderEditCell() {
                return <TextField type="number" inputProps={{ min: 0 }} />;
            },
        },
        {
            field: "stock_amount",
            headerName: "Amount In Stock",
            flex: 1,
            minWidth: 100,
            editable: true,
            renderEditCell() {
                return <TextField type="number" inputProps={{ min: 0 }} />;
            },
        },
        {
            field: "weight",
            headerName: "Weight",
            flex: 1,
            minWidth: 100,
            editable: true,
            renderEditCell() {
                return <TextField type="number" inputProps={{ min: 0 }} />;
            },
        },
        {
            field: "is_public",
            minWidth: 100,
            flex: 1,
            headerName: "Public",
            renderCell: ({ row }: GridRenderCellParams) => {
                const isPubStr = row.is_public.toString();
                return (
                    <Chip
                        label={isPubStr[0].toUpperCase() + isPubStr.slice(1)}
                        size="small"
                        variant="outlined"
                        color={row.is_public ? "success" : "secondary"}
                    ></Chip>
                );
            },
        },
        {
            field: "update",
            headerName: "Update",
            sortable: false,
            filterable: false,
            flex: 1,
            editable: false,
            headerAlign: "center",
            align: "center",
            minWidth: 100,
            disableColumnMenu: true,
            renderCell({ row }: GridRenderCellParams) {
                return (
                    <Chip
                        label="update"
                        size="small"
                        color="info"
                        component="button"
                        onClick={(e) => {
                            update(e, row);
                        }}
                        variant="outlined"
                    />
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            filterable: false,
            editable: false,
            flex: 1,
            minWidth: 100,
            disableColumnMenu: true,
            headerAlign: "center",
            align: "center",
            renderCell() {
                return (
                    <Chip
                        label="delete"
                        size="small"
                        color="error"
                        variant="outlined"
                        icon={<ClearIcon />}
                        onClick={console.log}
                    />
                );
            },
        },
    ];
}

export function getCategoriesGridCols(update: UpdateRowType): GridColDef[] {
    return [
        {
            field: "id",
            align: "center",
            headerName: "Category Id",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "thumbnail",
            headerName: "Thumbnail",
            sortable: false,
            filterable: false,
            editable: false,
            minWidth: 100,
            flex: 1,
            disableColumnMenu: true,
            align: "center",
            renderCell({ row }: GridRenderCellParams) {
                return (
                    <Avatar
                        variant="rounded"
                        src={row.thumbnail}
                        alt={row.name + " row thumbnail"}
                        sx={{ width: "40px", height: "40px" }}
                    />
                );
            },
        },
        {
            field: "description",
            headerName: "Category Description",
            flex: 2,
            minWidth: 200,
            editable: true,
        },
        {
            field: "product_count",
            align: "center",
            headerName: "Number Of Products",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "created",
            headerName: "Created",
            flex: 1,
            minWidth: 200,
            valueGetter({ row }: GridValueGetterParams) {
                return new Date(row.created);
            },
        },

        {
            field: "update",
            headerName: "Update",
            sortable: false,
            filterable: false,
            headerAlign: "center",
            align: "center",
            flex: 1,
            editable: false,
            minWidth: 100,
            disableColumnMenu: true,
            renderCell({ row }: GridRenderCellParams) {
                return (
                    <Chip
                        label="update"
                        size="small"
                        color="info"
                        component="button"
                        onClick={(e) => {
                            update(e, row);
                        }}
                        variant="outlined"
                    />
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            filterable: false,
            editable: false,
            flex: 1,
            headerAlign: "center",
            align: "center",
            minWidth: 100,
            disableColumnMenu: true,
            renderCell() {
                return (
                    <Chip
                        label="delete"
                        size="small"
                        color="error"
                        variant="outlined"
                        icon={<ClearIcon />}
                        onClick={console.log}
                    />
                );
            },
        },
    ];
}
