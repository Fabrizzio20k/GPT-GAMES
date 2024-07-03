# Create your views here.
import stripe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status

stripe.api_key = 'sk_test_51PYLDQF4ZsyjeQ4SsVozca1INRiBvOftqb23qvQlOSwqMowRw1ZXZafhMCpDTwuxwp34orQhG1u8PwzEsAwMSBHa0025xTN2pk'
YOUR_DOMAIN = 'http://localhost:3000'


class CreateCheckoutSessionView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        line_items = [
            {
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'Valorant',
                        # URL de la imagen del producto
                        'images': ['https://i.blogs.es/3f15c2/valorant/1366_2000.jpg'],
                    },
                    'unit_amount': 1000,  # Precio en centavos
                },
                'quantity': 100
            },
            {
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'Half-Life',
                        # URL de la imagen del producto
                        'images': ['https://i.3djuegos.com/juegos/5006/halflife/fotos/ficha/halflife-1696756.jpg'],
                    },
                    'unit_amount': 500,  # Precio en centavos
                },
                'quantity': 100
            },
        ]

        # Filtrar productos con cantidad mayor a 0
        line_items = [item for item in line_items if item['quantity'] > 0]

        if not line_items:
            return Response({'error': 'No items selected'}, status=400)

        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=line_items,
                mode='payment',
                success_url=YOUR_DOMAIN +
                '/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=YOUR_DOMAIN + '/cancel',
            )
        except Exception as e:
            return Response({'error': str(e)}, status=500)

        return Response({'checkout_url': checkout_session.url})
