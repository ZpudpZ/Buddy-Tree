let canvas, ctx;
let buddyTree;

class BuddyTreeNode {
    constructor(x, y, width, height, key = null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.key = key;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.font = '14px Arial';
        ctx.fillText(this.key, this.x + 5, this.y + 20);
    }
}

class BuddyTree {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.root = null;
    }

    insert(key) {
        this.root = this.insertRec(this.root, key, 0, 0, this.canvas.width, this.canvas.height);
    }

    insertRec(node, key, x, y, width, height) {
        if (!node) {
            return new BuddyTreeNode(x, y, width, height, key);
        }

        if (node.key !== null) {
            return node;
        }

        const leftWidth = width / 2;
        const leftHeight = height;
        const rightWidth = width - leftWidth;
        const rightHeight = height;

        if (key < width / 2) {
            node.left = this.insertRec(node.left, key, x, y, leftWidth, leftHeight);
        } else {
            node.right = this.insertRec(node.right, key, x + leftWidth, y, rightWidth, rightHeight);
        }

        return node;
    }

    delete(key) {
        this.root = this.deleteRec(this.root, key);
    }

    deleteRec(node, key) {
        if (!node) {
            return null;
        }

        if (node.key === key) {
            node.key = null;
        } else {
            const leftWidth = node.width / 2;
            if (key < leftWidth) {
                node.left = this.deleteRec(node.left, key);
            } else {
                node.right = this.deleteRec(node.right, key);
            }
        }

        return node;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawRec(this.root);
    }

    drawRec(node) {
        if (!node) {
            return;
        }

        node.draw(this.ctx);
        this.drawRec(node.left);
        this.drawRec(node.right);
    }
}

function insertKey() {
    const key = parseInt(document.getElementById('insertKey').value);
    if (!isNaN(key)) {
        buddyTree.insert(key);
        buddyTree.draw();
    }
}

function deleteKey() {
    const key = parseInt(document.getElementById('deleteKey').value);
    if (!isNaN(key)) {
        buddyTree.delete(key);
        buddyTree.draw();
    }
}

window.onload = function() {
    canvas = document.getElementById('buddyTreeCanvas');
    ctx = canvas.getContext('2d');
    buddyTree = new BuddyTree(canvas);
    buddyTree.draw();
};
