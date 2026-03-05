import { Module } from "@medusajs/framework/utils"
import DistributorModuleService from "./service"

export const DISTRIBUTOR_MODULE = "distributor"

export default Module(DISTRIBUTOR_MODULE, {
  service: DistributorModuleService,
})