'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async (word, category) => {
    if(category==1){
        if(word == "") return null
        return await dynamoDb.scan({
            TableName: process.env.TABLE_NAME,
            FilterExpression: "contains(#username, :username)",
            ExpressionAttributeNames: {
                "#username": "username",
            },
            ExpressionAttributeValues: {
                ":username": word,
            }   
        }).promise().then(r => r.Items);
    }
    else{
        if(word == "") return null
        return await dynamoDb.scan({
            TableName: process.env.TABLE_NAME,
            FilterExpression: "contains(#username, :username) and #posit = :posit",
            ExpressionAttributeNames: {
                "#username": "username",
                "#posit": "posit"
            },
            ExpressionAttributeValues: {
                ":username": word,
                ":posit": "dd"
            }   
        }).promise().then(r => r.Items);
    }
    
};