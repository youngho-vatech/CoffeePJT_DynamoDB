'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            menu: data.menu,
            hi: data.hi,
            username: data.username,
            id: uuid.v1(),
            createdAt: Date.now(),
        }
    };
    return dynamoDb.put(params).promise()
        .then(result => params.Item)
};