'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = async (data) => {
    const id = data._id
    const createdAt = data.createdAt
    
    const userparams = {
        TableName: process.env.SUB_TABLE_NAME,
        Key: { id, createdAt }
    };
    const user = await dynamoDb.get(userparams).promise()
    console.log(user)
    return dynamoDb.scan({
        TableName: process.env.TABLE_NAME,
        FilterExpression: "#username = :username",
        ExpressionAttributeNames: {
            "#username": "username",
        },
        ExpressionAttributeValues: {
            ":username": user.Item.username,
        }   
    }).promise().then(r => r.Items);
};