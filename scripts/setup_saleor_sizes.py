import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "saleor.settings")
django.setup()

from saleor.product.models import (
    Product, ProductVariant, ProductVariantChannelListing
)
from saleor.attribute.models import (
    Attribute, AttributeValue, AttributeVariant, AssignedVariantAttribute, AssignedVariantAttributeValue
)
from saleor.attribute import AttributeType, AttributeInputType
from saleor.channel.models import Channel
from saleor.warehouse.models import Warehouse, Stock

def setup_sizes():
    channel = Channel.objects.filter(slug="default-channel").first()
    warehouse = Warehouse.objects.first()

    if not channel or not warehouse:
        print("Error: Default channel or warehouse not found.")
        return

    # 1. Get or create Attribute "Talla"
    attr, created = Attribute.objects.get_or_create(
        slug="talla",
        defaults={
            "name": "Talla",
            "type": AttributeType.PRODUCT_TYPE,
            "input_type": AttributeInputType.DROPDOWN,
        }
    )

    size_names = ["S", "M", "L", "XL"]
    size_values = {}
    for name in size_names:
        val, _ = AttributeValue.objects.get_or_create(
            attribute=attr,
            slug=name.lower(),
            defaults={"name": name}
        )
        size_values[name] = val

    print(f"Attribute '{attr.name}' ready with values: {list(size_values.keys())}")

    # 2. Iterate over products and create variants for each size
    for product in Product.objects.all():
        print(f"\nProcessing product: {product.name} ({product.slug})")
        product_type = product.product_type
        
        # Link attribute to product type
        AttributeVariant.objects.get_or_create(
            attribute=attr,
            product_type=product_type
        )

        price_amount = 40.00

        # Stock amounts: S=10, M=0 (out of stock!), L=15, XL=5
        stocks_map = {"S": 10, "M": 0, "L": 15, "XL": 5}

        # Remove old default variants if they have no attributes
        for v in product.variants.all():
            if not v.attributes.exists():
                print(f"Removing old unassigned variant: {v.id} / {v.name}")
                v.delete()

        for size_name in size_names:
            size_val = size_values[size_name]
            qty = stocks_map[size_name]

            # Find or create variant
            variant_sku = f"{product.slug.upper()}-{size_name}"
            variant, v_created = ProductVariant.objects.get_or_create(
                product=product,
                sku=variant_sku,
                defaults={
                    "name": f"{size_name}",
                }
            )

            # Assign attribute value
            attr_variant, _ = AttributeVariant.objects.get_or_create(
                attribute=attr,
                product_type=product_type
            )
            assigned_attr, _ = AssignedVariantAttribute.objects.get_or_create(
                variant=variant,
                assignment=attr_variant
            )
            AssignedVariantAttributeValue.objects.get_or_create(
                assignment=assigned_attr,
                value=size_val
            )

            # Assign channel listing
            ProductVariantChannelListing.objects.get_or_create(
                variant=variant,
                channel=channel,
                defaults={
                    "currency": "USD",
                    "price_amount": price_amount,
                    "cost_price_amount": price_amount
                }
            )

            # Assign stock in warehouse
            Stock.objects.update_or_create(
                product_variant=variant,
                warehouse=warehouse,
                defaults={"quantity": qty}
            )

            print(f"  -> Variant '{size_name}': SKU={variant.sku}, Stock={qty} ({'In Stock' if qty > 0 else 'OUT OF STOCK'})")

    print("\nSaleor size variants setup complete!")

if __name__ == "__main__":
    setup_sizes()
