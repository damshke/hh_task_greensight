import { useState } from "react";
import './styles/Form.css'

export default function Form() {

    const [initials, setInitials] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    const [phoneValid, setPhoneValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const isValid = regex.test(event.target.value);
        setEmailValid(isValid);
    };

    const handleSubmit = () => {
        if (initials.trim() !== '' && phone.trim() !== '' && email.trim() !== '') {
            alert(`Name: ${initials} \nPhone: ${phone} \nEmail: ${email} \nComment: ${comment}`)
        };
    }

    const getNumbers = (s: String) => s.replace(/\D/g, '');

    const handlePhoneChange = (e: React.FormEvent<HTMLInputElement>) => {
        let input = e.currentTarget,
            inputNumbers = getNumbers(input.value),
            selectionStart = e.currentTarget.selectionStart,
            formattedInput = '';

        if (!inputNumbers) return input.value = '';

        if (input.value.length !== selectionStart) {
            const data = (e.nativeEvent as InputEvent).data;
            if (data && /\D/g.test(data)) {
                input.value = inputNumbers
            }
            setPhoneValid(false);
            return
        }

        if (['7', '8', '9'].includes(inputNumbers[0])) {
            if (inputNumbers[0] === '9') inputNumbers = '7' + inputNumbers;
            let firstSymbols = (inputNumbers[0] === '8') ? '8' : '+7';
            formattedInput = firstSymbols + ' ';
            if (inputNumbers.length === 1) {
                if (inputNumbers[0] === '9') formattedInput = '+79'
                else formattedInput = inputNumbers[0] === '8' ? '8' : '+7'
            }
            if (inputNumbers.length > 1) {
                formattedInput += '(' + inputNumbers.substring(1, 4);
            }
            if (inputNumbers.length >= 5) {
                formattedInput += ') ' + inputNumbers.substring(4, 7);
            }
            if (inputNumbers.length >= 8) {
                formattedInput += '-' + inputNumbers.substring(7, 9);
            }
            if (inputNumbers.length >= 10) {
                formattedInput += '-' + inputNumbers.substring(9, 11);
            }
        } else {
            formattedInput = '+' + inputNumbers.substring(0, 16);
        }
        setPhone(formattedInput);
        const regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        const isValid = regex.test(formattedInput);
        setPhoneValid(isValid);
    }

    return (
        <div>
            <form className="form-request">
                <h2 className="form-request__title">Leave a request</h2>
                <p className="form-request__text">We will advise you and help you start a new project</p>
                <div className="form-request__input-section">
                    <label>Your name</label>
                    <input
                        type="text"
                        className="initials"
                        placeholder='Please introduce yourself'
                        value={initials}
                        onChange={(e) => setInitials(e.target.value)}
                    />
                </div>
                <div className="form-request__input-section">
                    <label>Email</label>
                    <input
                        type="email"
                        className="email"
                        placeholder='ivanov@gmail.com'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="form-request__input-section">
                    <label>Phone number</label>
                    <input
                        type="tel"
                        className="phone"
                        placeholder="+7 (___) ___-__-__"
                        pattern="^((\\+[7])|[8]){1}[0-9]{10}"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>
                <div className="form-request__input-section">
                    <label>Comment</label>
                    <textarea
                        className="comment"
                        placeholder="Message text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                {initials === '' || phoneValid == false || emailValid == false ?
                    <button className='send-form__disabled' disabled>Submit</button> :
                    <button className='send-form' onClick={handleSubmit}>Submit</button>}
                <p className="form-request__text">By clicking "Send" you confirm your consent to the<br />
                    <a href="" className="link">processing of personal data</a></p>
            </form>
            <div className="footer">
                <div className="left-footer">
                    <a className="left-footer__link" href="tel:+7 499 391-66-69">+7 499 391-66-69</a>
                    <a className="left-footer__link" href="mailto:mail@greensight.ru">mail@greensight.ru</a>
                </div>
                <div className="right-footer">
                    <p>322A, 2nd Floor, Zelenograd, Moscow, Russia</p>
                    <a href="about:blank" className="right-footer__link">Directions</a>
                </div>
            </div>
        </div>
    );
}