import prisma from "../app/libs/prismadb";

async function seedData() {
  try {
    // Seed data for User model
    const user1 = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@gmail.com",
        emailVerified: new Date(),
        image:
          "https://res.cloudinary.com/durnvux33/image/upload/v1687958323/avatar1_i6etbb.png",
        hashedPassword: "john123",
        favouriteIds: []
      },
    });
    const user2 = await prisma.user.create({
      data: {
        name: "Jane Hirst",
        email: "jane@gmail.com",
        emailVerified: new Date(),
        image:
          "https://res.cloudinary.com/durnvux33/image/upload/v1687958323/avatar3_gc9x4s.png",
        hashedPassword: "jane123",
        favouriteIds: []
      },
    });
    const user3 = await prisma.user.create({
      data: {
        name: "Ann Keen",
        email: "annk@gmail.com",
        emailVerified: new Date(),
        image:
          "https://res.cloudinary.com/durnvux33/image/upload/v1687958322/avatar2_rf1tim.png",
        hashedPassword: "ann123",
        favouriteIds: []
      },
    });

    // Seed data for Account model
    const account1 = await prisma.account.create({
      data: {
        userId: user1.id,
        type: "oauth",
        provider: "",
        providerAccountId: "",
        refresh_token: "",
        access_token: "",
        expires_at: null,
        token_type: "",
        scope: "",
        id_token: "",
        session_state: "",
      },
    });
    const account2 = await prisma.account.create({
      data: {
        userId: user2.id,
        type: "oauth",
        provider: "",
        providerAccountId: "",
        refresh_token: "",
        access_token: "",
        expires_at: null,
        token_type: "",
        scope: "",
        id_token: "",
        session_state: "",
      },
    });
    const account3 = await prisma.account.create({
      data: {
        userId: user3.id,
        type: "oauth",
        provider: "",
        providerAccountId: "",
        refresh_token: "",
        access_token: "",
        expires_at: null,
        token_type: "",
        scope: "",
        id_token: "",
        session_state: "",
      },
    });

    // Seed data for Listing model
    const listing1 = await prisma.listing.create({
      data: {
        userId: user1.id,
        title: "Stargazing Grand Canyon Tiny Home Modern Cabin",
        description:
          "Coming to the Grand Canyon? Looking for the perfect spot to see every star in the Milky Way? We are the Stargazing 180sq ft Tiny Home. Our off-grid cabin is located just 30mins from Grand Canyon National Park. With the absence of light and sound pollution you’ll have the most tranquil experience. Yes, you will be camping but that doesn’t mean you have to settle for mediocrity. Our modern, bougie aesthetic is the perfect glamping experience.",
        imgSrc:
          "https://res.cloudinary.com/durnvux33/image/upload/v1687958322/propert1_gozw9x.webp",
        category: "Windmills",
        roomCount: 2,
        bathroomCount: 1,
        guestCount: 4,
        locationValue: "KE",
        price: 39,
      },
    });
    const listing2 = await prisma.listing.create({
      data: {
        userId: user2.id,
        title: "Zome on the Range",
        description:
          'See the countryside from from a whole new angle! You wont hear a discouraging word about this ten sided "zome" located  in the Kansas range!  This unique stay features a single open space where natural light shines down through skylights in the peak and into the lofted bedroom.',
        imgSrc:
          "https://res.cloudinary.com/durnvux33/image/upload/v1687958322/property12_aptxwo.webp",
        category: "Skiing",
        roomCount: 2,
        bathroomCount: 1,
        guestCount: 4,
        locationValue: "KE",
        price: 60,
      },
    });
    const listing3 = await prisma.listing.create({
      data: {
        userId: user3.id,
        title: "Gashes Fluss Haus",
        description:
          "Walk back past tall trees, over a small wooden bridge with built-in love seats. Massage tired feet on a polished river-rock shower floor. This rustic 2-story cottage, dating back over 100 years, has whitewashed stone walls and a wood-burning stove. This is an old farm hand house and it shares the same property with the main house.",
        imgSrc:
          "https://res.cloudinary.com/durnvux33/image/upload/v1687958322/property2_q0sa2w.webp",
        category: "Lake",
        roomCount: 2,
        bathroomCount: 1,
        guestCount: 4,
        locationValue: "KE",
        price: 50,
      },
    });
    const listing4 = await prisma.listing.create({
      data: {
        userId: user1.id,
        title: "The Eagles Nest",
        description:
          "A unique tiny home built out of a repurposed shipping container, nestled in a small but private tiny house community in the heart of the Hill Country. Panoramic views of hill country heaven on top of the roof top patio. A place to get away and unwind, do some grilling or have a little country bonfire and enjoy the outdoors away from the city.",
        imgSrc:
          "https://res.cloudinary.com/durnvux33/image/upload/v1687958322/property13_qjn4rc.jpg",
        category: "Camping",
        roomCount: 2,
        bathroomCount: 1,
        guestCount: 4,
        locationValue: "KE",
        price: 180,
      },
    });
    const listing5 = await prisma.listing.create({
      data: {
        userId: user2.id,
        title: "THE HIPPIE SHACK YURT&Tiny house ",
        description:
          "24 Yurt & attached Tiny house is opulent!  Indoor bathroom  & kitchen, Glamping at its finest!   This One of a kind Gem is an Off Grid Solar & Propane powered fully functional Home from Wood harvested on site We provide all of the essentials , with a running creek outside your door.  Including farm-fresh organic eggs & sausages (from our Farm!) muffin, yogurt, fruit, juice, hot cereal,coffee & more. ",
        imgSrc:
          "https://res.cloudinary.com/durnvux33/image/upload/v1687958321/property22_w50dps.webp",
        category: "Artic",
        roomCount: 2,
        bathroomCount: 1,
        guestCount: 2,
        locationValue: "KE",
        price: 79,
      },
    });
    const listing6 = await prisma.listing.create({
      data: {
        userId: user3.id,
        title: "Essentia guest house Standard Room",
        description:
          "The property is located in a small medieval village (Molina), which due to its elevated position surrounded by nature, enjoys an unforgettable view of Lake Como. Below you can visit the links where Essentia guest house and its village have been the subject of scenography for directors of music video clips and television commercials.",
        imgSrc:
          "https://res.cloudinary.com/durnvux33/image/upload/v1687959785/property4_ik1lim.webp",
        category: "Modern",
        roomCount: 3,
        bathroomCount: 2,
        guestCount: 5,
        locationValue: "KE",
        price: 100,
      },
    });

    // Seed data for Reservation model
    const reservation1 = await prisma.reservation.create({
      data: {
        userId: user1.id,
        listingId: listing1.id,
        startDate: new Date(),
        endDate: new Date(),
        totalPrice: 39,
      },
    });

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
