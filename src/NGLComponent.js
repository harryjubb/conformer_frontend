import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as NGL from 'ngl'
import './NGLComponent.css'

class NGLComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  componentDidMount () {
		const stage = new NGL.Stage(this.viewport)
    window.stage = stage
    stage.setParameters({backgroundColor: 'white'})
		window.addEventListener('resize', () => {
      stage.handleResize()
		})
    this.props.glContainer.on('resize', () => {
      // console.log('resize pane')
      stage.handleResize();
    })

    // HANDLE INCOMING CONFORMERS
    this.props.glEventHub.on(
      'conformerUpdated',
      data => {
        // console.log('from glEventHub', data)
        const stringBlob = new Blob([data.conformerMolfile], { type: 'text/plain' })
        // console.log(stringBlob)
        stage.removeAllComponents()
        stage.loadFile(stringBlob, { ext: 'pdb' }).then(component => {
          component.addRepresentation('hyperball')
          stage.autoView()
        })
      }
    )
  }

  render() {
    return (
      <div className='ngl' ref={el => this.viewport = el} style={{height: '100%'}}/>
    );
  }
}

export default NGLComponent
