import { createReducer } from '../../app/common/util/reducerUtil'
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstants'

const initialState = [
  {
    id: '1',
    title: 'ピカチュウだからできる絶対にバレないセクハラ講座',
    date: '2018-03-27',
    category: 'culture',
    description:
      'プロセクハラーによる数々の伝説をお伝えします。',
    city: 'Tokyo, Japan',
    venue: "例のプール",
    hostedBy: 'ピカチュウ',
    hostPhotoURL: 'https://media.giphy.com/media/U2nN0ridM4lXy/giphy.gif',
    attendees: [
      {
        id: 'a',
        name: 'ピカチュウ',
        photoURL: 'https://media.giphy.com/media/U2nN0ridM4lXy/giphy.gif'
      },
      {
        id: 'b',
        name: 'ゼニガメ',
        photoURL: 'https://media.giphy.com/media/LxSFsOTa3ytEY/giphy.gif'
      }
    ]
  },
  {
    id: '2',
    title: 'ゼニガメ帝国のさらなる領土拡大について',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'ゼニガメ帝国のさらなる繁栄のためにできることをみんなで考える会です。具体的には、ヒトカゲを1匹残らず駆逐をする方法についてです。',
    city: 'Tokyo, Japan',
    venue: 'ゼニガメ城 西ホール2F大広間',
    hostedBy: 'ゼー二ガーメ3世',
    hostPhotoURL: 'https://media.giphy.com/media/LxSFsOTa3ytEY/giphy.gif',
    attendees: [
      {
        id: 'b',
        name: 'ゼニガメ',
        photoURL: 'https://media.giphy.com/media/LxSFsOTa3ytEY/giphy.gif'
      },
      {
        id: 'a',
        name: 'ピカチュウ',
        photoURL: 'https://media.giphy.com/media/U2nN0ridM4lXy/giphy.gif'
      }
    ]
  },
  {
    id: '3',
    title: 'ピカチュウ先輩を出し抜くまでにやったこと',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'アニメで、レギュラーずっとはってるからって調子に乗ってるピカチュウ先輩をどうにかして出し抜いた方法について話します！',
    city: 'Tokyo, Japan',
    venue: 'ピチュー財団記念迎賓館',
    hostedBy: 'ピチュー',
    hostPhotoURL: 'https://media.giphy.com/media/GDuOdHz0lCzNS/giphy.gif',
    attendees: [
      {
        id: 'b',
        name: 'ゼニガメ',
        photoURL: 'https://media.giphy.com/media/LxSFsOTa3ytEY/giphy.gif'
      }
    ]
  }
]

export const createEvent = (state, payload) => {
  return [...state, Object.assign({}, payload.event)]
}

export const updateEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.event.id),
    Object.assign({}, payload.event)
  ]
}

export const deleteEvent = (state, payload) => {
  return [...state.filter(event => event.id !== payload.eventId)]
}

export default createReducer(initialState, {
  [CREATE_EVENT]: createEvent,
  [UPDATE_EVENT]: updateEvent,
  [DELETE_EVENT]: deleteEvent
})