import { useState } from "react";
import './styles/Form.css'

export default function Form() {

    const [initials, setInitials] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    const [initialsValid, setInitialsValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [commentValid, setCommentValid] = useState(true);

    const [initialsError, setInitialsError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = event.target.value.replace(/[^0-9]/g, '');
        setPhone(formattedValue);

        const regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        const isValid = regex.test(formattedValue);
        setPhoneValid(isValid);
        setPhoneError(isValid ? '' : 'Введите корректный номер телефона')
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const isValid = regex.test(event.target.value);
        setEmailValid(isValid);
        setEmailError(isValid ? '' : 'Введите корректный email')
    };

    const handleSubmit = () => {

        if (initials.trim() === '') {
            setInitialsError('Введите ФИО!');
        } else {
            setInitialsError('');
        }

        if (phone.trim() === '') {
            setPhoneError('Введите номер телефона!');
        } else {
            setPhoneError('');
        }

        if (email.trim() === '') {
            setEmailError('Введите адрес!');
        } else {
            setEmailError('');
        }

        if (initials.trim() !== '' && phone.trim() !== '' && email.trim() !== '') {
            alert(`Name: ${initials} \nPhone: ${phone} \nEmail: ${email} \nComment: ${comment}`)
        };
    }

    return (
        <div>
            <form>
                <h2>Leave a request</h2>
                <p>We will advise you and help you start a new project</p>
                <div>
                    <label>Your name</label>
                    <input
                        type="text"
                        className="initials"
                        placeholder='Please introduce yourself'
                        value={initials}
                        onChange={(e) => setInitials(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        className="email"
                        placeholder='ivanov@gmail.com'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label>Phone number</label>
                    <input
                        type="text"
                        className="phone"
                        placeholder="+7 (___) ___-__-__"
                        pattern="^((\\+[7])|[8]){1}[0-9]{10}"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>
                <div>
                    <label>Comment</label>
                    <textarea
                        className="comment"
                        placeholder="Message text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button className={initials === '' || phoneValid == false || emailValid == false ? 'sendForm-disabled' : 'sendForm'} onClick={handleSubmit}>Submit</button>
                <p>By clicking "Send" you confirm your consent to the<br />
                    <a href="">processing of personal data</a></p>
            </form>
            <div className="footer">
                <div className="left__footer">
                    <p>+7 499 391-66-69</p>
                    <p>mail@greensight.ru</p>
                </div>
                <div className="right__footer">
                    <p>322A, 2nd Floor, Zelenograd, Moscow, Russia</p>
                    <a href="about:blank">Directions</a>
                </div>
            </div>
        </div>
    );

}