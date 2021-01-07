'use strict';

    const {
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull,
        GraphQLBoolean,
        graphqlSync
    } = require('graphql');
    const addUser = require('../resolvers/user/create');
    const viewUser = require('../resolvers/user/view');
    const listUser = require('../resolvers/user/list');
    const removeUser = require('../resolvers/user/remove');
    const user = require('../resolvers/user/user');
    const userType = new GraphQLObjectType({
        name: 'User',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            username: { type: new GraphQLNonNull(GraphQLString) },
            status: { type: new GraphQLNonNull(GraphQLString) },
            position: { type: new GraphQLNonNull(GraphQLString) },
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
                },
                finduser:{
                    
                    type:new GraphQLList(userType),
                    resolve:(parent, args) => user()
                }
            }
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                createUser: {
                    args: {
                        username: { type: new GraphQLNonNull(GraphQLString) },
                        status: { type: new GraphQLNonNull(GraphQLString) },
                        position: { type: new GraphQLNonNull(GraphQLString) }
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