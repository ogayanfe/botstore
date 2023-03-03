import { Form, LoaderFunctionArgs, useRouteLoaderData } from "react-router-dom";
import { TextField, Button, ButtonGroup, FormControlLabel, Switch } from "@mui/material";
import Fab from "@mui/material/Fab";
import { StoreType } from "../store";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useRef, useState } from "react";
import { useThemeContext } from "../../../context/themeContext";
import { getApiClient } from "../../../utils/authutils";
import PublishIcon from "@mui/icons-material/Publish";

type ImageFieldProps = {
    defaultUrl?: string;
    styles?: React.CSSProperties;
    label: string;
    name?: string;
};

function ImageField({ defaultUrl, styles, name, label }: ImageFieldProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);

    return (
        <div className="w-full gap-4 flex flex-col text-gray-900 dark:text-gray-300" style={styles}>
            <div className="font-bold text-xl max-xm:flex-col max-xm:gap-4 items-center  flex justify-between">
                <label>{label}</label>
                <ButtonGroup>
                    <Button
                        startIcon={<EditIcon />}
                        onClick={() => {
                            if (inputRef.current) {
                                inputRef.current.disabled = false;
                                inputRef.current.click();
                            }
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        startIcon={<ClearIcon />}
                        onClick={() => {
                            setFile(null);
                            if (inputRef.current) {
                                inputRef.current.value = "";
                                inputRef.current.disabled = true;
                            }
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
                    disabled={true}
                    accept="image/*"
                    onChange={(e) => {
                        const fileList = e.target.files;
                        if (!fileList) {
                            e.target.disabled = true;
                            return;
                        }
                        setFile(fileList[0]);
                    }}
                />
            </div>
            <div className="flex items-center w-full relative my-3 justify-center">
                <img
                    src={file ? URL.createObjectURL(file) : defaultUrl}
                    alt="store logo"
                    className="max-w-[500px] w-full rounded-rull max-h-[60vh] rounded-sm object-contain"
                />
            </div>
        </div>
    );
}

export default function DashboardStoreSettings() {
    const { data: storeDetail } = useRouteLoaderData("storeDetailsHome") as { data: StoreType };
    const { name, moto, created, logo, is_public } = storeDetail;
    const { darkTheme } = useThemeContext();
    const [switchChecked, setSwitchChecked] = useState(is_public);

    return (
        <div className="w-full flex items-center justify-center px-6 sm:px-6 py-10 pb-[7rem] md:px-10">
            <Form
                className="w-full max-w-2xl justify-center items-center flex flex-col gap-10"
                method="post"
                encType="multipart/form-data"
            >
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
                    name="logo"
                    styles={{
                        border: "1px solid",
                        padding: "20px",
                        borderRadius: "10px",
                        borderColor: darkTheme ? "#4a4b4d" : "#bfc0c1",
                    }}
                />
                <div
                    className="text-gray-900 dark:text-gray-200 border-[1px] justify-start rounded-lg items-center w-full"
                    style={{
                        borderColor: darkTheme ? "#4a4b4d" : "#bfc0c1",
                    }}
                >
                    <Switch
                        checked={switchChecked}
                        onChange={(e) => setSwitchChecked(e.target.checked)}
                        name="is_public"
                    />
                </div>
                <div className="absolute right-7 xl:right-[12%] bottom-10">
                    <Fab type="submit" aria-label="update" color="primary">
                        <PublishIcon />
                    </Fab>
                </div>
            </Form>
        </div>
    );
}

export async function dashboardSettingsAction({ params, request }: LoaderFunctionArgs) {
    const apiClient = getApiClient();
    const { storeId } = params;
    const formData = await request.formData();
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    return await apiClient.patch(`api/store/${storeId}/`, formData, config);
}
