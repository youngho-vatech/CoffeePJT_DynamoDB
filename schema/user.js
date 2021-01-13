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
    
    const registerUser = require('../resolvers/user/registerUser');
    const allUsers = require('../resolvers/user/allUsers');
    const user = require('../resolvers/user/user');
    const me = require('../resolvers/user/me');
    const includedOrdermen = require('../resolvers/user/includedOrdermen');
    const includedVacation = require('../resolvers/user/includedVacation');
    const includedNothing = require('../resolvers/user/includedNothing');
    const updatePosition = require('../resolvers/user/updatePosition');
    const updateUser = require('../resolvers/user/updateUser');
    const getbackUser = require('../resolvers/user/getbackUser')
    const getbackStatus = require('../resolvers/user/getbackStatus')
    const deleteUser = require('../resolvers/user/deleteUser');

    const userType = new GraphQLObjectType({
        name: 'User',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            username: { type: new GraphQLNonNull(GraphQLString) },
            status: { type: new GraphQLNonNull(GraphQLString) },
            posit: { type: new GraphQLNonNull(GraphQLString) },
        }
    });


    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: {
                allUsers: {
                    type: new GraphQLList(userType),
                    resolve: (parent, args) => allUsers()
                },
                
                user:{
                    args:{
                        word:{type: new GraphQLNonNull(GraphQLString)},
                        category:{type: new GraphQLNonNull(GraphQLInt)}
                    },
                    type:new GraphQLList(userType),
                    resolve:(parent, args) => user(args.word, args.category)
                },
                me:{
                    args:{
                        userid:{type: new GraphQLNonNull(GraphQLString)},
                        createdAt:{type: new GraphQLNonNull(GraphQLString)}
                    },
                    type:userType,
                    resolve:(parent, args) => me(args.userid, args.createdAt)
                },
                includedOrdermen:{
                    type: new GraphQLList(userType),
                    resolve: (parent, args) => includedOrdermen()
                },
                includedVacation:{
                    type: new GraphQLList(userType),
                    resolve: (parent, args) => includedVacation()
                },
                includedNothing:{
                    type: new GraphQLList(userType),
                    resolve: (parent, args) => includedNothing()
                }
            }
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                registerUser: {
                    args: {
                        username: { type: new GraphQLNonNull(GraphQLString) },
                        
                    },
                    type: userType,
                    resolve: (parent, args) => registerUser(args)
                },
                updatePosition:{
                    args: {
                        ids: { type: new GraphQLList(GraphQLString) },
                        createdAts:{ type: new GraphQLList(GraphQLString) }
                    },
                    type: GraphQLString,
                    resolve: (parent, args) => updatePosition(args.ids, args.createdAts)
                },
                updateUser:{
                    args: {
                        _id: { type: new GraphQLNonNull(GraphQLString) },
                        createdAt:{ type: new GraphQLNonNull(GraphQLString) },
                        username:{ type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: GraphQLString,
                    resolve: (parent, args) => updateUser(args._id, args.createdAt, args.username)
                },
                getbackUser:{
                    args:{
                        ids: { type: new GraphQLList(GraphQLString) },
                        createdAts:{ type: new GraphQLList(GraphQLString) }
                    },
                    type: GraphQLString,
                    resolve: (parent, args) => getbackUser(args.ids, args.createdAts)
                },
                getbackStatus:{
                    args:{
                        _id: { type: new GraphQLNonNull(GraphQLString) },
                        createdAt:{ type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: GraphQLString,
                    resolve: (parent, args) => getbackStatus(args._id, args.createdAt)
                },
                deleteUser: {
                    args: {
                        _id: { type: new GraphQLNonNull(GraphQLString) },
                        createdAt:{ type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: GraphQLString,
                    resolve: (parent, args) => deleteUser(args._id, args.createdAt)
                },
            }
        })
    });

    module.exports = schema;