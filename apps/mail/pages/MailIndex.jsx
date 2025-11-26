import { CountUnread } from "../cmps/CountUnread.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { NewMail } from "../cmps/NewMail.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"


const { useState, useEffect, Fragment } = React


export function MailIndex() {

    const [isNewMailOpen, setIsNewMailOpen] = useState(false)
    const [mails, setMails] = useState([])
    console.log(mails)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => setMails(mails))
    }

    function removeMail(ev, mailId) {
        ev.preventDefault()
        mailService.remove(mailId)
            .then(() => setMails(mails => mails.filter(mail => mailId !== mail.id)))
    }

    function sendMail(mail) {
        mailService.save(mail)
            .then(mail => {
                setMails(mails => [...mails, mail])
            })
    }
    function openNewMail() {
        setIsNewMailOpen(true)
    }
    function closeNewMail() {
        setIsNewMailOpen(false)
    }

    function markAsRead(ev, mailId) {
        ev.preventDefault()
        mailService.get(mailId)
            .then(mail => {
                mail.isRead = !mail.isRead
                mailService.save(mail)
                    .then(() => loadMails())
            })

    }

    return (
        <Fragment>
            <section className="main-container">
                <button className="compose-btn" onClick={openNewMail}><i className="fa-solid fa-pen"></i></button>
                {isNewMailOpen && <NewMail onClose={closeNewMail} onSendMail={sendMail} />}
                <CountUnread mails={mails} />
                <MailList mails={mails} onRemove={removeMail} onMarkRead={markAsRead} />

            </section>
        </Fragment>
    )
}

