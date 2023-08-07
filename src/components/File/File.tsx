import { ChangeEvent, useRef } from 'react';

import classes from './File.module.scss';
import Button from '../UI/Button/Button';

interface FilePropsType {
    isMultiple: boolean | undefined
    droppedFile: FileList | null | undefined
    selectedFile: (file: File | FileList) => void
}

const File = (props: FilePropsType) => {
    const { isMultiple, droppedFile, selectedFile } = props;
    const fileInput = useRef<HTMLInputElement>(null);

    const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }

        selectedFile(!isMultiple ? event.target.files[0] : event.target.files);
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