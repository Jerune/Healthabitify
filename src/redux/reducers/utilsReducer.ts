import { createSlice } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { getSpecifiedDateAsString } from '../../utils/getDatesAsString'
import { UpdateMessage } from '../../types'

// setting initial time values
const todayOneWeekAgo = DateTime.now().minus({ days: 7 })
const currentDateTime = {
    currentDate: getSpecifiedDateAsString(todayOneWeekAgo),
    year: todayOneWeekAgo.year,
    month: todayOneWeekAgo.month,
    weekNumber: todayOneWeekAgo.weekNumber,
    firstDayOfTheWeek: '',
    lastDayOfTheWeek: '',
}

// Initial State
const utils = {
    isLoading: true,
    loadingMessage: '',
    sideNavOpen: false,
    manualDataGridOpen: false,
    updateMessages: [] as UpdateMessage[],
    activeTimeView: 'week',
    currentDateTime,
}

// Reducer

export const utilsSlice = createSlice({
    name: 'user',
    initialState: utils,
    reducers: {
        changeLoadingStatus: (state, action) => {
            return {
                ...state,
                isLoading: action.payload,
            }
        },
        changeLoadingMessage: (state, action) => {
            return {
                ...state,
                loadingMessage: action.payload,
            }
        },
        addUpdateMessage: (state, action) => {
            const newMessage: UpdateMessage = {
                id: state.updateMessages.length + 1,
                message: action.payload,
            }
            return {
                ...state,
                updateMessages: [...state.updateMessages, newMessage],
            }
        },
        toggleMenu: (state) => {
            return {
                ...state,
                sideNavOpen: !state.sideNavOpen,
            }
        },
        toggleManualDataGrid: (state) => {
            return {
                ...state,
                activeTimeView: 'week',
                manualDataGridOpen: !state.manualDataGridOpen,
            }
        },
        changeActiveTimeView: (state, action) => {
            const value = action.payload
            if (value === 'week' || value === 'month' || value === 'year') {
                return {
                    ...state,
                    activeTimeView: value,
                }
            }
            return state
        },
        changeDateTimeData: (state, action) => {
            const dateTimeData = action.payload
            return {
                ...state,
                currentDateTime: {
                    ...dateTimeData,
                },
            }
        },
        default: (state) => {
            return state
        },
    },
})

export const {
    changeLoadingStatus,
    changeLoadingMessage,
    addUpdateMessage,
    toggleMenu,
    toggleManualDataGrid,
    changeActiveTimeView,
    changeDateTimeData,
} = utilsSlice.actions
export default utilsSlice.reducer
