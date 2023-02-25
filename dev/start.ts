import { PubSub } from '@google-cloud/pubsub'

const main = async () => {
    const pubsub = new PubSub({ projectId: 'test-project' })
    const subscription = pubsub.subscription('test-subscription')
    subscription.on('message', (message) => {
        console.log(message)
    })
}

void main()
