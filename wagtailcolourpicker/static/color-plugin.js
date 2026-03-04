(function () {
  const React = window.React;
  const ReactDOM = window.ReactDOM;
  class ColorPickerModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: props.entity ? props.entity.getData().color : '#ff0000'
      };
    }
    handleChange = e => {
      this.setState({
        color: e.target.value
      });
    };
    applyColor = () => {
      this.props.onComplete({
        color: this.state.color,
        style: `color: ${this.state.color}`
      });
    };
    render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "color-picker-modal"
      }, /*#__PURE__*/React.createElement("label", null, "Select a color:"), /*#__PURE__*/React.createElement("input", {
        type: "color",
        value: this.state.color,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: this.applyColor
      }, "Apply"));
    }
  }
  window.draftail.registerPlugin({
    type: 'COLOR',
    source: props => {
      const container = document.createElement("div");
      setTimeout(() => {
        ReactDOM.render(/*#__PURE__*/React.createElement(ColorPickerModal, props), container);
      }, 0);
      return container;
    },
    decorator: ({
      children,
      entity
    }) => {
      const {
        color
      } = entity.getData();
      return /*#__PURE__*/React.createElement("span", {
        style: {
          color
        }
      }, children);
    }
  });
})();

//# sourceMappingURL=color-plugin.js.map