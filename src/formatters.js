import tree from './formatters/tree';
import plain from './formatters/plain';
import json from './formatters/json';

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
