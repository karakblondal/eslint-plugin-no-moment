// lib/rules/no-moment.js
module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "Disallow usage of the moment library",
        recommended: true
      },
      schema: [] // no options
    },
    create(context) {
      return {
        ImportDeclaration(node) {
          if (node.source && node.source.value === 'moment') {
            context.report({
              node,
              message: "Do not import 'moment'."
            });
          }
        },
        CallExpression(node) {
          // Check for require('moment')
          if (
            node.callee.name === 'require' &&
            node.arguments &&
            node.arguments[0] &&
            node.arguments[0].value === 'moment'
          ) {
            context.report({
              node,
              message: "Do not require 'moment'."
            });
          }
        }
      };
    }
  };
  