// mail service


import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'MailDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
}


function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
    // .then(mails => {
    //     if (filterBy.title) {
    //         const regExp = new RegExp(filterBy.title, 'i')
    //         Books = Books.filter(book => regExp.test(book.title))
    //     }

    //     if (filterBy.minPrice) {
    //         Books = Books.filter(book => book.listPrice.amount >= filterBy.minPrice)
    //     }

    //     return Books
    // })
}


function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
    // .then(mail => _setNextPrevBookId(mail))
}


function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}



// function getDefaultFilter(filterBy = { title: '', minPrice: 0 }) {
//     return { title: filterBy.title, minPrice: filterBy.minPrice }
// }




function _createMails() {
    const mails = utilService.loadFromStorage(MAIL_KEY) || []
    

    if (mails && mails.length) return

    for (let i = 0; i < 10; i++) {
        const mail = {
            id: utilService.makeId(),
            createdAt: 1551133930500,
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: Math.random() < 0.4,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        }
        mails.push(mail)
    }
    console.log(mails);
    
    utilService.saveToStorage(MAIL_KEY, mails)
}

// function _setNextPrevBookId(book) {
//     return storageService.query(BOOK_KEY)
//         .then((books) => {
//             const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
//             const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
//             const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
//             book.nextBookId = nextBook.id
//             book.prevBookId = prevBook.id
//             return book
//         })
// }
