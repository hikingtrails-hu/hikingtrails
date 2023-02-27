import { PubSub } from '@google-cloud/pubsub'
import { singleton } from '@/lib/setup/setup'
import { config } from '@/apps/worker/config/config'

export const pubsub = singleton(() => new PubSub())

export const topic = singleton(() => pubsub().topic(config.pubsub.topicName))
