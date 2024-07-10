# Create your views here.
import stripe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
import requests

stripe.api_key = 'sk_test_51PYLDQF4ZsyjeQ4SsVozca1INRiBvOftqb23qvQlOSwqMowRw1ZXZafhMCpDTwuxwp34orQhG1u8PwzEsAwMSBHa0025xTN2pk'
YOUR_DOMAIN = 'http://localhost:3000'


class CreateCheckoutSessionView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        token = request.data["user_token"]

        # HACER UN REQUEST A //localhost:8000/profile
        data = requests.get('http://localhost:8000/profile',
                            headers={'Authorization': f'Token {token}'}).json()

        offers = data["user"]["shopping_car"]["offers"]

        line_items = []

        for offer in offers:
            game = offer.get("game")
            price = offer.get("price")
            discount = offer.get("discount")
            link = offer.get("link")

            if game and price is not None and discount is not None and link:
                # Stripe expects amount in cents
                unit_amount = int((price - (discount / 100 * price)) * 100)
                line_items.append({
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': game,
                            'images': [link],
                        },
                        'unit_amount': unit_amount,
                    },
                    'quantity': 1
                })
            else:
                print(f"Invalid offer data: {offer}")

        # Filtrar productos con cantidad mayor a 0
        line_items = [item for item in line_items if item['quantity'] > 0]

        if not line_items:
            return Response({'error': 'No items selected'}, status=400)

        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=line_items,
                mode='payment',
                success_url=YOUR_DOMAIN +
                '/payment?status=success&session_id={CHECKOUT_SESSION_ID}',
                cancel_url=YOUR_DOMAIN + '/payment?status=cancel',
            )
        except Exception as e:
            return Response({'error': str(e)}, status=500)

        return Response({'checkout_url': checkout_session.url})
