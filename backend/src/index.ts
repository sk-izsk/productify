import { app } from "./app"
import { ENV } from "./config/env"

const port = Number(ENV.PORT ?? 3020)

app.listen(port)
