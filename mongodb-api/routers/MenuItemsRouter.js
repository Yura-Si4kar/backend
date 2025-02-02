const { Router } = require('express');

class MenuItemsRouter {
    constructor(controller) {
        this.router = new Router();
        this.controller = controller;
        
        this.router.get('/', this.controller.getAll.bind(this.controller));
        this.router.post('/', this.controller.create.bind(this.controller));
        this.router.put('/:id', this.controller.updateOne.bind(this.controller));
        this.router.delete('/:id', this.controller.delete.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = MenuItemsRouter;