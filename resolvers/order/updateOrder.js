'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    let id = data.userid
    let createdAt = data.createdAtU
    
    const userparams = {
        TableName: process.env.SUB_TABLE_NAME, 
        Key: {id, createdAt},
        UpdateExpression: "set stat = :stat", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":stat": "주문완료",
        }
    }
    dynamoDb.update(userparams).promise().then(result => params.Item)

    id = data.orderid;
    createdAt = data.createdAtO;

    const params = {
        TableName: process.env.TABLE_NAME, 
        Key: {id, createdAt},
        UpdateExpression: "set menu = :menu, hi = :hi", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":menu": data.menu,
            ":hi" : data.hi
        }
    };
    return dynamoDb.update(params).promise()
        .then(result => params.Item)
};