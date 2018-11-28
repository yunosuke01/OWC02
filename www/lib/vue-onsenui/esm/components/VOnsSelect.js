import _Object$assign from 'babel-runtime/core-js/object/assign';
//
//
//
//
//
//
//
//

import 'onsenui/esm/elements/ons-select';
import { modelInput, modifier } from '../mixins';

var __script__ = {
  name: 'v-ons-select',
  mixins: [modelInput, modifier]
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-select', _vm._g({
    attrs: {
      "modifier": _vm.normalizedModifier
    }
  }, _vm.$listeners), [_c('select', [_vm._t("default")], 2)]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);