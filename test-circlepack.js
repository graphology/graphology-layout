var assert = require('assert'),
    Graph = require('graphology'),
    circlepack = require('./circlepack.js');


describe('circlepack-layout', function () {
    it('should correctly produce a layout.', function() {
        var graph = new Graph();
        [1, 2, 3, 4].forEach(function(node) {
            graph.addNode(node);
            graph.setNodeAttribute(node, 'degree', 0);
            graph.setNodeAttribute(node, 'size', 10);
        });

        var positions = circlepack(graph, {});

        assert.deepEqual(positions,
            {
                1: {x: -10, y: 0},
                2: {x: 10, y: 0},
                3: {x: 0, y: 17.320508075688772},
                4: {x: 0, y: -17.320508075688772}
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

    // The tests results below have been checked with Gephi.
    it('should produce layout according to properties (1/2).', function() {
        var graph = new Graph();
        [1, 2, 3, 4].forEach(function(node) {
            graph.addNode(node);
            graph.setNodeAttribute(node, 'degree', (node === 1) ? 3 : 1);
            graph.setNodeAttribute(node, 'size', (node === 1) ? 30 : 10);
        });

        var positions = circlepack(graph, {hierarchyAttributes: ['degree']});

        assert.deepEqual(
            positions,
            {
                1: {x: 21.547005383792513, y: 0},
                2: {x: -40, y: -5.773502691896258},
                3: {x: -20, y: -5.773502691896258},
                4: {x: -30, y: 11.547005383792513}
            }
        );
    });

    it('should produce layout according to properties (2/2).', function() {
        var graph = new Graph();
        [1, 2, 3, 4, 5, 6].forEach(function(node) {
            graph.addNode(node);
            graph.setNodeAttribute(node, 'degree', (node === 1 || node === 4) ? 3 : 1);
            graph.setNodeAttribute(node, 'size', (node === 1 || node === 4) ? 30 : 10);
            graph.setNodeAttribute(node, 'community', (node < 4) ? 0 : 1);
        });

        var positions = circlepack(graph, {hierarchyAttributes: ['community', 'degree']});

        assert.deepEqual(
            positions,
            {
                1: {x: -30, y: 0},
                2: {x: -90, y: 0},
                3: {x: -70, y: 0},
                4: {x: 70, y: 0},
                5: {x: 10, y: 0},
                6: {x: 30, y: 0}
            }
        );
    });

    it('should handle an non-existing attribute.', function() {
        var graph = new Graph();
        [1, 2, 3, 4].forEach(function(node) {
            graph.addNode(node);
            graph.setNodeAttribute(node, 'size', 10);
        });

        var positions = circlepack(graph, {hierarchyAttributes: ['degree', 'dummy']});
        assert.deepEqual(positions,
            {
                1: {x: -10, y: 0},
                2: {x: 10, y: 0},
                3: {x: 0, y: 17.320508075688772},
                4: {x: 0, y: -17.320508075688772}
            });
    });
});
