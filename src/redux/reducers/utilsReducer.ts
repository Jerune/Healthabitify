import { createSlice } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { getSpecifiedDateAsString } from '../../utils/getDatesAsString'

// setting initial time values
const todayOneWeekAgo = DateTime.now().minus({ days: 7 })
const currentDateTime = {
    currentDate: getSpecifiedDateAsString(todayOneWeekAgo),
    year: todayOneWeekAgo.year,
    month: todayOneWeekAgo.month,
    weekNumber: todayOneWeekAgo.weekNumber,
    firstDayOfTheWeek: getSpecifiedDateAsString(
        todayOneWeekAgo.minus({ days: 7 })
    ),
    lastDayOfTheWeek: getSpecifiedDateAsString(
        todayOneWeekAgo.plus({ days: 7 })
    ),
}

// Initial State
const utils = {
    sideNavOpen: false,
    activeTimeView: 'week',
    currentDateTime,
}

// Reducer

export const utilsSlice = createSlice({
    name: 'user',
    initialState: utils,
    reducers: {
        toggleMenu: (state) => {
            return {
                ...state,
                sideNavOpen: !state.sideNavOpen,
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
            const {
                weekNumber,
                month,
                year,
                firstDayOfTheWeek,
                lastDayOfTheWeek,
            } = action.payload
            return {
                ...state,
                currentDateTime: {
                    ...state.currentDateTime,
                    weekNumber,
                    month,
                    year,
                    firstDayOfTheWeek,
                    lastDayOfTheWeek,
                },
            }
        },
        default: (state) => {
            return state
        },
    },
})

export const { toggleMenu, changeActiveTimeView, changeDateTimeData } =
    utilsSlice.actions
export default utilsSlice.reducer
