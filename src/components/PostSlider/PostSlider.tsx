import { useState, useRef, useEffect, useCallback } from 'react';

import Post from './Post/Post';
import classes from './PostSlider.module.scss';

const PostSlider = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [clientX, setClientX] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const [dragStartPoint, setDragStartPoint] = useState(0);

    const sliderRef = useRef<null | HTMLDivElement>(null);

    const dragStart = useCallback((e: React.MouseEvent) => {
        setIsDragging(true);
        setClientX(e.clientX);
        setDragStartPoint(e.clientX);
    }, []);

    const dragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    const dragging = useCallback((e: React.MouseEvent) => {
        if (isDragging && sliderRef.current) {
            sliderRef.current.scrollLeft = scrollX - e.clientX + clientX;
            setScrollX(scrollX - e.clientX + clientX);
            setClientX(e.clientX);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDragging, dragStartPoint]);

    useEffect(() => {
        document.addEventListener('mouseup', dragEnd);

        return () => {
            document.removeEventListener('mouseup', dragEnd);
        }
    }, [dragEnd]);

    const postCards = ['#c3000e', '#b2000d', '#90000a', '#6e0008', '#236765',
        '#3BAFAB', '#2E8683', '#194846', '#0E2928'].map(item => {
        return <Post key={item} backgroundColor={item} />
    });

    // useEffect(() => {
    //     if (sliderRef.current) {
    //         console.log("HEY I AM HERE")
    //         console.log(scrollX)
    //         sliderRef.current.scrollLeft = scrollX;

    //         console.log(sliderRef.current.scrollLeft)
    //     }
    // }, [scrollX])

    const test = () => {
        if (sliderRef.current) {
            console.log(sliderRef.current.scrollLeft)
            setScrollX(prevState => prevState + 200)
            // sliderRef.current.scrollLeft -= 200
        }
    }

    return (
        <div className={classes.SliderContainer}>
            <div className={classes.PostSliderOuter}>
                <div
                    id="test"
                    className={classes.PostSlider}
                    ref={sliderRef}
                    onMouseDown={(e) => dragStart(e)}
                    onMouseUp={dragEnd}
                    onMouseMove={(e) => dragging(e)}
                >
                    {postCards}
                </div>
            </div>
            <div className={classes.PostSliderCta}>
                SLIDER CTA

                <button onClick={test}>PRESS ME!</button>
            </div>
        </div>
    );
}

export default PostSlider;