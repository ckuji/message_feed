export interface IMessage {
    attachments: IAttachment[] | []
    author: string
    channel: string
    content: string
    date: string
    id: string | number
    region: string
    senderNumber: string
}

export interface IMessageExtended extends IMessage {
    active: boolean
    uniqueId: number
}

export interface IAttachment {
    type: string
    url: string
}