import { expect } from "chai"
import { randomUUID } from "node:crypto"
import request from "supertest"
import { afterAll, beforeAll, describe, it } from "vitest"
import { app } from "../../src/app"
import { TEST_USER_ID_HEADER } from "../../src/utils/auth"
import { deleteUsersById } from "../helpers/dbCleanup"

const ownerUserId = `e2e-owner-${randomUUID()}`
const commenterUserId = `e2e-commenter-${randomUUID()}`
const unsyncedUserId = `e2e-unsynced-${randomUUID()}`

const usersToCleanup = [ownerUserId, commenterUserId, unsyncedUserId]

const authHeader = (userId: string) => ({
  [TEST_USER_ID_HEADER]: userId,
})

describe.sequential("backend end-to-end", () => {
  beforeAll(async () => {
    await deleteUsersById(usersToCleanup)
  })

  afterAll(async () => {
    await deleteUsersById(usersToCleanup)
  })

  it("serves public status endpoints", async () => {
    const rootResponse = await request(app).get("/")

    expect(rootResponse.status).to.equal(200)
    expect(rootResponse.body).to.deep.equal({
      message: "Productify API is running!",
      health: "/api/health",
    })

    const healthResponse = await request(app).get("/api/health")

    expect(healthResponse.status).to.equal(200)
    expect(healthResponse.body.message).to.include("Productify API")
    expect(healthResponse.body.endpoints).to.deep.equal({
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    })
  })

  it("rejects protected routes without authentication", async () => {
    const response = await request(app).get("/api/products/my")

    expect(response.status).to.equal(401)
    expect(response.body).to.deep.equal({
      error: "Unauthorized access. Please log in to access this resource.",
    })
  })

  it("covers the full authenticated user, product, and comment flow", async () => {
    const syncOwnerResponse = await request(app)
      .post("/api/users/sync")
      .set(authHeader(ownerUserId))
      .send({
        email: "owner.e2e@example.com",
        name: "Owner E2E",
        imageUrl: "https://example.com/owner.png",
      })

    expect(syncOwnerResponse.status).to.equal(200)
    expect(syncOwnerResponse.body.id).to.equal(ownerUserId)

    const unsyncedCreateResponse = await request(app)
      .post("/api/products")
      .set(authHeader(unsyncedUserId))
      .send({
        title: "Unsynced product",
        description: "This should be rejected",
        imageUrl: "https://example.com/rejected.png",
      })

    expect(unsyncedCreateResponse.status).to.equal(409)
    expect(unsyncedCreateResponse.body.error).to.include("User is not synced yet")

    const createProductResponse = await request(app)
      .post("/api/products")
      .set(authHeader(ownerUserId))
      .send({
        title: "E2E Test Product",
        description: "Created by the backend e2e suite",
        imageUrl: "https://example.com/product.png",
      })

    expect(createProductResponse.status).to.equal(201)
    expect(createProductResponse.body.title).to.equal("E2E Test Product")

    const productId = createProductResponse.body.id as string

    const allProductsResponse = await request(app).get("/api/products")

    expect(allProductsResponse.status).to.equal(200)
    expect(allProductsResponse.body.some((product: { id: string }) => product.id === productId)).to.equal(true)

    const ownerProductsResponse = await request(app)
      .get("/api/products/my")
      .set(authHeader(ownerUserId))

    expect(ownerProductsResponse.status).to.equal(200)
    expect(ownerProductsResponse.body).to.have.lengthOf(1)
    expect(ownerProductsResponse.body[0].id).to.equal(productId)

    const productDetailsResponse = await request(app).get(`/api/products/${productId}`)

    expect(productDetailsResponse.status).to.equal(200)
    expect(productDetailsResponse.body.id).to.equal(productId)
    expect(productDetailsResponse.body.users.id).to.equal(ownerUserId)
    expect(productDetailsResponse.body.comments).to.deep.equal([])

    const updateForbiddenResponse = await request(app)
      .put(`/api/products/${productId}`)
      .set(authHeader(commenterUserId))
      .send({
        title: "Not allowed",
      })

    expect(updateForbiddenResponse.status).to.equal(403)
    expect(updateForbiddenResponse.body.error).to.equal(
      "Unauthorized to update this product",
    )

    const syncCommenterResponse = await request(app)
      .post("/api/users/sync")
      .set(authHeader(commenterUserId))
      .send({
        email: "commenter.e2e@example.com",
        name: "Commenter E2E",
        imageUrl: "https://example.com/commenter.png",
      })

    expect(syncCommenterResponse.status).to.equal(200)
    expect(syncCommenterResponse.body.id).to.equal(commenterUserId)

    const createCommentResponse = await request(app)
      .post(`/api/comments/${productId}`)
      .set(authHeader(commenterUserId))
      .send({
        content: "End-to-end comment",
      })

    expect(createCommentResponse.status).to.equal(201)
    expect(createCommentResponse.body.content).to.equal("End-to-end comment")

    const commentId = createCommentResponse.body.id as string

    const getCommentResponse = await request(app)
      .get(`/api/comments/${commentId}`)
      .set(authHeader(commenterUserId))

    expect(getCommentResponse.status).to.equal(200)
    expect(getCommentResponse.body.id).to.equal(commentId)
    expect(getCommentResponse.body.users.id).to.equal(commenterUserId)

    const myCommentsResponse = await request(app)
      .get("/api/comments/my")
      .set(authHeader(commenterUserId))

    expect(myCommentsResponse.status).to.equal(200)
    expect(myCommentsResponse.body).to.have.lengthOf(1)
    expect(myCommentsResponse.body[0].id).to.equal(commentId)

    const productWithCommentResponse = await request(app).get(`/api/products/${productId}`)

    expect(productWithCommentResponse.status).to.equal(200)
    expect(productWithCommentResponse.body.comments).to.have.lengthOf(1)
    expect(productWithCommentResponse.body.comments[0].id).to.equal(commentId)

    const deleteCommentForbiddenResponse = await request(app)
      .delete(`/api/comments/${commentId}`)
      .set(authHeader(ownerUserId))

    expect(deleteCommentForbiddenResponse.status).to.equal(403)
    expect(deleteCommentForbiddenResponse.body.error).to.equal(
      "Unauthorized to delete this comment",
    )

    const deleteCommentResponse = await request(app)
      .delete(`/api/comments/${commentId}`)
      .set(authHeader(commenterUserId))

    expect(deleteCommentResponse.status).to.equal(200)
    expect(deleteCommentResponse.body).to.deep.equal({
      message: "Comment deleted successfully",
    })

    const updateProductResponse = await request(app)
      .put(`/api/products/${productId}`)
      .set(authHeader(ownerUserId))
      .send({
        title: "Updated E2E Test Product",
        description: "Updated by the backend e2e suite",
        imageUrl: "https://example.com/product-updated.png",
      })

    expect(updateProductResponse.status).to.equal(200)
    expect(updateProductResponse.body.title).to.equal("Updated E2E Test Product")

    const deleteProductForbiddenResponse = await request(app)
      .delete(`/api/products/${productId}`)
      .set(authHeader(commenterUserId))

    expect(deleteProductForbiddenResponse.status).to.equal(403)
    expect(deleteProductForbiddenResponse.body.error).to.equal(
      "Unauthorized to delete this product",
    )

    const deleteProductResponse = await request(app)
      .delete(`/api/products/${productId}`)
      .set(authHeader(ownerUserId))

    expect(deleteProductResponse.status).to.equal(200)
    expect(deleteProductResponse.body).to.deep.equal({
      message: "Product deleted successfully",
    })

    const deletedProductResponse = await request(app).get(`/api/products/${productId}`)

    expect(deletedProductResponse.status).to.equal(404)
    expect(deletedProductResponse.body).to.deep.equal({
      error: "Product not found",
    })
  })
})