import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { ClerkProvider, UserButton, auth, currentUser } from '@clerk/nextjs';



export default async function UserProfile(params){ 
    // console.log(params.params.id)
    //const user = await currentUser(); 
    // console.log(user.username)
   
    const users = await sql`
    SELECT * FROM userprofile WHERE username = ${params.params.id};
  `;
  const defaultValues = users.rows[0];
  if(!defaultValues) {
    notFound();
  }
     // Assuming there is only one user with the given username
//    console.log(defaultValues)


   async function handleUpdateProfile(formData){
        "use server";
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const bio = formData.get("bio");
        const userid =  params.params.id;
        console.log(userid)
        await sql`
        UPDATE userprofile SET firstname = ${firstname}, lastname = ${lastname}, bio = ${bio}
            WHERE username = ${userid}`;
        
        revalidatePath(`/users/${params.params.id}`)
        

    }

    
    const myposts = await sql`
        SELECT * FROM posts WHERE username = ${params.params.id};
        `;
    
    return(
        <div> 
            
            {/* colocar a categoria aqui tb */}
<h1> Profile update</h1>
            <form action={handleUpdateProfile}>
                <label htmlFor="firstname">First Name</label>
                <input name="firstname" id="firstname" defaultValue={defaultValues.firstname} />
                <label htmlFor="lastname">Last Name</label>
                <input name="lastname" id="lastname" defaultValue={defaultValues.lastname} />
                <label htmlFor="bio">Bio</label>
                <textarea name="bio" id="bio" defaultValue={defaultValues.bio} />
                <button>Submit</button>
            </form>

            

            <h1>My profile</h1>
              <ul>
                {users.rows.map((users) => (
                 <li key={users.id}>
                   <p> First Name <span>{users.firstname} </span></p>
                   <p> Last Name <span>{users.lastname} </span></p>
                   <p> Bio <span>{users.bio}</span></p>
                </li>
                ))}
              </ul>



            <h1>My posts</h1>
              <ul>
                {myposts.rows.map((myposts) => (
                 <li key={myposts.id}>
                    {myposts.content}
                </li>
                ))}
              </ul>


        </div>
    );
}