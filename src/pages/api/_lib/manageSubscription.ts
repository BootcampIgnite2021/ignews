import { query as q } from "faunadb";
import { faunadb } from "../../../services/faunadb";
import { stripe } from "../../../services/stripe";

async function createIndexUser() {
  try {
    await faunadb.query(
      q.If(
        q.Exists(q.Index("user_by_stripe_customer_id")),
        true,
        q.CreateIndex({
          name: "user_by_stripe_customer_id",
          source: q.Collection("users"),
          terms: [{ field: ["data", "stripe_customer_id"] }],
          unique: true,
        })
      )
    );
    console.log("Índice criado ou já existente user.");
  } catch (error) {
    console.error("Erro ao criar o índice:", error);
  }
}

async function createIndexSubscription() {
  try {
    await faunadb.query(
      q.If(
        q.Exists(q.Index("subscription_by_id")),
        true,
        q.CreateIndex({
          name: "subscription_by_id",
          source: q.Collection("subscriptions"),
          terms: [{ field: ["data", "id"] }],
          unique: true,
        })
      )
    );
    console.log("Índice criado ou já existente subscription.");
  } catch (error) {
    console.error("Erro ao criar o índice:", error);
  }
}

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  let subscriptionData = {};
  try {
    await createIndexUser();

    const userRef = await faunadb.query(
      q.Select(
        "ref",
        q.Get(q.Match(q.Index("user_by_stripe_customer_id"), customerId))
      )
    );

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    subscriptionData = {
      subscriptionId: subscription.id,
      userId: userRef,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
    };
  } catch (error) {}

  if (createAction) {
    try {
      console.log("createAction");
      await faunadb.query(
        q.Create(q.Collection("subscriptions"), { data: subscriptionData })
      );
    } catch (error) {
      console.log("if", error);
    }
  } else {
    try {
      await createIndexSubscription();

      await faunadb.query(
        q.Replace(
          q.Select(
            "ref",
            q.Get(q.Match(q.Index("subscription_by_id"), subscriptionId))
          ),
          {
            data: subscriptionData,
          }
        )
      );
    } catch (error) {}
  }
}
