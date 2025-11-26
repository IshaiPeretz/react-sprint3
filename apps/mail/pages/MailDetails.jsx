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
        loadBook()
    }, [params.mailId])


    function loadBook() {
        mailService.get(params.mailId)
            .then(mail => {
                mail.isRead = true
                setMail(mail)
                mailService.save(mail)
            })
        .catch(() => {
            showErrorMsg('Couldn\'t get mail...')
            navigate(`/mail`)
        })
    }



    if (!mail) return <div>Loading...</div>
    const date = utilService.formatCustomDate(mail.sentAt)

    return (
        <div>
            <h1>{mail.subject}</h1>
            <h2>{mail.from}</h2>
            <h4>{mail.to}</h4>
            <p>{mail.body}</p>
            <h4>{date}</h4>
            <button className='close'>
                <Link to='/mail'> Back </Link>
            </button>

        </div>
    )
}