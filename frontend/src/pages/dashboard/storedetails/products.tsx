import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { Form } from "react-router-dom";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function Header() {
    const [currentCategory, setCurrentCategory] = useState("all");

    return (
        <div className="flex justify-end px-8 p-6">
            <div className="flex gap-4">
                <FormControl
                    fullWidth
                    component={Form}
                    size="small"
                    id="select-category-form"
                    sx={{ width: "112px" }}
                >
                    <InputLabel id="select-category-label">Category</InputLabel>
                    <Select
                        labelId="select-category-label"
                        id="select-category"
                        label="category"
                        name="category"
                        onChange={(e) => {
                            setCurrentCategory(e.target.value);
                        }}
                        value={currentCategory}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Button endIcon={<AddIcon />} variant="contained" color="primary" size="small">
                    Add
                </Button>
            </div>
        </div>
    );
}

export default function DashboardStoreProducts() {
    return (
        <div>
            <Header />
        </div>
    );
}
