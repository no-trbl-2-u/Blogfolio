'use strict';

const path = require('path');

module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      const basename = path.basename(filename, '.svg');
      const ejsTemplate = `module.exports = React.memo(React.forwardRef(function ${basename}(props, ref) {
        return {
          $$typeof: Symbol.for('react.element'),
          type: 'svg',
          ref: ref,
          key: null,
          props: Object.assign({}, props, {
            children: ${assetFilename}
          })
        };
      }));`;
      return {
        code: ejsTemplate,
      };
    }

    return {
      code: `module.exports = ${assetFilename};`,
    };
  },
  getCacheKey() {
    return 'fileTransform';
  },
};
