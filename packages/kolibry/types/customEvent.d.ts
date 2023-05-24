import type {
  ErrorPayload,
  FullReloadPayload,
  PrunePayload,
  UpdatePayload,
} from './hmrPayload'

export interface CustomEventMap {
  'kolibry:beforeUpdate': UpdatePayload
  'kolibry:afterUpdate': UpdatePayload
  'kolibry:beforePrune': PrunePayload
  'kolibry:beforeFullReload': FullReloadPayload
  'kolibry:error': ErrorPayload
  'kolibry:invalidate': InvalidatePayload
}

export interface InvalidatePayload {
  path: string
  message: string | undefined
}

export type InferCustomEventPayload<T extends string> =
  T extends keyof CustomEventMap ? CustomEventMap[T] : any
