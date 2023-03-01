import { Request, Response } from '@google-cloud/functions-framework'
import { handler } from '@/apps/worker/main'
import { BLUE_TRAIL_DATA_LOAD_REQUEST } from '@/apps/worker/job/job'

const main = async () => {
    const job = { type: BLUE_TRAIL_DATA_LOAD_REQUEST }
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
        {
            body: {
                message: {
                    data: Buffer.from(JSON.stringify(job)).toString('base64'),
                },
            },
        } as unknown as Request,
        response as unknown as Response
    )
    if (response.statusCode !== 200 || !response.sent) {
        throw new Error('Response must be sent with status code 200')
    }
}

void main()
