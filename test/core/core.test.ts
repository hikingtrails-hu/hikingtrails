import { describe, it, expect } from '@jest/globals'
import { core } from '@/core'

describe('core', () => {
    it('works', () => {
        expect(core()).toEqual('core')
    })
})
