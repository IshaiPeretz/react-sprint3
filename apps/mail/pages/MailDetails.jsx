import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM


export function MailDetails() {

    const [mail, setMail] = useState(null)


    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])


    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => {
                mail.isRead = true
                setMail(mail)
                mailService.save(mail)
            })
            .catch(() => {
                showErrorMsg('Couldn\'t get mail...')
                navigate(-1)
            })
    }
    function onDelete(mailId) {
        mailService.remove(mailId).then(() => navigate(-1)) //used -1 to return to either sent or inbox
    }


    if (!mail) return <div>Loading...</div>
    const date = utilService.formatCustomDate(mail.sentAt)
    const { subject, from, to, body, id } = mail

    return (
        <div className="mail-display">
            <h1 className="subject">{subject}</h1>
            <h2 className="from" >{from}</h2>
            <h4 className="to">to: {to}</h4>
            <p className="body">{body}</p>
            <h4 className="date">{date}</h4>
            <section className="mail-buttons-container ">
                <section className="function-btns ">
                    <button className='close display-btn'>
                        <Link to='/mail'> Back </Link>
                    </button>
                    <button className='delete display-btn' onClick={() => onDelete(id)}>Delete</button>
                </section>
                <nav className='mail-details-nav'>
                    <Link to={`/mail/${mail.prevMailId}`}>
                        <button className="display-btn"><i className="fa-solid fa-arrow-left "></i></button>
                    </Link>
                    <Link to={`/mail/${mail.nextMailId}`}>
                        <button className="display-btn"><i className="fa-solid fa-arrow-right"></i></button>
                    </Link>
                </nav>
            </section>

        </div>
    )
}