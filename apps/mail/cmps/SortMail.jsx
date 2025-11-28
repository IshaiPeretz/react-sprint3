import { mailService } from "../services/mail.service.js"




export function SortMail({ onSortChange, sortBy }) {

    function handleChange({ target }) {
        const [by, order] = target.value.split('-')
        onSortChange({ by, order })
    }

    const { by, order } = sortBy
    return (

        <div className="sort-by-container">
            <label htmlFor="sort-by"></label>
            <select id="sort-by"
                className="sort-by"
                value={`${by}-${order}`}
                onChange={handleChange} >

                <option value="sentAt-desc" name="sentAt">Newest </option>
                <option value="sentAt-asc" name="sentAt">Oldest </option>
                <option value="isRead-desc" name="isRead">Read </option>
                <option value="isRead-asc" name="isRead">Unread </option>
                <option value="subject-asc" name="subject">Subject Ascending </option>
                <option value="subject-desc" name="subject">Subject Descending</option>

            </select>
        </div>
    )
}