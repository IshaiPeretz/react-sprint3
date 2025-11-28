import { CountUnread } from "./CountUnread.jsx"


export function SideBar({ openNewMail, mails, onSent, onInbox, onTrash, onDraft, onStarred, activeFolder }) {


    return (

        <section className="side-bar">
            <button className="compose-btn"
                onClick={openNewMail}>
                <i className="fa-solid fa-pen"></i>
                <span>Compose</span>
            </button>
            <section className="nav-container">
                <button className={`btn inbox ${activeFolder === 'inbox' ? 'active' : ''}`}
                    onClick={onInbox} >
                    <i className={`${activeFolder === 'inbox' ? 'fa-solid fa-inbox' : 'fa-solid fa-inbox'}`}></i>
                    Inbox
                    <CountUnread mails={mails}
                    /></button>
                <button className={`btn starred ${activeFolder === 'starred' ? 'active' : ''}`}
                    onClick={onStarred}>
                    <i className={`${activeFolder === 'starred' ? 'fa-solid fa-star' : 'fa-regular fa-star'}`}></i>
                    Starred
                </button>
                <button className={`btn sent ${activeFolder === 'sent' ? 'active' : ''}`}
                    onClick={onSent} >
                    <i className={`${activeFolder === 'sent' ? 'fa-solid fa-paper-plane' : 'fa-regular fa-paper-plane'}`}></i>
                    Sent
                </button>
                <button className={`btn trash ${activeFolder === 'trash' ? 'active' : ''}`}
                    onClick={onTrash} >
                    <i className={`${activeFolder === 'trash' ? 'fa-solid fa-trash-can' : 'fa-regular fa-trash-can'}`}></i>
                    Trash
                </button>
                <button className={`btn draft ${activeFolder === 'draft' ? 'active' : ''}`}
                    onClick={onDraft} >
                    <i className={`${activeFolder === 'draft' ? 'fa-solid fa-file' : 'fa-regular fa-file'}`}></i>
                    Drafts
                </button>
            </section>
        </section>
    )
}