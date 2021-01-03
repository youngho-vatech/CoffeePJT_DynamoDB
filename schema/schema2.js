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
    const addUser = require('../resolvers/user/create');
    const viewUser = require('../resolvers/user/view');
    const listUser = require('../resolvers/user/list');
    const removeUser = require('../resolvers/user/remove');

    const userType = new GraphQLObjectType({
        name: 'User',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            name: { type: new GraphQLNonNull(GraphQLString) },
            quantity: { type: new GraphQLNonNull(GraphQLInt) },
            addedAt: { type: new GraphQLNonNull(GraphQLString) },
        }
    });


    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: {
                listUsers: {
                    type: new GraphQLList(userType),
                    resolve: (parent, args) => listUser()
                },
                viewUser: {
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: userType,
                    resolve: (parent, args) => viewUser(args.id)
                }
            }
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                createUser: {
                    args: {
                        name: { type: new GraphQLNonNull(GraphQLString) },
                        quantity: { type: new GraphQLNonNull(GraphQLInt) }
                    },
                    type: userType,
                    resolve: (parent, args) => addUser(args)
                },
                removeUser: {
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: GraphQLBoolean,
                    resolve: (parent, args) => removeUser(args.id)
                },
            }
        })
    });

    module.exports = schema;