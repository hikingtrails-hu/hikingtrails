import { describe, it, expect } from '@jest/globals'
import { singleton } from '@/lib/setup/setup'

describe('singleton()', () => {
    it('return the same instance', () => {
        const factory = singleton(() => ({
            test: 1,
        }))
        const obj1 = factory()
        const obj2 = factory()
        obj1.test = 2
        expect(obj1.test).toEqual(2)
        expect(obj2.test).toEqual(2)
    })
})
