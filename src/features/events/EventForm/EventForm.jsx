/*global google*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase'
import { reduxForm, Field } from 'redux-form'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Script from 'react-load-script'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
import { createEvent, updateEvent, cancelToggle } from '../eventActions'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'
import DateInput from '../../../app/common/form/DateInput'
import PlaceInput from '../../../app/common/form/PlaceInput'
import { GOOGLE_API_KEY } from '../../../app/config/key'

const mapStateToProps = state => {
  let event = {}

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }

  return {
    initialValues: event,
    event
  }
}

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
}

const category = [
  {key: 'tech', text: 'Tech', value: 'tech'},
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'},
]

const validate = combineValidators({
  title: isRequired({message: 'イベント名を入力してください'}),
  category: isRequired({message: 'ジャンルを選択して下さい'}),
  description: composeValidators(
    isRequired({message: 'イベントの内容を入力してください'}),
    hasLengthGreaterThan(4)({message: '5文字以上で入力してください'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
})

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  async componentDidMount() {
    const { firestore, match } = this.props
    await firestore.setListener(`events/${match.params.id}`)
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props
    await firestore.unsetListener(`events/${match.params.id}`)
  }

  handleCitySelect = async selectedCity => {
    try {
      const results = await geocodeByAddress(selectedCity)
      const cityGeocode = results[0]
      const latlng = await getLatLng(cityGeocode)

      this.setState({cityLatLng: latlng})
      this.props.change('city', selectedCity)
    } catch (error) {
      console.log(error)
    }
  }

  handleVenueSelect = async selectedVenue => {
    try {
      const results = await geocodeByAddress(selectedVenue)
      const venueGeocode = results[0]
      const latlng = await getLatLng(venueGeocode)

      this.setState({venueLatLng: latlng})
      this.props.change('venue', selectedVenue)
    } catch (error) {
      console.log(error)
    }
  }

  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng

    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng
      }

      this.props.updateEvent(values)
      this.props.history.goBack()
    } else {
      this.props.createEvent(values);
      this.props.history.push('/events');
    }
  }

  handleScriptLoaded = () => this.setState({scriptLoaded: true})

  render() {
    const { invalid, submitting, pristine, event, cancelToggle } = this.props

    return (
      <Grid>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name='title'
                type='text'
                component={TextInput}
                placeholder='Give your event a name'
              />
              <Field
                name='category'
                type='text'
                component={SelectInput}
                options={category}
                placeholder='What is your event a name'
              />
              <Field
                name='description'
                type='text'
                rows={3}
                component={TextArea}
                placeholder='Tell us about your event'
              />
              <Header sub color='teal' content='Event Location Details' />
              <Field
                name='city'
                type='text'
                component={PlaceInput}
                options={{ types: ['(cities)']}}
                placeholder='Event City'
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded &&
              <Field
                name='venue'
                type='text'
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
                component={PlaceInput}
                placeholder='Event Venue'
                onSelect={this.handleVenueSelect}
              />}
              <Field
                name='date'
                type='text'
                component={DateInput}
                dateFormat='YYYY-MM-DD HH:mm'
                timeFormat='HH:mm'
                showTimeSelect
                placeholder='Event Date'
              />
              <Button disabled={invalid || submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>
                Cancel
              </Button>
              <Button
                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type='button'
                color={event.cancelled ? 'green' : 'red'}
                floated='right'
                content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default withFirestore(connect(mapStateToProps, actions)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm)));
