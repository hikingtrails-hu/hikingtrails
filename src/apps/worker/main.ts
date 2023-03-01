import { http } from '@google-cloud/functions-framework'
import jsonParse from 'secure-json-parse'
import { topic } from '@/lib/google-cloud/pubsub'

export const main = () => {
    http('worker', async (req, res) => {
        console.log({ body: req.body })
        const job = jsonParse(
            Buffer.from(req.body.message.data ?? '', 'base64').toString('utf-8')
        )
        console.log({ job })
        if (job.type === 'Test') {
            try {
                if (job.data < 10) {
                    const published = await topic().publishMessage({
                        data: Buffer.from(
                            JSON.stringify({ type: 'Test', data: job.data + 1 })
                        ),
                    })
                    console.log({ published })
                } else {
                    console.log('Job finished')
                }
            } catch (err) {
                console.error(err)
                throw err
            }
        }
        res.status(200).send()
    })
}
