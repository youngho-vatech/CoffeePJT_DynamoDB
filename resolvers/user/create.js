'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            username: data.username,
            status: data.status,
            position: data.position,
            id: uuid.v1(),
            addedAt: Date.now(),
        }
    };
    console.log(params.TableName)
    
    return dynamoDb.put(params).promise()
        .then(result => params.Item)
};