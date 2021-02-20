import AsyncStorage from '@react-native-async-storage/async-storage'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'PERMISSSION91012:notifications'
export const FLASH_STORAGE_KEY = 'FLASHCARD:key'

export function getRandomIntNum(max) {
  max = 99999999999999999999
  return Math.floor(Math.random() * Math.floor(max))
}

export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to study your Quizs today!",
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}

function createNotification() {
  return {
    title: 'Log your stats!',
    body: "👋 Don't forget to study your Quizs today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day',
            })

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}