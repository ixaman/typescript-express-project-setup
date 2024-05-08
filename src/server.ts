import config from './app/config'
import mongoose from 'mongoose'
import app from './app'
import { Server } from 'http'
import seedSuperAdmin from './app/DB'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    seedSuperAdmin()
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

process.on('unhandledRejection', () => {
  console.log(`unhandledRejection is detected ! Shutting down...`)

  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected ! Shutting down...`)
  process.exit(1)
})

main().catch((err) => console.log(err))
