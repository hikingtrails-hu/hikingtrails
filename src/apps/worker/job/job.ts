import {
    blueTrailKeys,
    blueTrailSetup,
} from '@/apps/worker/hbt/blue-trail-setup'
import format from 'date-fns/format'
import { uuid } from '@/apps/worker/uuid/uuid'
import { http } from '@/apps/worker/http/http'
import { pointsFromGpx, locationsFromGpx } from '@/apps/worker/xml/xml'
import { config } from '@/apps/worker/config/config'
import { generatePath } from '@/apps/worker/map/map'
import { findByPattern, getLinkUrlsFromHtml } from '@/apps/worker/html/html'
import { storage } from '@/apps/worker/storage/storage'
import { Trail } from '@/core/types/types'

export const BLUE_TRAIL_DATA_LOAD_REQUEST = 'BlueTrailDataLoadRequest'

export const run = async () => {
    const loadRequestId = [
        format(new Date(), 'yyyy-MM-dd-HH-mm-ss'),
        uuid(),
    ].join('_')
    console.log(loadRequestId)
    for (const key of blueTrailKeys) {
        // for (const key of ['okt']) {
        const trailSetup = blueTrailSetup[key]
        const trailPageBody = await http.get(trailSetup.dataHomepageUrl)
        const links = getLinkUrlsFromHtml(trailPageBody)
        const pathGpxUrl = findByPattern(links, trailSetup.pathGpxUrlPattern)
        const stampGpxUrl = findByPattern(links, trailSetup.stampGpxUrlPattern)
        const [allPoints, allLocations] = await Promise.all([
            http.get(pathGpxUrl).then(pointsFromGpx),
            http.get(stampGpxUrl).then(locationsFromGpx),
        ])
        const points = allPoints.filter(
            (_, idx) => idx % config.keepEveryNthPathNode === 0
        )
        const locationsData = allLocations.filter(
            (_, idx) => idx % config.keepEveryNthLocation === 0
        )
        const path = generatePath({
            points,
            locations: locationsData,
        })
        const trail: Trail = {
            path,
            name: trailSetup.name,
            id: key,
        }
        await storage.set(`trails/current/${key}.json`, trail)
    }
}
