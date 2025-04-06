//prisma client
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
process.on('beforeExit',async()=>{
    await prisma.$disconnect();
    console.log('Prisma client desconnected.')
})
module.exports=prisma;