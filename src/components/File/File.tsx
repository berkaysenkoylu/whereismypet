import { ChangeEvent, useRef } from 'react';

import classes from './File.module.scss';
import Button from '../UI/Button/Button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const File = (props: any) => {
    const fileInput = useRef<HTMLInputElement>(null);

    const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        // TODO handle more than one file selects later
        props.selectedFile(event.target.files[0]);
    }

    if(props.droppedFile) {
        if (fileInput.current) {
            fileInput.current.files = props.droppedFile;
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
            <input type="file" name="image" id="image" onChange={onFileSelected} ref={fileInput} className={classes.Input} />

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