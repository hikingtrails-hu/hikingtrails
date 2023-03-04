import axios from 'axios'
import promiseRetry from 'promise-retry'

let axiosGet = async (url: string) =>
    new Promise<string>(async (resolve, reject) =>
        promiseRetry(
            // TODO: log duration, retries
            async (retry, attempt) => {
                try {
                    const res = await axios.get(url)
                    resolve(res.data.toString())
                } catch (err) {
                    retry(err)
                }
            },
            {
                factor: 2,
                retries: 20,
                minTimeout: 1000, // 1s
                maxTimeout: 3 * 60 * 1000, // 3min
            }
        )
    )

export const replace = (fn: typeof axiosGet) => {
    axiosGet = fn
}

export const httpGet: typeof axiosGet = (url) => axiosGet(url)
