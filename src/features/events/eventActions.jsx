import { toastr } from 'react-redux-toastr'
import { FETCH_EVENTS } from './eventConstants'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions'
import { createNewEvent } from '../../app/common/util/helpers'
import moment from 'moment'
import firebase from '../../app/config/firebase'

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);

    try {
      let createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });

      toastr.success('Sucess!', 'Event has been created')
    } catch (error) {
      toastr.error('Oops', 'Something went wrong')
    }
  }
}

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    if (event.date !== getState().firestore.ordered.events[0].date) {
      event.date = moment(event.date).toDate()
    }

    try {
      await firestore.update(`events/${event.id}`, event)
      toastr.success('Sucess!', 'Event has been updated!')
    } catch (error) {
      toastr.error('Oops', 'Something went wrong')
    }
  }
}

export const cancelToggle = (cancelled, eventId) => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()
  const message = cancelled ? 'このイベントをキャンセルしますか?' : 'このイベントのキャンセルを取り消しますか?'

  try {
    toastr.confirm(message, {
      onOk: () => 
        firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    })
  } catch (error) {
    console.log(error)
  }
}

export const getEventsForDashboard = () => async (dispatch, getState) => {
  let today = new Date(Date.now())
  const firestore = firebase.firestore()
  const eventsQuery = firestore.collection('events').where('date', '>=', today)

  try {
    dispatch(asyncActionStart())

    let querySnap = await eventsQuery.get()
    let events = [];

    for (let i=0; i < querySnap.docs.length; i++) {
      let evt = {...querySnap.docs[i].data(), id: querySnap.docs[i].id}
      events.push(evt)
    }
    
    dispatch({type: FETCH_EVENTS, payload: { events }})
    dispatch(asyncActionFinish())
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
  }
}
