import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  account: {},
  activeEvent: {},
  comments: [],
  // events: [],
  eventTickets: [],
  myTickets: [],
  myEvents: [],
  towerEvents: [],
  tickets: [],
  user: {}
})
