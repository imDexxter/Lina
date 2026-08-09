import os
from pathlib import Path

import stripe
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")
stripe.api_key = os.environ["STRIPE_SECRET_KEY"]

ADDRESSES = {
    "FR": {"country": "FR", "line1": "10 rue de la Paix", "city": "Paris", "postal_code": "75002"},
    "US": {"country": "US", "line1": "123 Main Street", "city": "New York", "state": "NY", "postal_code": "10001"},
    "GB": {"country": "GB", "line1": "1 High Street", "city": "London", "postal_code": "SW1A 1AA"},
}

CATALOG = [
    {
        "emergent_product_id": "lina_acces_decouverte",
        "name": "Lina — Accès Découverte",
        "tax_code": "txcd_10302000",
        "prices": [
            {"lookup_key": "lina_acces_decouverte", "amount": 103, "currency": "eur"},
        ],
    },
]

account = stripe.Account.retrieve()
country = account["country"]
print("account country:", country)

s = stripe.tax.Settings.retrieve()
if not (s.head_office and getattr(s.head_office, "address", None)):
    stripe.tax.Settings.modify(
        head_office={"address": ADDRESSES.get(country, ADDRESSES["US"])},
        defaults={"tax_behavior": "exclusive"},
    )
    print("tax settings set")
else:
    print("tax settings already set")

for entry in CATALOG:
    product = None
    for p in stripe.Product.list(active=True).auto_paging_iter():
        if p.to_dict().get("metadata", {}).get("emergent_product_id") == entry["emergent_product_id"]:
            product = p
            break
    if not product:
        product = stripe.Product.create(
            name=entry["name"],
            tax_code=entry["tax_code"],
            metadata={"managed_by": "emergent", "emergent_product_id": entry["emergent_product_id"]},
        )
        print("product created:", product.id)
    for pr in entry["prices"]:
        existing = stripe.Price.list(lookup_keys=[pr["lookup_key"]], active=True, limit=1).data
        if existing and (existing[0].unit_amount != pr["amount"] or existing[0].currency != pr["currency"]):
            stripe.Price.modify(existing[0].id, active=False)
            existing = []
        if not existing:
            stripe.Price.create(
                product=product.id,
                unit_amount=pr["amount"],
                currency=pr["currency"],
                lookup_key=pr["lookup_key"],
                transfer_lookup_key=True,
            )
            print("price created:", pr["lookup_key"])
        else:
            print("price exists:", pr["lookup_key"])

print("catalog ok")
