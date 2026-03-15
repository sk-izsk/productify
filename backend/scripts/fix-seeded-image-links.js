const dotenv = require("dotenv")
const { Client } = require("pg")

dotenv.config({ path: ".env" })

const CAR_IMAGE_URLS = [
  "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/100653/pexels-photo-100653.jpeg?auto=compress&cs=tinysrgb&w=1200",
]

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()

  const rows = await client.query(
    "select id from products order by create_at asc",
  )

  let index = 0
  for (const row of rows.rows) {
    await client.query("update products set image_url = $1 where id = $2", [
      CAR_IMAGE_URLS[index % CAR_IMAGE_URLS.length],
      row.id,
    ])
    index += 1
  }

  await client.end()
  console.log(`updated ${rows.rows.length} product image urls`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
