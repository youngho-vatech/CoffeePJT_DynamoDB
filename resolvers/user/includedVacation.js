'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = () => dynamoDb.scan({ 
    TableName: process.env.TABLE_NAME,
    FilterExpression: "#posit = :posit",
    ExpressionAttributeNames: {
        "#posit": "posit"
    },
    ExpressionAttributeValues: {
       ":posit": "휴가자"
    }  

 }).promise().then(r => r.Items);