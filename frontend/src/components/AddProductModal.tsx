import {
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    DialogActions,
    TextField,
    FormControl,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
    FormControlLabel,
    Switch,
    Button,
    Select,
    MenuItem,
} from "@mui/material";
import { CategoryType } from "../pages/dashboard/storedetails/categories";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { ChangeEvent, useRef } from "react";
import { Form } from "react-router-dom";
import { useThemeContext } from "../context/themeContext";
import ImagePreview from "./ImagePreviewComponent";

interface FileFieldProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    file: null | File;
    clearFile: () => void;
}

function FileField({ onChange, file, clearFile }: FileFieldProps) {
    interface fileInfoType {
        name: string;
        sizeKb: number;
    }
    const inputRef = useRef<HTMLInputElement | null>(null);
    const fileInfo: null | fileInfoType = (() => {
        if (!file) {
            return null;
        }
        return {
            name: file.name,
            sizeKb: file.size / 1024,
        };
    })();

    const fileToLarge = !fileInfo ? false : fileInfo.sizeKb >= 200;
    return (
        <div className="w-full flex flex-col gap-4">
            {file && <ImagePreview file={URL.createObjectURL(file)} removeImage={clearFile} />}
            <div>
                <input
                    type="file"
                    accept="image/*"
                    name="thumbnail"
                    className="fixed left-[-100000px]"
                    ref={inputRef}
                    required
                    onChange={onChange}
                />
                <Stack direction="row" spacing={1}>
                    <div
                        className={`flex-grow bg-gray-100 capitalize text-md dark:bg-black pl-4 p-1 rounded-md ${
                            fileToLarge && "text-red-500"
                        }`}
                    >
                        {fileInfo
                            ? fileToLarge
                                ? `${fileInfo.name} (${
                                      Math.round(fileInfo.sizeKb * 100) / 100
                                  } kb, to large)`
                                : fileInfo.name
                            : "No file chosen"}
                    </div>
                    <Button
                        color="primary"
                        variant="contained"
                        endIcon={<FileUploadRoundedIcon />}
                        onClick={() => inputRef.current?.click()}
                    >
                        Image
                    </Button>
                </Stack>
            </div>
        </div>
    );
}

interface AddProductModalProps {
    formValues: {
        is_public: boolean;
        name: string;
        stock_amount: string;
        price: string;
        weight: string;
        image_url?: string;
        category: string;
        thumbnail: File | null;
    };
    clearFile: () => void;
    categories: CategoryType[];
    onClose: () => void;
    open: boolean;
    updateFormValues: (e: any) => void;
}

const ProductCreateUpdateModal = ({
    formValues,
    onClose,
    open,
    updateFormValues,
    categories,
    clearFile,
}: AddProductModalProps) => {
    const { darkTheme } = useThemeContext();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    background: darkTheme ? "#0f0f12" : "",
                },
            }}
        >
            <Form method="post" encType="multipart/form-data">
                <DialogTitle sx={{ textAlign: "center" }}>Add Product</DialogTitle>
                <DialogContent>
                    <Stack spacing={3}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            required
                            name="name"
                            type="text"
                            fullWidth
                            onChange={updateFormValues}
                            value={formValues.name}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField
                                required
                                label="Amount in stock"
                                type="number"
                                name="stock_amount"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={updateFormValues}
                                inputProps={{
                                    min: 0,
                                }}
                                value={formValues.stock_amount}
                            />
                            <Select
                                name="category"
                                label="Category"
                                required
                                fullWidth
                                value={formValues.category}
                                onChange={updateFormValues}
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <FormControl variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-price"
                                    endAdornment={
                                        <InputAdornment position="start">
                                            {String.fromCodePoint(8358)}
                                        </InputAdornment>
                                    }
                                    aria-describedby="outlined-price-helper-text"
                                    inputProps={{
                                        "aria-label": "price",
                                    }}
                                    value={formValues.price}
                                    onChange={updateFormValues}
                                    required
                                    name="price"
                                    type="number"
                                />
                                <FormHelperText id="outlined-price-helper-text">
                                    Price
                                </FormHelperText>
                            </FormControl>
                            <FormControl variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={
                                        <InputAdornment position="end">kg</InputAdornment>
                                    }
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        "aria-label": "weight",
                                    }}
                                    name="weight"
                                    type="number"
                                    onChange={updateFormValues}
                                    value={formValues.weight}
                                />
                                <FormHelperText id="outlined-weight-helper-text">
                                    Weight (optional)
                                </FormHelperText>
                            </FormControl>
                        </Stack>
                        <FormControlLabel
                            control={<Switch defaultChecked />}
                            label="Public"
                            name="is_public"
                        />
                    </Stack>
                    <FileField
                        onChange={updateFormValues}
                        file={formValues.thumbnail}
                        clearFile={clearFile}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" color="info">
                        Save
                    </Button>
                </DialogActions>
            </Form>
        </Dialog>
    );
};

export default ProductCreateUpdateModal;
