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
    file?: File
    fileList?: FileList
    userImage?: string | null
    dropHandle?: (file: File | undefined) => void
    multiFileDropHandle?: (files: FileList | undefined) => void
}

const DragAndDropFileSelect = (props: DragAndDropFileSelectPropsType) => {
    const { singleImageSelect, file, fileList, userImage, dropHandle, multiFileDropHandle } = props;
    const [classList, setClassList] = useState([classes.DropContainer]);
    const [contentClassList, setContentClassList] = useState([classes.DropContainer__InfoText]);
    const [labelText, setLabelText] = useState('DRAG YOUR FILE HERE (.png, .jpeg, jpg)');
    const [dataTransferFiles, setDataTransferFiles] = useState<FileList | null>();
    const [selectedFileName, setSelectedFileName] = useState<string>('');
    const dropRef = useRef<HTMLDivElement>(null);
    const dragCounterRef = useRef<number>(0);

    useEffect(() => {
        setClassList([classes.DropContainer])
        setContentClassList([classes.DropContainer__InfoText]);
        setLabelText('DRAG YOUR FILE HERE (.png, .jpeg, jpg)');
        setDataTransferFiles(null);
        setSelectedFileName('');
    }, [userImage]);

    const checkMimeType = (file: string) => {
        return MIME_TYPE_MAP[file as keyof typeof MIME_TYPE_MAP];
    }

    const dragInHandler = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        dragCounterRef.current += 1;

        setClassList([classes.DropContainer, classes.DropContainer__Enter]);

        if (event.dataTransfer && event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            if (singleImageSelect) {
                    const isValid = checkMimeType(event.dataTransfer.items[0].type);
                    if(isValid) {
                        setContentClassList([classes.DropContainer__InfoText, classes.ValidFileType]);
                        setLabelText('DROP YOUR FILE HERE');
                    }
                    else {
                        setContentClassList([classes.DropContainer__InfoText, classes.InvalidFileType]);
                        setLabelText('INVALID FILE TYPE!');
                    }
            } else {
                const selectedFileList = event.dataTransfer.items;
                let validFileType = true;
                for (let i = 0; i < selectedFileList.length; i++) {
                    validFileType = validFileType &&
                        (checkMimeType(selectedFileList[i].type) === 'png' ||
                        checkMimeType(selectedFileList[i].type) === 'jpg' ||
                        checkMimeType(selectedFileList[i].type) === 'jpeg');
                }

                if(validFileType) {
                    setContentClassList([classes.DropContainer__InfoText, classes.ValidFileType]);
                    setLabelText('DROP YOUR FILES HERE');
                }
                else {
                    setContentClassList([classes.DropContainer__InfoText, classes.InvalidFileType]);
                    setLabelText('INVALID FILE TYPE!');
                }
            }
        }
    }, [singleImageSelect]);

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

            if (singleImageSelect) {
                setLabelText(`Selected file: ${selectedFileName}`);
            } else {
                setLabelText(`Selected files: ${selectedFileName}`);
            }
        }
        
    }, [selectedFileName, singleImageSelect]);

    const dragOverHandler = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const dropHandler = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        dragCounterRef.current = 0;

        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            if (singleImageSelect) {
                if(checkMimeType(event.dataTransfer.files[0].type)) {
                    dropHandle && dropHandle(event.dataTransfer.files[0]);
    
                    const name = event.dataTransfer.files[0].name;

                    setClassList([classes.DropContainer, classes.DropContainer__Enter]);
                    setDataTransferFiles(event.dataTransfer.files);
                    setSelectedFileName(name);
                    setLabelText(`Selected file: ${name}`);
                } else {
                    // If file is selected previously
                    if (!file) {
                        dropHandle && dropHandle(undefined);
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
                const selectedFileList: FileList = event.dataTransfer.files;
                let isValidMimeType = true;
                // Change this with multiple select showcase
                const possibleNameArr = [];

                if (selectedFileList.length > 4) {
                    setClassList([classes.DropContainer, classes.DropContainer__Enter]);
                    setContentClassList([classes.DropContainer__InfoText, classes.InvalidFileType]);
                    setLabelText("YOU CANNOT UPLOAD MORE THAN 4 FILES");
                    return;
                }

                for (let i = 0; i < selectedFileList.length; i++) {
                    isValidMimeType = isValidMimeType &&
                        (checkMimeType(selectedFileList[i].type) === 'png' ||
                        checkMimeType(selectedFileList[i].type) === 'jpg' ||
                        checkMimeType(selectedFileList[i].type) === 'jpeg');

                    possibleNameArr.push(selectedFileList[i].name);
                }

                if (!isValidMimeType) {
                    // If files are not selected previously
                    if (!fileList) {
                        multiFileDropHandle && multiFileDropHandle(undefined);
                        
                        setClassList([classes.DropContainer])
                        setContentClassList([classes.DropContainer__InfoText]);
                        setLabelText('DRAG YOUR FILES HERE (.png, .jpeg, jpg)');
                        setDataTransferFiles(null);
                        setSelectedFileName('');
                    } else {
                        if(selectedFileName !== undefined || selectedFileName !== '') {
                            setClassList([classes.DropContainer, classes.DropContainer__Enter]);
                            setContentClassList([classes.DropContainer__InfoText, classes.ValidFileType]);
                            setSelectedFileName(selectedFileName);
                            setLabelText(`Selected file: ${selectedFileName}`);
                        }
                    }
                } else {
                    multiFileDropHandle && multiFileDropHandle(selectedFileList);

                    setClassList([classes.DropContainer, classes.DropContainer__Enter]);
                    setContentClassList([classes.DropContainer__InfoText, classes.ValidFileType]);
                    setDataTransferFiles(selectedFileList);
                    setSelectedFileName(possibleNameArr.join(', '));
                    setLabelText(`Selected files: ${possibleNameArr.join(', ')}`);
                }
            }
        }
    }, [dropHandle, multiFileDropHandle, file, fileList, selectedFileName, singleImageSelect]);

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

    const onFileSelectedViaButton = (file: File | FileList) => {
        if (singleImageSelect) {
            const inpFile = file as File;
            if(!checkMimeType(inpFile.type)) {
                return;
            }

            setClassList([classes.DropContainer, classes.DropContainer__Enter]);
            setContentClassList([classes.DropContainer__InfoText, classes.ValidFileType]);
            setSelectedFileName(inpFile.name);
            setLabelText(`Selected file: ${inpFile.name}`);

            dropHandle && (inpFile);
        } else {
            const selectedFileList: FileList = file as FileList;
            let isValidMimeType = true;
            // Change this with multiple select showcase
            const possibleNameArr = [];

            for (let i = 0; i < selectedFileList.length; i++) {
                isValidMimeType = isValidMimeType &&
                    (checkMimeType(selectedFileList[i].type) === 'png' ||
                    checkMimeType(selectedFileList[i].type) === 'jpg' ||
                    checkMimeType(selectedFileList[i].type) === 'jpeg');

                possibleNameArr.push(selectedFileList[i].name);
            }

            if (!isValidMimeType) {
                // if files had been selected previously
                if (fileList) {
                    setClassList([classes.DropContainer, classes.DropContainer__Enter]);
                    setContentClassList([classes.DropContainer__InfoText, classes.ValidFileType]);
                    setLabelText(`Selected files: ${selectedFileName}`);
                } else {
                    setClassList([classes.DropContainer, classes.DropContainer__Enter]);
                    setContentClassList([classes.DropContainer__InfoText, classes.InvalidFileType]);
                    setLabelText('INVALID FILE TYPE!');
                }
            } else {
                multiFileDropHandle && multiFileDropHandle(selectedFileList);

                setClassList([classes.DropContainer, classes.DropContainer__Enter]);
                setContentClassList([classes.DropContainer__InfoText, classes.ValidFileType]);
                setSelectedFileName(possibleNameArr.join(', '));
                setLabelText(`Selected files: ${possibleNameArr.join(', ')}`);
            }
        }
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