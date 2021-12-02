
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  // {
  //   title: 'Business Lunch',
  //   start: '2021-11-18T13:00:00',
  //   end: '2021-11-18T15:00:00',
  //   constraint: 'businessHours'
  // },
  // {
  //   start: new Date().toISOString(),
  //   end: '2021-12-02T17:00:00',
  //   color: '#ddd',
  //   constraint: 'businessHours'
  // }
]

export function createEventId () {
  return String(eventGuid++)
}
