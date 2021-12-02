
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    title: 'Business Lunch',
    start: '2021-11-18T13:00:00',
    end: '2021-11-18T15:00:00',
    constraint: 'businessHours'
  },
  {
    title: 'Meeting',
    start: '2021-11-18T11:00:00',
    end: '2021-11-18T12:00:00',
    color: '#257e4a',
    constraint: 'businessHours'
    // overlap: false
  }
]

export function createEventId () {
  return String(eventGuid++)
}
