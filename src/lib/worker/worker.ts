// export interface WorkerMessage<
//     Type extends string = string,
//     Data extends Record<string, unknown> = Record<string, unknown>
// > {
//     type: Type
//     data: Data
// }
//
// export type Jobs<M extends WorkerMessage> = {
//     [message in M as message['type']]: (data: message['data']) => Promise<void>
// }
//
// export class InvalidMessage extends Error {}
//
// export const createMessageHandler =
//     <M extends WorkerMessage>(jobs: Jobs<M>) =>
//     async (message: M) => {
//         const job = jobs[message.type as M['type']]
//         if (!job) {
//             throw new InvalidMessage(
//                 `Invalid message: ${JSON.stringify(message)}`
//             )
//         }
//         void (await job(message.data as unknown as never))
//     }

export {}
