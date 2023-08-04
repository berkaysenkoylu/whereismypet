import classes from './AvatarEdit.module.scss';
import Button from '../../../UI/Button/Button';
import AvatarShowcase from './AvatarShowcase/AvatarShowcase';
import DragAndDropFileSelect from '../../../DragAndDropFileSelect/DragAndDropFileSelect';

const AvatarEdit = () => {
    return (
        <div className={classes.AvatarEdit}>
            <h2>EDIT AVATAR</h2>

            <AvatarShowcase />

            <DragAndDropFileSelect />

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