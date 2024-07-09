from django.http import JsonResponse
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from django.conf import settings


def test_s3_connection(request):
    try:
        s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            endpoint_url=settings.AWS_S3_ENDPOINT_URL,
            region_name=settings.AWS_S3_REGION_NAME,
        )
        # List all buckets to test connection
        response = s3_client.list_buckets()
        return JsonResponse({'buckets': response['Buckets']})
    except (NoCredentialsError, PartialCredentialsError) as e:
        return JsonResponse({'error': str(e)})
    except Exception as e:
        return JsonResponse({'error': str(e)})
