import { Bucket, Storage as CloudStorage } from '@google-cloud/storage'
import { tmpdir } from 'os'
import { resolve } from 'path'
import { writeFileSync, rmSync } from 'fs'
import { config } from '@/apps/worker/config/config'
import { uuid } from '@/apps/worker/uuid/uuid'

export class Storage {
    private readonly bucket: Bucket

    constructor() {
        const storage = new CloudStorage({
            apiEndpoint: config.googleCloud.storageApiEndpoint,
            projectId: config.googleCloud.projectName,
        })
        this.bucket = storage.bucket(config.googleCloud.storageBucketName)
    }

    public async has(key: string): Promise<boolean> {
        const [exists] = await this.bucket.file(key).exists()
        return exists
    }

    public async set<Data>(key: string, data: Data): Promise<void> {
        const filePath = resolve(tmpdir(), uuid())
        writeFileSync(filePath, JSON.stringify(data))
        await this.bucket.upload(filePath, { destination: key })
        rmSync(filePath)
    }

    public async get<Data>(key: string): Promise<Data> {
        const [file] = await this.bucket.file(key).get()
        const content = await file.download()
        return JSON.parse(content.toString()) as Data
    }
}

export const storage = new Storage()
