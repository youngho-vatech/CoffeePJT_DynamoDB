'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data, id) => {
    const params = {
        TableName: process.env.TABLE_NAME, 
        Key: {id},
        UpdateExpression: "set menu = :menu, hi = :hi", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":menu": data.menu,
            ":hi" : data.hi
        }
    };
    return dynamoDb.update(params).promise()
        .then(result => params.Item)
};