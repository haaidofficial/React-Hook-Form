import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../Contexts/FormContext';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Result } from './Result';
import AutohideSnackbar from './Alert';

interface FormData {
    dynamicInputs: { value: string }[];
}

export function DynamicInputForm({ handleNext }: any) {
    const [alertOpen, setAlertOpen] = React.useState({status: false, message: ''});

    const { formValues, setFormValues } = useFormContext();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: { dynamicInputs: [{ value: '' }] },
        mode: 'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'dynamicInputs',
    });
    const [finalStatus, setFinalStatus] = React.useState('idle');

    const onSubmit = (data: FormData) => {
        const inputData = data.dynamicInputs;



        setFormValues((prevState: any) => ({ ...prevState, form2: inputData }));
        setFinalStatus('ok');
        setAlertOpen({status: true, message: 'Form submitted'});

    };



    function checkValidationError(errors: any) {

        let alert = '';
        if (errors) {
            if (errors.value.type === "pattern") {
                alert = `Invalid input`;
            }
        }


        return alert;

    }
 

    return (
        <>
        <AutohideSnackbar alert={alertOpen}/>
            {
                finalStatus === 'ok' && <Result />
            }


            {
                finalStatus !== 'ok' && <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Dynamic Input Form</h1>
                    {/* Dynamic input fields */}
                    {fields.map((field, index) => (
                        <div key={field.id} style={{ marginTop: '10px' }}>
                            <Controller
                                name={`dynamicInputs.${index}.value`}
                                control={control}
                                defaultValue=""
                                rules={{ pattern: /^[A-Za-z]+$/i }}
                                render={({ field }) => (
                                    <TextField
                                        // onChange={(e) => handleChange(e, input.label)}
                                        // className={`member-input`}
                                        fullWidth
                                        {...field}
                                        error={!!errors.dynamicInputs?.[index]}
                                        helperText={checkValidationError(errors.dynamicInputs?.[index])}
                                    // defaultValue={defaultValues}
                                    />
                                    // <input
                                    //     {...field}
                                    //     type="text"
                                    //     required // Add validation rule
                                    // />
                                )}
                            />
                            {index > 0 && (
                                <Button sx={{ marginTop: '10px' }} type="button" variant="contained" onClick={() => remove(index)}>  Remove</Button>
                            )}
                        </div>
                    ))}

                    <Box>
                        <br />
                        <Button type="button" variant="contained" onClick={() => append({ value: '' })}>Add More</Button>
                        &nbsp;
                        <Button type="submit" variant="contained">Next</Button>
                    </Box>

                </form>
            }


        </>
    );
};

