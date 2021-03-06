import { SecretsManager, Event, SagaEventHandlers } from '../types/core'
import { AggregateMeta } from '../types/runtime'
import { AggregatesInteropBuilder } from '../aggregate/types'
import { Monitoring } from '../types/runtime'

export type SchedulerInfo = {
  name: string
  connectorName: string
}

export type SagaProperties = {
  [key: string]: string
}

export type SideEffectsCollection = {
  [key: string]: Function | SideEffectsCollection
}

export type SchedulerRuntime = {
  addEntries: Function
  clearEntries: Function
  executeEntries: Function
}
export type SchedulerSideEffects = SchedulerRuntime

export type SystemSideEffects = {
  executeCommand: Function
  executeQuery: Function
  secretsManager: SecretsManager
  uploader: any
}

export type SagaRuntime = {
  eventProperties: SagaProperties
  executeCommand: Function
  executeQuery: Function
  secretsManager: SecretsManager
  uploader: any
  scheduler: SchedulerRuntime
  monitoring?: Monitoring
}

export type SchedulerEventTypes = {
  SCHEDULED_COMMAND_CREATED: string
  SCHEDULED_COMMAND_EXECUTED: string
  SCHEDULED_COMMAND_SUCCEEDED: string
  SCHEDULED_COMMAND_FAILED: string
}

export type SchedulerAggregateBuilder = () => AggregateMeta

export type SchedulerProjectionBuilder = (
  schedulerName: string,
  schedulerEventTypes: SchedulerEventTypes
) => SagaEventHandlers<any, any>

export type SagaDomain = {
  schedulerName: string
  schedulerEventTypes: { [key: string]: string }
  schedulerInvariantHash: string
  getSagasSchedulersInfo: () => SchedulerInfo[]
  acquireSchedulerAggregatesInterop: AggregatesInteropBuilder
  acquireSagasInterop: SagasInteropBuilder
}

export type SagaRuntimeEventHandler = () => Promise<void>

export type SagaInterop = {
  name: string
  connectorName: string
  acquireResolver: (
    resolver: string,
    args: any,
    context: {
      jwt?: string
    }
  ) => Promise<any>
  acquireInitHandler: (store: any) => Promise<SagaRuntimeEventHandler | null>
  acquireEventHandler: (
    store: any,
    event: Event
  ) => Promise<SagaRuntimeEventHandler | null>
}

export type SagaInteropMap = {
  [key: string]: SagaInterop
}

export type SagasInteropBuilder = (runtime: SagaRuntime) => SagaInteropMap
