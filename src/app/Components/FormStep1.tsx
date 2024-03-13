// pages/Step1.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { useFormContext } from '../Contexts/FormContext';



type FormStep1Type = {
    formSubmit: Function;
    formValidatedStatus: React.MutableRefObject<any>;
    setFormValues: Function;
    // formValues: any;
    handleNext: Function;
}

type formInputType = {
    label: string;
    rules: RegExp;
}


export function FormStep1({ formSubmit, formValidatedStatus, handleNext }: FormStep1Type) {
    const { formValues, setFormValues } = useFormContext();
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({
        mode: 'all',
        defaultValues: formValues.form1
    });
    const [open, setOpen] = React.useState([]);
    const [formValue, setFormValue] = React.useState({ 'First name': '', 'Last name': '', 'Parent names': '', 'Email': '', 'Address': '' });




    const formInputs = [
        { label: 'First name', rules: /^[A-Za-z]+$/i },
        { label: 'Last name', rules: /^[A-Za-z]+$/i },
        { label: 'Parent names', rules: /^[A-Za-z]+$/i },
        { label: 'Phone number', rules: /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im },
        { label: 'Email', rules: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
        { label: 'Address', rules: /^[a-z0-9\s,'-]*$/i }];



    // const router = useRouter();

    const onSubmit = (data: any) => {
     
        if (data) {

            formValidatedStatus.current.FormStep1 = true;
            setFormValues((prevState: any) => ({ ...prevState, form1: data }));
            handleNext();
        }

    };


    function checkValidationError(errors: any, inputLabel: string) {
        console.log(errors[inputLabel], 'checkValidationError');
        const label = inputLabel.toLowerCase();

        let alert = '';
        if (errors[inputLabel]?.type === "required") {
            alert = 'This field is required!';
        }
        else if (errors[inputLabel]?.type === "pattern") {
            alert = `Invalid ${label}`;
        }


        return alert;

    }


    function handleChange(e: { target: { value: any; }; }, inputName: any) {
        const value = e.target.value;
        setFormValue(prevState => ({ ...prevState, [inputName]: value }))
    }

    const form = formInputs.map((input: any, index: number) => {
        console.log(errors, input, 'hjkgkkw');

        return <Box key={index} sx={{ marginBottom: '10px', width: '500px', display: 'flex', justifyContent: 'center' }} >
            <Controller
                // onChange={(e: { target: { value: any; }; }) => handleChange(e, input.label)}
                name={input.label}
                control={control}
                rules={{ required: true, pattern: input.rules }}
                render={({ field }) => <>
                    {/* <label>{input.label}</label> */}
                    {/* <input placeholder={input.label} {...field} aria-invalid={errors[input.label] ? "true" : "false"} /> */}
                    <TextField
                        // onChange={(e) => handleChange(e, input.label)}
                        fullWidth
                        {...field}
                        name={input.label}
                        label={input.label}
                        variant="outlined"
                        // aria-invalid={errors[input.label] ? "true" : "false"}
                        error={!!checkValidationError(errors, input.label)}
                        helperText={checkValidationError(errors, input.label)}
                    // defaultValue={defaultValues}
                    />
                </>
                }
            />
          
        </Box>
    })





    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {form}
                <Button type="submit" variant="contained">Next</Button>
            </form>
        </Box>
    );
}
