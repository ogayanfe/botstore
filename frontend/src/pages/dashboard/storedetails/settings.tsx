import { Form, useRouteLoaderData } from "react-router-dom";
import { TextField, Button, ButtonGroup } from "@mui/material";
import { StoreType } from "../store";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useRef, useState } from "react";
import { useThemeContext } from "../../../context/themeContext";

type ImageFieldProps = {
    defaultUrl?: string;
    styles?: React.CSSProperties;
    label: string;
    name?: string;
};

function ImageField({ defaultUrl, styles, name, label }: ImageFieldProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [disabled, setDisabled] = useState(true);
    const [file, setFile] = useState<File | null>(null);

    return (
        <div className="w-full gap-4 flex flex-col text-gray-900 dark:text-gray-300" style={styles}>
            <div className="font-bold text-xl max-xm:flex-col max-xm:gap-4 items-center  flex justify-between">
                <label>{label}</label>
                <ButtonGroup>
                    <Button
                        startIcon={<EditIcon />}
                        onClick={() => {
                            inputRef.current?.click();
                            setDisabled(false);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        startIcon={<ClearIcon />}
                        onClick={() => {
                            setDisabled(true);
                            setFile(null);
                            if (inputRef.current) inputRef.current.value = "";
                        }}
                    >
                        Clear
                    </Button>
                </ButtonGroup>
                <input
                    type="file"
                    name={name}
                    className="fixed -left-[1000000px]"
                    ref={inputRef}
                    disabled={disabled}
                    onChange={(e) => {
                        const fileList = e.target.files;
                        if (!fileList) return;
                        setFile(fileList[0]);
                    }}
                />
            </div>
            <div className="flex items-center w-full relative my-3 justify-center rounded-2xl overflow-hidden">
                <div className="bg-gray-200 dark:bg-gray-900 w-fit h-fit max-w-full h-max-full rounded-md overflow-hidden">
                    <img
                        src={file ? URL.createObjectURL(file) : defaultUrl}
                        alt="store logo"
                        className="w-fit max-w-[500px] rounded-rull max-h-[60vh] object-contain"
                    />
                </div>
            </div>
        </div>
    );
}

export default function DashboardStoreSettings() {
    const { data: storeDetail } = useRouteLoaderData("storeDetailsHome") as { data: StoreType };
    const { name, moto, created, logo, is_public } = storeDetail;
    const { darkTheme } = useThemeContext();

    return (
        <div className="w-full flex items-center justify-center px-4 sm:px-6 py-10 md:px-10">
            <Form className="w-full max-w-2xl justify-center items-center flex flex-col gap-10">
                <TextField label="Store Name" name="name" fullWidth defaultValue={name} />
                <TextField
                    label="Store Moto"
                    name="moto"
                    fullWidth
                    multiline
                    rows={8}
                    defaultValue={moto}
                />
                <ImageField
                    defaultUrl={logo}
                    label="Store Moto"
                    styles={{
                        border: "1px solid",
                        padding: "20px",
                        borderRadius: "10px",
                        borderColor: darkTheme ? "#4a4b4d" : "#bfc0c1",
                    }}
                />
            </Form>
        </div>
    );
}
