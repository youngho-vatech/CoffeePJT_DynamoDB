'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (hi) => {
    if(hi=="icecream"){
        return dynamoDb.scan({
            TableName: process.env.TABLE_NAME,
            FilterExpression: "#hi = :hi",
            ExpressionAttributeNames: {
                "#hi": "hi",
            },
            ExpressionAttributeValues: {
                ":hi": hi,
            }   
        }).promise().then(r => r.Items);
    }
    else if(hi=="etc"){
        return dynamoDb.scan({
            TableName: process.env.TABLE_NAME,
            FilterExpression: "#hi = :hi",
            ExpressionAttributeNames: {
                "#hi": "hi"
            },
            ExpressionAttributeValues: {
                ":hi": hi
            }   
        }).promise().then(r => r.Items);
    }
    else{
        return dynamoDb.scan({
            TableName: process.env.TABLE_NAME,
            FilterExpression: "NOT #hi in (:hi1, :hi2)",
            ExpressionAttributeNames: {
                "#hi": "hi"
            },
            ExpressionAttributeValues: {
                ":hi1": "icecream",
                ":hi2": "etc"
            }   
        }).promise().then(r => r.Items);
    }
}