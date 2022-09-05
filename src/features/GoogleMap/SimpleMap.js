import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 28.628454,
      lng: 77.376945
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBMKjOfr-vsOYRI5MhiFsaw0bb026Gorok' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={28.628454}
            lng={77.376945}
            text="My Marker"
          />
        
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;