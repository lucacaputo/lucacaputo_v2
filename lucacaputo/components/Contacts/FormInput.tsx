import { Field } from "formik";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";

interface TextInputProps {
    fieldName: string;
    type: "text" | "number";
    placeholder: string;
    hasError: boolean;
    title?: string;
    isArea?: boolean;
}

const ErrorSpan = styled(animated.span)`
    display: block;
    width: 100%;
    font-size: 14px;
    font-weight: 300;
    font-style: italic;
    position: absolute;
    left: 10px;
    bottom: 5px;
    color: #e43f5a;
`;

const TextInput: React.FC<TextInputProps> = ({ fieldName, type, placeholder, title, hasError, isArea=false }) => {

    const transition = useTransition(hasError, null, {
        from: {
            opacity: 0,
            transform: "translateY(-10px)",
        },
        enter: {
            opacity: 1,
            transform: "translateY(0)",
        },
        leave: {
            opacity: 0,
            transform: "translateY(-10px)",
        }
    });
    return (
        <>
            <Field name={fieldName}>
                {
                    ({
                        field,
                        meta,
                    }) => {
                        return (
                            <div className="formInputOuter">
                                { title && <label htmlFor={fieldName}>{title}</label> }
                                { !isArea && <input type={type} placeholder={placeholder} {...field} /> }
                                { isArea && <textarea cols={30} rows={12} placeholder={placeholder} {...field}/> }
                                {
                                    meta.touched && meta.error &&
                                    transition.map(({ item, key, props }) => item ?
                                        <ErrorSpan style={props} key={key}>{meta.error}</ErrorSpan> 
                                        : null
                                    )
                                }
                            </div>
                        );
                    }
                }
            </Field>
            <style jsx>{`
                .formInputOuter {
                    position: relative;
                    width: 100%;
                    padding: 10px 10px 25px 10px;
                }
                input, textarea {
                    border: 1px solid #e43f5a;
                    color: #1b1b2f;
                    font-size: 1rem;
                    letter-spacing: 1.5px;
                    font-weight: 300;
                    padding: 10px;
                    display: block;
                    outline: none;
                    width: 100%;
                    background-color: #fff;
                    resize: none;
                }
                input:focus {
                    outline: none;
                }
                label {
                    font-weight: 700;
                    font-size: 18px;
                    color: #e43f5a;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin-bottom: 15px;
                    display: block;
                }
            `}</style>
        </>
    );
}

export default TextInput;