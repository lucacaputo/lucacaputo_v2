import ContactForm from "./ContactForm";
import Title from "../SectionTitle";

const Contacts: React.FC = () => {
    return (
        <div className="contactWrapper">
            <Title>Get in touch!</Title>
            <ContactForm />
            <style jsx>{`
                .contactWrapper {
                    background-color: #162447;
                    border-radius: 3px;
                    box-shadow: 0 0 6px #141414;
                    margin-top: 50px;
                    padding: 20px;
                }
                h1 {
                    font-size: 50px;
                    font-weight: 700;
                    text-align: center;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #e43f5a;
                    margin-block-start: 0;
                    margin-block-end: 0;
                    margin-bottom: 25px;
                }
            `}</style>
        </div>
    );
}

export default Contacts;