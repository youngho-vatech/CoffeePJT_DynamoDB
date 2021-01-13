'use strict';

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');
const createOrder = require('../resolvers/order/createOrder');
const viewOrder = require('../resolvers/order/view');


const orders = require('../resolvers/order/orders');
const orderMine = require('../resolvers/order/orderMine');
const howmuch = require('../resolvers/order/howmuch');
const receipt = require('../resolvers/order/receipt');
const removeOrder = require('../resolvers/order/removeOrder');
const updateOrder = require('../resolvers/order/updateOrder');
const giveupOrder = require('../resolvers/order/giveupOrder');
const confirmOrders = require('../resolvers/order/confirmOrders');
const orderType = new GraphQLObjectType({
    name: 'Order',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        menu: { type: new GraphQLNonNull(GraphQLString) },
        hi: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
    }
});


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            orders: {
                args: {
                    hi: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: new GraphQLList(orderType),
                resolve: (parent, args) => orders(args.hi)
            },
            orderMine: {
                args: {
                    _id: { type: new GraphQLNonNull(GraphQLString) },
                    createdAt: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: new GraphQLList(orderType),
                resolve: (parent, args) => orderMine(args)
            },
            howmuch: {
                type: new GraphQLNonNull(GraphQLInt),
                resolve: (parent, args) => howmuch()
            },
            receipt: {
                type: new GraphQLList(GraphQLString),
                resolve: (parent, args) => receipt()
            },
            viewOrders: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: orderType,
                resolve: (parent, args) => viewOrder(args.id)
            },

        }
    }),

    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createOrder: {
                args: {
                    _id: { type: new GraphQLNonNull(GraphQLString) },
                    createdAt: { type: new GraphQLNonNull(GraphQLString) },
                    menu: { type: new GraphQLNonNull(GraphQLString) },
                    hi: { type: new GraphQLNonNull(GraphQLString) },
                },
                type: orderType,
                resolve: (parent, args) => createOrder(args)
            },
            updateOrder: {
                args: {
                    userid: { type: new GraphQLNonNull(GraphQLString) },
                    createdAtU: { type: new GraphQLNonNull(GraphQLString) },
                    orderid: { type: new GraphQLNonNull(GraphQLString) },
                    createdAtO: { type: new GraphQLNonNull(GraphQLString) },
                    menu: { type: new GraphQLNonNull(GraphQLString) },
                    hi: { type: new GraphQLNonNull(GraphQLString) },
                },
                type: orderType,
                resolve: (parent, args) => updateOrder(args)
            },
            removeOrder: {
                args: {
                    _id: { type: new GraphQLNonNull(GraphQLString) },
                    createdAt: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: GraphQLString,
                resolve: (parent, args) => removeOrder(args._id, args.createdAt)
            },
            giveupOrder:{
                args: {
                    userid:{ type: new GraphQLNonNull(GraphQLString) },
                    createdAt:{ type: new GraphQLNonNull(GraphQLString) }
                },
                type: GraphQLString,
                resolve: (parent, args) => giveupOrder(args)
            },
            confirmOrders:{
                type: GraphQLString,
                resolve: (parent, args) => confirmOrders()
            }

        }
    })
});

module.exports = schema;