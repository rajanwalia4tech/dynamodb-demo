const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb"); // Correct place for ListTablesCommand
const { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");

class DynamoDBService {
    constructor() {
        this.instance = null;
    }

    // Singleton instance initialization using DynamoDBDocumentClient
    async getInstance() {
        if (!this.instance) {
            const client = new DynamoDBClient({
                region: "ap-south-1",
                credentials: {
                    accessKeyId: "AKIA2ML", // Replace with your access key
                    secretAccessKey: "Z0XNAOAQ2B", // Replace with your secret key
                },
            });

            // Wrapping the DynamoDBClient with DynamoDBDocumentClient for simplified API
            const documentClient = DynamoDBDocumentClient.from(client);
            
            try {
                const tables = await documentClient.send(new ListTablesCommand({}));
                console.log("DynamoDB connection has been established successfully. Tables: ", tables.TableNames);
            } catch (error) {
                console.error("Error connecting to DynamoDB:", error);
            }

            this.instance = documentClient;
        }
        return this.instance;
    }

    // Function to delete a DynamoDB table using DocumentClient
    async deleteTable(tableName) {
        const deleteParams = {
            TableName: tableName, // Name of the table to delete
        };

        try {
            const client = await this.getInstance();
            const data = await client.send(new DeleteCommand(deleteParams));
            console.log(`Table ${tableName} deleted successfully:`, data);
        } catch (err) {
            console.error(`Error deleting table ${tableName}:`, err);
        }
    }

    // Function to create a record in DynamoDB using PutCommand with DocumentClient
    async create(params) {
        try {
            const client = await this.getInstance();
            const data = await client.send(new PutCommand(params));
            console.log("Item inserted successfully:", data);
        } catch (err) {
            throw err;
        }
    }

    // Function to get an item from DynamoDB using GetCommand with DocumentClient
    async get(params) {
        try {
            const client = await this.getInstance();
            const data = await client.send(new GetCommand(params));
            console.log("Item retrieved successfully:", data);
            return data.Item;
        } catch (err) {
            throw err;
        }
    }

    // Function to query items from DynamoDB using QueryCommand with DocumentClient
    async getQuery(params) {
        try {
            const client = await this.getInstance();
            const data = await client.send(new QueryCommand(params));
            console.log("Items retrieved successfully:", data);
            return data.Items;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = DynamoDBService;
