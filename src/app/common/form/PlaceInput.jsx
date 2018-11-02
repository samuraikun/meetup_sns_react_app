import React, { Component } from 'react'
import { Form, Label } from 'semantic-ui-react'
import Script from 'react-load-script'
import PlacesAutoComplete from 'react-places-autocomplete'

const styles = {
  autocompleteContainer: {
    zIndex: 1000
  }
}

class PlaceInput extends Component {
  state = {
    address: '',
    scriptLoaded: false
  }

  handleScriptLoaded = () => this.setState({scriptLoaded: true})

  onChange = address => this.setState({address})

  render() {
    const { width, onSelect, placeholder, options, meta: {touched, error} } = this.props

    // FIXME Redux Form の onChange の value を使って自動補完する場合
    // 　　　 日本語入力の変換を待たずして、自動補完のイベントが発火するため、日本語入力がうまくできない。
    //       そのため、このコンポーネントのローカルステートの値を使用する
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyA7OvTM0xL_349g0OHvz4EvRJ-vmlI8q8A&libraries=places'
          onLoad={this.handleScriptLoaded}
        />
        {this.state.scriptLoaded &&
        <PlacesAutoComplete
          inputProps={{...inputProps, placeholder}}
          options={options}
          onSelect={onSelect}
          styles={styles}
        />}
        {touched && error && <Label basic color='red'>{error}</Label>}
      </Form.Field>
    )
  }
}

export default PlaceInput
