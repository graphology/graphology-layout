/**
 * Graphology Utils Unit Tests
 * ============================
 */
var assert = require('assert'),
    seedrandom = require('seedrandom'),
    Graph = require('graphology'),
    random = require('./random.js');

describe('graphology-layout', function() {

  describe('random', function() {

    it('should throw if provided with and invalid graph.', function() {
      assert.throws(function() {
        random(null);
      }, /graphology/);
    });

    it('should correctly produce a layout.', function() {
      var graph = new Graph();
      graph.addNodesFrom([1, 2, 3, 4]);

      var positions = random(graph, {rng: seedrandom('test')});

      assert.deepEqual(
        positions,
        {
          1: {x: 0.8722025543160253, y: 0.4023928518604753},
          2: {x: 0.9647289658507073, y: 0.30479896375101545},
          3: {x: 0.3521069009157321, y: 0.2734533903544762},
          4: {x: 0.4635571187776387, y: 0.10034856760950056}
        }
      );
    });

    it('should be possible to assign the results to the nodes.', function() {
      var graph = new Graph();
      graph.addNodesFrom([1, 2, 3, 4]);

      var get = graph.getNodeAttributes.bind(graph);

      random.assign(graph, {rng: seedrandom('test')});

      assert.deepEqual(
        {1: get(1), 2: get(2), 3: get(3), 4: get(4)},
        {
          1: {x: 0.8722025543160253, y: 0.4023928518604753},
          2: {x: 0.9647289658507073, y: 0.30479896375101545},
          3: {x: 0.3521069009157321, y: 0.2734533903544762},
          4: {x: 0.4635571187776387, y: 0.10034856760950056}
        }
      );
    });
  });
});
