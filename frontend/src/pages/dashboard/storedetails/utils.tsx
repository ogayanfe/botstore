import { GridRenderCellParams } from "@mui/x-data-grid/models";
import { GridColDef } from "@mui/x-data-grid";
import { Chip, Avatar } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

type UpdateRowType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: Object) => void;

export function getGridCols(update: UpdateRowType): GridColDef[] {
    return [
        {
            field: "id",
            headerName: "Product Id",
            flex: 1,
            minWidth: 100,
        },
        { field: "name", headerName: "Name", flex: 1, minWidth: 100 },
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
        { field: "category", headerName: "Category", flex: 1, minWidth: 100 },
        { field: "price", headerName: "Price", flex: 1 },
        { field: "stock_amount", headerName: "Amount In Stock", flex: 1, minWidth: 100 },
        { field: "weight", headerName: "Weight", flex: 1, minWidth: 100 },
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
