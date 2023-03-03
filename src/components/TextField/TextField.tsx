import React from "react";
import { Message, StyledTextField } from "./Styles";

interface TextFieldProps extends React.HTMLAttributes<HTMLInputElement> {
   type?: string;
   label?: string;
   className?: string;
   error?: string;
   placeholder?: string;
   readOnly?: boolean;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
   (
      {
         type,
         label,
         className,
         error,
         placeholder,
         readOnly = false,
         ...passProp
      }: TextFieldProps,
      ref
   ) => {
      return (
         <StyledTextField readOnly={readOnly}>
            {label && <label>{label}</label>}
            <input
               type={type}
               placeholder={placeholder}
               {...passProp}
               ref={ref}
            />
            {error && <Message>{error}</Message>}
         </StyledTextField>
      );
   }
);

export default TextField;
