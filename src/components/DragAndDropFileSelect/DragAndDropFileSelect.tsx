import { useRef, useState, useEffect, useCallback } from 'react';

import classes from './DragAndDropFileSelect.module.scss';
import File from '../File/File';

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

interface DragAndDropFileSelectPropsType {
    singleImageSelect?: boolean
    file: File
    fileList?: FileList
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
    dropHandle: (file: any) => void
}

const DragAndDropFileSelect = (props: DragAndDropFileSelectPropsType) => {
    const { singleImageSelect, file, dropHandle } = props;
    const [classList, setClassList] = useState([classes.DropContainer]);
    const [contentClassList, setContentClassList] = useState([classes.DropContainer__InfoText]);
    const [labelText, setLabelText] = useState('DRAG YOUR FILE HERE (.png, .jpeg, jpg)');
    const [dataTransferFiles, setDataTransferFiles] = useState<FileList | null>();
    const [selectedFileName, setSelectedFileName] = useState<string>('');
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

        setClassList([classes.DropContainer]);

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

        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            if (singleImageSelect) {
                if(checkMimeType(event.dataTransfer.files[0].type)) {
                    dropHandle(event.dataTransfer.files[0]);
                    dragCounterRef.current = 0;
    
                    const name = event.dataTransfer.files[0].name;

                    setClassList([classes.DropContainer, classes.DropContainer__Enter]);
                    setDataTransferFiles(event.dataTransfer.files);
                    setSelectedFileName(name);
                    setLabelText(`Selected file: ${name}`);
                } else {
                    // If file is selected previously
                    if (!file) {
                        dropHandle(undefined);
                        // Reset the state
                        setClassList([classes.DropContainer])
                        setContentClassList([classes.DropContainer__InfoText]);
                        setLabelText('DRAG YOUR FILE HERE (.png, .jpeg, jpg)');
                        setDataTransferFiles(null);
                        setSelectedFileName('');
                    } else {
                        if(selectedFileName !== undefined || selectedFileName !== '') {
                            // Single file case
                            const name = (file as File).name;
                            setClassList([classes.DropContainer, classes.DropContainer__Enter]);
                            setContentClassList([classes.DropContainer__InfoText, classes.ValidFileType]);
                            setDataTransferFiles(event.dataTransfer.files);
                            setSelectedFileName(name);
                            setLabelText(`Selected file: ${name}`);
                        }
                    }
                }
            } else {
                // TODO handle multiple image select
            }
        }
    }, [dropHandle, file, selectedFileName, singleImageSelect]);

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

    const onFileSelectedViaButton = (file: File) => {
        if(!checkMimeType(file.type)) {
            return;
        }

        setClassList([classes.DropContainer, classes.DropContainer__Enter]);
        setContentClassList([classes.DropContainer__InfoText, classes.ValidFileType]);
        setSelectedFileName(file.name);
        setLabelText(`Selected file: ${file.name}`);

        dropHandle(file);
    }

    return (
        <div className={classList.join(' ')} ref={dropRef}>
            <p className={contentClassList.join(' ')}>{labelText}</p>

            <div className={classes.DropContainer__FileSelect}>
                <File
                    isMultiple={!singleImageSelect}
                    selectedFile={onFileSelectedViaButton}
                    droppedFile={dataTransferFiles}
                />
            </div>
        </div>
    );
}

export default DragAndDropFileSelect;