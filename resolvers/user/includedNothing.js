'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = () => dynamoDb.scan({ 
    TableName: process.env.TABLE_NAME,
    FilterExpression: "#stat = :stat and #posit <> :posit",
    ExpressionAttributeNames: {
        "#stat": "stat",
        "#posit": "posit"
    },
    ExpressionAttributeValues: {
        ":stat":"대기중",
        ":posit": "휴가자"
    }  

 }).promise().then(r => r.Items);