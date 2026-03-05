import { MedusaService } from "@medusajs/framework/utils"
import { Distributor } from "./models/distributor"

class DistributorModuleService extends MedusaService({
  Distributor,
}) {

}

export default DistributorModuleService