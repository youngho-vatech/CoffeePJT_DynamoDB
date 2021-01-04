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
    const addOrder = require('../resolvers/order/create');
    const viewOrder = require('../resolvers/order/view');
    const listOrder = require('../resolvers/order/list');
    const removeOrder = require('../resolvers/order/remove');
    const updateOrder = require('../resolvers/order/update');

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
                listOrders: {
                    type: new GraphQLList(orderType),
                    resolve: (parent, args) => listOrder()
                },
                viewOrders: {
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: orderType,
                    resolve: (parent, args) => viewOrder(args.id)
                }
            }
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                createOrder: {
                    args: {
                        menu: { type: new GraphQLNonNull(GraphQLString) },
                        hi: { type: new GraphQLNonNull(GraphQLString) },
                        username: { type: new GraphQLNonNull(GraphQLString) },
                    },
                    type: orderType,
                    resolve: (parent, args) => addOrder(args)
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