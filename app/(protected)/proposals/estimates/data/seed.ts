import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { proposalStatuses } from "./data"

// Generate random proposals
const proposals = Array.from({ length: 15 }, () => ({
  id: `PROP-${faker.number.int({ min: 1000, max: 9999 })}`,
  title: faker.commerce.productName(),
  client: faker.company.name(),
  status: faker.helpers.arrayElement(proposalStatuses).value,
  date: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
  value: faker.number.int({ min: 1000, max: 100000 }),
  type: "proposal",
  dueDate: faker.date.soon({ days: 30 }).toISOString().split('T')[0],
  createdBy: faker.person.fullName(),
}))

// Generate random estimates
const estimates = Array.from({ length: 15 }, () => ({
  id: `EST-${faker.number.int({ min: 1000, max: 9999 })}`,
  title: faker.commerce.productName(),
  client: faker.company.name(),
  status: faker.helpers.arrayElement(proposalStatuses).value,
  date: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
  value: faker.number.int({ min: 1000, max: 100000 }),
  type: "estimate",
  dueDate: faker.date.soon({ days: 30 }).toISOString().split('T')[0],
  createdBy: faker.person.fullName(),
}))

fs.writeFileSync(
  path.join(__dirname, "proposals.json"),
  JSON.stringify(proposals, null, 2)
)

fs.writeFileSync(
  path.join(__dirname, "estimates.json"),
  JSON.stringify(estimates, null, 2)
)

console.log("✅ Proposal and estimate data generated.")
