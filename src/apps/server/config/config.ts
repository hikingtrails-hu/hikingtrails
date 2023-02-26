import { getenv } from '@/lib/config/getenv'

export const config = {
    pubsub: {
        topicName: getenv('PUBSUB_TOPIC'),
    },
}
