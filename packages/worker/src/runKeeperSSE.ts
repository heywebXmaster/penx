import { fetchEventSource } from '@microsoft/fetch-event-source'
import { isProd } from '@penx/constants'
import { db } from '@penx/local-db'

// const url = 'http://localhost:6543/keeper-sse'
const url = 'http://127.0.0.1:6543/keeper-sse'

enum EventType {
  ADD_TEXT = 'ADD_TEXT',
  ADD_NODE = 'ADD_NODE',
}

type Event<T = any> = {
  eventType: EventType
  data: T
}

type AddTextEvent = {
  eventType: EventType.ADD_TEXT
  data: string
}

async function addText(text: string) {
  const space = await db.getActiveSpace()
  await db.addTextToToday(space.id, text)
}

export async function runKeeperSSE() {
  if (isProd) return
  return

  const eventSource = new EventSource(url)
  console.info('Listening on SEE', eventSource)
  eventSource.onmessage = async (ev) => {
    const event: Event = JSON.parse(ev.data)
    console.log('===event:', event)

    if (event.eventType === EventType.ADD_TEXT) {
      await addText(event.data)
    }
  }
}

// export async function runKeeperSSE() {

//   await fetchEventSource(url, {
//     openWhenHidden: true,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({}),
//     async onopen(response) {
//       console.log('=========onopen', response)
//     },
//     onmessage(ev) {
//       const msg = JSON.parse(ev.data)
//       console.log('===========spaceInfo:', msg)
//     },
//     onclose() {
//       // if the server closes the connection unexpectedly, retry:
//       console.log('sse onclose=============')
//     },
//     onerror(err) {
//       console.log('sse error=============:', err)
//       // do nothing to automatically retry. You can also
//       // return a specific retry interval here.
//     },
//   })
// }
