import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const dummyData = [
  {
    title: "A Great Apartment Next to the Beach!",
    images: ["https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
    bedroom: 2,
    bathroom: 1,
    price: 1000,
    address: "456 Park Avenue, London",
    latitude: "51.5074",
    longitude: "-0.1278",
    city: "London",
    type: "rent",
    property: "apartment"
  },
  {
    title: "An Awesome Apartment Near the Park!",
    images: ["https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
    bedroom: 3,
    bathroom: 2,
    price: 1500,
    address: "789 Oxford Street, London",
    latitude: "52.4862",
    longitude: "-1.8904",
    city: "London",
    type: "buy",
    property: "house"
  },
  {
    title: "A New Apartment in the City!",
    images: ["https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
    bedroom: 1,
    bathroom: 1,
    price: 800,
    address: "101 Baker Street, London",
    latitude: "53.4808",
    longitude: "-2.2426",
    city: "London",
    type: "rent",
    property: "condo"
  },
  {
    title: "Great Location! Great Price!",
    images: ["https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
    bedroom: 2,
    bathroom: 1,
    price: 1000,
    address: "234 Kingsway, London",
    latitude: "53.8008",
    longitude: "-1.5491",
    city: "London",
    type: "buy",
    property: "apartment"
  }
];

async function main() {
  try {
    // Create a dummy user first
    const hashedPassword = await bcrypt.hash('password123', 10);
    const dummyUser = await prisma.user.create({
      data: {
        username: 'dummyuser',
        email: 'dummy@example.com',
        password: hashedPassword,
      },
    });

    console.log('Created dummy user:', dummyUser);

    // Create posts with postDetails
    for (const data of dummyData) {
      const post = await prisma.post.create({
        data: {
          ...data,
          userId: dummyUser.id,
          postDetail: {
            create: {
              desc: "This is a beautiful property in a prime location. Perfect for families or professionals. Close to all amenities including schools, shops, and public transport.",
              utilities: "owner",
              pet: "allowed",
              income: "3x rent required",
              size: 1000,
              school: 250,
              bus: 100,
              restaurant: 50
            }
          }
        },
      });
      console.log('Created post:', post.title);
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 