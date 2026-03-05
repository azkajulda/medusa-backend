import { model } from "@medusajs/framework/utils"

export const Distributor = model.define("distributor", {
  id: model.id().primaryKey(),
  name: model.text(),
  email: model.text().unique(),
  phone: model.text(),
  address: model.text(),
  city: model.text(),
  state: model.text(),
  zip: model.text(),
  country: model.text(),
})
.checks([
  {
    name: "limit_name_length",
    expression: (column) => `LENGTH(${column.name}) <= 255`,
  }
])


export default Distributor