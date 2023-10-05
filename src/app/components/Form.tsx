export default function Footer() {

    // добавить стили и проверки полей

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
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        className="email"
                        placeholder='ivanov@gmail.com'
                    />
                </div>
                <div>
                    <label>Phone number</label>
                    <input
                        type="text"
                        className="phone"
                        placeholder="+7 (___) ___-__-__"
                        pattern="^((\\+[7])|[8]){1}[0-9]{10}"
                    />
                </div>
                <div>
                    <label>Comment</label>
                    <textarea
                        className="comment"
                        placeholder="Message text"
                    />
                </div>
                <button className="sendForm">Submit</button>
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
                    <p>Directions</p>
                </div>
            </div>
        </div>
    );
}