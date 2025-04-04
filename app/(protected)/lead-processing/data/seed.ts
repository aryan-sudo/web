import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { statuses, sources } from "./data"

// Generate random leads instead of tasks
const leads = Array.from({ length: 30 }, () => ({
  id: `LEAD-${faker.number.int({ min: 1000, max: 9999 })}`,
  name: faker.person.fullName(),
  company: faker.company.name(),
  status: faker.helpers.arrayElement(statuses).value,
  source: faker.helpers.arrayElement(sources).value,
  lastContact: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
}))

fs.writeFileSync(
  path.join(__dirname, "leads.json"),
  JSON.stringify(leads, null, 2)
)

console.log("✅ Lead data generated.")
