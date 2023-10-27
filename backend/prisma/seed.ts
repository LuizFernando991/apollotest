import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const categories = [
  { name: 'smartphones', discont: 2.55 },
  { name: 'furniture', discont: 3 },
  { name: 'electronics', discont: 4.3 },
  { name: 'appliances', discont: 5 },
  { name: 'refrigerators', discont: 7.5 }
]
async function main() {
  await prisma.category.createMany({ data: categories })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
