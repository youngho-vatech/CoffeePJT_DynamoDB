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
    const createTask = require('../resolvers/task/createTask');
    const viewTask = require('../resolvers/task/view');
    const tasks = require('../resolvers/task/tasks');
    const removeTask = require('../resolvers/task/removeTask');
    const updateTask = require('../resolvers/task/updateTask');

    const taskType = new GraphQLObjectType({
        name: 'Task',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            creater: { type: new GraphQLNonNull(GraphQLString) },
            title: { type: new GraphQLNonNull(GraphQLString) },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
        }
    });


    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: {
                tasks: {
                    type: new GraphQLList(taskType),
                    resolve: (parent, args) => tasks()
                },
                viewTasks: {
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: taskType,
                    resolve: (parent, args) => viewTask(args.id)
                }
            }
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                createTask: {
                    args: {
                        userid: { type: new GraphQLNonNull(GraphQLString) },
                        createdAt: { type: new GraphQLNonNull(GraphQLString) },
                        title: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: taskType,
                    resolve: (parent, args) => createTask(args)
                },
                updateTask: {
                    args: {
                        _id: { type: new GraphQLNonNull(GraphQLString) },
                        createdAt: { type: new GraphQLNonNull(GraphQLString) },
                        title: { type: new GraphQLNonNull(GraphQLString) },
                    },
                    type: taskType,
                    resolve: (parent, args) => updateTask(args)
                },
                removeTask: {
                    args: {
                        _id: { type: new GraphQLNonNull(GraphQLString) },
                        createdAtT:{ type: new GraphQLNonNull(GraphQLString) },
                        userid:{ type: new GraphQLNonNull(GraphQLString) },
                        createdAtU:{ type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: GraphQLString,
                    resolve: (parent, args) => removeTask(args)
                },
            }
        })
    });

    module.exports = schema;