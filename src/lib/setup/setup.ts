export const singleton = <T>(create: () => T) => {
    let instance: T | null = null
    return () => {
        if (instance !== null) {
            return instance
        }
        instance = create()
        return instance
    }
}
