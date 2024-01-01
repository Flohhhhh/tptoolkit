'use client'

import React, { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
// import the mapbox-gl styles so that the map is displayed correctly

function Map(props) {
  // this is where the map instance will be stored after initialization
  const { onMapLoad, onMapRemoved, initialOptions } = props
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState()

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapNode = useRef(null)

  useEffect(() => {
    const node = mapNode.current
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === 'undefined' || node === null) return

    // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
      projection: 'globe',
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
      center: [-74.5, 40],
      zoom: 9,
      doubleClickZoom: false,
      hash: false, //syncs map location with url
      ...initialOptions
    })

    // add navigation control (the +/- zoom buttons)
    mapboxMap.addControl(new mapboxgl.NavigationControl(), 'bottom-left')

    // // add fullscreen control
    // mapboxMap.addControl(new mapboxgl.FullscreenControl(), 'top-right')

    // // add geolocate control
    // mapboxMap.addControl(
    //   new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //       enableHighAccuracy: true
    //     },
    //     trackUserLocation: false
    //   }),
    //   'top-right'
    // )

    // add scale control
    mapboxMap.addControl(new mapboxgl.ScaleControl(), 'bottom-right')

    // // add attribution control
    // mapboxMap.addControl(
    //   new mapboxgl.AttributionControl({
    //     compact: true
    //   }),
    //   'bottom-right'
    // )

    // add click event listener
    mapboxMap.on('click', (e) => {
      // log lat long
      console.log('Lat:', e.lngLat.lat, 'Long:', e.lngLat.lng)
      const layers = mapboxMap.getStyle().layers
    //   console.log('Layers', layers)
      const features = mapboxMap.queryRenderedFeatures(e.point, {
        layers: ['poi-label']
      })
    //   console.log(features)
      // new mapboxgl.Popup()
      //   .setLngLat(e.lngLat)
      //   .setHTML('you clicked here: <br/>' + features[0].properties.name)
      //   .addTo(mapboxMap)
    })


    mapboxMap.on('style.load', () => {
        mapboxMap.setConfigProperty('basemap', 'lightPreset', 'dusk');
    });

    // save the map object to useState
    setMap(mapboxMap)

    // set cursor to default
    mapboxMap.getCanvas().style.cursor = 'default'

    if (onMapLoad) mapboxMap.once('load', onMapLoad)

    return () => {
      mapboxMap.remove()
      if (onMapRemoved) onMapRemoved()
    }
  }, [])

  return <div ref={mapNode} className="w-full h-full p-56" />
}

export default Map