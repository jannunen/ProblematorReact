import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class MyCompSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
    return (
      <View>
            <Routes
                routes={this.state.routes}
            />
      </View>
    )
  }
}


class Routes extends Component {
    render() {
      return (
        <React.Fragment>
          {this.props.routes.map((route, idx) =>
            <Ascents
              key={idx}
              route={idx + 1}
              top={route.top}
              bonus={route.bonus}
            />
          )}
        </React.Fragment>
      );
    }
  }

  class Ascents extends Component {
    constructor(props) {
      super(props);
      this.state = {
        top: this.props.top,
        bonus: this.props.bonus,
      };
    }
  
    setTop(tries) {
      const top = tries;
      const bonus = this.state.bonus ? Math.min(this.state.bonus, tries) : top;
      this.setState({
        top,
        bonus,
      });
    }
  
    setBonus(tries) {
      this.setState({
        bonus: tries,
      });
    }
  
    render() {
      return (
        <React.Fragment>
          <div className="row">
            <span className="field">
              {this.props.route}
            </span>
            <span className="field">
              Top:
                <Tries
                  tries={this.state.top}
                  setTries={tries => this.setTop(tries)}
                />
                <Button
                  enabled={true}
                  selected={this.state.top === 0}
                  text="X" onClick={() => this.setTop(0)}
                />
            </span>
            <span className="field">
              Bonus:
                <Tries
                  tries={this.state.bonus}
                  max={this.state.top}
                  setTries={tries => this.setBonus(tries)}
                />
            </span>
            <span className="field">
              <AscentText
                bonus={this.state.bonus}
                top={this.state.top}
              />
            </span>
            <span className="field">
              <AscentNotation
                bonus={this.state.bonus}
                top={this.state.top}
              />
            </span>
          </div>
        </React.Fragment>
      );
    }
  }
  
  class AscentText extends Component {
    render() {
      return (
        <div className="ascentText">
          {this.props.top ? 1 : 0}t{this.props.top} {this.props.bonus ? 1 : 0}b{this.props.bonus}
        </div>
      );
    }
  }
  
  class AscentNotation extends Component {
    render() {
      const {
        top,
        bonus,
      } = this.props;
      const lines = Math.max(top, bonus);
      const line = n =>
        <path key={n} stroke="black" strokeWidth="3" d={`M${n}0 5 ${n}0 28`}/>;
      const drawTop = n =>
        top && <path stroke="black" strokeWidth="3" d={`M${10 * n - 6} 6 ${10 * n + 6} 6`}/>
      const drawBonus = n =>
        bonus && <path stroke="black" strokeWidth="3" d={`M${10 * n - 4} 16 ${10 * n + 4} 16`}/>
  
      return (
        <svg className="ascentNotation">
          {range(1, lines).map(line)}
          {drawBonus(bonus)}
          {drawTop(top)}
        </svg>
      );
    }
  }
  
  class Tries extends Component {
    render() {
      return (
        <div className="tries">
          { range(1, 5).map((tries, idx) =>
            <Button
              key={idx}
              text={tries}
              selected={tries === this.props.tries}
              enabled={
                (this.props.max === undefined) ? true : this.props.max === 0 || tries <= this.props.max
              }
              onClick={() => this.props.setTries(tries)}
            />
          ) }
        </div>
      );
    }
  }
  
  class Button extends Component {
    render() {
      return (
        <div
          className={"button"
            + (this.props.enabled ? " button-enabled" : " button-disabled")
            + (this.props.selected ? " button-selected" : "")
          }
          onClick={() => this.props.enabled && this.props.onClick()}
        >
          {this.props.text}
        </div>
      );
    }
  }
  