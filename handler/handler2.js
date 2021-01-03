'use strict';

    const { graphql } = require('graphql');
    const schema = require('../schema/schema2');
    
    module.exports.queryUsers = (event, context, callback) => {
        graphql(schema, event.body)
            .then(result => callback(null, {statusCode: 200, headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              }, body: JSON.stringify(result)}))
            .catch(callback);
    };