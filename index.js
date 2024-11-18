// Load the AWS SDK
const {v4 : uuidv4} = require("uuid");
const DynamodbService = require("./dynamodb");
console.log(DynamodbService);

class Test {
    constructor() {
        this.dynamoDB = new DynamodbService();
        this.happyIncOrgId = "55d1dee7-325d-4b3e-8cf6-99c7c216cf66";
        this.abcIncOrgId = "809aa246-c8db-45f6-ad80-2420787ccf97"
        // this.createOrganization().then(res=>console.log).catch(err=>console.error);
        // this.createProject().then(res=>console.log).catch(err=>console.error);
        // this.getOrganization();
        this.findAllTheProjectsByOrgId(this.happyIncOrgId);
    }


    // Function to insert an entry into the organization table
    async createOrganization(){
        let orgId = uuidv4();
        console.log(orgId);
        const params = {
            TableName: 'happy_project',
            Item: {
                PK :  `ORG#${orgId}`,
                SK : `#METADATA#${orgId}`,
                name :  "ABC Inc",
                tier : "professional"
            },
        };

        try {
            const resp = await this.dynamoDB.create(params);
            console.log(`organization inserted successfully`, resp);
        } catch (error) {
            console.error('Error inserting organization: ', error); 
        }
    }

    async findAllTheProjectsByOrgId(orgId){
        const params = {
            TableName: "happy_project",
            KeyConditionExpression: "#PK = :PK and begins_with(#SK, :SK)",
            ExpressionAttributeNames: { "#PK": "PK", "#SK": "SK" },
            ExpressionAttributeValues: {
                ":PK": `ORG#${orgId}`,  // Ensure type is specified
                ":SK": "#PRO#"// This means we're looking for keys starting with 'PRO#'
            }
        }

        try {
            const resp = await this.dynamoDB.getQuery(params);
            console.log(`fetched the organization's all project successfully`, resp);
        } catch (error) {
            console.error('Error fetching organization: ', error); 
        } 
    }


    async getOrganization(){
        const params = {
            TableName: 'happy_project',
            Key: {
                PK :  `ORG#${this.happyIncOrgId}`,
                SK :  `#METADATA#${this.happyIncOrgId}`,
            },
        };

        try {
            const resp = await this.dynamoDB.get(params);
            console.log(`fetched the organization successfully`, resp);
        } catch (error) {
            console.error('Error fetching organization: ', error); 
        }
    }



    // Function to insert an entry into the organization table
    async createProject(){
        let projectId = uuidv4();
        console.log(projectId);
        const params = {
            TableName: 'happy_project',
            Item: {
                PK : `ORG#${this.abcIncOrgId}`,
                SK : `#PRO#agile#${projectId}`,
                name : "Project A",
                project_id  : projectId
            },
        };

        try {
            const resp = await this.dynamoDB.create(params);
            console.log(`organization inserted successfully`, resp);
        } catch (error) {
            console.error('Error inserting project: ', error); 
        }
    }

    // async insertDocuments() {
    //     // Function to insert an entry into the Users table
    //     const insertUser = async (user) => {
    //         const params = {
    //             TableName: 'Users',
    //             Item: {
    //                 userId: user.userId,
    //                 name: user.name,
    //                 email: user.email,
    //                 createdAt: user.createdAt,
    //             },
    //         };

    //         try {
    //             await dynamoDB.putItem(params).promise();
    //             console.log(`User ${user.userId} inserted successfully`);
    //         } catch (error) {
    //             console.error('Error inserting user: ', error);
    //         }
    //     };


    //     // Function to insert an entry into the Orders table
    //     const insertOrder = async (order) => {
    //         const params = {
    //             TableName: 'Orders',
    //             Item: {
    //                 orderId: order.orderId,
    //                 userId: order.userId,
    //                 totalAmount: order.totalAmount,
    //                 orderDate: order.orderDate,
    //             },
    //         };

    //         try {
    //             await dynamoDB.putItem(params).promise();
    //             console.log(`Order ${order.orderId} inserted successfully`);
    //         } catch (error) {
    //             console.error('Error inserting order: ', error);
    //         }
    //     };

    // }




    // async createTables() {
    //     // Define the Users table schema
    //     const usersTable = {
    //         TableName: 'Users',
    //         KeySchema: [
    //             { AttributeName: 'userId', KeyType: 'HASH' }, // Partition key
    //         ],
    //         AttributeDefinitions: [
    //             { AttributeName: 'userId', AttributeType: 'S' }, // String type
    //         ],
    //         ProvisionedThroughput: {
    //             ReadCapacityUnits: 5,
    //             WriteCapacityUnits: 5,
    //         },
    //     };

    //     // Define the Orders table schema
    //     const ordersTable = {
    //         TableName: 'Orders',
    //         KeySchema: [
    //             { AttributeName: 'orderId', KeyType: 'HASH' }, // Partition key
    //             { AttributeName: 'userId', KeyType: 'RANGE' }, // Sort key (foreign key)
    //         ],
    //         AttributeDefinitions: [
    //             { AttributeName: 'orderId', AttributeType: 'S' }, // String type
    //             { AttributeName: 'userId', AttributeType: 'S' },  // String type
    //         ],
    //         ProvisionedThroughput: {
    //             ReadCapacityUnits: 5,
    //             WriteCapacityUnits: 5,
    //         },
    //     };

    //     // Define the Products table schema
    //     const productsTable = {
    //         TableName: 'Products',
    //         KeySchema: [
    //             { AttributeName: 'productId', KeyType: 'HASH' }, // Partition key
    //         ],
    //         AttributeDefinitions: [
    //             { AttributeName: 'productId', AttributeType: 'S' }, // String type
    //         ],
    //         ProvisionedThroughput: {
    //             ReadCapacityUnits: 5,
    //             WriteCapacityUnits: 5,
    //         },
    //     };

    //     // Create the tables
    //     const createTable = async (params) => {
    //         try {
    //             const data = await dynamoDB.createTable(params).promise();
    //             console.log('Table Created: ', data);
    //         } catch (error) {
    //             console.error('Error creating table: ', error);
    //         }
    //     };

    //     // Call the createTable function for each table
    //     createTable(usersTable);
    //     createTable(ordersTable);
    //     createTable(productsTable);
    // }

    // async insertDocuments() {
    //     // Function to insert an entry into the Users table
    //     const insertUser = async (user) => {
    //         const params = {
    //             TableName: 'Users',
    //             Item: {
    //                 userId: user.userId,
    //                 name: user.name,
    //                 email: user.email,
    //                 createdAt: user.createdAt,
    //             },
    //         };

    //         try {
    //             await dynamoDB.putItem(params).promise();
    //             console.log(`User ${user.userId} inserted successfully`);
    //         } catch (error) {
    //             console.error('Error inserting user: ', error);
    //         }
    //     };

    //     // Function to insert an entry into the Orders table
    //     const insertOrder = async (order) => {
    //         const params = {
    //             TableName: 'Orders',
    //             Item: {
    //                 orderId: order.orderId,
    //                 userId: order.userId,
    //                 totalAmount: order.totalAmount,
    //                 orderDate: order.orderDate,
    //             },
    //         };

    //         try {
    //             await dynamoDB.putItem(params).promise();
    //             console.log(`Order ${order.orderId} inserted successfully`);
    //         } catch (error) {
    //             console.error('Error inserting order: ', error);
    //         }
    //     };

    //     // Function to insert an entry into the Products table
    //     const insertProduct = async (product) => {
    //         const params = {
    //             TableName: 'Products',
    //             Item: {
    //                 productId: product.productId,
    //                 productName: product.productName,
    //                 price: product.price,
    //                 category: product.category,
    //             },
    //         };

    //         try {
    //             await dynamoDB.putItem(params).promise();
    //             console.log(`Product ${product.productId} inserted successfully`);
    //         } catch (error) {
    //             console.error('Error inserting product: ', error);
    //         }
    //     };

    //     // Example data to insert
    //     const newUser = {
    //         userId: 'user123',
    //         name: 'John Doe',
    //         email: 'johndoe@example.com',
    //         createdAt: new Date().toISOString(),
    //     };

    //     const newOrder = {
    //         orderId: 'order456',
    //         userId: 'user123',
    //         totalAmount: 199.99,
    //         orderDate: new Date().toISOString(),
    //     };

    //     const newProduct = {
    //         productId: 'product789',
    //         productName: 'Laptop',
    //         price: 1200.50,
    //         category: 'Electronics',
    //     };

    //     // Insert data into the respective tables
    //     insertUser(newUser);
    //     insertOrder(newOrder);
    //     insertProduct(newProduct);
    // }
}

new Test();