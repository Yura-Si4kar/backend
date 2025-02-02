const { Router } = require('express');

class CategoriesRouter {
    constructor(controller) {
        this.router = new Router();
        this.controller = controller;
        
        this.router.get('/', this.controller.getAll.bind(this.controller));
        this.router.put('/:id', this.controller.updateOne.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = CategoriesRouter;