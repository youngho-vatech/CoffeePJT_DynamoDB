'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            name: data.name,
            quantity: data.quantity,
            id: uuid.v1(),
            addedAt: Date.now(),
        }
    };
    params.Item.quantity += 3
    return dynamoDb.put(params).promise()
        .then(result => params.Item)
};