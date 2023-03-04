export type LatLon = {
    lat: number
    lon: number
}

export type Point = LatLon & {
    elevation: number
}

export type Delta = {
    distance: number
    rise: number
    descent: number
}

export type PathNode = HasDeltaFromPrevious & {
    point: Point
}

export type HasDeltaFromPrevious = {
    delta: Delta
}

export type Path = {
    nodes: PathNode[]
    locations: LocationOnPath[]
}

export type Location = {
    name: string
    description: string
    position: Point
}

export type LocationOnPath = Location & OnPath

export type TrailData = {
    points: Point[]
    locations: Location[]
}

export type OnPath = {
    nodeIdx: number
}
