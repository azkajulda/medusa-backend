import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { DISTRIBUTOR_MODULE } from "../modules/distributor"
import DistributorModuleService from "../modules/distributor/service"

export type CreateDistributorStepInput = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

type CreateBrandWorkflowInput = {
  name: string
}

export const createDistributorStep = createStep(
  "create-distributor-step",
  async (input: CreateDistributorStepInput, { container }) => {
    const distributorModuleService: DistributorModuleService = container.resolve(
      DISTRIBUTOR_MODULE
    )

    const distributor = await distributorModuleService.createDistributors(input)

    return new StepResponse(distributor, distributor.id)
  }
)


export const createDistributorWorkflow = createWorkflow(
  "create-distributor",
  (input: CreateDistributorStepInput) => {
    const distributor = createDistributorStep(input)

    return new WorkflowResponse(distributor)
  }
)