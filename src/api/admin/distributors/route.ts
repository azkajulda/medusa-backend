import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { 
  createDistributorWorkflow,
} from "../../../workflows/create-distributor"
import { PostAdminCreateDistributor } from "./validators"
import { z } from "@medusajs/framework/zod"

type PostAdminCreateDistributorType = z.infer<typeof PostAdminCreateDistributor>

export const POST = async (
  req: MedusaRequest<PostAdminCreateDistributorType>,
  res: MedusaResponse
) => {
  const { result } = await createDistributorWorkflow(req.scope)
    .run({
      input: req.validatedBody,
    })

  res.json({ brand: result })
}

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve("query")
  
  const { 
    data: distributors, 
    metadata: { count, take, skip } = {},
  } = await query.graph({
    entity: "distributor",
    ...req.queryConfig,
  })

  res.json({ 
    distributors,
    count,
    limit: take,
    offset: skip,
  })
}