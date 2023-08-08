const FORM_FIELDS = {
    currentPassword: {
        elementType: 'input',
        elementConfig: {
            type: "password",
            placeholder: "Current Password",
        },
        validation: {
            required: { value: true, message: "This field is required" }
        }
    },
    newPassword: {
        elementType: 'input',
        elementConfig: {
            type: "password",
            placeholder: "New Password",
        },
        validation: {
            required: { value: true, message: "This field is required" },
            pattern: {
                value:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                message: "Please choose a stronger password",
            },
        },
    },
    confirmPassword: {
        elementType: 'input',
        elementConfig: {
            type: "password",
            placeholder: "Confirm Password",
        },
        validation: {
            required: { value: true, message: "This field is required" }
        }
    },
};

export default FORM_FIELDS;