const FORM_FIELDS = {
    firstname: {
        elementType: 'input',
        elementConfig: {
            type: "text",
            placeholder: "First name",
        },
        validation: {
            required: { value: true, message: "This field is required" },
            maxLength: { value: 16, message: "You can input max 16 characters" },
        },
    },
    lastname: {
        elementType: 'input',
        elementConfig: {
            type: "text",
            placeholder: "Last name",
        },
        validation: {
            required: { value: true, message: "This field is required" },
            maxLength: { value: 16, message: "You can input max 16 characters" },
        },
    },
    username: {
        elementType: 'input',
        elementConfig: {
            type: "text",
            placeholder: "Username",
        },
        validation: {
            required: { value: true, message: "This field is required" },
            maxLength: { value: 20, message: "You can input max 20 characters" },
        },
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: "text",
            placeholder: "Email",
        },
        validation: {
            required: { value: true, message: "This field is required" },
            pattern: { value: /^\S+@\S+$/i, message: "Email form is not correct" },
        },
    }
};

export default FORM_FIELDS;