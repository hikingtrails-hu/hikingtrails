import {
    blueTrailKeys,
    blueTrailSetup,
} from '@/apps/worker/hbt/blue-trail-setup'
import format from 'date-fns/format'
import { uuid } from '@/apps/worker/uuid/uuid'
import { httpGet } from '@/apps/worker/http/http'
import { pointsFromGpx, locationsFromGpx } from '@/apps/worker/xml/xml'
import { config } from '@/apps/worker/config/config'
import { generatePath } from '@/apps/worker/map/map'
import { findByPattern, getLinkUrlsFromHtml } from '@/apps/worker/html/html'

export const BLUE_TRAIL_DATA_LOAD_REQUEST = 'BlueTrailDataLoadRequest'

export const run = async () => {
    const loadRequestId = [
        format(new Date(), 'yyyy-MM-dd-HH-mm-ss'),
        uuid(),
    ].join('_')
    for (const key of blueTrailKeys) {
        const trailSetup = blueTrailSetup[key]
        const trailPageBody = await httpGet(trailSetup.dataHomepageUrl)
        const links = getLinkUrlsFromHtml(trailPageBody)
        const pathGpxUrl = findByPattern(links, trailSetup.pathGpxUrlPattern)
        const stampGpxUrl = findByPattern(links, trailSetup.stampGpxUrlPattern)
        const [allPoints, allLocations] = await Promise.all([
            httpGet(pathGpxUrl).then(pointsFromGpx),
            httpGet(stampGpxUrl).then(locationsFromGpx),
        ])
        const points = allPoints.filter(
            (_, idx) => idx % config.keepEveryNthPathNode === 0
        )
        const locations = allLocations.filter(
            (_, idx) => idx % config.keepEveryNthLocation === 0
        )
        const path = generatePath({
            points,
            locations,
        })
        console.log(path.nodes.length)
    }
}
