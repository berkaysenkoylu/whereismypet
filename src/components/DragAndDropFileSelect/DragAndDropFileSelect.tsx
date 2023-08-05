import { useRef, useState, useEffect, useCallback } from 'react';

import classes from './DragAndDropFileSelect.module.scss';
import File from '../File/File';

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const DragAndDropFileSelect = () => {
    const [classList, setClassList] = useState([classes.DropContainer]);
    const [contentClassList, setContentClassList] = useState([classes.DropContainer__InfoText]);
    const [labelText, setLabelText] = useState('DRAG YOUR FILE HERE (.png, .jpeg, jpg)');
    const [dataTransferFiles, setDataTransferFiles] = useState(undefined);
    const [selectedFileName, setSelectedFileName] = useState(undefined);
    const dropRef = useRef<HTMLDivElement>(null);
    const dragCounterRef = useRef<number>(0);

    const checkMimeType = (file: string) => {
        return MIME_TYPE_MAP[file as keyof typeof MIME_TYPE_MAP];
    }

    const dragInHandler = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        dragCounterRef.current += 1;

        setClassList([classes.DropContainer, classes.DropContainer__Enter]);

        if (event.dataTransfer && event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            const isValid = checkMimeType(event.dataTransfer.items[0].type);
            if(isValid) {
                setContentClassList([classes.DropContainer__InfoText, classes.ValidFileType]);
                setLabelText('DROP YOUR FILE HERE');
            }
            else {
                setContentClassList([classes.DropContainer__InfoText, classes.InvalidFileType]);
                setLabelText('INVALID FILE TYPE!');
            }
        }
    }, []);

    const dragOutHandler = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        dragCounterRef.current -= 1;
        if(dragCounterRef.current > 0) {
            return;
        }

        if(selectedFileName === undefined || selectedFileName === '') {
            setClassList([classes.DropContainer]);
            setContentClassList([classes.DropContainer__InfoText]);
            setLabelText('DRAG YOUR FILE HERE (.png, .jpeg, jpg)');
        } else {
            setClassList([classes.DropContainer, classes.DropContainer__Enter]);
            setContentClassList([classes.DropContainer__InfoText, classes.ValidFileType]);
            setLabelText(`Selected file: ${selectedFileName}`);
        }
    }, [selectedFileName]);

    const dragOverHandler = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const dropHandler = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    useEffect(() => {
        const dropElement = dropRef.current;

        dropElement?.addEventListener('dragenter', dragInHandler);
        dropElement?.addEventListener('dragleave', dragOutHandler);
        dropElement?.addEventListener('dragover', dragOverHandler);
        dropElement?.addEventListener('drop', dropHandler);

        return () => {
            dropElement?.removeEventListener('dragenter', dragInHandler);
            dropElement?.removeEventListener('dragleave', dragOutHandler);
            dropElement?.removeEventListener('dragover', dragOverHandler);
            dropElement?.removeEventListener('drop', dropHandler);
        }
    }, [dragInHandler, dragOutHandler, dragOverHandler, dropHandler]);

    return (
        <div className={classList.join(' ')} ref={dropRef}>
            <p className={contentClassList.join(' ')}>{labelText}</p>

            <div className={classes.DropContainer__FileSelect}>
                <File />
            </div>
        </div>
    );
}

export default DragAndDropFileSelect;