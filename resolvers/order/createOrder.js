'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = async (data) => {
    const id = data._id
    const createdAt = data.createdAt
    console.log(id, createdAt)
    const userparams = {
        TableName: process.env.SUB_TABLE_NAME,
        Key: { id, createdAt }
    };
    const user = await dynamoDb.get(userparams).promise()
    
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            menu: data.menu,
            hi: data.hi,
            username: user.Item.username,
            id: uuid.v1(),
            createdAt: String(Date.now()),
        }
    };
    return await dynamoDb.put(params).promise()
        .then(result => params.Item)
};