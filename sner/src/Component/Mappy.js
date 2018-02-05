import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
const _ = require("lodash");
const { compose, withProps, withStateHandlers, lifecycle } = require("recompose");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const google = window.google;

const Mappy = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3ptyXyCL1xEpLtOr5rsls8BRzNt-Tgc0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.setState({
        bounds: null,
        center: {
          lat: 45.817348, lng: -110.929318
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          let markerLat = places["0"].geometry.location.lat();
          let markerLng = places["0"].geometry.location.lng();
          this.props.markerCoords(markerLat, markerLng);
          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
    componentDidMount() {
      let coordArray = this.props.markerMaker();
      this.setState({
        markers: coordArray,
      })
    },
    componentWillReceiveProps() {
      let coordArray = this.props.markerMaker();
      this.setState({
        markers: coordArray,
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={10}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    defaultMapTypeId={`terrain`}
    onMouseMove={(e) => props.getCoords(e)}
    onClick={() => props.newState()}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `10px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker
        key={index}
        position={marker.position}
        onClick={() => { marker.isOpen = !marker.isOpen }}
        onRightClick={() => console.log(marker)}>
        {marker.isOpen && (
          <InfoWindow
            onCloseClick={() => { marker.isOpen = !marker.isOpen }}
          ><div>{marker.name}</div></InfoWindow>)}
      </Marker>
    )}
  </GoogleMap>
  );

export default Mappy;