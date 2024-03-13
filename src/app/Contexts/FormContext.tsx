"use client"
import React, { createContext, useContext, FC, ReactNode } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';

// Define the type for form data
type FormData = {
    'First name': string;
    'Last name': string;
    'Parent names': string;
    'Phone number': string;
    'Email': string;
    'Address': string;
};


type FormContextType = {
    form1: FormData;
    form2: any[],
    values: any[]
}


type FormContextValueType = {
    formValues: FormContextType;
    setFormValues: Function;

}

const formStructure = {
    label: 'Add member',
    rules: {
        pattern: /^[A-Za-z]+$/i,
    },
    value: ''
}


const FormContext = createContext<FormContextValueType>({
    formValues: {
        form1: {
            'First name': '',
            'Last name': '',
            'Parent names': '',
            'Phone number': '',
            'Email': '',
            'Address': '',

        },
        form2: [formStructure],
        values: []
    },
    setFormValues: Function
});


// Define the props for FormContextProvider
type FormContextProviderProps = {
    children: ReactNode;
};

// FormContextProvider component
export const FormContextProvider: FC<FormContextProviderProps> = ({ children }) => {

    const [formValues, setFormValues] = React.useState<FormContextType>({
        form1: {
            'First name': '',
            'Last name': '',
            'Parent names': '',
            'Phone number': '',
            'Email': '',
            'Address': '',

        },
        form2: [formStructure],
        values: []
    });

    const FormContextProviderValues = {
        formValues,
        setFormValues
    }

    console.log(formValues, 'formValues');
    

    return (
        <FormContext.Provider value={FormContextProviderValues}>
            {children}
        </FormContext.Provider >
    );
};


export const useFormContext = () => {
    const context = useContext(FormContext);
    return context;
};
