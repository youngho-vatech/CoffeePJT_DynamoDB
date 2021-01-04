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
    const addTask = require('../resolvers/task/create');
    const viewTask = require('../resolvers/task/view');
    const listTask = require('../resolvers/task/list');
    const removeTask = require('../resolvers/task/remove');

    const taskType = new GraphQLObjectType({
        name: 'Task',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            creater: { type: new GraphQLNonNull(GraphQLString) },
            title: { type: new GraphQLNonNull(GraphQLString) },
            status: { type: new GraphQLNonNull(GraphQLString) },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
        }
    });


    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: {
                listTasks: {
                    type: new GraphQLList(taskType),
                    resolve: (parent, args) => listTask()
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
                        creater: { type: new GraphQLNonNull(GraphQLString) },
                        title: { type: new GraphQLNonNull(GraphQLString) },
                        status: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: taskType,
                    resolve: (parent, args) => addTask(args)
                },
                removeTask: {
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    type: GraphQLBoolean,
                    resolve: (parent, args) => removeTask(args.id)
                },
            }
        })
    });

    module.exports = schema;