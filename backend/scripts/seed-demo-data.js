const dotenv = require("dotenv")
const { Client } = require("pg")

dotenv.config({ path: ".env" })

// Existing products to create (for backward compatibility)
const PRODUCTS_TO_CREATE = 10
// Additional products to add (majority by PRODUCT_OWNER_ID)
const ADDITIONAL_PRODUCTS = 200
const MAJORITY_OWNER_PRODUCTS = 150 // At least 150 by PRODUCT_OWNER_ID
const COMMENTS_PER_PRODUCT = 10
const USERS_TO_CREATE = 5
const PRODUCT_OWNER_ID = "user_3Au9sZ53rbtb3ps5SUb3KvixvEX"
const CAR_IMAGE_URLS = [
  "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/100653/pexels-photo-100653.jpeg?auto=compress&cs=tinysrgb&w=1200",
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeProductTitle(index) {
  const brands = [
    "Lamborghini",
    "Ferrari",
    "Porsche",
    "Tesla",
    "BMW",
    "Audi",
    "Mercedes",
    "McLaren",
    "Bugatti",
    "Aston Martin",
  ]
  const models = [
    "Special Edition",
    "Track Package",
    "Grand Tour",
    "Performance Line",
    "Urban Sport",
    "Carbon Series",
    "Signature Build",
  ]

  return `${pick(brands)} ${pick(models)} #${index + 1}`
}

function makeDescription() {
  const parts = [
    "Pristine condition with complete service history.",
    "Well maintained and ready for immediate delivery.",
    "Performance-focused setup with premium upgrades.",
    "Single-owner vehicle with clean records.",
    "Ideal for enthusiasts looking for a reliable daily supercar.",
  ]

  return `${pick(parts)} ${pick(parts)}`
}

function makeImageUrl(index) {
  return CAR_IMAGE_URLS[index % CAR_IMAGE_URLS.length]
}

function makeComment(index) {
  const comments = [
    "Looks amazing. Is the price negotiable?",
    "Can you share recent maintenance details?",
    "Interested. Is this still available?",
    "Great listing. Any accident history?",
    "Can I schedule a test drive this weekend?",
    "What is the mileage and warranty status?",
    "Love this build. Open to exchange offers?",
    "Do you have more interior photos?",
    "This is exactly what I have been searching for.",
    "Please check your inbox. Sent you an offer.",
  ]

  return comments[index % comments.length]
}

async function main() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing in backend/.env")
  }

  const client = new Client({ connectionString })
  await client.connect()

  try {
    await client.query("BEGIN")

    const userIds = []

    // Ensure the requested owner exists so all products can be created by this user.
    await client.query(
      `
      INSERT INTO users (id, email, name, image_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id)
      DO UPDATE SET
        email = COALESCE(users.email, EXCLUDED.email),
        name = COALESCE(users.name, EXCLUDED.name),
        image_url = COALESCE(users.image_url, EXCLUDED.image_url),
        updated_at = NOW()
      `,
      [
        PRODUCT_OWNER_ID,
        "owner.seed@example.com",
        "Product Owner",
        `https://i.pravatar.cc/150?img=${randomInt(1, 70)}`,
      ],
    )

    userIds.push(PRODUCT_OWNER_ID)

    // Create or update a small set of seed users.
    for (let i = 1; i <= USERS_TO_CREATE; i += 1) {
      const id = `seed_user_${i}`
      const email = `seed.user${i}@example.com`
      const name = `Seed User ${i}`
      const imageUrl = `https://i.pravatar.cc/150?img=${randomInt(1, 70)}`

      await client.query(
        `
        INSERT INTO users (id, email, name, image_url)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id)
        DO UPDATE SET
          email = EXCLUDED.email,
          name = EXCLUDED.name,
          image_url = EXCLUDED.image_url,
          updated_at = NOW()
        `,
        [id, email, name, imageUrl],
      )

      userIds.push(id)
    }

    let productsCreated = 0
    let commentsCreated = 0

    // Create initial set of products (legacy, all by PRODUCT_OWNER_ID)
    for (
      let productIndex = 0;
      productIndex < PRODUCTS_TO_CREATE;
      productIndex += 1
    ) {
      const ownerId = PRODUCT_OWNER_ID
      const title = makeProductTitle(productIndex)
      const description = makeDescription()
      const imageUrl = makeImageUrl(productIndex)

      const productInsert = await client.query(
        `
        INSERT INTO products (title, description, image_url, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
        [title, description, imageUrl, ownerId],
      )

      const productId = productInsert.rows[0].id
      productsCreated += 1

      for (
        let commentIndex = 0;
        commentIndex < COMMENTS_PER_PRODUCT;
        commentIndex += 1
      ) {
        const commenterId = pick(userIds)
        const content = makeComment(commentIndex)

        await client.query(
          `
          INSERT INTO comments (content, user_id, product_id)
          VALUES ($1, $2, $3)
          `,
          [content, commenterId, productId],
        )
        commentsCreated += 1
      }
    }

    // Add 200 more products, at least 150 by PRODUCT_OWNER_ID
    for (let i = 0; i < ADDITIONAL_PRODUCTS; i += 1) {
      // First MAJORITY_OWNER_PRODUCTS are by PRODUCT_OWNER_ID, rest random
      const ownerId =
        i < MAJORITY_OWNER_PRODUCTS ? PRODUCT_OWNER_ID : pick(userIds)
      const title = makeProductTitle(PRODUCTS_TO_CREATE + i)
      const description = makeDescription()
      const imageUrl = makeImageUrl(PRODUCTS_TO_CREATE + i)

      const productInsert = await client.query(
        `
        INSERT INTO products (title, description, image_url, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
        [title, description, imageUrl, ownerId],
      )

      const productId = productInsert.rows[0].id
      productsCreated += 1

      for (
        let commentIndex = 0;
        commentIndex < COMMENTS_PER_PRODUCT;
        commentIndex += 1
      ) {
        const commenterId = pick(userIds)
        const content = makeComment(commentIndex)

        await client.query(
          `
          INSERT INTO comments (content, user_id, product_id)
          VALUES ($1, $2, $3)
          `,
          [content, commenterId, productId],
        )
        commentsCreated += 1
      }
    }

    await client.query("COMMIT")

    console.log("Seed completed successfully")
    console.log(`Products created: ${productsCreated}`)
    console.log(`Comments created: ${commentsCreated}`)
    console.log(`Users ensured: ${userIds.length}`)
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error("Seed failed:", error)
  process.exit(1)
})
