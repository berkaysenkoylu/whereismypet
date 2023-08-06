import { useState } from 'react';

import classes from './AvatarEdit.module.scss';
import Button from '../../../UI/Button/Button';
import AvatarShowcase from './AvatarShowcase/AvatarShowcase';
import DragAndDropFileSelect from '../../../DragAndDropFileSelect/DragAndDropFileSelect';

const AvatarEdit = () => {
    const [selectedFile, setSelectedFile] = useState<File>();

    const onFileSelectedHandler = (file: File | undefined) => {
        setSelectedFile(file);
    }

    return (
        <div className={classes.AvatarEdit}>
            <h2>EDIT AVATAR</h2>

            <AvatarShowcase />

            <DragAndDropFileSelect
                dropHandle={onFileSelectedHandler}
                singleImageSelect
                file={selectedFile as File}
            />

            <div className={classes.AvatarEdit__Cta}>
                <Button
                    btnType='BtnDanger'
                    label='Reset'
                    clicked={() => {}}
                />

                <Button
                    btnType='BtnCustom'
                    label='Update'
                    clicked={() => {}}
                />
            </div>
        </div>
    );
}

export default AvatarEdit;