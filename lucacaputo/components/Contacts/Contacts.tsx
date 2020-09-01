import ContactForm from "./ContactForm";

const Contacts: React.FC = () => {
    return (
        <div className="contactWrapper">
            <h1>Get in touch!</h1>
            <ContactForm />
            <style jsx>{`
                .contactWrapper {
                    background-color: #1b1b2f;
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