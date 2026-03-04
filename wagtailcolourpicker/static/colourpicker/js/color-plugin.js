"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  var React = window.React;
  var ReactDOM = window.ReactDOM;
  var Modifier = window.DraftJS.Modifier;
  var RichUtils = window.DraftJS.RichUtils;
  var EditorState = window.DraftJS.EditorState;
  console.log("React:", React);
  console.log("ReactDOM:", ReactDOM);
  var style = document.createElement("style");
  style.textContent = "\n    .color-picker-modal {\n      position: relative;\n      pointer-events: auto !important;\n      z-index: 9999;\n      background: white;\n      padding: 1em;\n      border: 1px solid #ccc;\n      max-width: 300px;\n    }\n  ";
  document.head.appendChild(style);
  var ColorPickerModal = /*#__PURE__*/function (_React$Component) {
    function ColorPickerModal(props) {
      var _props$entity, _props$entity$getData;
      var _this;
      _classCallCheck(this, ColorPickerModal);
      _this = _callSuper(this, ColorPickerModal, [props]);
      _defineProperty(_this, "handleChange", function (e) {
        _this.setState({
          color: e.target.value
        });
      });
      _defineProperty(_this, "handleCancel", function () {
        console.log("Cancel clicked");
        if (typeof _this.props.onClose === "function") {
          _this.props.onClose();
        } else {
          console.warn("onClose is missing!");
        }
      });
      _defineProperty(_this, "applyColor", function () {
        var _this$props = _this.props,
          editorState = _this$props.editorState,
          onComplete = _this$props.onComplete;
        var color = _this.state.color;
        console.log("Applying color", color);
        var selection = editorState.getSelection();
        var contentState = editorState.getCurrentContent();
        var currentStyle = editorState.getCurrentInlineStyle();

        // Step 1: Remove existing COLOR_ styles
        var nextContentState = contentState;
        currentStyle.forEach(function (style) {
          if (style.startsWith('COLOR_')) {
            nextContentState = Modifier.removeInlineStyle(nextContentState, selection, style);
          }
        });

        // Step 2: Push content state with removed styles (if changed)
        var nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');

        // Step 3: Apply the new style
        var newColorStyle = "COLOR_".concat(color);
        console.log("newColorStyle =", newColorStyle);
        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, newColorStyle);

        // Step 4: Ensure selection is maintained and return result
        nextEditorState = EditorState.forceSelection(nextEditorState, selection);

        // Step 5: Finish
        onComplete(nextEditorState);
      });
      console.log("Color plugin props:", _this.props);
      _this.state = {
        color: typeof ((_props$entity = props.entity) === null || _props$entity === void 0 || (_props$entity$getData = _props$entity.getData) === null || _props$entity$getData === void 0 ? void 0 : _props$entity$getData.call(_props$entity).color) === 'string' ? props.entity.getData().color : '#ff0000'
      };
      return _this;
    }
    _inherits(ColorPickerModal, _React$Component);
    return _createClass(ColorPickerModal, [{
      key: "render",
      value: function render() {
        var color = this.state.color;
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "color-picker-modal"
        }, /*#__PURE__*/React.createElement("label", null, "Select a color:"), /*#__PURE__*/React.createElement("input", {
          type: "color",
          value: color,
          onChange: this.handleChange
        }), /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: "1em"
          }
        }, /*#__PURE__*/React.createElement("button", {
          type: "button",
          onClick: this.applyColor
        }, "Apply"), /*#__PURE__*/React.createElement("button", {
          type: "button",
          onClick: this.handleCancel
        }, "Cancel"))));
      }
    }]);
  }(React.Component);
  var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']; // etc.

  var inlineStyles = colors.map(function (color) {
    return {
      type: "COLOR_".concat(color.toUpperCase()),
      style: {
        color: color
      }
    };
  });
  window.draftail.registerPlugin({
    type: 'CUSTOM_COLOR',
    source: function source(props) {
      console.log("register Plugin ", props);
      var jsx = /*#__PURE__*/React.createElement(ColorPickerModal, props);
      return jsx;
    },
    //decorator: ({ children, entity }) => {
    //  const { color } = entity.getData();
    //  return React.createElement("span", { style: { color } }, children);
    //},
    inlineStyles: inlineStyles
  });
})();
//# sourceMappingURL=color-plugin.js.map