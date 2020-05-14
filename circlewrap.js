/**
 * Graphology CirclePack layout
 * ===============================
 *
 * Helper class, ported from CirclePackLayout gephi plugin
 */
var assert = require('assert');
class CircleWrap {
    wrappedCircle;//hacky d3 reference thing

    children = new Map();
    id;
    next;
    previous;

    x;
    y;
    r = 999;


    constructor() {
    }

    static fromCircleWrap(cw) {
        let ret = new CircleWrap();
        ret.wrappedCircle = cw;
        ret.r = 101010; // XXX
        return ret;
    }

    static fromValues(x, y, r) {
        assert(r >= 0);
        let ret = new CircleWrap();
        ret.x = x;
        ret.y = y;
        ret.r = r;
        return ret;
    }

    hasChildren() {
        return this.children.size > 0;
    }
    addChild(id, child) {
        this.children.set(id, child);
    }

    getChild(id){
        if (!this.children.has(id)){
            let circleWrap = new CircleWrap();
            this.children.set(id, circleWrap);
        }
        return this.children.get(id);
    }

    applyPositionToChildren() {
        if (this.hasChildren()) {
            this.children.forEach((child, key) => {
               child.x += this.x;
               child.y += this.y;
               child.applyPositionToChildren();
            });
        }
    }
}
module.exports = CircleWrap
