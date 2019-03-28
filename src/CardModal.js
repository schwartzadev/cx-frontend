import React, { Component } from 'react';
import classNames from 'classnames';


const scoreCutoff = 0.2;


function GetWordClasses(wordVectorValue) {
  if (wordVectorValue < scoreCutoff) {
    return classNames(
      'word',
      'cut-text'
    );
  } else {
    return classNames( 'word' );
  }
}

class Word extends Component {
  render() {
    var wordClasses = GetWordClasses(this.props.vector[1]);
    return (
      <div className="word-container-outer">
        <div className="word-container-inner">
          <div className={wordClasses}>{this.props.vector[0]}</div>
          <div className="word-vector">{ Math.round(this.props.vector[1] * 100) }</div>
        </div>
      </div>
    );
  }
}

class CardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false
    }
  }

  hide() {
    this.setState({
      isHidden: true
    })
  }

  render() {
    return (
      <div className="card-body-container" style={this.state.isHidden ? {display: 'none'} : {display: 'block'} }>
        <span className="close-div-button" onClick={this.hide.bind(this)} >&times;</span> {/*} todo put this in a flexbox with the cutting toggles */}
        {this.props.wordVectors.map(info => (
          <Word vector={info} />
        ))};
      </div>
    );
  }
}

export default CardModal;
