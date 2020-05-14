var assert = require('assert'),
    Graph = require('graphology'),
    circlepack = require('./circlepack.js');


describe('circlepack-layout', function () {
    it('should correctly produce a layout.', function() {
        var graph = new Graph();
        [1, 2, 3, 4].forEach(function(node) {
            graph.addNode(node);
            graph.setNodeAttribute(node, 'degree', 0);
        });

        var positions = circlepack(graph, {});

        assert.deepEqual(positions,
            {
                1: {x: -1, y: 0},
                2: {x: 1, y: 0},
                3: {x: 0, y: 1.7320508075688772},
                4: {x: 0, y: -1.7320508075688772}
            });

    });

    it('should be possible to assign the results to the nodes.', function() {
        var graph = new Graph();
        [1, 2, 3, 4].forEach(function(node) {
            graph.addNode(node);
        });

        var get = graph.getNodeAttributes.bind(graph);

        circlepack.assign(graph, {});

        assert.deepEqual(
            {1: get(1), 2: get(2), 3: get(3), 4: get(4)},
            {
                1: {x: -1, y: 0},
                2: {x: 1, y: 0},
                3: {x: 0, y: 1.7320508075688772},
                4: {x: 0, y: -1.7320508075688772}
            }
        );
    });

    it('should be possible to offset the center.', function() {
        var graph = new Graph();
        [1, 2, 3, 4].forEach(function(node) {
            graph.addNode(node);
        });

        var positions = circlepack(graph, {center: 0.7});

        assert.deepEqual(
            positions,
            {
                1: {x: -1 + 0.7, y: 0.7},
                2: {x: 1.7, y: 0.7},
                3: {x: 0.7, y: 1.7320508075688772 + 0.7},
                4: {x: 0.7, y: -1.7320508075688772 + 0.7}
            }
        );
    });
});
