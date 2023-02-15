import { ReactNode } from 'react'

export type SettingsButtonType = {
    type: string
    active: boolean
    text: string
    onClick: () => void
}

export type SettingsLabelType = {
    name: string
    children: ReactNode
}
