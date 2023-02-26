import { topic } from '@/lib/google-cloud/pubsub'
import { singleton } from '@/lib/setup/setup'

export const subscription = singleton(() =>
    topic().subscription('test-subscription', { ackDeadline: 540 })
)
