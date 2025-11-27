import { CountUnread } from "../cmps/CountUnread.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { NewMail } from "../cmps/NewMail.jsx"
import { mailService } from "../services/mail.service.js"



const { useState, useEffect, Fragment } = React


export function MailIndex() {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isNewMailOpen, setIsNewMailOpen] = useState(false)
    const [mails, setMails] = useState([])
    console.log(mails)

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
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
    function onSetFilter(newFilterBy) {
        setFilterBy(filterBy => ({ ...filterBy, ...newFilterBy }))
    }
    return (
        <Fragment>
            <section className="main-container">
                <MailFilter defaultFilter={filterBy}
                    onSetFilter={onSetFilter} />
                {isNewMailOpen && <NewMail onClose={closeNewMail} onSendMail={sendMail} />}
                <section className="nav-container">
                    <button className="compose-btn" onClick={openNewMail}><i className="fa-solid fa-pen"></i></button>
                    <CountUnread mails={mails} />
                </section>
                <MailList mails={mails} onRemove={removeMail} onMarkRead={markAsRead} />

            </section>
        </Fragment>
    )
}

