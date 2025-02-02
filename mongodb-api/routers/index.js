const { Router } = require('express');
const { categories, menuItems } = require('../config.js');
const router = new Router();
const UsersRouter = require('./UsersRouter.js');
const CategoriesRouter = require('./CategoriesRouter.js');
const CategoriesController = require('../controllers/CategoriesController.js');
const MenuItemsController = require('../controllers/MenuItemsController.js');
const MenuItemsRouter = require('./MenuItemsRouter.js');

router.use('/', UsersRouter);

categories.forEach(category => {
    const controllerName = category.charAt(0).toUpperCase() + category.slice(1);
    const controller = new CategoriesController(controllerName);
    if (controller && typeof controller.getAll === 'function') {
        const categoryRouter = new CategoriesRouter(controller);
        router.use(`/${category}`, categoryRouter.getRouter());
    } else {
        console.error(`Invalid controller for category: ${category}`);
    }
});

menuItems.forEach((item) => {
    const controllerName = item.charAt(0).toUpperCase() + item.slice(1);
    const controller = new MenuItemsController(controllerName);
    if (controller && typeof controller.getAll === 'function') {
        const itemRouter = new MenuItemsRouter(controller);
        router.use(`/${item}`, itemRouter.getRouter());
    } else {
        console.error(`Invalid controller for category: ${category}`);
    }
})

module.exports = router;