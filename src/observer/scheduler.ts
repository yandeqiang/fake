import { Watcher } from "./watcher"

/**
 * scheduler.ts
 * The purpose is to run watcher queue in a fixed time.
 */

let hasQueue = new Set()
let queue = []
let index = 0
let flushing = false
let waiting = true

function resetQueue () {
  hasQueue = new Set()
  queue = []
  index = 0
  flushing = false
  waiting = true
}

function runQueue () {
  flushing = true
  waiting = false

  queue.sort((a, b) => a.id - b.id)

  queue.forEach((watcher, i) => {
    index = i
    watcher.run()
  })

  resetQueue()
}

export function queueWatcher(watcher: Watcher) {
  if (hasQueue.has(watcher)) return
  hasQueue.add(watcher)

  if (!flushing) {
    queue.push(watcher)
  } else {
    let i = queue.length - 1
    while(i > index && queue[i].id > watcher.id) i--
    queue.splice(i, 0, watcher)
  }

  if(waiting) {
    setTimeout(runQueue, 0)
  }
}
