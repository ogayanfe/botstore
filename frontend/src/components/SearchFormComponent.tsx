import SearchIcon from "@mui/icons-material/Search";

type SearchFormComponentType = {
    placeholder?: string;
    label?: string;
    onSubmit?: () => void;
    icon?: React.FC;
};

function SearchFormComponent(props: SearchFormComponentType) {
    const { placeholder = "Search...", label = "search", onSubmit, icon = <SearchIcon /> } = props;
    return (
        <form
            className="w-max bg-slate-800 dark:bg-black p-2 rounded-2xl sm:gap-2 flex items-center text-gray-300 justify-center"
            onSubmit={onSubmit}
        >
            <label htmlFor="header__search" className="flex items-center justify-center">
                <>
                    {/* I need to use react fragments here for some reason */}
                    <span className="fixed left-[-3000000px]">{label}</span>
                    {icon}
                </>
            </label>
            <input
                type="text"
                name="search"
                id="header__search"
                placeholder={placeholder}
                className="w-16 transition-all bg-inherit outline-none px-2 text-sm xm:w-20 xxm:focus:w-32 md:w-48 focus:md:w-64 lg:w-64 focus:lg:w-80 2xl:w-80 focus:2xl:w-96"
            />
        </form>
    );
}

export { SearchFormComponent };
