'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = () => dynamoDb.scan({ 
    TableName: process.env.TABLE_NAME,
    FilterExpression: "#status = :status and #posit <> :posit",
    ExpressionAttributeNames: {
        "#status": "status",
        "#posit": "posit"
    },
    ExpressionAttributeValues: {
        ":status":"대기중",
        ":posit": "휴가자"
    }  

 }).promise().then(r => r.Items);