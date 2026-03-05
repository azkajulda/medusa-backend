import { 
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http"
import { PostAdminCreateDistributor } from "./admin/distributors/validators"
import { createFindParams } from "@medusajs/medusa/api/utils/validators"

export const GetDistributorsSchema = createFindParams()

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/distributors",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateDistributor),
      ],
    },
    {
      matcher: "/admin/distributors",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(
          GetDistributorsSchema,
          {
            defaults: [
              "id",
              "name",
              "email",
              "phone",
              "address",
              "city",
              "state",
              "zip",
              "country",
            ],
            isList: true,
          }
        ),
      ],
    }
  ],
})