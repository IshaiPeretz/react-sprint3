import { CountUnread } from "./CountUnread.jsx"


export function SideBar({ openNewMail, mails, onSent, onInbox, onTrash, onDraft }) {



    return (

        <section className="side-bar">
            <button className="compose-btn"
                onClick={openNewMail}>
                <i className="fa-solid fa-pen"></i>
                <span>Compose</span>
            </button>
            <section className="nav-container">
                <button className="btn inbox"
                    onClick={onInbox} >
                    <i className="fa-solid fa-inbox"></i>
                    Inbox
                    <CountUnread mails={mails}
                    /></button>
                <button className="btn starred">
                    <i className="fa-regular fa-star"></i> Starred
                </button>
                <button className="btn sent"
                    onClick={onSent} >
                    <i className="fa-regular fa-paper-plane"></i> Sent
                </button>
                <button className="btn trash" onClick={onTrash} >
                    <i className="fa-regular fa-trash-can"></i>Trash
                </button>
                <button className="btn draft"
                    onClick={onDraft} >
                    <i className="fa-regular fa-file"></i> Drafts
                </button>
            </section>
        </section>
    )
}