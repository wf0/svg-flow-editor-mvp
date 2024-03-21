"use strict";
import "./dist/assets/AuxiliaryLine.worker-fcdb130f";
import "./dist/style.css";
if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/svg-flow-editor-mvp.umd.cjs");
} else {
  module.exports = require("./dist/svg-flow-editor-mvp.cjs");
}
