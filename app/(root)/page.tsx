import SearchForm from "@/components/SearchForm";
import StartupCard,{StartupTypeCard}from "@/components/StartupCard"
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import {client}from "@/sanity/lib/client"
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import {auth} from "@/auth";

export default async function Home({searchParams}:{
  searchParams:Promise<{query ? :string}>
}) {
 
  const query = (await searchParams).query;
  const params ={search: query|| null};
  const {data:posts}=await sanityFetch({query:STARTUPS_QUERY,params});
  const session = await auth();
  console.log(session?.id)
  // console.log(JSON.stringify(posts,null,2))

  return (
    <>
    <section className="pink_container">
        <h1 className="heading">pitch your startup, <br/> Connect with Entrepreneurs </h1>
        <p className="sub-heading !max-w-3xl">
submit Ideas, vote on pitches, and Get Noticed in virtual competitions 
        </p>
<SearchForm query={query}/>
    </section>

    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `search result for "${query}"`:"All startups"}
      </p>

      <ul className="mt-7 card_grid">
        {posts?.length > 0 ?(
          
            posts.map((post:StartupTypeCard)=>(
              <StartupCard key={post?._id} post={post}/>
            ))
          
        ):(
          <p className="no-results">
              No startup found
          </p>
        )}
      </ul>

    </section>
    <SanityLive />
</>   
  );
}
