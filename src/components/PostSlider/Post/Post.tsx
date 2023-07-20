import classes from './Post.module.scss';

interface PostPropsType {
    backgroundColor?: string
}

const Post = (props: PostPropsType) => {
    return (
        <div className={classes.Post} style={{backgroundColor: props.backgroundColor}}>
            &nbsp;
        </div>
    );
}

export default Post;