import { http, HttpFunction } from '@google-cloud/functions-framework'
import jsonParse from 'secure-json-parse'
import { BLUE_TRAIL_DATA_LOAD_REQUEST, run } from '@/apps/worker/job/job'

export const handler: HttpFunction = async (req, res) => {
    const job = jsonParse(
        Buffer.from(req.body.message.data ?? '', 'base64').toString('utf-8')
    )
    if (job.type !== BLUE_TRAIL_DATA_LOAD_REQUEST) {
        throw new Error(`Invalid job: ${JSON.stringify(job)}`)
    }
    await run()
    res.status(200)
    res.send()
}

export const main = () => {
    http('worker', handler)
}
