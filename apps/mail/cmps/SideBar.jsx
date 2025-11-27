import { CountUnread } from "./CountUnread.jsx"


export function SideBar({ openNewMail, mails, onSent, onInbox,onTrash,onDraft }) {



    return (

        <section className="side-bar">
            <button className="compose-btn btn" onClick={openNewMail}><i className="fa-solid fa-pen"></i></button>
            <section className="nav-container">
                <button className="btn" onClick={onInbox} > <CountUnread mails={mails} /></button>
                <button className="btn" onClick={onSent} ><i className="fa-regular fa-paper-plane"></i> </button>
                <button className="btn" onClick={onTrash} ><i className="fa-regular fa-trash-can"></i> </button>
                <button className="btn" onClick={onDraft} ><i className="fa-regular fa-file"></i> </button>
            </section>
        </section>
    )
}