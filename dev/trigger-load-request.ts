import { topic } from '@/lib/google-cloud/pubsub'

const main = async () => {
    topic().publishMessage({ data: Buffer.from('pina') })
}

void main()
