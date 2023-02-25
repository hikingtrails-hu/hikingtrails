import { describe, it, expect } from '@jest/globals'
import { server } from '@/apps/server/server'

describe('server', () => {
    it('works', () => {
        const result = server()
        expect(result).toEqual('server')
    })
})
