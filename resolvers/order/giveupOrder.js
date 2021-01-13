'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const id = data.userid
    const createdAt = data.createdAt
    
    const userparams = {
        TableName: process.env.SUB_TABLE_NAME, 
        Key: {id, createdAt},
        UpdateExpression: "set stat = :stat", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":stat": "주문포기",
        }
    }
    dynamoDb.update(userparams).promise()
    return "주문을 포기하셨습니다."
};