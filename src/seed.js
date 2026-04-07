require("dotenv").config();
const connectDB = require("./config/database");
const Document = require("./models/Document");

const ecommerceDocuments = [
  {
    title: "Refund Policy",
    content:
      "Customers can request refunds within 30 days of purchase. Refunds are processed within 5-7 business days after the product is returned. Refunds are issued to the original payment method. Damaged items receive full refund including shipping costs.",
    tags: ["refund", "policy", "money back", "return"],
  },
  {
    title: "Shipping Policy",
    content:
      "Standard shipping takes 3-5 business days and costs $4.99. Express shipping takes 1-2 business days and costs $12.99. Free standard shipping on orders over $50. International shipping takes 7-14 business days.",
    tags: ["shipping", "delivery", "free shipping", "express"],
  },
  {
    title: "Return Process",
    content:
      "To return an item: 1) Log into your account, 2) Print the return label, 3) Pack the item securely, 4) Drop off at any postal office. Return fees are free for defective items. Customers pay return shipping for change of mind returns.",
    tags: ["return", "process", "exchange", "defective"],
  },
  {
    title: "Warranty Information",
    content:
      "All electronics come with 1-year manufacturer warranty. Warranty covers manufacturing defects but not accidental damage, water damage, or unauthorized repairs. Register your product within 30 days to activate warranty.",
    tags: ["warranty", "electronics", "defects", "repair"],
  },
  {
    title: "Cancellation Policy",
    content:
      "Orders can be cancelled within 2 hours of purchase with full refund. After 2 hours, orders enter processing and cannot be cancelled. Contact support immediately for cancellation requests. Custom products cannot be cancelled once production starts.",
    tags: ["cancellation", "order", "modify", "change order"],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing documents
    await Document.deleteMany({});
    console.log("🗑️  Cleared existing documents");

    // Insert new documents
    const inserted = await Document.insertMany(ecommerceDocuments);
    console.log(`✅ Seeded ${inserted.length} e-commerce documents`);

    // List inserted documents
    inserted.forEach((doc) => {
      console.log(`   - ${doc.title} (Tags: ${doc.tags.join(", ")})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
