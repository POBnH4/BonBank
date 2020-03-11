package user;


public class Config {

	public static final String DYNAMODB_TABLE_NAME = "BonBankDB";
	// AWS Region. Refer to API to see what regions are available.
	// *** To use a local server, set this to "local". ***
	public static final String REGION = "local";
	public static final String LOCAL_ENDPOINT = "http://localhost:8000";
}
