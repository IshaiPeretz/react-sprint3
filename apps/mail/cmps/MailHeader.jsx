import { MailFilter } from "./MailFilter.jsx"
import { SortMail } from "./SortMail.jsx"

export function MailHeader({ children, onToggleSidebar, onSetFilter, sortBy, onSortChange, filterByToEdit }) {



    return (
        <header className="mail-header">
            <div className="mail-logo"><i className="fa-solid fa-envelope"></i>EMAIL</div>
            <button className="sidebar-hamburger" onClick={() => {
                onToggleSidebar()
            }}
            ><i className="fa-solid fa-bars"></i></button>
            {children}
            <MailFilter defaultFilter={filterByToEdit} onSetFilter={onSetFilter} />
            <SortMail onSortChange={onSortChange} sortBy={sortBy} />
        </header >
    )
}