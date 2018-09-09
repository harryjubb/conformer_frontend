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
        data-chemwriter-ui='editor'
        data-chemwriter-data= '\n  CWRITER307031309392D                              \nCreated with ChemWriter - http://chemwriter.com\n 16 16  0  0  1  0  0  0  0  0999 V2000\n   53.8419  -44.7648    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   62.5022  -49.7648    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   71.1624  -44.7648    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   71.1624  -34.7648    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   62.5022  -29.7648    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   53.8419  -34.7648    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   45.1817  -29.7648    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   45.1817  -49.7648    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n   36.5214  -24.7648    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n   79.8227  -29.7648    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   88.4829  -34.7648    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   97.1432  -29.7648    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n   79.8227  -19.7648    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  105.8034  -34.7648    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  114.4637  -29.7649    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  105.8034  -44.7648    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0\n  2  3  1  0  0  0\n  3  4  2  0  0  0\n  4  5  1  0  0  0\n  5  6  2  0  0  0\n  6  1  1  0  0  0\n  6  7  1  0  0  0\n  1  8  1  0  0  0\n  7  9  3  0  0  0\n  4 10  1  0  0  0\n 10 11  1  0  0  0\n 11 12  1  0  0  0\n 10 13  1  6  0  0  0\n 12 14  1  0  0  0\n 14 15  1  0  0  0\n 14 16  1  0  0  0\nM  END'
      >	
      </div>
    );
  }
}

export default DrawComponent
