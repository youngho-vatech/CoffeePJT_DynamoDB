'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            username: data.username,
            stat: "대기중",
            posit: "주문자",
            id: uuid.v1(),
            createdAt: String(Date.now())
        }
    };
    
    return dynamoDb.put(params).promise()
        .then(result => params.Item)
};