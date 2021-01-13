'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = async (data) => {
    const isthere = await dynamoDb.scan({ TableName: process.env.TABLE_NAME }).promise()
    
    if(isthere.Items.length != 0) return "이미 진행중인 주문이 있습니다."

    const id = data.userid
    const createdAt = data.createdAt
    
    let params = {
        TableName: process.env.SUB_TABLE_NAME,
        Key: { id, createdAt }
    };
    const user = await dynamoDb.get(params).promise()
    
    const creater = user.Item.username
    
    params = {
        TableName: process.env.SUB_TABLE_NAME, 
        Key: {id, createdAt},
        UpdateExpression: "set posit = :posit", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":posit": "결제자"
        }
    };
    dynamoDb.update(params).promise()

    
    params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            creater: creater,
            title: data.title,
            id: uuid.v1(),
            createdAt: String(Date.now()),
        }
    };
    return dynamoDb.put(params).promise().then(result => params.Item)
};