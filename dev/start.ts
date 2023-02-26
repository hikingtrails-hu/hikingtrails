import promiseRetry from 'promise-retry'
import { pubsub, topic } from '@/lib/google-cloud/pubsub'
import { subscription } from '@dev/lib/pubsub'

const main = async () => {
    subscription().on('message', (message) => {
        console.log(message.data.toString('utf8'))
    })
    console.info('🌈 Development worker started')
}

void main()
