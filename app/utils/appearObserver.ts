export type PoolKey = `${number}|${string}`
type Subscriber = (entry: IntersectionObserverEntry) => void

type Pool = {
  io: IntersectionObserver
  subs: Map<Element, Subscriber>
}

const pools = new Map<PoolKey, Pool>()

export function getAppearObserver(threshold: number, rootMargin: string) {
  const key: PoolKey = `${threshold}|${rootMargin}`
  let pool = pools.get(key)

  if (!pool) {
    const subs = new Map<Element, Subscriber>()
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const cb = subs.get(entry.target)
        if (cb) cb(entry)
      }
    }, { threshold, rootMargin })
    pool = { io, subs }
    pools.set(key, pool)
  }

  return {
    observe(el: Element, cb: Subscriber): void {
      pool!.subs.set(el, cb)
      pool!.io.observe(el)
    },
    unobserve(el: Element): void {
      pool!.subs.delete(el)
      pool!.io.unobserve(el)
    }
  }
}
