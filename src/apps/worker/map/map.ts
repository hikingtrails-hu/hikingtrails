import {
    Delta,
    Path,
    TrailData,
    Point,
    LatLon,
    LocationOnPath,
} from '@/core/types/types'
import { getPreciseDistance } from 'geolib'

export const getDistance = (point1: LatLon, point2: LatLon) =>
    getPreciseDistance(
        { longitude: point1.lon, latitude: point1.lat },
        { longitude: point2.lon, latitude: point2.lat },
        0.001
    )

export const getDelta = (point1: Point, point2: Point): Delta => {
    const diff = point2.elevation - point1.elevation
    const distance = getDistance(point1, point2)
    return {
        distance,
        rise: Math.max(diff, 0),
        descent: Math.abs(Math.min(diff, 0)),
    }
}

export const generatePath = (trail: TrailData): Path => {
    const nodes = trail.points.map((point, idx) => ({
        point,
        delta:
            idx === 0
                ? { distance: 0, descent: 0, rise: 0 }
                : getDelta(trail.points[idx - 1] as Point, point),
    }))
    const locations = trail.locations
        .map((location) => {
            let minDistance = Infinity
            let nearestIdx = -1
            nodes.forEach((node, idx) => {
                const distance = getDistance(node.point, location.position)
                if (distance < minDistance) {
                    minDistance = distance
                    nearestIdx = idx
                }
            })
            return {
                ...location,
                nodeIdx: nearestIdx,
            }
        })
        .sort((location1, location2) => location1.nodeIdx - location2.nodeIdx)
    return {
        nodes,
        locations,
    }
}
