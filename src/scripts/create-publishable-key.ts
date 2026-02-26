import { ExecArgs } from "@medusajs/framework/types"
import { createApiKeysWorkflow, linkSalesChannelsToApiKeyWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function createPublishableKey({ container, args }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  // Get title from args or use default
  const title = args?.[0] || "Storefront Key"

  logger.info(`Creating publishable API key: ${title}...`)

  // Check if publishable key already exists
  const { data: existingKeys } = await query.graph({
    entity: "api_key",
    fields: ["id", "token", "title"],
    filters: {
      type: "publishable",
    },
  })

  if (existingKeys && existingKeys.length > 0) {
    const existingKey = existingKeys[0]
    logger.info(`\n✅ Publishable API key already exists:`)
    logger.info(`   Title: ${existingKey.title}`)
    logger.info(`   ID: ${existingKey.id}`)
    logger.info(`   Token: ${existingKey.token}`)
    logger.info(`\n📋 Add this to your .env.local file:`)
    logger.info(`   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${existingKey.token}\n`)
    return
  }

  // Get all sales channels
  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })

  if (!salesChannels || salesChannels.length === 0) {
    logger.error("❌ No sales channels found. Please create a sales channel first.")
    return
  }

  // Create publishable API key
  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: title,
          type: "publishable",
          created_by: "",
        },
      ],
    },
  })

  logger.info(`✅ Created publishable API key: ${publishableApiKey.title}`)
  logger.info(`   ID: ${publishableApiKey.id}`)
  logger.info(`   Token: ${publishableApiKey.token}`)

  // Link to all sales channels
  if (salesChannels.length > 0) {
    await linkSalesChannelsToApiKeyWorkflow(container).run({
      input: {
        id: publishableApiKey.id,
        add: salesChannels.map((sc: any) => sc.id),
      },
    })
    logger.info(`✅ Linked to ${salesChannels.length} sales channel(s)`)
  }

  logger.info(`\n📋 Add this to your .env.local file:`)
  logger.info(`   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${publishableApiKey.token}\n`)
}
