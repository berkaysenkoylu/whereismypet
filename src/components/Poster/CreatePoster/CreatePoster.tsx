import { useForm, SubmitHandler } from 'react-hook-form';

import classes from './CreatePoster.module.scss';
import Input from '../../UI/Input/Input';
import PickLocation from '../../PickLocation/PickLocation';

interface CreatePosterFormType {
    title: string
    description: string
}

const CreatePoster = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<CreatePosterFormType>({
        defaultValues: {
            title: ""
        },
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<CreatePosterFormType> = (data) => {
        console.log(data);
    };

    console.log(isValid)

    return (
        <section className={classes.CreatePoster}>
            <h2>CREATE A NEW POSTER</h2>

            <div className={classes.CreatePoster__Body}>
                <div className={classes.CreatePoster__Body__Left}>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <Input
                            testid='testid-newposter-title'
                            elementType='input'
                            elementConfig={{
                                type: "text",
                                placeholder: "Title",
                            }}
                            name='title'
                            register={register}
                            validation={{
                                required: { value: true, message: "This field is required" },
                                maxLength: { value: 32, message: "You can input max 32 characters" }
                            }}
                            control={control}
                            validationResult={errors['title'] || {}}
                            lastChild={false}
                        />

                        <Input
                            testid='testid-newposter-desc'
                            elementType='textarea'
                            elementConfig={{
                                type: "text",
                                placeholder: "Description",
                            }}
                            name='description'
                            register={register}
                            validation={{
                                required: { value: true, message: "This field is required" }
                            }}
                            control={control}
                            validationResult={errors['description'] || {}}
                            lastChild={false}
                        />

                        <PickLocation />
                    </form>
                </div>
                <div className={classes.CreatePoster__Body__Right}>

                </div>
            </div>
        </section>
    );
}

export default CreatePoster;