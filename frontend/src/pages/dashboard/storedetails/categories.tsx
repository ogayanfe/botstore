import {
    Button,
    Dialog,
    DialogTitle,
    TextField,
    DialogContent,
    Typography,
    DialogActions,
    Divider,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import { getApiClient } from "../../../utils/authutils";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { Form, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useThemeContext } from "../../../context/themeContext";
import { ChangeEvent, useRef, useState } from "react";
import { Stack } from "@mui/system";

interface CategoryType {
    id: number;
    name: string;
    created: string;
    description: string;
    thumbnail: string;
    product_count: number;
}

interface CategoryHeaderPropType {
    open: () => void;
}
interface AddCategoryPropType {
    isOpen: boolean;
    close: () => void;
}

function FileField() {
    interface fileInfoType {
        name: string;
        sizeKb: number;
    }
    const [fileInfo, setFileInfo] = useState<null | fileInfoType>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const fileToLarge = !fileInfo ? false : fileInfo.sizeKb >= 200;
    const borderColor = fileInfo ? (fileToLarge ? "red" : "green") : "yellow";

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target;

        if (file.files) {
            const fi = file.files[0];
            if (!fi) {
                return;
            }
            setFileInfo({
                name: fi.name,
                sizeKb: fi.size / 1024,
            });
            return;
        }
        setFileInfo(null);
    }

    return (
        <Stack spacing={1} sx={{ marginTop: "10px" }}>
            <Typography
                variant="button"
                gutterBottom
                sx={{
                    border: "1px solid",
                    borderRadius: "5px",
                    padding: "5px",
                    paddingLeft: "10px",
                    textAlign: "center",
                    borderColor: borderColor,
                }}
                onClick={() => inputRef.current?.click()}
            >
                {fileInfo
                    ? fileToLarge
                        ? `${fileInfo.name} (${
                              Math.round(fileInfo.sizeKb * 100) / 100
                          } kb, to large)`
                        : fileInfo.name
                    : "No file selected"}
                <input
                    id="select-category-thumbnail"
                    type="file"
                    accept="image/*"
                    name="thumbnail"
                    className="fixed left-[-100000px]"
                    ref={inputRef}
                    onChange={handleChange}
                    required
                />
            </Typography>
            <Button
                color="primary"
                variant="contained"
                endIcon={<FileUploadRoundedIcon />}
                onClick={() => inputRef.current?.click()}
            >
                Select Thumbnail
            </Button>
        </Stack>
    );
}

function AddCategoryDialog({ isOpen, close }: AddCategoryPropType) {
    const { darkTheme } = useThemeContext();
    return (
        <Dialog
            open={isOpen}
            onClose={close}
            PaperProps={{
                style: {
                    background: darkTheme ? "#0f0f12" : "",
                },
            }}
        >
            <DialogTitle sx={{ textAlign: "center" }}>Add Category</DialogTitle>
            <Form className="w-full">
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        label="Name"
                        required
                        name="name"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        label="Name"
                        required
                        name="name"
                        type="text"
                        fullWidth
                    />
                    <Divider sx={{ paddingTop: "10px", paddingBottom: "5px" }} />
                    <FileField />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={close}>
                        Cancel
                    </Button>
                    <Button type="submit" color="info">
                        Save
                    </Button>
                </DialogActions>
            </Form>
        </Dialog>
    );
}

function CategoryHeader({ open }: CategoryHeaderPropType) {
    return (
        <nav className="text-gray-900 dark:text-gray-300 mx-2 lg:mx-8">
            <div className="flex items-center justify-between p-3">
                <h3 className="font-semibold text-xl flex w-full items-center gap-3">
                    <CategoryIcon aria-hidden />
                    <span>Categories</span>
                </h3>
                <Button endIcon={<AddIcon />} variant="outlined" onClick={open} size="large">
                    Add
                    <span className="fixed -left-[5000000px]">category</span>
                </Button>
            </div>
            <Divider />
        </nav>
    );
}

export default function DashboardStoreCategories() {
    const { data: categories } = useLoaderData() as { data: CategoryType[] };
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <>
            <CategoryHeader open={() => setOpenDialog(true)} />
            <AddCategoryDialog isOpen={openDialog} close={() => setOpenDialog(false)} />
        </>
    );
}

export type { CategoryType };

export async function storeCategoriesLoader({ params }: LoaderFunctionArgs) {
    const { storeId } = params;
    const apiClient = getApiClient();
    return apiClient.get(`api/store/${storeId}/categories/`);
}
