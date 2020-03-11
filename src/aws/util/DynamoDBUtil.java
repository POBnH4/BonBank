package aws.util;

import com.amazonaws.client.builder.*;
import com.amazonaws.client.builder.AwsClientBuilder.*;
import com.amazonaws.services.dynamodbv2.*;
import com.amazonaws.services.dynamodbv2.datamodeling.*;

public class DynamoDBUtil {
	private static AmazonDynamoDB dbClient = null;
	private static DynamoDBMapper mapper = null;

	/**
	 * @param region   The AWS region to connect to. e.g. "eu-west-1". To connect to
	 *                 a local server, use "local".
	 * 
	 * @param endPoint The URL of the local DynamoDB server. e.g.
	 *                 http://localhost:8000 This parameter is only used if region
	 *                 is specified as "local".
	 * 
	 * @return A DynamoDBMapper object for accessing DynamoDB.
	 */
	public static DynamoDBMapper getDBMapper(String region, String endPoint) {
		if (DynamoDBUtil.mapper == null) {
			DynamoDBUtil.dbClient = getDynamoDBClient(region, endPoint);
			DynamoDBUtil.mapper = new DynamoDBMapper(dbClient);
		}
		return DynamoDBUtil.mapper;
	}

	public static AmazonDynamoDB getDynamoDBClient(String region, String endPoint) {
		if (DynamoDBUtil.dbClient != null)
			return DynamoDBUtil.dbClient;

		AmazonDynamoDBClientBuilder builder = AmazonDynamoDBClientBuilder.standard();
		if (region.equals("local")) {
			// if using local DynamoDB server, set the endpoint to given URL.
			EndpointConfiguration epConfig = new AwsClientBuilder.EndpointConfiguration(endPoint, region);
			builder.setEndpointConfiguration(epConfig);
		} else
			builder.setRegion(region);

		return builder.build();
	}
}