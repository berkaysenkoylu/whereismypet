import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import classes from './CreatePoster.module.scss';
import Input from '../../UI/Input/Input';
import PickLocation from '../../PickLocation/PickLocation';
import CheckboxGroup from '../../UI/CheckboxGroup/CheckboxGroup';

interface CreatePosterFormType {
    title: string
    description: string
    status: string
    category: string
}

const CreatePoster = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, /*isValid*/ },
    } = useForm<CreatePosterFormType>({
        defaultValues: {
            title: '',
            description: '',
            status: 'Please select an option',
            category: 'Please select an option'
        },
        mode: 'onChange'
    });
    const [checkboxes, setCheckboxes] = useState([
        { name: 'urgent', checked: false },
        { name: 'with prize', checked: false },
        { name: 'pinned', checked: false }
    ]);

    const onItemCheckedHandler = (name: string) => {
        const copiedCheckboxes = checkboxes.map(item => {
            if (item.name === name) {
                item.checked = !item.checked;
            }
            return item;
        });

        setCheckboxes(copiedCheckboxes);
    }

    const onSubmit: SubmitHandler<CreatePosterFormType> = (data) => {
        console.log(data);
    };

    return (
        <section className={classes.CreatePoster}>
            <h2>CREATE A NEW POSTER</h2>

            <div className={classes.CreatePoster__Body}>
                <div className={classes.CreatePoster__Body__Left}>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                        <Input
                            testid='testid-newposter-title'
                            elementType='input'
                            elementConfig={{
                                type: 'text',
                                placeholder: 'Title',
                            }}
                            name='title'
                            register={register}
                            validation={{
                                required: { value: true, message: 'This field is required' },
                                maxLength: { value: 32, message: 'You can input max 32 characters' }
                            }}
                            control={control}
                            validationResult={errors['title'] || {}}
                            lastChild={false}
                        />

                        <Input
                            testid='testid-newposter-desc'
                            elementType='textarea'
                            elementConfig={{
                                type: 'text',
                                placeholder: 'Description',
                            }}
                            name='description'
                            register={register}
                            validation={{
                                required: { value: true, message: 'This field is required' }
                            }}
                            control={control}
                            validationResult={errors['description'] || {}}
                            lastChild={false}
                        />

                        <PickLocation />

                        <div className={classes.FlexRow}>
                            <Input
                                testid='testid-newposter-status'
                                elementType='select'
                                elementConfig={{
                                    type: 'select',
                                    placeholder: 'Status',
                                    options: [
                                        { value: 'lost', displayValue: 'Lost' },
                                        { value: 'found', displayValue: 'Found' }
                                    ]
                                }}
                                name='status'
                                register={register}
                                validation={{
                                    required: { value: true, message: 'This field is required' }
                                }}
                                control={control}
                                validationResult={errors['status'] || {}}
                                style={{ width: '50%' }}
                            />

                            <Input
                                testid='testid-newposter-category'
                                elementType='select'
                                elementConfig={{
                                    type: 'select',
                                    placeholder: 'Category',
                                    options: [
                                        { value: 'dog', displayValue: 'Dog' },
                                        { value: 'cat', displayValue: 'Cat' },
                                        { value: 'parakeet', displayValue: 'Parakeet' },
                                        { value: 'budgie', displayValue: 'Budgie' },
                                        { value: 'motorcycle', displayValue: 'Motorcycle' },
                                        { value: 'car', displayValue: 'Car' },
                                        { value: 'other', displayValue: 'Other' },
                                    ]
                                }}
                                name='category'
                                register={register}
                                validation={{
                                    required: { value: true, message: 'This field is required' }
                                }}
                                control={control}
                                validationResult={errors['category'] || {}}
                                style={{ width: '50%' }}
                            />
                        </div>

                        <CheckboxGroup
                            label='Tags'
                            items={checkboxes}
                            onItemChecked={onItemCheckedHandler}
                        />
                    </form>
                </div>
                <div className={classes.CreatePoster__Body__Right}>
                    
                </div>
            </div>
        </section>
    );
}

export default CreatePoster;