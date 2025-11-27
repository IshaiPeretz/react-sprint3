// mail service


import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'MailDB'
const loggedInUser = { email: 'Ishai@appsus.com', fullname: 'Ishai Peretz' }

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    loggedInUser
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            console.log(mails)
            if (filterBy.status === 'trash') {
                mails = mails.filter(mail => mail.removedAt)
            } else mails = mails.filter(mail => !mail.removedAt)

            if (filterBy.status === 'draft') {
                mails = mails.filter(mail => mail.createdAt && !mail.sentAt)
            }

            if (filterBy.status === 'inbox') {
                mails = mails.filter(mail => mail.to === loggedInUser.email)
            }
            else if (filterBy.status === 'sent') {
                mails = mails.filter(mail => mail.from === loggedInUser.email && mail.sentAt)
            }
            if (filterBy.text) {
                const regExp = new RegExp(filterBy.text, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
            }
            if (filterBy.isRead === true) {
                mails = mails.filter(mail => mail.isRead)
            } else if (filterBy.isRead === false) {
                mails = mails.filter(mail => !mail.isRead)
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
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

function getDefaultFilter() {
    return { text: '', isRead: null, status: 'inbox', removedAt: null }
}



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
            to: loggedInUser.email
        }
        mails.push(mail)
    }
    console.log(mails)

    utilService.saveToStorage(MAIL_KEY, mails)
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY)
        .then((mails) => {
            const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
            const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
            const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
            mail.nextMailId = nextMail.id
            mail.prevMailId = prevMail.id
            return mail
        })
}
