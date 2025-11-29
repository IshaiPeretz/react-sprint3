
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { NewMail } from "../cmps/NewMail.jsx"
import { SideBar } from "../cmps/SideBar.jsx"
import { SortMail } from "../cmps/SortMail.jsx"

import { mailService } from "../services/mail.service.js"



const { useState, useEffect, Fragment } = React


export function MailIndex() {

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(mailService.getDefaultSortBy())
    const [isNewMailOpen, setIsNewMailOpen] = useState(false)
    const [editingMail, setEditingMail] = useState(null)
    const [mails, setMails] = useState([])
    const [activeFolder, setActiveFolder] = useState('inbox')


    useEffect(() => {
        loadMails()
    }, [filterBy,sortBy])

    function loadMails() {
        mailService.query(filterBy,sortBy)
            .then(mails => setMails(mails))
    }

    function removeMail(ev, mail) {
        ev.preventDefault()
        const updatedMail = { ...mail, removedAt: Date.now() }
        mailService.save(updatedMail)
            .then(() => {
                loadMails()
            })
    }

    function sendMail(mail) {
        mailService.save(mail)
            .then(() => {
                loadMails()
            })
    }
    function openNewMail(mail) {
        setEditingMail(mail)
        setIsNewMailOpen(true)
    }
    function closeNewMail() {
        setIsNewMailOpen(false)
        setEditingMail(null)
    }
    function onInbox() {
        setFilterBy({ status: 'inbox' })
        setActiveFolder('inbox')
    }
    function onSent() {
        setFilterBy({ status: 'sent' })
        setActiveFolder('sent')
    }
    function onTrash() {
        setFilterBy({ status: 'trash' })
        setActiveFolder('trash')
    }
    function onDraft() {
        setFilterBy({ status: 'draft' })
        setActiveFolder('draft')
    }
    function onStarred() {
        setFilterBy(filterBy => ({ ...filterBy, isStarred: true }))
        setActiveFolder('starred')
    }

    function markAsRead(ev, mail) {
        ev.preventDefault()
        mail.isRead = !mail.isRead
        mailService.save(mail)
            .then((updatedMail) => {
                const updatedMails = mails.map(mail => mail.id === updatedMail.id ? updatedMail : mail)
                setMails(updatedMails)
            })
    }

    function markStar(ev, mail) {
        ev.preventDefault()
        mail.isStarred = !mail.isStarred
        mailService.save(mail)
            .then((updatedMail) => {
                const updatedMails = mails.map(mail => mail.id === updatedMail.id ? updatedMail : mail)
                setMails(updatedMails)
            })

    }
    function onSetFilter(newFilterBy) {
        setFilterBy(filterBy => ({ ...filterBy, ...newFilterBy }))
    }
    function onSortChange(newSortBy) {
        setSortBy(newSortBy)
    }


    const visibleMails = mails
    return (
        <Fragment>

            <section className="main-container">
                <MailHeader>
                    <MailFilter defaultFilter={filterBy}
                        onSetFilter={onSetFilter} />
                    <SortMail
                        onSortChange={onSortChange}
                        sortBy ={sortBy}
                    />
                </MailHeader>
                {isNewMailOpen && <NewMail
                    onClose={closeNewMail}
                    onSendMail={sendMail}
                    editingMail={editingMail}
                />}
                <SideBar
                    openNewMail={openNewMail}
                    mails={mails}
                    onInbox={onInbox}
                    onSent={onSent}
                    onTrash={onTrash}
                    onDraft={onDraft}
                    onStarred={onStarred}
                    activeFolder={activeFolder}
                />
                <MailList
                    mails={visibleMails}
                    onRemove={removeMail}
                    onMarkRead={markAsRead}
                    openNewMail={openNewMail}
                    onMarkStar={markStar}
                />
            </section>
        </Fragment>
    )
}

