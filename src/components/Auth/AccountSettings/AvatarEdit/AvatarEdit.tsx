import { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './AvatarEdit.module.scss';
import Button from '../../../UI/Button/Button';
import AvatarShowcase from './AvatarShowcase/AvatarShowcase';
import DragAndDropFileSelect from '../../../DragAndDropFileSelect/DragAndDropFileSelect';
import type { StateType } from '../../../../store/reducers/types';

interface AvatarEditPropsType {
    updatedUserImage: (file: File) => void
}

const AvatarEdit = (props: AvatarEditPropsType) => {
    const userImage: string | null = useSelector((state: StateType) => state.userImage);
    const [selectedFile, setSelectedFile] = useState<File | null>();

    const onFileSelectedHandler = (file: File | undefined) => {
        setSelectedFile(file);
    }

    const updateUserImage = () => {
        selectedFile && props.updatedUserImage(selectedFile);

        setSelectedFile(null);
    }

    return (
        <div className={classes.AvatarEdit}>
            <h2>EDIT AVATAR</h2>

            <AvatarShowcase userImage={userImage} />

            <DragAndDropFileSelect
                dropHandle={onFileSelectedHandler}
                singleImageSelect
                file={selectedFile as File}
                userImage={userImage}
            />

            <div className={classes.AvatarEdit__Cta}>
                <Button
                    btnType='BtnCustom'
                    label='Update'
                    disabled={!selectedFile}
                    clicked={updateUserImage}
                />
            </div>
        </div>
    );
}

export default AvatarEdit;