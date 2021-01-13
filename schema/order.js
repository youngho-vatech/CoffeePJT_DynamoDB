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
    
    const removeOrder = require('../resolvers/order/remove');
    const updateOrder = require('../resolvers/order/update');


    const orders = require('../resolvers/order/orders');
    const orderMine = require('../resolvers/order/orderMine');


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
                    args:{
                        hi:{ type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: new GraphQLList(orderType),
                    resolve: (parent, args) => orders(args.hi)
                },
                orderMine:{
                    args:{
                        _id:{ type: new GraphQLNonNull(GraphQLString) },
                        createdAt:{ type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: new GraphQLList(orderType),
                    resolve: (parent, args) => orderMine(args)
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
                        createdAt:{ type: new GraphQLNonNull(GraphQLString) },
                        menu: { type: new GraphQLNonNull(GraphQLString) },
                        hi: { type: new GraphQLNonNull(GraphQLString) },
                    },
                    type: orderType,
                    resolve: (parent, args) => createOrder(args)
                },
                updateOrder:{
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLString) },
                        menu: { type: new GraphQLNonNull(GraphQLString) },
                        hi: { type: new GraphQLNonNull(GraphQLString) },
                    },
                type: orderType,
                resolve: (parent, args) => updateOrder(args, args.id)
                },
                removeOrder: {
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: GraphQLBoolean,
                    resolve: (parent, args) => removeOrder(args.id)
                },
            }
        })
    });

    module.exports = schema;