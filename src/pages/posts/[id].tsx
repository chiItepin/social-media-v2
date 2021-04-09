import React, { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
import Link from 'next/link';

interface IPostOwner {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  picture: string;
  title: string;
}

interface IPost {
  id: number;
  image: string;
  likes: number;
  link: string;
  owner: IPostOwner;
  publishDate: string;
  tags: [];
  text: string;
}

interface IProps {
  post: IPost;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const apiToken = process.env.DUMMY_API;
  const apiUrl = process.env.DUMMY_URL;
  const postId = context.params.id;

  const res = await fetch(`${apiUrl}post/${postId}`, {
    headers: {
      'app-id': apiToken
    }
  });
  const data = await res.json().catch((error) => {
    return null;
  });

  return {
    props: {
      post: data
    }
  }
}

const Post: FunctionComponent<IProps> = ({
  post
}) => {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <>
      {
        post
          ? (
            <div key={post.id}>
              <div className="m-auto ">
                <div
                  className=" grid grid-cols-3 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <div className="col-span-3 row-span-4 p-1 m-1">
                    <a href="#">
                      <img
                        src={post.image}
                        alt={post.text}
                        className="rounded-t-xl object-cover h-48 w-full"
                      />
                    </a>
                  </div>

                  <div className="col-span-3 row-span-1">
                    <div className="flex align-bottom flex-col leading-none p-2 md:p-4">
                      <div className="flex flex-row justify-between items-center">
                        <a
                          target="_blank"
                          className="flex items-center no-underline hover:underline text-black"
                          href={post.link}
                        >
                          <img
                            alt="Placeholder"
                            className="block rounded-full max-h-7"
                            src={post.owner.picture}
                          />
                          <span className="ml-2 text-sm">
                            {
                              `${post.owner.firstName} ${post.owner.lastName}`
                            }
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 row-span-1">
                    <header
                      className="flex items-center justify-between leading-tight p-2 md:p-4"
                    >
                      <h1 className="text-lg">
                        <p className="text-black">
                          {post.text}
                        </p>
                      </h1>
                      <p className="text-grey-darker text-sm">
                        {post.publishDate.slice(0, 10)}
                      </p>
                    </header>
                  </div>

                  <div className="col-span-3 row-span-1">
                    <ul
                      className="flex flex-row pl-2 text-gray-600 overflow-x-scroll hide-scroll-bar"
                    >
                      {
                        post.tags.length && post.tags.map((tag, index) => (
                          <li key={tag + index} className="py-1">
                            <div
                              className="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800"
                            >
                              <span>
                                #{tag}
                              </span>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
          : (
            <div className="bg-gray-100">
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  <span className="block">Whoops!</span>
                  <span className="block text-yellow-500">The post you are looking for does not exist.</span>
                </h2>
                <div className="justify-center mt-8 flex lg:mt-0 lg:flex-shrink-0">
                  <div className="inline-flex rounded-md shadow">
                    <Link href="/">
                      <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500">
                        Home
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
      }
    </>
  );
}

export default Post;