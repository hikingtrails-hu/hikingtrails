import promiseRetry from 'promise-retry'
import { pubsub, topic } from '@/lib/google-cloud/pubsub'
import { subscription } from '@dev/lib/pubsub'

const main = async () => {
    await promiseRetry(
        async (retry, attempt) => {
            try {
                console.info(`* Checking Pub/Sub emulator… (${attempt})`)
                await pubsub().getTopics({ gaxOpts: { timeout: 1000 } })
                console.info(`✓ Pub/Sub emulator is ready`)
            } catch (err) {
                retry(err)
            }
        },
        {
            factor: 1,
            retries: 100,
            minTimeout: 500,
        }
    )
    const [topicExists] = await topic().exists()
    if (!topicExists) {
        const [created] = await topic().create()
        console.info(`✨ Topic created: ${created?.metadata?.name}`)
    }
    const [subscriptionExists] = await subscription().exists()
    if (!subscriptionExists) {
        const [created] = await subscription().create({
            ackDeadlineSeconds: 540,
        })
        console.info(`✨ Subscription created: ${created?.metadata?.name}`)
    }
}

void main()
