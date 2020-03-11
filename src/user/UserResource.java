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
			@FormParam("password") String password) {
		try {
			User user = new User(name, email, password);
			DynamoDBMapper mapper = DynamoDBUtil.getDBMapper(Config.REGION, Config.LOCAL_ENDPOINT);
			mapper.save(user);
			return Response.status(201).entity("New user details saved").build();
		} catch (Exception e) {
			return Response.status(400).entity("Error in saving User").build();
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/get={id}")
	public User getOneEmployee(@PathParam("id") UUID id) {
		DynamoDBMapper mapper = DynamoDBUtil.getDBMapper(Config.REGION, Config.LOCAL_ENDPOINT);		
		System.out.println("In get one user");
		User user = mapper.load(User.class, id);
		System.out.println(user.getName());
		if (user == null) throw new WebApplicationException(404);
		return user;
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/update/{id}/name={name}/email={email}/password={password}")
	public Response updateEmployee(@PathParam("id") UUID id, @PathParam("name") String name,
			@PathParam("email") String email, @PathParam("password") String password) {
		DynamoDBMapper mapper = DynamoDBUtil.getDBMapper(Config.REGION, Config.LOCAL_ENDPOINT);
		User user = mapper.load(User.class, id);
		if (user == null) throw new WebApplicationException(404);
		System.out.println("updateEmployee");
		User newUser = new User(id, name, email, password);
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
	public Response deleteOneEmployee(@PathParam("id") UUID id) {
		DynamoDBMapper mapper = DynamoDBUtil.getDBMapper(Config.REGION, Config.LOCAL_ENDPOINT);
		User user = mapper.load(User.class, id);
		if (user == null) throw new WebApplicationException(404);
		mapper.delete(user);
		return Response.status(200).entity("deleted").build();
	}

}
