import { ChangeEvent, useRef } from 'react';

import classes from './File.module.scss';
import Button from '../UI/Button/Button';

interface FilePropsType {
    isMultiple: boolean | undefined
    droppedFile: FileList | null | undefined
    // eslint-disable-next-line no-unused-vars
    selectedFile?: (file: File) => void
    // eslint-disable-next-line no-unused-vars
    selectedFiles?: (fileList: FileList) => void
}

const File = (props: FilePropsType) => {
    const { isMultiple, droppedFile, selectedFile, selectedFiles } = props;
    const fileInput = useRef<HTMLInputElement>(null);

    const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        // TODO handle more than one file selects later
        if (!isMultiple) {
            selectedFile && selectedFile(event.target.files[0]);
        } else {
            selectedFiles && selectedFiles(event.target.files);
        }
    }

    if(droppedFile) {
        if (fileInput.current) {
            fileInput.current.files = droppedFile;
        }
    }

    const openFilePicker = (e: React.MouseEvent<HTMLElement> | undefined) => {
        e?.preventDefault();

        if (fileInput.current) {
            fileInput.current.click();
        }
    }

    return (
        <>
            <input
                type="file"
                name="image"
                id="image"
                multiple={props.isMultiple}
                onChange={onFileSelected}
                ref={fileInput}
                className={classes.Input}
            />

            <Button
                btnType="BtnCustom"
                btnSize="BtnSmall"
                label="Select"
                clicked={openFilePicker}
            />
        </>
    )
}

export default File;