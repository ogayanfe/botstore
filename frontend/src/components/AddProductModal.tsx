import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
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
import { Form } from "react-router-dom";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { ChangeEvent, useRef } from "react";

function FileField() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    function handleChange(e: ChangeEvent<HTMLInputElement>) {}

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                name="image"
                className="fixed left-[-100000px]"
                ref={inputRef}
            />
            <Stack direction="row" spacing={1}>
                <div className="flex-grow bg-gray-100 text-md dark:bg-gray-900 pl-4 p-1 rounded-md">
                    You have not selected any file
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    endIcon={<FileUploadRoundedIcon />}
                    onClick={() => inputRef.current?.click()}
                >
                    Choose Image
                </Button>
            </Stack>
        </div>
    );
}

interface AddProductModalProps {
    formValues: {
        is_public: boolean;
        name: string;
        description: string;
        stock_amount: string;
        price: string;
        weight: string;
        image_url?: string;
        category: string;
    };
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
}: AddProductModalProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    background: "#0f0f12",
                },
            }}
        >
            <Form method="post">
                <DialogTitle sx={{ textAlign: "center" }}>Add Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add a new product</DialogContentText>
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
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Description"
                            required
                            name="description"
                            type="text"
                            fullWidth
                            inputProps={{
                                max: 128,
                            }}
                            onChange={updateFormValues}
                            value={formValues.description}
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
                                    Weight
                                </FormHelperText>
                            </FormControl>
                        </Stack>
                        <FormControlLabel
                            control={<Switch defaultChecked />}
                            label="Public"
                            name="is_public"
                        />
                    </Stack>
                    <FileField />
                </DialogContent>
                <DialogActions>
                    <Button color="error">Cancel</Button>
                    <Button type="submit" color="info">
                        Save
                    </Button>
                </DialogActions>
            </Form>
        </Dialog>
    );
};

export default ProductCreateUpdateModal;
