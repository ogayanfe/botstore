interface ImagePreviewPropType {
    file: string;
    removeImage: () => void;
}

export default function ImagePreview({ file, removeImage }: ImagePreviewPropType) {
    return (
        <div className="w-full float-right relative mt-3 p-4 ">
            <img
                src={file}
                alt="selected file preview"
                className="w-full rounded-lg object-cover max-h-[50vh]"
            ></img>
            <button
                className="w-full h-full p-3  rounded-lg lg:text-2xl absolute top-0 left-0 bg-gray-900 opacity-0 hover:opacity-80 text-white transition-all"
                onClick={removeImage}
                type="button"
            >
                Remove Image
            </button>
        </div>
    );
}
