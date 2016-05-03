export default function notificationReducer(notifications = [], action) {
    switch (action.type) {
        case 'GET_NOTIFICATIONS':
            return action.notifications
            break;
        
        case 'READ_NOTIFICATIONS':
            let newNotifications = notifications.map((notification) => Object.assign({}, notification, { read: true }))
            console.log(newNotifications)
            return newNotifications;
            break;
        default:
            return notifications;
    }
}