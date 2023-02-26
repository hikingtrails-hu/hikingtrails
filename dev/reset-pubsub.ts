import promiseRetry from 'promise-retry'
import { pubsub, topic } from '@/lib/google-cloud/pubsub'
import { subscription } from '@dev/lib/pubsub'

const main = async () => {
    const [subscriptionExists] = await subscription().exists()
    if (subscriptionExists) {
        await subscription().delete()
    }
    const [topicExists] = await topic().exists()
    if (topicExists) {
        await topic().delete()
    }
    const [topicCreated] = await topic().create()
    console.info(`✨ Topic created: ${topicCreated?.metadata?.name}`)
    const [subscriptionCreated] = await subscription().create({
        ackDeadlineSeconds: 540,
    })
    console.info(
        `✨ Subscription created: ${subscriptionCreated?.metadata?.name}`
    )
}

void main()
