import Input from "./FormInput";
import { Formik, Form } from "formik";
import * as yup from "yup";
import SubmitButton from "./SubmitButton";

const MANDATORY = "This field is required";

const initialValues = {
    name: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
}
const validationSchema = yup.object().shape({
    name: yup.string().required(MANDATORY),
    lastName: yup.string().required(MANDATORY),
    email: yup.string().email("You must insert a vaild E-mail address").required(MANDATORY),
    subject: yup.string().required(MANDATORY),
    message: yup.string().required(MANDATORY),
})

const ContactForm: React.FC = () => {
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={vals => console.log(vals)}
                validateOnChange
            >
                {
                    ({ errors, touched }) => (
                        <Form>
                            <div className="grid">
                                <div className="inp">
                                    <Input 
                                        fieldName="name"
                                        type="text"
                                        title="name"
                                        placeholder="Name"
                                        hasError={errors.name && touched.name}
                                    />
                                    <Input 
                                        fieldName="lastName"
                                        type="text"
                                        title="last name"
                                        placeholder="Last name"
                                        hasError={errors.lastName && touched.lastName}
                                    />
                                </div>
                                <div className="inp">
                                    <Input
                                        fieldName="email"
                                        type="text"
                                        title="E-mail"
                                        placeholder="email@example.com"
                                        hasError={errors.email && touched.email}
                                    />
                                </div>
                                <div className="inp">
                                    <Input
                                        fieldName="subject"
                                        type="text"
                                        title="Subject"
                                        placeholder="subject"
                                        hasError={errors.subject && touched.subject}
                                    />
                                </div>
                                <div className="inp">
                                    <Input
                                        fieldName="message"
                                        type="text"
                                        title="Message"
                                        placeholder="message"
                                        hasError={errors.message && touched.message}
                                        isArea
                                    />
                                </div>
                            </div>
                            <div className="buttonCont">
                                <SubmitButton 
                                    type="submit"
                                    text="SEND"
                                />
                            </div>
                        </Form>
                    )
                }
            </Formik>
            <style jsx>{`
                .grid {
                    display: flex;
                    width: 100%;
                    flex-wrap: wrap;
                    position: relative;
                }
                .inp {
                    width: 100%;
                    display: flex;
                    align-items: center;
                }
                .buttonCont {
                    padding: 1rem 0;
                    display: flex;
                    justify-content: center;
                }
                @media screen and (max-width: 600px) {
                    .inp {
                        flex-wrap: wrap;
                    }
                }
            `}</style>
        </div>
    );
}

export default ContactForm;