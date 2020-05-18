/**
 * Graphology CirclePack Layout
 * =========================
 *
 * Circlepack layout from d3-hierarchy/gephi
 */
var defaults = require('lodash/defaultsDeep'),
    isGraph = require('graphology-utils/is-graph'),
    helpers = require('./helpers-circlepack'),
    CircleWrap = require('./circlewrap');

/**
 * Default options.
 */
var DEFAULTS = {
    attributes: {
        x: 'x',
        y: 'y'
    },
    center: 0,
    hierarchyAttributes: [],
    scale: 1
};


/**
 * Abstract function running the layout.
 *
 * @param  {Graph}    graph                   - Target  graph.
 * @param  {object}   [options]               - Options:
 * @param  {object}     [attributes]          - Attributes names to map.
 * @param  {number}     [center]              - Center of the layout.
 * @param  {string[]}   [hierarchyAttributes] - List of attributes used for the layout in decreasing order
 * @param  {number}     [scale]               - Scale of the layout.
 * @return {object}                           - The positions by node.
 */
function genericCirclePackLayout(assign, graph, options) {
    if (!isGraph(graph))
        throw new Error('graphology-layout/circlepack: the given graph is not a valid graphology instance.');

    options = defaults(options, DEFAULTS);

    var posMap = {},
        positions = {},
        nodes = graph.nodes(),
        center = options.center,
        hierarchyAttributes = options.hierarchyAttributes,
        scale = options.scale;

    var container = new CircleWrap();

    graph.forEachNode(function(key, attributes) {
        var nodeAttr = [];
        var r = attributes.size ? attributes.size : 1;
        var newCircleWrap = new CircleWrap(key, null, null, r);
        var parentContainer = container;

        hierarchyAttributes.forEach(function(v) {
            nodeAttr.push(attributes[v]);
        });
        nodeAttr.forEach(function(v) {
            parentContainer = parentContainer.getChild(v);
        });
        parentContainer.addChild(key, newCircleWrap);

    });
    helpers.packHierarchyAndShift(container);
    helpers.setNode(graph, container, posMap);
    var l = nodes.length,
        x,
        y,
        i;
    for (i = 0; i < l; i++) {
        var node = nodes[i];

        x = center + scale * posMap[node].x;
        y = center + scale * posMap[node].y;


        positions[node] = {
            x: x,
            y: y
        };

        if (assign) {
            graph.setNodeAttribute(node, options.attributes.x, x);
            graph.setNodeAttribute(node, options.attributes.y, y);
        }
    }
    return positions;
}

var circlePackLayout = genericCirclePackLayout.bind(null, false);
circlePackLayout.assign = genericCirclePackLayout.bind(null, true);

module.exports = circlePackLayout;
