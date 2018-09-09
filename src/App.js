import React, { Component } from 'react'
import GoldenLayout from 'golden-layout'

import 'golden-layout/src/css/goldenlayout-base.css'
import 'golden-layout/src/css/goldenlayout-light-theme.css'

import DrawComponent from './DrawComponent.js'
import NGLComponent from './NGLComponent.js'

class App extends Component {
  componentDidMount () {
    const webSocket = new WebSocket(
      'ws://35.242.133.138:8000/ws/conformer/')

    webSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly')
    }

    webSocket.onopen = function () {
      // webSocket.send(JSON.stringify({
      //   'molfile': 'Hello world'
      // }));
    }

    const config = {
      content: [
        {
          type: 'row',
          showPopoutIcon: false,
          showMaximiseIcon: true,
          showCloseIcon: false,
          content: [
            {
              type: 'react-component',
              component: 'DrawComponent',
              props: { webSocket },
              isClosable: false,
              title: 'Molecule Sketcher',
              showPopoutIcon: false,
              showMaximiseIcon: true,
              showCloseIcon: false
            },
            {
              type: 'react-component',
              component: 'NGLComponent',
              props: {},
              isClosable: false,
              title: '3D Visualisation',
              showPopoutIcon: false,
              showMaximiseIcon: true,
              showCloseIcon: false
            }
          ]
        }
      ]
    }

    setTimeout(() => {
      const goldenLayout = new GoldenLayout(config, this.node)
      goldenLayout.registerComponent('DrawComponent', DrawComponent)
      goldenLayout.registerComponent('NGLComponent', NGLComponent)

      goldenLayout.init()

      webSocket.onmessage = message => {
        const data = JSON.parse(message.data)
        const conformerMolfile = data['conformerMolfile']
        // console.log(conformerMolfile)
        goldenLayout.eventHub.emit(
          'conformerUpdated',
          {
            conformerMolfile
          }
        )
      }

      // console.log(goldenLayout.getComponent('DrawComponent'))
      // console.log(goldenLayout.root)

      window.addEventListener('resize', () => {
        goldenLayout.updateSize()
      })
    }, 0)
  }

  // setNode (node) { this.node = node }

  render () {
    return <div style={{width: '100%', height: '100%'}} ref={node => (this.node = node)} />
  }
}

export default App
