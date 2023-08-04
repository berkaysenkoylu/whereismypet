import { useRef, useState } from 'react';

import classes from './DragAndDropFileSelect.module.scss';
import File from '../File/File';

const DragAndDropFileSelect = () => {
    const [classList, setClassList] = useState([classes.DropContainer]);
    const dropRef = useRef<HTMLDivElement>(null);

    return (
        <div className={classList.join(' ')} ref={dropRef}>
            <p className={classes.DropContainer__InfoText}>DROP YOUR IMAGE HERE!</p>

            <div className={classes.DropContainer__FileSelect}>
                <File />
            </div>
        </div>
    );
}

export default DragAndDropFileSelect;