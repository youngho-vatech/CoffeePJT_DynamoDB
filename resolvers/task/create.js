'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            creater: data.creater,
            title: data.title,
            status: data.status,
            id: uuid.v1(),
            createdAt: String(Date.now()),
        }
    };
    return dynamoDb.put(params).promise()
        .then(result => params.Item)
};