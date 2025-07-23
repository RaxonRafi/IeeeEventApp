import { Server } from 'http';
import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let server: Server;
const port = process.env.PORT || 5000;

async function main() {
    try {
        await prisma.$connect();
        console.log('Connected to Prisma DB');
        server = app.listen(port, () => {
            console.log(`App is Listening to port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();