import { Inngest } from 'inngest'

export const inngest = new Inngest({
  id: 'ninjabox',
  name: 'Ninja Box',
  eventKey: process.env.INNGEST_EVENT_KEY,
})
