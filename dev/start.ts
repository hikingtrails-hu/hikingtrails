import { Request, Response } from '@google-cloud/functions-framework'
import { handler } from '@/apps/worker/main'
import { BLUE_TRAIL_DATA_LOAD_REQUEST } from '@/apps/worker/job/job'
import { replace } from '@/apps/worker/http/http'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { getenv } from '@/lib/config/getenv'

const main = async () => {
    const job = { type: BLUE_TRAIL_DATA_LOAD_REQUEST }
    if (getenv('USE_FAKE_HTTP', 'false') === 'true') {
        replace(async (url) => {
            const fileName = url.split('/').pop() as string
            return readFileSync(
                resolve(__dirname, './fake-http', fileName),
                'utf8'
            )
        })
    }
    const request = {
        body: {
            message: {
                data: Buffer.from(JSON.stringify(job)).toString('base64'),
            },
        },
    }
    const response = {
        statusCode: null as number | null,
        sent: false,
        status(code: number) {
            this.statusCode = code
        },
        send() {
            this.sent = true
        },
    }
    await handler(
        request as unknown as Request,
        response as unknown as Response
    )
    if (response.statusCode !== 200 || !response.sent) {
        throw new Error('Response must be sent with status code 200')
    }
}

void main()
