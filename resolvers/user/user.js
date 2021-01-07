'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async() => {
    
    const result = await dynamoDb.scan({TableName: process.env.TABLE_NAME })
    console.log(result)
    return dynamoDb.get().promise()
        .then(r => r.Item);
};