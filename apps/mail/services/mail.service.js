// mail service


import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'MailDB'
const loggedInUser = { email: 'Ishai@appsus.com', fullname: 'Ishai Peretz' }
const demoMails = [
    {
        id: 'm1',
        subject: 'Welcome to our newsletter!',
        body: 'Thanks for signing up. Stay tuned for updates.',
        from: 'news@company.com',
        to: loggedInUser.email,
        isRead: false,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 100 * 365 * 24 * 60 * 60 * 1000), // last 100 days
        createdAt: Date.now() - Math.floor(Math.random() * 100 * 365 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm2',
        subject: 'Meeting tomorrow 10AM',
        body: 'Don\'t forget our weekly sync. Bring your updates.',
        from: 'boss@work.com',
        to: loggedInUser.email,
        isRead: true,
        isStarred: true,
        sentAt: Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000), // last year
        createdAt: Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm3',
        subject: 'Your order #1234 shipped!',
        body: 'Your package is on its way. Tracking: ABC123.',
        from: 'orders@amazon.com',
        to: loggedInUser.email,
        isRead: false,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 730 * 24 * 60 * 60 * 1000), // last 2 years
        createdAt: Date.now() - Math.floor(Math.random() * 730 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm4',
        subject: 'Code review needed',
        body: 'Please review PR #456 before EOD.',
        from: 'team@dev.com',
        to: loggedInUser.email,
        isRead: false,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000), // last month
        createdAt: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm5',
        subject: 'Draft: Weekend plans',
        body: 'Hey, are you free Saturday?',
        from: loggedInUser.email,
        to: 'friend@example.com',
        isRead: false,
        isStarred: false,
        sentAt: null,  // ← Draft (shows "Draft")
        createdAt: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000), // last week
        removedAt: null
    },
    {
        id: 'm6',
        subject: 'Security update required',
        body: 'Please update your password.',
        from: 'security@bank.com',
        to: loggedInUser.email,
        isRead: true,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 180 * 24 * 60 * 60 * 1000), // last 6 months
        createdAt: Date.now() - Math.floor(Math.random() * 180 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm7',
        subject: 'Great job on the project!',
        body: 'Your work was outstanding. Keep it up!',
        from: 'manager@company.com',
        to: loggedInUser.email,
        isRead: false,
        isStarred: true,
        sentAt: Date.now() - Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000), // last 2 weeks
        createdAt: Date.now() - Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm8',
        subject: 'Invoice #7890',
        body: 'Payment due in 30 days. Amount: $250.',
        from: 'billing@client.com',
        to: loggedInUser.email,
        isRead: true,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000), // last 3 months
        createdAt: Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm9',
        subject: 'Re: Bug fix',
        body: 'Fixed the issue you reported. Deployed to prod.',
        from: 'dev@team.com',
        to: loggedInUser.email,
        isRead: false,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000), // last 3 days
        createdAt: Date.now() - Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm10',
        subject: 'Party this Friday!',
        body: 'Everyone invited! 8PM at Mike\'s place.',
        from: 'friend@party.com',
        to: loggedInUser.email,
        isRead: false,
        isStarred: true,
        sentAt: Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000), // last year
        createdAt: Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm11',
        subject: 'Your subscription expires soon',
        body: 'Renew now to avoid interruption.',
        from: 'billing@service.com',
        to: loggedInUser.email,
        isRead: true,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000), // last 2 months
        createdAt: Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm12',
        subject: 'Feedback requested',
        body: 'How was your experience with our product?',
        from: 'support@company.com',
        to: loggedInUser.email,
        isRead: false,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 45 * 24 * 60 * 60 * 1000), // last 45 days
        createdAt: Date.now() - Math.floor(Math.random() * 45 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm13',
        subject: 'New feature released',
        body: 'Check out our latest updates!',
        from: 'product@company.com',
        to: loggedInUser.email,
        isRead: true,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 20 * 24 * 60 * 60 * 1000), // last 20 days
        createdAt: Date.now() - Math.floor(Math.random() * 20 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm14',
        subject: 'Trash: Old meeting notes',
        body: 'Notes from last quarter.',
        from: loggedInUser.email,
        to: 'team@work.com',
        isRead: true,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000),
        createdAt: Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000),
        removedAt: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000) // trashed recently
    },
    {
        id: 'm15',
        subject: 'URGENT: Server down',
        body: 'Prod server crashed. Need immediate attention.',
        from: 'alerts@ops.com',
        to: loggedInUser.email,
        isRead: false,
        isStarred: true,
        sentAt: Date.now() - Math.floor(Math.random() * 1 * 24 * 60 * 60 * 1000), // yesterday
        createdAt: Date.now() - Math.floor(Math.random() * 1 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm16',
        subject: 'Thank you for your purchase',
        body: 'Order confirmed. Shipping tomorrow.',
        from: 'store@shop.com',
        to: loggedInUser.email,
        isRead: true,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000), // last week
        createdAt: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm17',
        subject: 'Draft: Proposal for Q4',
        body: 'Business proposal draft...',
        from: loggedInUser.email,
        to: 'client@company.com',
        isRead: false,
        isStarred: true,
        sentAt: null,  // ← Draft
        createdAt: Date.now() - Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000), // last 3 days
        removedAt: null
    },
    {
        id: 'm18',
        subject: 'Vacation request approved',
        body: 'Your time off has been approved for Dec 20-25.',
        from: 'hr@company.com',
        to: loggedInUser.email,
        isRead: false,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000), // last 10 days
        createdAt: Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm19',
        subject: 'Weekly digest',
        body: 'Top stories from this week.',
        from: 'digest@news.com',
        to: loggedInUser.email,
        isRead: true,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000), // last week
        createdAt: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm20',
        subject: 'Quick question',
        body: 'Can you help me with this issue?',
        from: 'colleague@work.com',
        to: loggedInUser.email,
        isRead: false,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 2 * 24 * 60 * 60 * 1000), // last 2 days
        createdAt: Date.now() - Math.floor(Math.random() * 2 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm21',
        subject: 'Project update - Week 47',
        body: 'Team, here\'s the status report for this week. All tasks on track.',
        from: loggedInUser.email,
        to: 'team@work.com',
        isRead: false,
        isStarred: false,
        sentAt: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000), // last month
        createdAt: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
        removedAt: null
    },
    {
        id: 'm22',
        subject: 'Re: Client feedback',
        body: 'Thanks for the feedback! We\'ll implement these changes next sprint.',
        from: loggedInUser.email,
        to: 'client@company.com',
        isRead: true,
        isStarred: true,
        sentAt: Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000), // last 2 months
        createdAt: Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000),
        removedAt: null
    }
]

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

            if (filterBy.isStarred === true) {
                mails = mails.filter(mail => mail.isStarred)
            }
            if (filterBy.text) {
                const regExp = new RegExp(filterBy.text, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body) ||  regExp.test(mail.from))
            }
            if (filterBy.isRead === true) {
                mails = mails.filter(mail => mail.isRead)
            } else if (filterBy.isRead === false) {
                mails = mails.filter(mail => !mail.isRead)
            }
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
    let mails = utilService.loadFromStorage(MAIL_KEY) || []


    if (mails && mails.length) return

    // for (let i = 0; i < 10; i++) {
    //     const mail = {
    //         id: utilService.makeId(),
    //         createdAt: 1551133930500,
    //         subject: 'Miss you!',
    //         body: 'Would love to catch up sometimes',
    //         isRead: Math.random() < 0.4,
    //         isStarred: Math.random() < 0.3,
    //         sentAt: 1551133930594,
    //         removedAt: null,
    //         from: 'momo@momo.com',
    //         to: loggedInUser.email
    //     }
    //     mails.push(mail)
    // }
    mails = demoMails
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


