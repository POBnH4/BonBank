package user;

import java.util.*;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import com.amazonaws.services.dynamodbv2.datamodeling.*;

import aws.util.*;

@Path("/user")
public class UserResource {

	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/add")
	public Response addUser(@FormParam("name") String name, @FormParam("email") String email,
			@FormParam("password") String password, @FormParam("bankAccount") double bankAccount) {
		try {
			User user = new User(name, email, password, bankAccount);
			DynamoDBMapper mapper = DynamoDBUtil.getDBMapper(Config.REGION, Config.LOCAL_ENDPOINT);
			mapper.save(user);
			return Response.status(201).entity("New user details saved").build();
		} catch (Exception e) {
			return Response.status(400).entity("Error in saving User").build();
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/email={email}/pws={password}")
	public User getOneUser(@PathParam("email") String email, @PathParam("password") String password) {
		DynamoDBMapper mapper = DynamoDBUtil.getDBMapper(Config.REGION, Config.LOCAL_ENDPOINT);		
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<User> users = mapper.scan(User.class, scanExpression);
		if (users == null) throw new WebApplicationException(404);
		User resultUser = null;
		for(int i = 0; i < users.size(); i++) {
			if(users.get(i).getEmail().equals(email) && users.get(i).getPassword().equals(password)) {
				System.out.println("User found");
				resultUser = users.get(i);
				break;
			}
		}
		if(resultUser.equals(null)) {
			System.out.println("User not found!");
		}
		System.out.println("User: " + resultUser.getEmail() + " : " + resultUser.getPassword());
		return resultUser;
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/transfer/email={email}/money={bankAccount}/crypto={crypto}")
	public Response updateUser(@PathParam("email") String email, @PathParam("bankAccount") double bankAccount,
			@PathParam("crypto") double crypto) {
		DynamoDBMapper mapper = DynamoDBUtil.getDBMapper(Config.REGION, Config.LOCAL_ENDPOINT);
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<User> result = mapper.scan(User.class, scanExpression);
		for(int i = 0; i < result.size(); i++) {
			if(result.get(i).getEmail().equals(email)){
				result.get(i).setBankAccount(result.get(i).getBankAccount() + bankAccount);
				result.get(i).setCrypto(result.get(i).getCrypto() + crypto);
				return Response.status(201).entity("Money Received").build();
			}
		}
		return Response.status(404).entity("User not found!").build();
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/update/{id}/name={name}/email={email}/password={password}/bankAccount={bankAccount}")
	public Response updateUser(@PathParam("id") UUID id, @PathParam("name") String name,
			@PathParam("email") String email, @PathParam("password") String password, @PathParam("bankAccount") double bankAccount) {
		DynamoDBMapper mapper = DynamoDBUtil.getDBMapper(Config.REGION, Config.LOCAL_ENDPOINT);
		User user = mapper.load(User.class, id);
		if (user == null) throw new WebApplicationException(404);
		System.out.println("updateEmployee");
		User newUser = new User(id, name, email, password, bankAccount);
		mapper.delete(user);
		mapper.save(newUser);
		return Response.status(201).entity("User updated").build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{email}")
	public Collection<User> getAllUserData(@PathParam("email") String email) {
		DynamoDBMapper mapper = DynamoDBUtil.getDBMapper(Config.REGION, Config.LOCAL_ENDPOINT);
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<User> result = mapper.scan(User.class, scanExpression);
		List<User> finalResult = new ArrayList<>();
		for (int i = 0; i < result.size(); i++) { //using different list to pass on users, otherwise an error is thrown;
			finalResult.add(result.get(i));
		}
		return finalResult;
	}

	@Path("/delete/{id}")
	@DELETE
	public Response deleteOneUser(@PathParam("id") UUID id) {
		DynamoDBMapper mapper = DynamoDBUtil.getDBMapper(Config.REGION, Config.LOCAL_ENDPOINT);
		User user = mapper.load(User.class, id);
		if (user == null) throw new WebApplicationException(404);
		mapper.delete(user);
		return Response.status(200).entity("deleted").build();
	}

}
