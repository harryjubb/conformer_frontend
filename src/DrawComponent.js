import React, { Component } from 'react'
import PropTypes from 'prop-types'


class DrawComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    window.chemwriter.System.ready(() => {
      let editor = window.chemwriter.components['editor']

      editor.addEventListener('document-edited', () => {

        console.log('Document edited.');

        const molFile = editor.getMolfile()
        console.log(molFile)
        
        this.props.webSocket.send(JSON.stringify({
          'molfile': molFile
        }));

      });

      window.addEventListener('resize', () => {
        console.log('resize window');
        window.chemwriter.refresh()
      })

      // this.props.glContainer.on('resize', () => {
      //   console.log('resize pane')
      //   window.chemwriter.refresh()
      // })

    })
  }

  render() {
    return (
      <div id="editor"
        data-chemwriter-ui="editor"
      >	
      </div>
    );
  }
}

export default DrawComponent
