import tree from './tree';
import plain from './plain';
import json from './json';

const render = (format) => {
  const formatters = {
    tree,
    plain,
    json,
  };

  const renderFunction = formatters[format];

  return renderFunction;
};

export default render;
